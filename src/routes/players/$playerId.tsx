// Dynamic segment $playerId → params.playerId (TanStack Router file routing)

import { createFileRoute, Link } from '@tanstack/react-router'

import { NotFoundPlayer } from '../../components/NotFoundPlayer'
import { parsePlayerIdParam } from '../../lib/playerParams'
import { getPlayerById } from '../../server/directoryLoader'

export const Route = createFileRoute('/players/$playerId')({
  // Validate path params so TypeScript and runtime agree on playerId.
  params: {
    parse: (raw) => ({
      playerId: parsePlayerIdParam(raw.playerId),
    }),
    stringify: ({ playerId }) => ({
      playerId: String(playerId),
    }),
  },
  loader: ({ params }) => ({
    player: getPlayerById(params.playerId) ?? null,
    playerId: params.playerId,
  }),
  component: PlayerDetailPage,
  errorComponent: InvalidPlayerId,
})

function PlayerDetailPage() {
  const { player, playerId } = Route.useLoaderData()

  if (!player) {
    return (
      <main className="mx-auto max-w-3xl p-6">
        <NotFoundPlayer playerId={playerId} />
      </main>
    )
  }

  return (
    <main className="mx-auto max-w-3xl p-6">
      <p className="mb-4 text-sm">
        <Link to="/players" className="text-sky-700 underline">
          ← Back to players
        </Link>
      </p>
      <h1 className="text-2xl font-bold text-slate-900">{player.name}</h1>
      <p className="mt-2 text-slate-600">
        Bookmarkable sheet for player{' '}
        <span className="font-mono font-medium text-slate-900">{player.id}</span>
      </p>
      <p className="mt-4 text-slate-700">
        #{player.number} — {player.position} — {player.team} ({player.status})
      </p>
      <p className="mt-6">
        <Link
          to="/games"
          search={{
            when: 'both',
            team: '',
            date: '',
            playerId: player.id,
          }}
          className="font-medium text-sky-700 underline underline-offset-2"
        >
          View {player.name}&apos;s games
        </Link>
      </p>
    </main>
  )
}

function InvalidPlayerId() {
  return (
    <main className="mx-auto max-w-3xl p-6">
      <NotFoundPlayer playerId="(empty or invalid)" />
    </main>
  )
}
