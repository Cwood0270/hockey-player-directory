# Decisions log — Sprint 1 (engineering)

Keep this list short. Expand only when a choice would surprise the next developer.
Supporting detail: `docs/route-map.md`, `docs/ssr-verification-notes.md`, `docs/scaffold-notes.md`, `docs/search-params-notes.md`, `docs/acceptance-checklist.md`.

## D1 — Route tree matches ops jobs

- **Decision:** Route map for home, players index, player detail, games index.
- **Choice:** Static routes for list hubs (`/`, `/players`, `/games`); dynamic `/players/$playerId` for detail. No extra routes (starter `/about` was removed).
- **Why:** Ops need shareable per-player links; list hubs match “browse directory” jobs. See `docs/route-map.md`. Files: `src/routes/index.tsx`, `src/routes/players/index.tsx`, `src/routes/players/$playerId.tsx`, `src/routes/games/index.tsx`.

## D2 — Type-safe path params

- **Decision:** How player ids enter the app.
- **Choice:** Validated path params via `params.parse` and `src/lib/playerParams.ts` (non-empty trimmed string). Seed ids are `player-00` … `player-19`, not numeric `/players/42`.
- **Why:** Bad or empty ids should fail clearly; bookmarks must not depend on accidental string shapes.

## D3 — Search params for filters/views

- **Decision:** Directory filters and games view flags live in the URL.
- **Choice:** Schema-validated search params in `src/lib/searchSchemas.ts` (`validatePlayersSearch`, `validateGamesSearch`). Players: `position`, `status` (default `active`). Games: `when` (`past` | `upcoming` | `both`, default `both`), plus `team`, `date`, and `playerId` for player-context links. Invalid values coerce to defaults; they do not throw.
- **Why:** Refresh and share keep the same view; junk query strings must not crash a page on arena wifi. See `docs/search-params-notes.md`.

## D4 — Server-rendered first paint with seed data

- **Decision:** What staff see before client JS finishes.
- **Choice:** Route loaders plus `src/data/hockeySeed.ts` (20 players, 20 games with `playerId`) through `src/server/directoryLoader.ts`. Directory routes use `useLoaderData`, not `useEffect` fetch. Unknown player ids stay **HTTP 200** with not-found UI (brief preference over a hard 404).
- **Why:** Arena wifi makes spinner-only first loads painful; seed data unblocks SSR proof before Supabase. See `docs/ssr-verification-notes.md`.

## D5 — Navigation and empty states

- **Decision:** How staff move between pages and handle missing players.
- **Choice:** Shared `src/components/AppNav.tsx` (typed router `Link`s, active section highlight). Dedicated `src/components/NotFoundPlayer.tsx` for unknown ids. Player detail links to `/games?playerId=…`; games show a context banner and reverse `Link` to `/players/$playerId`. Empty games lists use a calm “No matching games” block, not a blank main.
- **Why:** A directory that 404s silently, or drops nav highlighting on a detail URL, is not usable on the bench between periods.

## D6 — Stack baseline

- **Decision:** App foundation for this sprint.
- **Choice:** TanStack Start (Vite + React + TypeScript + Tailwind v4, CSS-first) per `docs/scaffold-notes.md`. File routes under `src/routes/`; `npm run generate-routes` refreshes `src/routeTree.gen.ts`.
- **Why:** Fits type-safe routing and SSR goals; leaves a clear path to Query, Supabase, and Vercel next.

## D7 — Git history before secrets

- **Decision:** When to put the app on GitHub.
- **Choice:** Repository https://github.com/Cwood0270/hockey-player-directory (`main`), with `.gitignore` covering `node_modules/`, build output, `.env*`, and `.vercel/` before any credential existed. Recorded in `docs/repo-setup.md`.
- **Why:** Sprint 2 will commit `.env.example` and must not inherit a leaked key in history.

## Explicit non-goals this sprint

- Live Supabase reads/writes, Auth, Vitest/Playwright CI, production deploy.
