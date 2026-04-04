import { lazy } from 'react'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyComponent = React.ComponentType<any>

/**
 * Lazy-loads a named export as a React component.
 *
 * Usage:
 *   const Chart = lazyLoad(() => import('@/features/dashboard/components/Chart'), 'Chart')
 *   <Suspense fallback={<Spinner />}><Chart /></Suspense>
 */
export function lazyLoad<
  T extends Record<string, AnyComponent>,
  K extends keyof T,
>(importFn: () => Promise<T>, exportName: K) {
  return lazy(() =>
    importFn().then((m) => ({ default: m[exportName] })),
  )
}

/**
 * Creates a lazy route handler for React Router's `lazy` property.
 *
 * Usage:
 *   { path: 'about', lazy: lazyRoute(() => import('@/features/about/pages/AboutPage'), 'AboutPage') }
 */
export function lazyRoute<
  T extends Record<string, AnyComponent>,
  K extends keyof T,
>(importFn: () => Promise<T>, exportName: K) {
  return () => importFn().then((m) => ({ Component: m[exportName] }))
}
