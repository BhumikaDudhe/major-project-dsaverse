# DSAverse

An interactive DSA learning MVP for first-year engineering students, featuring the Arcane Academy and sequential DSA worlds. The app includes a clearly labeled browser-only demo mode and does not require credentials or a backend for local evaluation.

## Run locally

Requirements: Node.js 20.19+ or 22.12+ and npm.

```powershell
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

## Test Demo Mode

1. Choose **Demo Login** and use `demo@dsaverse.test` / `Demo123!`, or select **Continue as Guest**.
2. Roll the die, answer rune challenges, and use **Reset Demo Progress** whenever you want a fresh run.
3. Correct boss answers unlock exactly the next world. Complete its board before the following world unlocks.
4. Use **हि / EN** to switch board questions, options, hints, feedback, and the study hub language.
5. Log out, refresh, then log in again to confirm progress resumes.

Demo and guest profiles are separate. Their progress is saved to this browser's local storage only; this is not real authentication or cloud storage. Clearing site data removes the local demo saves.

Create and preview a production build:

```powershell
npm run build
npm run preview
```

## Deploy to Vercel

1. Push this exact project to a Git provider supported by Vercel (GitHub, GitLab, or Bitbucket).
2. In Vercel, choose **Add New → Project**, import the repository, and select the project root.
3. Confirm **Framework Preset: Vite**, **Build Command: `npm run build`**, and **Output Directory: `dist`**. The install command can stay `npm install`.
4. Leave Environment Variables empty for this local demo. Do not add a Supabase service-role key. Demo Login and Guest need no backend or paid service.
5. Choose **Deploy**. After the build succeeds, Vercel will show the live `.vercel.app` URL. Open it and verify Demo Login or Continue as Guest.

The app switches views inside React and does not use URL-based routes, so no SPA rewrite or `vercel.json` is needed. If URL routes are added later, configure a Vercel rewrite to `/` then.

Optional cloud authentication can be enabled later with the public `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` project values. Keep real credentials in Vercel Environment Variables and never expose a Supabase service-role key to the browser.

## MVP boundaries

- Demo Login and Guest use separate local profiles and game-progress keys in local storage. They persist on this browser but are not real accounts, and they do not sync to Supabase.
- Dashboard quest completion and study-hub XP are sample state for the current hub visit; the Academy board is the source of truth for saved demo/guest XP.
- Real Supabase sign-in remains available when `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are configured; local demo mode does not require them.
- The coding arena's sample checker only looks for expected learning concepts in the editor text. It does not run submitted code. Connect a separately secured execution service before offering real code execution.
- Mentor responses are local topic-based explanations, not a hosted AI integration.
- Planner tasks, reminders, and timer state are local to the current session; notifications are not sent.
- Replace sample company prompts with reviewed, licensed question content before production use.