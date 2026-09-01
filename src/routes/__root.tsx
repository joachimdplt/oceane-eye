/// <reference types="vite/client" />
import * as React from 'react'
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from '@tanstack/react-router'
import type { QueryClient } from '@tanstack/react-query'
import { Nav } from '~/components/landing/Nav'
import { ErrorState } from '~/components/ui/ErrorState'
import { NotFound } from '~/components/ui/NotFound'
import { errors, navLinks } from '~/data/content'
import appCss from '~/styles/app.css?url'
import { SITE_NAME, robotsMeta, seo } from '~/utils/seo'

const ReactQueryDevtools = import.meta.env.PROD
  ? () => null
  : React.lazy(() =>
      import('@tanstack/react-query-devtools').then((m) => ({
        default: m.ReactQueryDevtools,
      })),
    )

const TanStackRouterDevtools = import.meta.env.PROD
  ? () => null
  : React.lazy(() =>
      import('@tanstack/react-router-devtools').then((m) => ({
        default: m.TanStackRouterDevtools,
      })),
    )

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient
}>()({
  head: () => ({
    meta: [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ...seo({ title: SITE_NAME }),
      ...robotsMeta(),
    ],
    links: [
      { rel: 'preload', href: appCss, as: 'style' },
      { rel: 'stylesheet', href: appCss },
      { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
      { rel: 'manifest', href: '/site.webmanifest' },
      { rel: 'icon', href: '/favicon.ico' },
    ],
  }),
  errorComponent: (props) => (
    <RootDocument>
      <ErrorState {...props} messages={errors} />
    </RootDocument>
  ),
  notFoundComponent: () => <NotFound messages={errors} />,
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

/**
 * Aucune donnée structurée déclarée pour l'instant.
 *
 * Une propriété absente vaut mieux qu'une propriété inventée : le graphe
 * schema.org se réécrira quand la maison aura une adresse, un catalogue et des
 * prix vrais à y mettre. Voir COPYWRITING.md § 6.
 */
function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <HeadContent />
      </head>
      <body>
        {/* La barre vit à la racine : elle est la même sur les cinq pages, et
            une barre recopiée dans chacune finirait par diverger. */}
        <Nav links={navLinks} quietOver="projets" />
        {children}
        <TanStackRouterDevtools position="bottom-right" />
        <ReactQueryDevtools buttonPosition="bottom-left" />
        <Scripts />
      </body>
    </html>
  )
}
