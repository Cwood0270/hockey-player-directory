import { Link } from '@tanstack/react-router'

const inactiveClass = 'text-slate-700 hover:text-slate-900'
const activeClass =
  'border-b-2 border-sky-700 pb-0.5 font-bold text-sky-700'

export function AppNav() {
  return (
    <nav
      aria-label="Main"
      className="flex flex-wrap gap-4 border-b border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium"
    >
      <Link
        to="/"
        className={inactiveClass}
        activeProps={{ className: activeClass }}
        inactiveProps={{ className: inactiveClass }}
        activeOptions={{ exact: true, includeSearch: false }}
      >
        Home
      </Link>
      <Link
        to="/players"
        className={inactiveClass}
        activeProps={{ className: activeClass }}
        inactiveProps={{ className: inactiveClass }}
        activeOptions={{ exact: false, includeSearch: false }}
      >
        Players
      </Link>
      <Link
        to="/games"
        className={inactiveClass}
        activeProps={{ className: activeClass }}
        inactiveProps={{ className: inactiveClass }}
        activeOptions={{ exact: false, includeSearch: false }}
      >
        Games
      </Link>
    </nav>
  )
}
