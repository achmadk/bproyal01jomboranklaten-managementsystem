import { rootAuthLoader } from '@clerk/react-router/ssr.server'
import { type PropsWithChildren, useRef } from 'react'

import { ConfigProvider } from 'antd'
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
} from 'react-router'

import { ErrorMessage } from './components'

import type { Route } from './+types/root'

import { ClerkProvider } from '@clerk/react-router'
import appCSS from './app.css?url'

export async function loader(args: Route.LoaderArgs) {
  return rootAuthLoader(args, { signInUrl: '/login' })
}

export const links: Route.LinksFunction = () => [
  { rel: 'stylesheet', href: appCSS },
]

export function Layout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <ConfigProvider
          theme={{
            token: { colorPrimary: '#254C90', fontFamily: 'Plus Jakarta Sans' },
          }}
        >
          {children}
        </ConfigProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App({ loaderData }: Route.ComponentProps) {
  return (
    <ClerkProvider
      loaderData={loaderData}
      publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}
      waitlistUrl="/join_waitlist"
    >
      <Outlet />
    </ClerkProvider>
  )
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  const errorRef = useRef<HTMLElement>(null!)

  let message = 'Oops!'
  let details = 'An unexpected error occurred.'
  let stack: string | undefined

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error'
    details =
      error.status === 404
        ? 'The requested page could not be found.'
        : error.statusText || details
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message
    stack = error.stack
  }

  return <ErrorMessage ref={errorRef} {...{ message, details, stack }} />
}
