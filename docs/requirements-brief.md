# Hockey Ops Player Directory — Requirements Brief

**Sprint goal:** Stand up a TanStack Start player directory skeleton that hockey operations staff can open on arena Wi‑Fi and use immediately—real content on first paint, every player page linkable and bookmarkable.

**Audience:** Tutorial participants directing a coding agent; stakeholders reviewing acceptance.

**Data assumption:** Use static/mock player and game data in the app (no auth, no live APIs). Content must still be real hockey-ops copy, not placeholder lorem.

### Seed data rules

| Rule | Requirement |
| --- | --- |
| Minimum seed size | At least **20 players** and at least **20 games** in the mock dataset. |
| Player id format | String ids shaped like `player-00`, `player-01`, … (prefix `player-` plus a two-digit number). Example detail URL: `/players/player-00`. |
| Game → player link | Every game record **must include a `playerId`** that matches an existing seeded player id (same `player-00` format). |
| Game timing | Seed both **past** and **upcoming** games so filters below have content. |

---

## 1. Actors and goals

| Actor | Goal |
| --- | --- |
| Hockey ops staff | Open the directory on arena Wi‑Fi and see useful player/game content on first paint—no waiting on a spinner for the shell. |
| Hockey ops staff | Bookmark or share a specific player page and return to that same player later. |
| Tutorial participant (director) | Break the client story into routes and page responsibilities, prompt a coding agent with clear constraints, and assess bookmarkability, type safety, and server rendering. |
| Coding agent | Scaffold a TanStack Start app with the four routes below, validated params, and server-rendered shells. |
| Stakeholder / next-sprint owner | Receive a short handoff note tied to these acceptance criteria (written separately after the app exists). |

---

## 2. Routes (only these four)

| Route | Path | Responsibility |
| --- | --- | --- |
| Home | `/` | Landing shell that orients staff and links into players and games. |
| Players list | `/players` | Directory of players staff can scan and open. |
| Player detail | `/players/$playerId` | Single-player page; must be linkable and bookmarkable by URL. |
| Games | `/games` | Schedule/list of games staff can browse; filter with `?when=past\|upcoming\|both`; each game includes a `playerId`. |

No additional routes are required for this sprint.

---

## 3. What must show on first paint

“First paint” means the HTML that arrives from the server already contains meaningful directory content—not an empty shell that fills in only after client JavaScript runs.

| Route | Must be visible in the initial HTML |
| --- | --- |
| `/` | App/product name (hockey ops directory branding), a short purpose line, and clear navigation (or CTAs) to **Players** and **Games**. |
| `/players` | Page heading for the players directory and a rendered list of at least the seeded players (names at minimum; jersey/position optional)—enough to open a detail page via ids like `/players/player-00`. |
| `/players/$playerId` | For a known id: that player’s identity content from mock data (at least name; jersey and/or position if present). For an unknown id: a clear not-found message in the page body, still with **HTTP 200** (see §4)—not a blank page. |
| `/games` | Page heading for games and a rendered list of games from mock data. Each game shows at least opponent, date/time (or status past/upcoming), and the linked **player id** (or that player’s name). List respects the `when` filter and sort order in §4. |

Loading spinners as the *only* first-paint content are not acceptable for these routes.

---

## 4. Type-safe path and search param expectations (plain language)

| Concern | Expectation |
| --- | --- |
| Player detail path | `$playerId` is a required path param, validated as a non-empty string in the `player-00` shape (or at least accepted as that string id). Known ids load that player. |
| Unknown / missing player | Invalid shape or id not in seed data still returns **HTTP status 200** with a clear not-found (or “player not found”) message in the HTML—not a blank page and not a hard fail that looks broken. Prefer 200 over 404 for this sprint’s unknown-player case. |
| Games search param `when` | `/games` uses a validated search param **`when`** with allowed values: `past`, `upcoming`, or `both` (default **`both`** if omitted or empty). Reject or coerce unknown values via type-safe validation (do not silently invent other keys). |
| Games sort order | After filtering by `when`: **upcoming** → soonest first (ascending by date/time); **past** → most recent first (descending by date/time); **both** → upcoming block first (soonest first), then past block (most recent first)—or one chronological list with the same within-group rules, as long as the order is consistent and documented in code. |
| Game `playerId` | Each game’s `playerId` is required in mock data and should appear on the games UI (id and/or resolved player name). Links to `/players/<playerId>` are encouraged when showing that player. |
| Home, players list | No required path params. Optional search params only if declared and validated the same way. |
| Links | In-app links to player detail must produce URLs like `/players/player-00` so they are bookmarkable and shareable. |

“Type-safe” here means: the framework/router knows the param shapes at build/edit time, and runtime validation rejects bad values instead of silently guessing.

---

## 5. Out of scope

- Authentication, roles, or permissions
- Live or remote APIs, databases, or CMS feeds
- Create/edit/delete of players or games
- Real-time scores, live game updates, or WebSockets
- Extra routes beyond the four listed above
- Mobile native apps, PWA install prompts, or offline sync
- Analytics, feature flags, or A/B testing
- Full design system / marketing site polish beyond a clear, usable skeleton
- Deployment to production hosting (local/dev server is enough for this sprint)

---

## 6. Acceptance criteria (yes/no browser checks)

Run these in a browser against the running app. Each item is a pass/fail check.

| # | Check | Yes / No |
| --- | --- | --- |
| 1 | Opening `/` shows branding and links (or navigation) to players and games in the first response—without relying solely on a spinner. | ☐ |
| 2 | Opening `/players` shows a heading and a list of at least **20** seeded players with real mock content in the initial HTML/page load; player links use ids like `/players/player-00`. | ☐ |
| 3 | Clicking a player from the list navigates to `/players/player-00` (or another seeded id) and shows that player’s detail content. | ☐ |
| 4 | Copying `/players/player-00`, opening it in a new tab, or refreshing the page still shows the same player (bookmarkable / linkable). | ☐ |
| 5 | Visiting `/players/player-99` (or another unknown id) shows a clear not-found message in the page **and** the response status is **200**—not a blank or broken page. | ☐ |
| 6 | Opening `/games` (default `when=both` or omitted) shows a heading and at least **20** seeded games with real mock content; each game shows a linked **player id** (and/or that player’s name). | ☐ |
| 7 | `/games?when=past` lists only past games, most recent first; `/games?when=upcoming` lists only upcoming games, soonest first; `/games?when=both` includes both with the documented sort order. | ☐ |
| 8 | Path and search params (`$playerId`, games `when`) are declared/validated in a type-safe way in the codebase (reviewer can confirm in route files). | ☐ |
| 9 | Viewing page source or disabling JS still reveals meaningful home/players/games/player content (server-rendered shells), not an empty root node only. | ☐ |
| 10 | No auth screens or live API calls are required to complete checks 1–9. | ☐ |

---

## Implementability note

This brief is enough to scaffold a TanStack Start app with static mock data (≥20 players / ≥20 games, `player-00` ids, games carrying `playerId`), four routes, validated path/search params (including games `when`), HTTP 200 not-found for unknown players, and server-rendered first paint. Later sprints can add richer profiles or real data sources without changing these acceptance criteria.
