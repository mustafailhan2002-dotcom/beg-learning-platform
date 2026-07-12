insert into public.subjects (id, name, slug, description)
values (
  '11111111-1111-1111-1111-111111111111',
  'IGCSE Mathematics',
  'igcse-mathematics',
  'Mathematics content for British curriculum learners and teachers'
)
on conflict (id) do nothing;

insert into public.units (id, subject_id, name, slug, description)
values (
  '22222222-2222-2222-2222-222222222222',
  '11111111-1111-1111-1111-111111111111',
  'Number',
  'number',
  'Core numerical fluency and proportional reasoning'
)
on conflict (id) do nothing;

insert into public.topics (id, unit_id, name, slug, description)
values (
  '33333333-3333-3333-3333-333333333333',
  '22222222-2222-2222-2222-222222222222',
  'Integers and Number Lines',
  'integers-and-number-lines',
  'Adding, subtracting and ordering integers using number lines'
)
on conflict (id) do nothing;

insert into public.lessons (
  id,
  subject_id,
  unit_id,
  topic_id,
  lesson_id,
  title,
  status,
  difficulty,
  learning_objectives,
  explanation,
  worked_examples,
  practice_questions,
  homework,
  mark_scheme,
  teacher_notes
)
values (
  '44444444-4444-4444-4444-444444444444',
  '11111111-1111-1111-1111-111111111111',
  '22222222-2222-2222-2222-222222222222',
  '33333333-3333-3333-3333-333333333333',
  'LESS-001',
  'Integers and Number Lines',
  'published',
  'Foundation',
  '["Order integers accurately", "Compare positive and negative values", "Solve directed number problems"]'::jsonb,
  'Learners use a number line to compare values and apply sign rules when adding and subtracting integers.',
  '["Calculate -7 + 5 using a number line.", "Solve 4 - 9 by moving left from zero."]'::jsonb,
  '["What is -3 + 8?", "Arrange -4, 2, -1 in order from smallest to largest."]'::jsonb,
  'Complete 10 integer operations and describe one real-life context.',
  '["Award 1 mark for correct order", "Award 2 marks for fully correct calculations"]'::jsonb,
  'Use a horizontal number line to support visual learners and check common sign mistakes.'
)
on conflict (id) do nothing;

insert into public.questions (
  id,
  subject_id,
  unit_id,
  topic_id,
  question_id,
  question_text,
  options,
  correct_answer,
  explanation,
  marks,
  difficulty,
  command_word,
  bloom_level,
  status
)
values (
  '55555555-5555-5555-5555-555555555555',
  '11111111-1111-1111-1111-111111111111',
  '22222222-2222-2222-2222-222222222222',
  '33333333-3333-3333-3333-333333333333',
  'Q-001',
  'What is the value of -6 + 9?',
  '["-15", "3", "-3", "15"]'::jsonb,
  '3',
  'Moving 9 steps right from -6 lands on 3.',
  2,
  'Foundation',
  'Calculate',
  'Apply',
  'published'
),
(
  '66666666-6666-6666-6666-666666666666',
  '11111111-1111-1111-1111-111111111111',
  '22222222-2222-2222-2222-222222222222',
  '33333333-3333-3333-3333-333333333333',
  'Q-002',
  'Write 0.00045 in standard form.',
  '["4.5 × 10^-4", "4.5 × 10^-5", "4.5 × 10^4", "45 × 10^-5"]'::jsonb,
  '4.5 × 10^-4',
  'The decimal moves four places to the right, so the index is -4.',
  2,
  'Higher',
  'Write',
  'Understand',
  'review'
),
(
  '77777777-7777-7777-7777-777777777777',
  '11111111-1111-1111-1111-111111111111',
  '22222222-2222-2222-2222-222222222222',
  '33333333-3333-3333-3333-333333333333',
  'Q-003',
  'A bag contains 3 red and 2 blue counters. What is the probability of picking a blue counter?',
  '["3/5", "2/5", "1/2", "1/5"]'::jsonb,
  '2/5',
  'There are 2 favourable outcomes out of 5 total counters.',
  2,
  'Foundation',
  'Calculate',
  'Apply',
  'published'
),
(
  '88888888-8888-8888-8888-888888888888',
  '11111111-1111-1111-1111-111111111111',
  '22222222-2222-2222-2222-222222222222',
  '33333333-3333-3333-3333-333333333333',
  'Q-004',
  'Simplify 3x + 4 - x + 7.',
  '["2x + 11", "4x + 3", "2x + 3", "4x + 11"]'::jsonb,
  '2x + 11',
  'Combine like terms to obtain 2x and 11.',
  2,
  'Foundation',
  'Simplify',
  'Apply',
  'published'
),
(
  '99999999-9999-9999-9999-999999999999',
  '11111111-1111-1111-1111-111111111111',
  '22222222-2222-2222-2222-222222222222',
  '33333333-3333-3333-3333-333333333333',
  'Q-005',
  'Find the HCF of 24 and 36.',
  '["6", "8", "12", "18"]'::jsonb,
  '12',
  'The greatest common factor of 24 and 36 is 12.',
  2,
  'Foundation',
  'Find',
  'Remember',
  'draft'
)
on conflict (id) do nothing;
