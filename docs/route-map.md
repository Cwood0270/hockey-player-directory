# Hockey Ops Player Directory — Route Map

Source of truth: `docs/requirements-brief.md`  
Scaffold context: `docs/scaffold-notes.md`  
Framework: TanStack Start + TanStack Router (file-based routes under `src/routes/`)

## Why this map exists
Staff on arena wifi must open bookmarkable URLs and see a consistent shell.
This document locks path names and file homes before page UI is built.

## Route table

| URL path | Kind | Purpose (hockey ops) | Route file (planned) | Bookmarkable? |
|----------|------|----------------------|----------------------|---------------|
| `/` | static | Home / directory landing that orients staff and links into players and games | `src/routes/index.tsx` | yes |
| `/players` | static | Directory of players staff can scan and open | `src/routes/players/index.tsx` | yes |
| `/players/$playerId` | dynamic | Single-player page; must be linkable and bookmarkable by URL | `src/routes/players/$playerId.tsx` | yes (each id is its own URL, e.g. `/players/player-00`) |
| `/games` | static | Schedule/list of games staff can browse | `src/routes/games/index.tsx` | yes |

No additional routes are required for this sprint. The starter `/about` page is not part of this map.

## Path segments (plain language)
- **Static segment**: a fixed word in the URL (`players`, `games`). Same for every staff member.
- **Dynamic segment**: a placeholder that changes per resource. Here `$playerId` stands for a real player id in the path (example: `/players/player-00`). In TanStack file-based routing, the `$` in `$playerId.tsx` means “this part of the URL is a value, not a fixed word.”
- **Index route**: the default page for a folder path (e.g. `/players` → `players/index.tsx`).

## Bookmarkable player URLs
Hockey ops staff must bookmark or share a specific player page and return to that same player later.
- Every player detail address is a real URL: `/players/<id>` (seed ids look like `player-00`, `player-01`, …).
- Opening `/players/player-00` in a new tab or refreshing it must still show that player.
- A click that never changes the address bar is not enough.

## Root layout
- File: `src/routes/__root.tsx`
- Role: shared shell for all pages (document/html structure as required by Start, header branding, main area, `<Outlet />` for child routes).
- Out of scope for root: player tables, filters, or fetch logic (later steps).

## Generated route tree
- File: `src/routeTree.gen.ts`
- Role: framework-generated wiring from files in `src/routes/` into the router.
- Refresh: `npm run generate-routes` (`tsr generate` in `package.json`). The Vite `dev` script also refreshes this file.
- Rule: prefer regenerating via the project script; do not rely on permanent hand-edits that the generator will wipe.
- After this step: the generated tree should list `__root__` and `/`. `/players`, `/players/$playerId`, and `/games` appear here only after those route files exist (next step).

## Layout + child relationship (target)

```text
__root (shell: header + outlet)
├── index                    → /
├── players/index            → /players
├── players/$playerId        → /players/:playerId
└── games/index              → /games
```

## Acceptance hooks from the brief
- [x] Every player has a shareable URL shaped like `/players/<id>` (not only a click that never changes the address bar).
- [x] Home, players list, and games each have their own path staff can type or bookmark.
- [x] Root layout is one place for shared chrome so pages stay consistent.
- [x] No extra mystery routes required for sprint 1 beyond this table.

## Deferred to later steps
- Page UI for home / players / games (static route step)
- Validating `$playerId` and search params (params steps)
- Server-rendered data in the HTML (SSR step)
- Auth, Supabase, live APIs (out of scope for this sprint)
