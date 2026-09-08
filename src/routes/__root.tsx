import { HeadContent, Outlet, Scripts, createRootRoute } from '@tanstack/react-router'

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
  // TanStack Start document wrapper: html / head / body only.
  shellComponent: RootDocument,
  // Shared staff chrome. Child routes render through <Outlet />.
  component: RootLayout,
})

function RootLayout() {
  return (
    <>
      <header className="border-b border-[var(--line)] bg-[var(--header-bg)] px-4 py-3">
        <p className="m-0 text-base font-semibold tracking-tight text-[var(--sea-ink)]">
          Hockey Ops Directory
        </p>
        {/* Full nav (Players / Games links) comes in a later step. */}
        <nav aria-label="Directory" className="sr-only">
          Directory navigation placeholder
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  )
}

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body className="font-sans antialiased">
        {children}
        <Scripts />
      </body>
    </html>
  )
}
