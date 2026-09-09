# Path params design notes — player detail

## Decision
- Route file: `src/routes/players/$playerId.tsx`
- URL pattern: `/players/$playerId`
- Param name: `playerId` (matches route map + helper)
- Helper: `src/lib/playerParams.ts` (`parsePlayerIdParam`, `playerDetailPath`)

## Validation (sprint 1)
- `parsePlayerIdParam`: non-empty trimmed string
- Non-string or empty/whitespace ids throw, so the detail route does not render a fake “success” player sheet
- Stricter `player-00` seed-id shapes can land with roster data later

## Linking
- Players index uses `<Link to="/players/$playerId" params={{ playerId }}>`
- Do not rely only on `?playerId=` query strings for the detail page
- Never interpolate the id into the `to` string

## Why
Hockey ops needs shareable, bookmarkable per-player URLs on arena wifi.
A scout can paste `/players/player-00` into chat and open the same sheet later.
Shared helper keeps list + detail + future loaders consistent.
