import {
  seedGames,
  seedPlayers,
  type SeedGame,
  type SeedPlayer,
} from '../data/hockeySeed'
import type { GamesSearch, PlayersSearch } from '../lib/searchSchemas'

export type PlayerListFilters = Pick<PlayersSearch, 'position' | 'status'>
export type GameListFilters = Pick<
  GamesSearch,
  'when' | 'team' | 'date' | 'playerId'
>

function todayIsoDate(now = new Date()): string {
  return now.toISOString().slice(0, 10)
}

function isUpcoming(game: SeedGame, today: string): boolean {
  return game.date >= today
}

export function listPlayers(filters?: Partial<PlayerListFilters>): SeedPlayer[] {
  let rows = [...seedPlayers]
  if (filters?.position && filters.position !== 'all') {
    rows = rows.filter((player) => player.position === filters.position)
  }
  if (filters?.status && filters.status !== 'all') {
    rows = rows.filter((player) => player.status === filters.status)
  }
  return rows
}

export function getPlayerById(playerId: string): SeedPlayer | undefined {
  return seedPlayers.find((player) => player.id === playerId)
}

export function listGames(
  filters?: Partial<GameListFilters>,
  now = new Date(),
): SeedGame[] {
  const today = todayIsoDate(now)
  let rows = [...seedGames]

  if (filters?.when === 'upcoming') {
    rows = rows.filter((game) => isUpcoming(game, today))
  } else if (filters?.when === 'past') {
    rows = rows.filter((game) => !isUpcoming(game, today))
  }

  if (filters?.team) {
    rows = rows.filter((game) => game.opponent === filters.team)
  }

  if (filters?.date) {
    rows = rows.filter((game) => game.date === filters.date)
  }

  if (filters?.playerId) {
    rows = rows.filter((game) => game.playerId === filters.playerId)
  }

  const upcoming = rows
    .filter((game) => isUpcoming(game, today))
    .sort((a, b) => a.date.localeCompare(b.date))
  const past = rows
    .filter((game) => !isUpcoming(game, today))
    .sort((a, b) => b.date.localeCompare(a.date))

  if (filters?.when === 'upcoming') return upcoming
  if (filters?.when === 'past') return past
  return [...upcoming, ...past]
}

export type HomeDirectoryData = {
  playerCount: number
  gameCount: number
  featuredPlayers: SeedPlayer[]
  upcomingGames: SeedGame[]
}

export function getHomeDirectory(now = new Date()): HomeDirectoryData {
  const featuredPlayers = listPlayers({ status: 'active' }).slice(0, 6)
  const upcomingGames = listGames({ when: 'upcoming' }, now).slice(0, 4)
  return {
    playerCount: seedPlayers.length,
    gameCount: seedGames.length,
    featuredPlayers,
    upcomingGames,
  }
}
