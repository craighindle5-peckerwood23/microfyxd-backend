create table if not exists public.tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  category text,
  details text not null,
  contact text not null,
  status text not null default 'pending',
  created_at timestamptz not null default now()
);
