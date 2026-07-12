create extension if not exists "uuid-ossp";

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
  updated_at timestamptz not null default now()
);

create table if not exists public.topics (
  id uuid primary key default uuid_generate_v4(),
  unit_id uuid not null references public.units(id) on delete cascade,
  name text not null,
  slug text not null,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
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

alter table public.subjects enable row level security;
alter table public.units enable row level security;
alter table public.topics enable row level security;
alter table public.lessons enable row level security;
alter table public.lesson_versions enable row level security;
alter table public.questions enable row level security;
alter table public.content_reviews enable row level security;
alter table public.audit_logs enable row level security;

create policy if not exists "Allow authenticated read access" on public.subjects for select using (auth.role() = 'authenticated');
create policy if not exists "Allow authenticated read access" on public.units for select using (auth.role() = 'authenticated');
create policy if not exists "Allow authenticated read access" on public.topics for select using (auth.role() = 'authenticated');
create policy if not exists "Allow authenticated read access" on public.lessons for select using (auth.role() = 'authenticated');
create policy if not exists "Allow authenticated read access" on public.lesson_versions for select using (auth.role() = 'authenticated');
create policy if not exists "Allow authenticated read access" on public.questions for select using (auth.role() = 'authenticated');
create policy if not exists "Allow authenticated read access" on public.content_reviews for select using (auth.role() = 'authenticated');
create policy if not exists "Allow authenticated read access" on public.audit_logs for select using (auth.role() = 'authenticated');
