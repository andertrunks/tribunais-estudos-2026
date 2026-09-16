create table public.tribunais_progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  data jsonb not null default '{"aulas":[],"respostas":{},"erros":[],"revisoes":[]}'::jsonb,
  updated_at timestamptz not null default now(),
  constraint tribunais_progress_data_object check (jsonb_typeof(data) = 'object')
);

alter table public.tribunais_progress enable row level security;
alter table public.tribunais_progress force row level security;

revoke all on table public.tribunais_progress from anon, authenticated;
grant select, insert, update, delete on table public.tribunais_progress to authenticated;

create policy "tribunais_progress_select_own"
on public.tribunais_progress for select
to authenticated
using ((select auth.uid()) = user_id);

create policy "tribunais_progress_insert_own"
on public.tribunais_progress for insert
to authenticated
with check ((select auth.uid()) = user_id);

create policy "tribunais_progress_update_own"
on public.tribunais_progress for update
to authenticated
using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "tribunais_progress_delete_own"
on public.tribunais_progress for delete
to authenticated
using ((select auth.uid()) = user_id);
