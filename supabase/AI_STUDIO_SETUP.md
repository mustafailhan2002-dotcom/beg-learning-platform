# AI Studio Supabase setup

## 1. Run the migration

Run the following SQL migration in your Supabase SQL Editor:
- [supabase/migrations/002_create_ai_studio_schema.sql](supabase/migrations/002_create_ai_studio_schema.sql)

## 2. Run the seed data

After the migration succeeds, run:
- [supabase/seed/002_ai_studio_seed.sql](supabase/seed/002_ai_studio_seed.sql)

## 3. Verify the tables

Run:

```sql
select table_name
from information_schema.tables
where table_schema = 'public'
and table_name in ('ai_generation_jobs', 'ai_generated_lessons', 'ai_generated_questions', 'ai_generation_logs');
```

## 4. Verify the seed data

Run:

```sql
select id, kind, status from public.ai_generation_jobs;
select id, title, status from public.ai_generated_lessons;
select id, topic, status from public.ai_generated_questions;
```

## 5. Notes

The AI Studio uses a mock provider by default when no AI key is configured. The API route is prepared for an OpenAI-style adapter later.
