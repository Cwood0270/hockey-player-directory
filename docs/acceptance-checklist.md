# Acceptance checklist — Hockey ops player directory (Sprint 1)

**App under test:** TanStack Start player directory (local dev)
**Date:** 2026-09-09
**Tester:** Carson Wood
**Overall status:** ready

**Dev server:** `npm run dev` (Vite reported port 3000 in use, so this pass used `http://localhost:3001/`)
**Contract docs:** `docs/requirements-brief.md`, `docs/route-map.md`, `docs/ssr-verification-notes.md`

## Summary for hockey ops
- Passes: 10
- Fails: 0
- Blockers for demo: none

Default `/players` lists the **active** roster (17 of 20 seed players) because `status` defaults to `active`. The full seed of 20 is at `/players?status=all`. That is filter behavior, not a missing dataset, and it does not block a demo.

## How to re-run
1. From the project folder, start the dev server (`npm run dev` or the script in package.json).
2. Open the local URL shown in the terminal (`http://localhost:3000/` or the next free port).
3. Walk each row below; update Result and Evidence.

## Criteria (from docs/requirements-brief.md)

| ID | Criterion | How tested | Result | Evidence | Notes / next action |
|----|-----------|------------|--------|----------|---------------------|
| A1 | Home route loads and shows directory-oriented content (not only a blank shell) | Open `/` after fresh load and GET initial HTML | pass | Heading **Hockey Ops Player Directory**, purpose line about arena wifi, AppNav + in-page **Players** / **Games** links, copy **Directory seed: 20 players, 20 games**, roster snapshot starting with **#17 Alex Mercer** | Matches brief first-paint for `/` |
| A2 | Players index is reachable from nav and lists seed players | Click **Players** in AppNav from Home; also GET `/players` | pass | URL became `/players?position=all&status=active`. Heading **Players**. 17 named rows including **Alex Mercer** (`href="/players/player-00"`). Full 20 names (including IR **Taylor Brooks**) at `/players?status=all` | Brief check 2 wants 20 names on `/players`. Default `status=active` hides 3 IR rows. Next sprint: default `status` to `all` only if ops want the full seed unfiltered |
| A3 | Player detail is bookmarkable: direct load of `/players/:playerId` works in a fresh session | Copied `/players/player-00`, opened in a **new browser tab** (did not visit Home first) | pass | URL used: `/players/player-00`. Content seen: heading **Alex Mercer**, id **player-00**, **#17 — F — Home Club (active)**, link **View Alex Mercer's games** | Same content on list-click and on hard GET of the URL |
| A4 | Player path param is validated / invalid id shows not-found or empty state | Open `/players/does-not-exist-999` and `/players/player-99` | pass | Both HTTP **200**. Heading **Player not found**. Copy includes the attempted id (`does-not-exist-999` / `player-99`) and **Back to players directory**. No blank page, no stack trace | `NotFoundPlayer` in `src/routes/players/$playerId.tsx` |
| A5 | Games index loads and is linkable | Open `/games` via AppNav and GET `/games` | pass | Heading **Games**. 20 rows from **vs TOR — 2026-09-12** through **vs TOR — 2026-03-20**. Each row names a player (e.g. **Alex Mercer**) as a link to `/players/$playerId` | Default `when=both` |
| A6 | Search/filter params restore on reload (players and/or games) | Set filters, then open the same query in a new navigation | pass | Players: `/players?position=G&status=all` restored **Filters: position= G , status= all** and only three goalies (Sam Ortiz, Taylor Brooks, Reese Lang). Games: `/games?when=upcoming` restored `when= upcoming` with 10 dates 2026-09-12 … 2026-10-11 soonest-first. `/games?when=past` 10 dates most-recent-first (2026-09-08 … 2026-03-20). `/games?when=both` upcoming block then past block (20 rows) | Also `/games?playerId=player-00` restored player context banner |
| A7 | Invalid search params do not crash the page | Manually set bad query strings | pass | `/players?position=XYZ&status=nope` → HTTP 200, recovered to `position=all`, `status=active`, still listed **Alex Mercer**. `/games?when=banana&date=not-a-date` → `when=both`, date `(any)`, page did not crash | `validatePlayersSearch` / `validateGamesSearch` coerce; they do not throw |
| A8 | Server-rendered first content: known seed name appears in initial HTML (View Source) or under slow network without long empty spinner | GET initial HTML for `/`, `/players`, `/players/player-00`, `/games` (same as View Source) | pass | Name searched: **Alex Mercer**. Found in source: **yes** on `/`, `/players`, `/players/player-00`, and `/games`. Player detail also included **#17**. Unknown id HTML included **Player not found** | Aligns with `docs/ssr-verification-notes.md`. No `useEffect` fetch on directory routes |
| A9 | Cross-links between players and games (if present) do not 404 | Follow in-page links both directions | pass | Links tried: `/players/player-00` → **View Alex Mercer's games** → `/games?when=both&team=&date=&playerId=player-00` (banner + two TOR rows). Reverse: **Open Alex Mercer's roster sheet** → `/players/player-00`. Game-row player names also go to `/players/$playerId` | HTTP 200 both ways |
| A10 | Main nav reaches Home, Players, Games from each major page | Click Home, Players, Games from Home, Players list, player detail, and Games | pass | Broken link: none. AppNav **Home** `current` on `/`; **Players** `current` on `/players` and `/players/player-00`; **Games** `current` on `/games`. Clicks updated the URL each time | Typed `Link`s in `src/components/AppNav.tsx` |

## Requirements-brief checks 1–10 (same pass)

| Brief # | Check | Result | Evidence (short) |
|---------|-------|--------|------------------|
| 1 | `/` branding + Players/Games without spinner-only shell | pass | See A1 / A8 |
| 2 | `/players` heading + seed list; links like `/players/player-00` | pass | See A2. Default list is **17 active**; **20** at `?status=all`. Links use `player-00` ids |
| 3 | Click player → detail for that id | pass | List click to `/players/player-00` showed Alex Mercer #17 |
| 4 | Bookmark / new tab / refresh same player | pass | See A3 |
| 5 | Unknown id not-found + HTTP 200 | pass | `/players/player-99` status 200 + NotFoundPlayer |
| 6 | `/games` heading + ≥20 games with player id/name | pass | 20 rows, player names linked |
| 7 | `when=past` / `upcoming` / `both` filter + sort | pass | See A6 dates |
| 8 | Type-safe `$playerId` and `when` in route files | pass | `params.parse` via `parsePlayerIdParam` in `src/routes/players/$playerId.tsx`; `validateSearch` → `validateGamesSearch` (`when`: past\|upcoming\|both) in `src/routes/games/index.tsx` |
| 9 | Initial HTML has real home/players/games/detail content | pass | See A8 |
| 10 | No auth / live API required | pass | Seed only (`src/data/hockeySeed.ts`). Walkthrough used no login |

## Gaps log (fails only)

| ID | What failed | Suspected area (route file / loader / nav) | Minimal fix idea |
|----|-------------|---------------------------------------------|------------------|
| | *(none this pass)* | | |

## Sign-off
- [x] Checklist matches criteria in docs/requirements-brief.md
- [x] Bookmark test done in a fresh browser session
- [x] At least one SSR/first-document check recorded
- [x] Fails (if any) have next actions for handoff

**Ready for stakeholder handoff step?** yes — reason: all four routes, bookmarks, filters, not-found, nav, and first-HTML content worked on 2026-09-09 against the running local app. No acceptance-blocking bugs; no product code was changed for this pass.
