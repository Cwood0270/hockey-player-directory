import { HeadContent, Outlet, Scripts, createRootRoute } from '@tanstack/react-router'

import { AppNav } from '../components/AppNav'
import appCss from '../styles.css?url'

// __root.tsx is the top-level layout route. It has no URL of its own.
// Every later page (home, players, player detail, games) renders inside it.
export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        // Product name staff see in the tab on arena wifi.
        title: 'Hockey Ops Directory',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  // TanStack Start document wrapper: html / head / body.
  // Shared chrome lives here so client navigations keep the shell mounted.
  shellComponent: RootDocument,
  // Child pages render through <Outlet />.
  component: RootLayout,
  // Unknown URLs (favicon, leftover /about) should not crash the shell.
  notFoundComponent: () => <p className="p-6 text-slate-700">Page not found</p>,
})

function RootLayout() {
  return <Outlet />
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="font-sans antialiased">
        <header className="border-b border-[var(--line)] bg-[var(--header-bg)] px-4 py-3">
          <p className="m-0 text-base font-semibold tracking-tight text-[var(--sea-ink)]">
            Hockey Ops Directory
          </p>
        </header>
        <AppNav />
        {children}
        <Scripts />
      </body>
    </html>
  )
}
