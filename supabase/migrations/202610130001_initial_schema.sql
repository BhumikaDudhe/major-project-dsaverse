create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default 'Apprentice' check (char_length(display_name) between 1 and 40),
  language text not null default 'EN' check (language in ('EN', 'HI')),
  avatar text not null default 'apprentice' check (avatar in ('apprentice', 'scholar', 'wayfinder', 'spark')),
  daily_goal_minutes integer check (daily_goal_minutes is null or daily_goal_minutes between 5 and 240),
  onboarding_complete boolean not null default false,
  assessment_score integer check (assessment_score is null or assessment_score between 0 and 3),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.game_progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  world_id text not null default 'logic-forest',
  board_position integer not null default 1 check (board_position between 1 and 30),
  xp integer not null default 0 check (xp >= 0),
  level integer not null default 1 check (level >= 1),
  state jsonb not null default '{"worldId":"logic-forest","position":1,"checkpoint":1,"xp":0,"level":1,"rolls":0,"completedChallenges":[],"claimedRewards":[],"unlockedWorldIds":["logic-forest"],"won":false}'::jsonb check (jsonb_typeof(state) = 'object'),
  updated_at timestamptz not null default now()
);

create table if not exists public.learning_worlds (
  id text primary key,
  name text not null,
  summary text not null,
  order_index integer not null unique,
  prerequisite_world_id text references public.learning_worlds(id),
  preview_enabled boolean not null default true
);

insert into public.learning_worlds (id, name, summary, order_index, prerequisite_world_id) values
  ('logic-forest', 'Logic Forest', 'Variables, conditions, loops, functions, dry runs', 1, null),
  ('array-kingdom', 'Array Kingdom', 'Indexing, searching, two pointers, prefix sums', 2, 'logic-forest'),
  ('sorting-citadel', 'Sorting Citadel', 'Bubble, insertion, selection, merge, quicksort', 3, 'array-kingdom'),
  ('recursion-maze', 'Recursion Mirror Maze', 'Call stacks, base cases, backtracking', 4, 'sorting-citadel'),
  ('linked-caverns', 'Linked List Caverns', 'Nodes, references, insertion, deletion, reversal', 5, 'recursion-maze'),
  ('structure-tower', 'Stack and Queue Tower', 'Push, pop, enqueue, dequeue, applications', 6, 'linked-caverns'),
  ('wisdom-tree', 'Tree of Wisdom', 'Binary trees, BSTs, traversals, heaps', 7, 'structure-tower'),
  ('graph-portal', 'Graph Portal', 'Representation, BFS, DFS, shortest paths', 8, 'wisdom-tree'),
  ('dp-realm', 'Dynamic Programming Realm', 'Memoization, tabulation, progressive DP', 9, 'graph-portal')
on conflict (id) do update set name = excluded.name, summary = excluded.summary, order_index = excluded.order_index, prerequisite_world_id = excluded.prerequisite_world_id;

alter table public.profiles enable row level security;
alter table public.game_progress enable row level security;
alter table public.learning_worlds enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own" on public.profiles for select to authenticated using ((select auth.uid()) = id);
drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own" on public.profiles for insert to authenticated with check ((select auth.uid()) = id);
drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles for update to authenticated using ((select auth.uid()) = id) with check ((select auth.uid()) = id);

drop policy if exists "game_progress_select_own" on public.game_progress;
create policy "game_progress_select_own" on public.game_progress for select to authenticated using ((select auth.uid()) = user_id);
drop policy if exists "game_progress_insert_own" on public.game_progress;
create policy "game_progress_insert_own" on public.game_progress for insert to authenticated with check ((select auth.uid()) = user_id);
drop policy if exists "game_progress_update_own" on public.game_progress;
create policy "game_progress_update_own" on public.game_progress for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

drop policy if exists "learning_worlds_read" on public.learning_worlds;
create policy "learning_worlds_read" on public.learning_worlds for select to anon, authenticated using (true);

create or replace function public.create_profile_for_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name, avatar)
  values (
    new.id,
    coalesce(nullif(new.raw_user_meta_data ->> 'display_name', ''), 'Apprentice'),
    coalesce(nullif(new.raw_user_meta_data ->> 'avatar', ''), 'apprentice')
  );
  insert into public.game_progress (user_id) values (new.id);
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.create_profile_for_new_user();

grant select on public.learning_worlds to anon, authenticated;
grant select, insert, update on public.profiles to authenticated;
grant select, insert, update on public.game_progress to authenticated;