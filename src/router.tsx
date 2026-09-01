import { QueryClient } from '@tanstack/react-query'
import { createRouter } from '@tanstack/react-router'
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query'
import { routeTree } from './routeTree.gen'
import { ErrorState } from './components/ui/ErrorState'
import { NotFound } from './components/ui/NotFound'
import { errors } from './data/content'

export function getRouter() {
  const queryClient = new QueryClient()

  const router = createRouter({
    routeTree,
    context: { queryClient },
    defaultPreload: 'intent',
    // Le câblage est de l'assemblage : c'est ici que le contenu descend en
    // props, jamais dans les composants eux-mêmes (CONVENTIONS.md § 5).
    defaultErrorComponent: (props) => <ErrorState {...props} messages={errors} />,
    defaultNotFoundComponent: () => <NotFound messages={errors} />,
  })
  setupRouterSsrQueryIntegration({
    router,
    queryClient,
  })

  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
