import { useNavigate } from 'react-router'

export function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="flex flex-col items-center justify-center py-20">
      <h1 className="text-6xl font-bold text-gray-900 dark:text-white">404</h1>
      <p className="mt-4 text-gray-600 dark:text-gray-400">
        Page not found.
      </p>
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="mt-6 text-violet-600 hover:underline dark:text-violet-400 cursor-pointer"
      >
        Go back
      </button>
    </div>
  )
}
