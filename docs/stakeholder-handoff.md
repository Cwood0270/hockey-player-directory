# Stakeholder handoff — Hockey Ops Player Directory (Sprint 1)

**Audience:** Hockey operations leads and anyone triaging the next sprint  
**App:** Local player directory (run on a developer machine)  
**Repository:** https://github.com/Cwood0270/hockey-player-directory — see `docs/repo-setup.md`  
**Date:** 2026-09-09  
**Verified against:** `docs/acceptance-checklist.md` (10/10 pass, no demo blockers)

**Two phrases used below:** *First paint* means names and games are already on the page when it opens, not after a long wait. *Seed data* means sample hockey content stored in the app for this sprint—not the live club database.

## Delivered now (what staff can do)

- Open **Home** and see directory content immediately (product name, a short purpose line, links into Players and Games, and a roster snapshot that includes **#17 Alex Mercer**)—not a blank page or an endless spinner. That matters on arena wifi.
- Use the **Home / Players / Games** bar at the top of every page. The current section stays visually highlighted so you can tell where you are.
- Browse the **Players** list and open a person (example: Alex Mercer). Player links look like `/players/player-00`—not a throwaway click that never changes the address bar.
- **Bookmark or share** a player URL. Opening `/players/player-00` in a new tab (without visiting Home first) still shows that same player: name, number, position, team, status.
- Jump from a player page to **that player’s games** and back (Alex Mercer → two TOR games, then back to the roster sheet). Game rows also link to the related player.
- Browse **Games** (20 sample matchups). Filter by upcoming, past, or both; refresh keeps the same view. Past games list newest first; upcoming games list soonest first.
- Filter **Players** by position (forwards / defense / goalies) and by active vs IR. Refresh keeps the filter. A bad query in the address bar does not crash the page.
- Open a **wrong player id** (for example `/players/player-99`). You get a clear “Player not found” message and a way back to the roster—not a blank screen.

## Known limitations (do not assume these work yet)

- **Sample data only:** Names, numbers, and games are seed data in the app, **not** the live club roster. Do not scout or schedule from this list as if it were production.
- **Players list default is “active only”:** Home mentions 20 players / 20 games, but opening Players first shows **17 active** names. The three IR players (including Taylor Brooks) appear after you choose IR or “all” status (`/players?status=all`). That is a filter default, not missing people.
- **No staff login yet:** Anyone who can open the local URL can view the pages. There is no Supabase Auth, roles, or “logged out” screen.
- **No production URL yet:** This sprint was checked on a developer laptop (`npm run dev`, usually http://localhost:3000). Vercel hosting is next-sprint work.
- **No automated tests yet:** Vitest, Playwright, and GitHub Actions checks are recommended next, not delivered here.

## How to try it (high level)

1. Clone the repository above (or use an existing checkout). Install dependencies and start the app as documented in `docs/scaffold-notes.md` (`npm run dev`, then the local URL in the terminal).
2. In the browser, open Home, Players, a player page (`/players/player-00`), and Games.
3. Bookmark that player URL, paste it in a new tab, and confirm Alex Mercer / #17 appears without waiting on an empty spinner.
4. Optional: open `/players/player-99` to see the not-found message; open `/games?when=upcoming` and refresh to see the filter stick.

Pass/fail notes from the 2026-09-09 walkthrough are in `docs/acceptance-checklist.md` and `docs/ssr-verification-notes.md`.

## Recommended next sprint

1. **Live data:** Replace seed lists with the club database (Supabase, and RPC where list/filter logic belongs in the database). Use TanStack Query on the client where it helps after first paint.
2. **Auth:** Add staff login (Supabase Auth) and a clear logged-out experience so the directory is not open to anyone with the URL.
3. **Quality gates:** Add Vitest for URL/filter rules and Playwright for bookmark + first-paint smoke paths; run them in GitHub Actions.
4. **Deploy:** Put a preview/production URL on Vercel and re-run the acceptance checklist against that hosted URL.

## One-line summary for leadership

Staff can already open bookmarkable player and games pages that show directory content immediately; the next sprint should connect the live roster, login, tests, and a shared hosted URL.
