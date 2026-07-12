# Supabase setup for BEG Mathematics Studio

## 1. Run the migration

Open your Supabase project dashboard and go to the SQL Editor.

Run the migration file:
- [supabase/migrations/001_create_mathematics_schema.sql](supabase/migrations/001_create_mathematics_schema.sql)

## 2. Run the seed data

After the migration succeeds, run the seed file:
- [supabase/seed/001_mathematics_seed.sql](supabase/seed/001_mathematics_seed.sql)

## 3. Verify the tables

In the SQL Editor, run:

```sql
select table_name
from information_schema.tables
where table_schema = 'public'
and table_name in ('subjects', 'units', 'topics', 'lessons', 'lesson_versions', 'questions', 'content_reviews', 'audit_logs');
```

You should see all eight tables listed.

## 4. Verify the seed data

Run:

```sql
select id, name, slug from public.subjects;
select id, name, slug from public.units;
select id, name, slug from public.topics;
select lesson_id, title, status from public.lessons;
select question_id, question_text, status from public.questions;
```

## 5. Environment variables

Make sure your app has these values in the Supabase project settings:

- NEXT_PUBLIC_SUPABASE_URL
- NEXT_PUBLIC_SUPABASE_ANON_KEY

Do not expose any service role key in the browser.
