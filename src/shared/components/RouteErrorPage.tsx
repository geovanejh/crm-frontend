import { isRouteErrorResponse, Link, useRouteError } from 'react-router'

function getErrorMessage(error: unknown) {
  if (isRouteErrorResponse(error)) {
    return error.statusText || error.data || 'Something went wrong.'
  }

  if (error instanceof Error) {
    return error.message
  }

  return 'Something went wrong.'
}

export function RouteErrorPage() {
  const error = useRouteError()
  const message = getErrorMessage(error)

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Something went wrong.
      </h1>
      <p className="mt-2 text-gray-600 dark:text-gray-400">{message}</p>
      <Link to="/" className="mt-6 text-violet-600 hover:underline dark:text-violet-400">
        Go back home
      </Link>
    </div>
  )
}
