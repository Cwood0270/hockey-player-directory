import { createFileRoute, Link } from '@tanstack/react-router'

import { getHomeDirectory } from '../server/directoryLoader'

export const Route = createFileRoute('/')({
  loader: () => getHomeDirectory(),
  component: HomePage,
})

function HomePage() {
  const { playerCount, gameCount, featuredPlayers, upcomingGames } =
    Route.useLoaderData()

  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-2xl font-bold text-slate-900">
        Hockey Ops Player Directory
      </h1>
      <p className="mt-2 text-slate-600">
        Staff landing page for roster and schedule entry points on arena wifi.
        Open Players for the directory list or Games for upcoming matchups.
      </p>
      <p className="mt-4 flex flex-wrap gap-3 text-sm font-medium">
        <Link to="/players" className="text-sky-700 underline">
          Players
        </Link>
        <Link to="/games" className="text-sky-700 underline">
          Games
        </Link>
      </p>
      <p className="mt-4 rounded-md bg-slate-100 p-3 text-sm text-slate-700">
        Directory seed: {playerCount} players, {gameCount} games.
      </p>
      <h2 className="mt-6 text-lg font-semibold text-slate-900">Roster snapshot</h2>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-700">
        {featuredPlayers.map((player) => (
          <li key={player.id}>
            <Link
              to="/players/$playerId"
              params={{ playerId: player.id }}
              className="text-sky-700 underline"
            >
              #{player.number} {player.name}
            </Link>
            {' — '}
            {player.position}
          </li>
        ))}
      </ul>
      <h2 className="mt-6 text-lg font-semibold text-slate-900">Upcoming games</h2>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-700">
        {upcomingGames.map((game) => (
          <li key={game.id}>
            vs {game.opponent} — {game.date} ({game.venue})
          </li>
        ))}
      </ul>
    </main>
  )
}
