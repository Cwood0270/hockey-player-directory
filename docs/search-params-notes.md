# Search params notes

Search params filter list pages. They are not path params: `/players/$playerId` still identifies one player. Invalid or unknown query values never throw; helpers in `src/lib/searchSchemas.ts` coerce them to defaults.

## Players `/players`

- **Keys:** `position`, `status`
- **position:** `F` | `D` | `G` | `all` (default `all`)
- **status:** `active` | `ir` | `all` (default `active`)
- **Bad values:** ignored; that key uses its default. Unknown keys are ignored.
- **Example bookmark:** `/players?position=F&status=active`

## Games `/games`

- **Keys:** `when`, `team`, `date`
- **when:** `past` | `upcoming` | `both` (default `both`) — from the requirements brief
- **team:** club code string, default `''` (all clubs). Values are trimmed and uppercased.
- **date:** `YYYY-MM-DD` or `''` (default `''`). Any other string is ignored.
- **Bad values:** ignored; that key uses its default. Unknown keys are ignored.
- **Example bookmark:** `/games?when=upcoming&team=TOR&date=2026-03-20`

## Assessment

- Refresh keeps filters because they live in the URL.
- Filter controls use TanStack `Link` `search` (not raw `?` strings on `<a>`).
- Types flow from `validateSearch` → `Route.useSearch()`.
- No database or SSR loaders in this step.
