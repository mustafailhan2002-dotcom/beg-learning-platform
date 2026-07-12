create extension if not exists "uuid-ossp";

create table if not exists public.ai_generation_jobs (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid,
  subject_id uuid,
  topic_id uuid,
  kind text not null check (kind in ('lesson','questions')),
  status text not null default 'generating' check (status in ('generating','draft','review','approved','rejected','published')),
  prompt_metadata jsonb not null default '{}'::jsonb,
  output_json jsonb,
  error_message text,
  model_name text,
  token_usage integer,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.ai_generated_lessons (
  id uuid primary key default uuid_generate_v4(),
  job_id uuid not null references public.ai_generation_jobs(id) on delete cascade,
  title text not null,
  lesson_id text not null,
  subject text not null,
  topic text not null,
  qualification text not null,
  level text not null,
  duration text not null,
  output_json jsonb not null,
  status text not null default 'draft' check (status in ('generating','draft','review','approved','rejected','published')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.ai_generated_questions (
  id uuid primary key default uuid_generate_v4(),
  job_id uuid not null references public.ai_generation_jobs(id) on delete cascade,
  question_text text not null,
  answer_options jsonb,
  correct_answer text not null,
  explanation text not null default '',
  mark_scheme jsonb not null default '[]'::jsonb,
  examiner_tip text,
  common_mistake text,
  topic text not null,
  difficulty text not null,
  marks integer not null default 1,
  command_word text,
  bloom_level text,
  status text not null default 'draft' check (status in ('generating','draft','review','approved','rejected','published')),
  output_json jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.ai_generation_logs (
  id uuid primary key default uuid_generate_v4(),
  job_id uuid not null references public.ai_generation_jobs(id) on delete cascade,
  event text not null,
  details jsonb,
  created_at timestamptz not null default now()
);

create index if not exists idx_ai_generation_jobs_user_id on public.ai_generation_jobs(user_id);
create index if not exists idx_ai_generation_jobs_status on public.ai_generation_jobs(status);
create index if not exists idx_ai_generated_lessons_status on public.ai_generated_lessons(status);
create index if not exists idx_ai_generated_questions_status on public.ai_generated_questions(status);

alter table public.ai_generation_jobs enable row level security;
alter table public.ai_generated_lessons enable row level security;
alter table public.ai_generated_questions enable row level security;
alter table public.ai_generation_logs enable row level security;

create policy "Authenticated users can read their generation jobs" on public.ai_generation_jobs for select using (auth.role() = 'authenticated' and (user_id is null or user_id = auth.uid()));
create policy "Authenticated users can insert their generation jobs" on public.ai_generation_jobs for insert with check (auth.role() = 'authenticated');
create policy "Owners and teachers can update generation jobs" on public.ai_generation_jobs for update using (auth.role() = 'authenticated' and (user_id is null or user_id = auth.uid() or auth.jwt() -> 'user_metadata' ->> 'role' in ('teacher','school_admin','ministry','super_admin')));

create policy "Authenticated users can read their generated lessons" on public.ai_generated_lessons for select using (auth.role() = 'authenticated');
create policy "Authenticated users can insert generated lessons" on public.ai_generated_lessons for insert with check (auth.role() = 'authenticated');
create policy "Owners and teachers can update generated lessons" on public.ai_generated_lessons for update using (auth.role() = 'authenticated');

create policy "Authenticated users can read their generated questions" on public.ai_generated_questions for select using (auth.role() = 'authenticated');
create policy "Authenticated users can insert generated questions" on public.ai_generated_questions for insert with check (auth.role() = 'authenticated');
create policy "Owners and teachers can update generated questions" on public.ai_generated_questions for update using (auth.role() = 'authenticated');

create policy "Authenticated users can read generation logs" on public.ai_generation_logs for select using (auth.role() = 'authenticated');
create policy "Authenticated users can insert generation logs" on public.ai_generation_logs for insert with check (auth.role() = 'authenticated');
