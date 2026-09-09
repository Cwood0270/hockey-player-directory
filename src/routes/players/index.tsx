import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/players/')({
  component: PlayersIndexPage,
})

const demoPlayers = [
  { id: 'player-00', name: 'Avery Skater', role: 'Forward' },
  { id: 'player-01', name: 'Casey Defense', role: 'Defense' },
  { id: 'player-02', name: 'Riley Goalie', role: 'Goalie' },
]

function PlayersIndexPage() {
  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-2xl font-bold text-slate-900">Players</h1>
      <p className="mt-2 text-slate-600">
        Roster directory index for hockey operations staff. Open a player to
        reach that bookmarkable detail URL.
      </p>
      <ul className="mt-4 list-disc space-y-1 pl-5 text-slate-700">
        {demoPlayers.map((player) => (
          <li key={player.id}>
            <Link
              to="/players/$playerId"
              params={{ playerId: player.id }}
              className="text-sky-700 underline"
            >
              {player.name}
            </Link>
            {' — '}
            {player.role}
          </li>
        ))}
      </ul>
    </main>
  )
}
