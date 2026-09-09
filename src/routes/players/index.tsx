import { createFileRoute, Link } from '@tanstack/react-router'

import { validatePlayersSearch } from '../../lib/searchSchemas'
import { listPlayers } from '../../server/directoryLoader'

export const Route = createFileRoute('/players/')({
  validateSearch: (search: Record<string, unknown>) =>
    validatePlayersSearch(search),
  loaderDeps: ({ search: { position, status } }) => ({ position, status }),
  loader: ({ deps }) => ({
    players: listPlayers(deps),
  }),
  component: PlayersIndexPage,
})

function PlayersIndexPage() {
  const { position, status } = Route.useSearch()
  const { players } = Route.useLoaderData()

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-2xl font-bold text-slate-900">Players</h1>
      <p className="mt-2 text-slate-600">
        Roster directory index for hockey operations staff. Open a player to
        reach that bookmarkable detail URL.
      </p>
      <p className="mt-3 text-sm text-slate-700">
        Filters: position={position}, status={status}
      </p>
      <nav aria-label="Player filters" className="mt-3 flex flex-wrap gap-x-3 gap-y-1 text-sm">
        <Link
          to="/players"
          search={(prev) => ({ ...prev, position: 'F' })}
          className="text-sky-700 underline"
        >
          Forwards
        </Link>
        <Link
          to="/players"
          search={(prev) => ({ ...prev, position: 'D' })}
          className="text-sky-700 underline"
        >
          Defense
        </Link>
        <Link
          to="/players"
          search={(prev) => ({ ...prev, position: 'G' })}
          className="text-sky-700 underline"
        >
          Goalies
        </Link>
        <Link
          to="/players"
          search={(prev) => ({ ...prev, position: 'all' })}
          className="text-sky-700 underline"
        >
          All positions
        </Link>
        <Link
          to="/players"
          search={(prev) => ({ ...prev, status: 'active' })}
          className="text-sky-700 underline"
        >
          Active only
        </Link>
        <Link
          to="/players"
          search={(prev) => ({ ...prev, status: 'ir' })}
          className="text-sky-700 underline"
        >
          IR
        </Link>
        <Link
          to="/players"
          search={{ position: 'all', status: 'active' }}
          className="text-sky-700 underline"
        >
          Reset
        </Link>
      </nav>
      {players.length === 0 ? (
        <p className="mt-4 rounded-md bg-slate-100 p-3 text-sm text-slate-700">
          No seeded players match these filters.
        </p>
      ) : (
        <ul className="mt-4 list-disc space-y-1 pl-5 text-slate-700">
          {players.map((player) => (
            <li key={player.id}>
              <Link
                to="/players/$playerId"
                params={{ playerId: player.id }}
                className="text-sky-700 underline"
              >
                #{player.number} {player.name}
              </Link>
              {' — '}
              {player.position} ({player.status})
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
