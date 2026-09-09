import { createFileRoute, Link } from '@tanstack/react-router'

import { validateGamesSearch } from '../../lib/searchSchemas'
import { getPlayerById, listGames } from '../../server/directoryLoader'

export const Route = createFileRoute('/games/')({
  validateSearch: (search: Record<string, unknown>) =>
    validateGamesSearch(search),
  loaderDeps: ({ search: { when, team, date } }) => ({ when, team, date }),
  loader: ({ deps }) => ({
    games: listGames(deps),
  }),
  component: GamesIndexPage,
})

function gameWhenLabel(date: string): 'past' | 'upcoming' {
  const today = new Date().toISOString().slice(0, 10)
  return date >= today ? 'upcoming' : 'past'
}

function GamesIndexPage() {
  const { when, team, date } = Route.useSearch()
  const { games } = Route.useLoaderData()

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-2xl font-bold text-slate-900">Games</h1>
      <p className="mt-2 text-slate-600">
        Schedule view for upcoming and recent games. Filters are bookmarkable
        query params on this URL.
      </p>
      <p className="mt-3 text-sm text-slate-700">
        Filters: when={when}, team={team || '(all)'}, date={date || '(any)'}
      </p>
      <nav aria-label="Game filters" className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-sm">
        <Link
          to="/games"
          search={(prev) => ({ ...prev, when: 'upcoming' })}
          className="text-sky-700 underline"
        >
          Upcoming
        </Link>
        <Link
          to="/games"
          search={(prev) => ({ ...prev, when: 'past' })}
          className="text-sky-700 underline"
        >
          Past
        </Link>
        <Link
          to="/games"
          search={(prev) => ({ ...prev, when: 'both' })}
          className="text-sky-700 underline"
        >
          Both
        </Link>
        <Link
          to="/games"
          search={(prev) => ({ ...prev, team: 'TOR' })}
          className="text-sky-700 underline"
        >
          TOR
        </Link>
        <Link
          to="/games"
          search={(prev) => ({ ...prev, date: '2026-03-20' })}
          className="text-sky-700 underline"
        >
          2026-03-20
        </Link>
        <Link
          to="/games"
          search={{ when: 'both', team: '', date: '' }}
          className="text-sky-700 underline"
        >
          Clear filters
        </Link>
      </nav>
      {games.length === 0 ? (
        <p className="mt-4 rounded-md bg-slate-100 p-3 text-sm text-slate-700">
          No seeded games match these filters.
        </p>
      ) : (
        <ul className="mt-4 list-disc space-y-1 pl-5 text-slate-700">
          {games.map((game) => {
            const linkedPlayer = getPlayerById(game.playerId)
            return (
              <li key={game.id}>
                vs {game.opponent} — {game.date} ({gameWhenLabel(game.date)},{' '}
                {game.venue}) — player{' '}
                <Link
                  to="/players/$playerId"
                  params={{ playerId: game.playerId }}
                  className="text-sky-700 underline"
                >
                  {linkedPlayer?.name ?? game.playerId}
                </Link>
              </li>
            )
          })}
        </ul>
      )}
    </main>
  )
}
