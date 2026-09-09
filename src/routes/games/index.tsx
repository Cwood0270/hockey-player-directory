import { createFileRoute, Link } from '@tanstack/react-router'

import { validateGamesSearch } from '../../lib/searchSchemas'
import { getPlayerById, listGames } from '../../server/directoryLoader'

export const Route = createFileRoute('/games/')({
  validateSearch: (search: Record<string, unknown>) =>
    validateGamesSearch(search),
  loaderDeps: ({ search: { when, team, date, playerId } }) => ({
    when,
    team,
    date,
    playerId,
  }),
  loader: ({ deps }) => {
    const games = listGames(deps).map((game) => ({
      ...game,
      playerName: getPlayerById(game.playerId)?.name ?? game.playerId,
    }))
    return {
      games,
      contextPlayer: deps.playerId
        ? (getPlayerById(deps.playerId) ?? null)
        : null,
    }
  },
  component: GamesIndexPage,
})

function gameWhenLabel(date: string): 'past' | 'upcoming' {
  const today = new Date().toISOString().slice(0, 10)
  return date >= today ? 'upcoming' : 'past'
}

function GamesIndexPage() {
  const { when, team, date, playerId } = Route.useSearch()
  const { games, contextPlayer } = Route.useLoaderData()

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-2xl font-bold text-slate-900">Games</h1>
      <p className="mt-2 text-slate-600">
        Schedule view for upcoming and recent games. Filters are bookmarkable
        query params on this URL.
      </p>
      <p className="mt-3 text-sm text-slate-700">
        Filters: when={when}, team={team || '(all)'}, date={date || '(any)'},
        player={playerId || '(all)'}
      </p>
      {playerId ? (
        <p className="mt-3 rounded-md border border-sky-100 bg-sky-50 p-3 text-sm text-slate-700">
          Showing games context for player{' '}
          <span className="font-mono">{playerId}</span>
          {contextPlayer ? ` (${contextPlayer.name})` : ''}.{' '}
          {contextPlayer ? (
            <Link
              to="/players/$playerId"
              params={{ playerId }}
              className="font-medium text-sky-700 underline underline-offset-2"
            >
              Open {contextPlayer.name}&apos;s roster sheet
            </Link>
          ) : (
            <Link to="/players" className="font-medium text-sky-700 underline underline-offset-2">
              Back to players directory
            </Link>
          )}
        </p>
      ) : null}
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
          search={{ when: 'both', team: '', date: '', playerId: '' }}
          className="text-sky-700 underline"
        >
          Clear filters
        </Link>
      </nav>
      {games.length === 0 ? (
        <section className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-lg font-semibold text-slate-900">No matching games</h2>
          <p className="mt-2 text-slate-700">
            Nothing in the seed schedule matches these filters. Clear them, or
            return to the roster.
          </p>
          <p className="mt-4">
            {playerId && contextPlayer ? (
              <Link
                to="/players/$playerId"
                params={{ playerId }}
                className="font-medium text-sky-700 underline underline-offset-2"
              >
                Back to {contextPlayer.name}
              </Link>
            ) : (
              <Link
                to="/players"
                className="font-medium text-sky-700 underline underline-offset-2"
              >
                Back to players directory
              </Link>
            )}
          </p>
        </section>
      ) : (
        <ul className="mt-4 list-disc space-y-1 pl-5 text-slate-700">
          {games.map((game) => (
            <li key={game.id}>
              vs {game.opponent} — {game.date} ({gameWhenLabel(game.date)},{' '}
              {game.venue}) — player{' '}
              <Link
                to="/players/$playerId"
                params={{ playerId: game.playerId }}
                className="text-sky-700 underline"
              >
                {game.playerName}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
