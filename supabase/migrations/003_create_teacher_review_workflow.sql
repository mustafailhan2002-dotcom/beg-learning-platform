create extension if not exists "uuid-ossp";

create table if not exists public.review_assignments (
  id uuid primary key default uuid_generate_v4(),
  reviewer_id uuid,
  content_type text not null check (content_type in ('lesson','question')),
  content_id uuid not null,
  previous_status text,
  new_status text not null,
  review_notes text,
  assigned_at timestamptz not null default now(),
  reviewed_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.review_comments (
  id uuid primary key default uuid_generate_v4(),
  reviewer_id uuid,
  content_type text not null check (content_type in ('lesson','question')),
  content_id uuid not null,
  comment text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.content_status_history (
  id uuid primary key default uuid_generate_v4(),
  content_type text not null check (content_type in ('lesson','question')),
  content_id uuid not null,
  previous_status text,
  new_status text not null,
  review_notes text,
  reviewer_id uuid,
  changed_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create index if not exists idx_review_assignments_content on public.review_assignments(content_type, content_id);
create index if not exists idx_review_assignments_reviewer_id on public.review_assignments(reviewer_id);
create index if not exists idx_review_comments_content on public.review_comments(content_type, content_id);
create index if not exists idx_content_status_history_content on public.content_status_history(content_type, content_id);

alter table public.review_assignments enable row level security;
alter table public.review_comments enable row level security;
alter table public.content_status_history enable row level security;

create policy "Authenticated users can read review assignments" on public.review_assignments for select using (auth.role() = 'authenticated');
create policy "Teachers and admins can manage review assignments" on public.review_assignments for all using (
  auth.role() = 'authenticated' and (
    auth.uid() is not null and (
      auth.jwt() -> 'user_metadata' ->> 'role' in ('teacher','school_admin','ministry','super_admin')
    )
  )
) with check (
  auth.role() = 'authenticated' and (
    auth.uid() is not null and (
      auth.jwt() -> 'user_metadata' ->> 'role' in ('teacher','school_admin','ministry','super_admin')
    )
  )
);

create policy "Authenticated users can read review comments" on public.review_comments for select using (auth.role() = 'authenticated');
create policy "Teachers and admins can manage review comments" on public.review_comments for all using (
  auth.role() = 'authenticated' and (
    auth.jwt() -> 'user_metadata' ->> 'role' in ('teacher','school_admin','ministry','super_admin')
  )
) with check (
  auth.role() = 'authenticated' and (
    auth.jwt() -> 'user_metadata' ->> 'role' in ('teacher','school_admin','ministry','super_admin')
  )
);

create policy "Authenticated users can read content status history" on public.content_status_history for select using (auth.role() = 'authenticated');
create policy "Teachers and admins can manage content status history" on public.content_status_history for all using (
  auth.role() = 'authenticated' and (
    auth.jwt() -> 'user_metadata' ->> 'role' in ('teacher','school_admin','ministry','super_admin')
  )
) with check (
  auth.role() = 'authenticated' and (
    auth.jwt() -> 'user_metadata' ->> 'role' in ('teacher','school_admin','ministry','super_admin')
  )
);
