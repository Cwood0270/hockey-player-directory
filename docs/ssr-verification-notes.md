# SSR verification notes (Sprint 1)

Checked against `docs/requirements-brief.md` first-paint criteria. Method: hard-refresh-style GET of each URL (initial HTML from the TanStack Start server). Dev server was at `http://localhost:3001`.

## First-paint checks

| Route | URL tested | Content visible on hard refresh? | Name/text found in View Source? | Notes |
|-------|------------|----------------------------------|----------------------------------|-------|
| Home | `/` | Yes | Yes — `Alex Mercer` and directory counts | Branding, Players/Games links, roster snapshot, upcoming games in first HTML |
| Players list | `/players` | Yes | Yes — `Alex Mercer` | Heading plus seeded names/numbers; default `status=active` |
| Player detail | `/players/player-00` | Yes | Yes — `Alex Mercer`, `#17` | Bookmarkable id `player-00` |
| Player missing | `/players/player-99` | Yes (not-found copy) | Yes — `Player not found` | HTTP **200**, not a blank page |
| Games | `/games` | Yes | Yes — `TOR` | Opponent, date, venue, linked player name |
| Games filter | `/games?when=upcoming` | Yes | Yes — `NYR` | Upcoming-only list |
| Games filter | `/games?when=past&team=TOR` | Yes | Yes — `2026-03-20` | Past TOR game still in HTML |

## Requirements-brief criteria
- [x] No spinner-only empty shell on directory pages
- [x] Player detail bookmark shows identity content without waiting on client-only fetch
- [x] Seed/mock acceptable; Supabase still stubbed: **yes — `src/data/hockeySeed.ts` only (20 players, 20 games). No live API.**

## Agent follow-ups I needed
- None for first paint. Loaders call `listPlayers` / `getPlayerById` / `listGames` / `getHomeDirectory`. No `useEffect` fetch on directory routes.

## Risks / next sprint
- Replace seed with Supabase RPC when auth and live data land
- Unknown-player polish can stay HTTP 200 as the brief prefers
