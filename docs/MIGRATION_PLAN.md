# DSAverse 2.0 Migration Plan

## Audit

The existing app is a React 18, TypeScript, Vite, and Tailwind client MVP. Navigation, the binary-search/bubble-sort teaching visualizers, local hints, planner task controls, and sample company-topic selection are interactive. The current XP starts at a hard-coded value, app state is reset on refresh, and there is no authentication or database. The coding arena performs text-pattern checks rather than executing code. Daily quests, boss battles, badges, and company tracks are sample UI rather than a consistent progression system.

## Implementation sequence

1. Add Supabase client configuration and real email/password sign-up, sign-in, sign-out, and auth-session restoration. Missing credentials must lead to setup guidance and a clearly separate preview, never a pretend login.
2. Add a first-run profile/onboarding flow for name, English/Hinglish, avatar, optional daily goal, and optional baseline assessment. Persist it through the authenticated profile row.
3. Add a versioned game-progress model and repository. Authenticated records are keyed by `auth.uid()` in PostgreSQL and protected with RLS. Preview state uses a dedicated `sessionStorage` key and is never represented as an authenticated account.
4. Implement Logic Forest rules as pure functions: one-step-at-a-time dice movement, challenge gates, non-repeatable rewards, checkpoints, visible snake/ladder destinations, and a win/unlock condition. Cover these rules with unit tests.
5. Replace the dashboard-first entry with the playable 30-tile academy map. Keep later worlds visible as locked previews and reuse the existing visualizer as a separate destination after the first playable loop is stable.
6. Verify the guest-preview journey, responsive board, unit tests, and production build. Hosted auth, RLS behavior, and account isolation require configured Supabase credentials and cannot be claimed as verified until run against a project.

## Auth and data boundary

- Only the Supabase publishable/anon key belongs in the Vite client environment. Never ship a service-role key.
- The `profiles` and `game_progress` rows are owned by their `auth.users.id`; RLS policies compare row ownership to `auth.uid()`.
- Preview progress is explicitly temporary/demo data in this browser session. It is not copied into an account implicitly.
- Real code execution remains out of scope for the browser. The first journey uses deterministic multiple-choice/dry-run challenges instead.