create extension if not exists "uuid-ossp";

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.is_teacher_or_admin()
returns boolean
language sql
stable
as $$
  select coalesce((auth.jwt() -> 'user_metadata' ->> 'role')::text, '') in ('teacher', 'school_admin', 'ministry', 'super_admin');
$$;

create table if not exists public.subjects (
  id uuid primary key default uuid_generate_v4(),
  name text not null unique,
  slug text not null unique,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.units (
  id uuid primary key default uuid_generate_v4(),
  subject_id uuid not null references public.subjects(id) on delete cascade,
  name text not null,
  slug text not null,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(subject_id, slug)
);

create table if not exists public.topics (
  id uuid primary key default uuid_generate_v4(),
  unit_id uuid not null references public.units(id) on delete cascade,
  name text not null,
  slug text not null,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(unit_id, slug)
);

create table if not exists public.lessons (
  id uuid primary key default uuid_generate_v4(),
  subject_id uuid not null references public.subjects(id) on delete cascade,
  unit_id uuid not null references public.units(id) on delete cascade,
  topic_id uuid references public.topics(id) on delete set null,
  lesson_id text not null unique,
  title text not null,
  status text not null default 'draft' check (status in ('draft','review','published','rejected')),
  difficulty text not null default 'Foundation' check (difficulty in ('Foundation','Higher')),
  learning_objectives jsonb not null default '[]'::jsonb,
  explanation text not null default '',
  worked_examples jsonb not null default '[]'::jsonb,
  practice_questions jsonb not null default '[]'::jsonb,
  homework text not null default '',
  mark_scheme jsonb not null default '[]'::jsonb,
  teacher_notes text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.lesson_versions (
  id uuid primary key default uuid_generate_v4(),
  lesson_id uuid not null references public.lessons(id) on delete cascade,
  version_number integer not null default 1,
  change_summary text not null default '',
  payload jsonb not null,
  created_at timestamptz not null default now()
);

create table if not exists public.questions (
  id uuid primary key default uuid_generate_v4(),
  subject_id uuid not null references public.subjects(id) on delete cascade,
  unit_id uuid not null references public.units(id) on delete cascade,
  topic_id uuid references public.topics(id) on delete set null,
  question_id text not null unique,
  question_text text not null,
  options jsonb,
  correct_answer text not null,
  explanation text not null default '',
  marks integer not null default 1,
  difficulty text not null default 'Foundation' check (difficulty in ('Foundation','Higher')),
  command_word text,
  bloom_level text,
  status text not null default 'draft' check (status in ('draft','review','published','rejected')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.content_reviews (
  id uuid primary key default uuid_generate_v4(),
  content_type text not null check (content_type in ('lesson','question')),
  content_id uuid not null,
  reviewer text not null,
  decision text not null check (decision in ('approve','reject','revise')),
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.audit_logs (
  id uuid primary key default uuid_generate_v4(),
  entity_type text not null,
  entity_id uuid not null,
  action text not null,
  actor text,
  details jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_units_subject_id on public.units(subject_id);
create index if not exists idx_topics_unit_id on public.topics(unit_id);
create index if not exists idx_lessons_subject_id on public.lessons(subject_id);
create index if not exists idx_lessons_unit_id on public.lessons(unit_id);
create index if not exists idx_lessons_status on public.lessons(status);
create index if not exists idx_questions_subject_id on public.questions(subject_id);
create index if not exists idx_questions_status on public.questions(status);
create index if not exists idx_content_reviews_content_type_content_id on public.content_reviews(content_type, content_id);

create trigger set_updated_at_subjects before update on public.subjects for each row execute function public.set_updated_at();
create trigger set_updated_at_units before update on public.units for each row execute function public.set_updated_at();
create trigger set_updated_at_topics before update on public.topics for each row execute function public.set_updated_at();
create trigger set_updated_at_lessons before update on public.lessons for each row execute function public.set_updated_at();
create trigger set_updated_at_questions before update on public.questions for each row execute function public.set_updated_at();

alter table public.subjects enable row level security;
alter table public.units enable row level security;
alter table public.topics enable row level security;
alter table public.lessons enable row level security;
alter table public.lesson_versions enable row level security;
alter table public.questions enable row level security;
alter table public.content_reviews enable row level security;
alter table public.audit_logs enable row level security;

create policy if not exists "Authenticated users can read curriculum metadata" on public.subjects for select using (auth.role() = 'authenticated');
create policy if not exists "Teachers and admins can manage curriculum metadata" on public.subjects for all using (public.is_teacher_or_admin()) with check (public.is_teacher_or_admin());

create policy if not exists "Authenticated users can read units" on public.units for select using (auth.role() = 'authenticated');
create policy if not exists "Teachers and admins can manage units" on public.units for all using (public.is_teacher_or_admin()) with check (public.is_teacher_or_admin());

create policy if not exists "Authenticated users can read topics" on public.topics for select using (auth.role() = 'authenticated');
create policy if not exists "Teachers and admins can manage topics" on public.topics for all using (public.is_teacher_or_admin()) with check (public.is_teacher_or_admin());

create policy if not exists "Students can read published lessons" on public.lessons for select using (auth.role() = 'authenticated' and (status = 'published' or public.is_teacher_or_admin()));
create policy if not exists "Teachers and admins can manage lessons" on public.lessons for all using (public.is_teacher_or_admin()) with check (public.is_teacher_or_admin());

create policy if not exists "Authenticated users can read lesson versions" on public.lesson_versions for select using (auth.role() = 'authenticated');
create policy if not exists "Teachers and admins can manage lesson versions" on public.lesson_versions for all using (public.is_teacher_or_admin()) with check (public.is_teacher_or_admin());

create policy if not exists "Students can read published questions" on public.questions for select using (auth.role() = 'authenticated' and (status = 'published' or public.is_teacher_or_admin()));
create policy if not exists "Teachers and admins can manage questions" on public.questions for all using (public.is_teacher_or_admin()) with check (public.is_teacher_or_admin());

create policy if not exists "Teachers and admins can manage reviews" on public.content_reviews for all using (public.is_teacher_or_admin()) with check (public.is_teacher_or_admin());
create policy if not exists "Teachers and admins can manage audit logs" on public.audit_logs for all using (public.is_teacher_or_admin()) with check (public.is_teacher_or_admin());
