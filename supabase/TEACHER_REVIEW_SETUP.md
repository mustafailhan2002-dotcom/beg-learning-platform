# Teacher Review Setup

## 1. Apply the migration
Run the following migration manually in Supabase SQL Editor:

- [supabase/migrations/003_create_teacher_review_workflow.sql](supabase/migrations/003_create_teacher_review_workflow.sql)

## 2. Seed demo data
Run the seed file after the migration:

- [supabase/seed/003_teacher_review_seed.sql](supabase/seed/003_teacher_review_seed.sql)

## 3. Verify the workflow
Confirm that the following tables exist:
- review_assignments
- review_comments
- content_status_history

Confirm that the teacher workspace routes are available:
- /teacher
- /teacher/review
- /teacher/review/[id]
- /teacher/published
- /teacher/revisions
