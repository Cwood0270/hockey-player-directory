// Shared, type-safe search (query) param rules for list pages.
// Path params identify ONE player; search params only FILTER lists.
// Invalid or missing values never throw — they fall back to defaults.

export type PlayerPosition = 'F' | 'D' | 'G' | 'all'
export type RosterStatus = 'active' | 'ir' | 'all'
export type GamesWhen = 'past' | 'upcoming' | 'both'

export type PlayersSearch = {
  position: PlayerPosition
  status: RosterStatus
}

export type GamesSearch = {
  // Brief: past | upcoming | both (default both)
  when: GamesWhen
  // Empty string means all clubs; otherwise a club code, e.g. "TOR"
  team: string
  // '' or 'YYYY-MM-DD'
  date: string
  // Empty means all players; otherwise a seed id like "player-00"
  playerId: string
}

const PLAYER_POSITIONS = new Set(['F', 'D', 'G', 'all'])
const ROSTER_STATUSES = new Set(['active', 'ir', 'all'])
const GAMES_WHEN = new Set(['past', 'upcoming', 'both'])

/** Defaults when the URL has no query string. */
export const defaultPlayersSearch = (): PlayersSearch => ({
  position: 'all',
  status: 'active',
})

export const defaultGamesSearch = (): GamesSearch => ({
  when: 'both',
  team: '',
  date: '',
  playerId: '',
})

/**
 * Coerce unknown URL search into a safe PlayersSearch.
 * Unknown keys are ignored; bad values fall back to defaults.
 */
export function validatePlayersSearch(
  raw: Record<string, unknown>,
): PlayersSearch {
  const defaults = defaultPlayersSearch()
  const position =
    typeof raw.position === 'string' && PLAYER_POSITIONS.has(raw.position)
      ? (raw.position as PlayerPosition)
      : defaults.position
  const status =
    typeof raw.status === 'string' && ROSTER_STATUSES.has(raw.status)
      ? (raw.status as RosterStatus)
      : defaults.status
  return { position, status }
}

/**
 * Coerce unknown URL search into a safe GamesSearch.
 * Unknown keys are ignored; bad values fall back to defaults.
 */
export function validateGamesSearch(raw: Record<string, unknown>): GamesSearch {
  const defaults = defaultGamesSearch()
  const when =
    typeof raw.when === 'string' && GAMES_WHEN.has(raw.when)
      ? (raw.when as GamesWhen)
      : defaults.when
  const team =
    typeof raw.team === 'string' ? raw.team.trim().toUpperCase() : defaults.team
  const dateRaw = typeof raw.date === 'string' ? raw.date.trim() : ''
  const date = /^\d{4}-\d{2}-\d{2}$/.test(dateRaw) ? dateRaw : defaults.date
  const playerIdRaw = typeof raw.playerId === 'string' ? raw.playerId.trim() : ''
  const playerId = playerIdRaw || defaults.playerId
  return { team, date, when, playerId }
}
