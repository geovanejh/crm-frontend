import { Link, NavLink } from 'react-router'
import { Button } from '@/shared/components/ui/Button'
import { useAuthStore } from '@/features/auth/stores/authStore'

export function Header() {
  const { logout } = useAuthStore()

  const handleLogout = (): void => {
    logout()
  }

  return (
    <header className="border-b border-gray-200 dark:border-gray-800">
      <div className="flex items-center justify-between px-6 py-4">
        <Link to="/" className="text-lg font-semibold text-gray-900 dark:text-white">
          React Template
        </Link>
        <nav className="flex gap-4">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `text-sm transition-colors ${
                isActive
                  ? 'text-violet-600 dark:text-violet-400'
                  : 'text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white'
              }`
            }
          >
            Home
          </NavLink>
          <Button variant="outline" size="sm" onClick={() => handleLogout()}>
            Logout
          </Button>
        </nav>
      </div>
    </header>
  )
}
