import { Link } from 'react-router'

export function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <h1 className="text-6xl font-bold text-gray-900 dark:text-white">404</h1>
      <p className="mt-4 text-gray-600 dark:text-gray-400">
        Page not found.
      </p>
      <Link
        to="/"
        className="mt-6 text-violet-600 hover:underline dark:text-violet-400"
      >
        Go back home
      </Link>
    </div>
  )
}
