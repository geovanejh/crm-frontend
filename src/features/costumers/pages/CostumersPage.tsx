import { Button } from '@/shared/components/ui/Button'
import { CostumersTable } from '../components/CostumersTable/CostumersTable'
import { Link } from 'react-router'
import { Plus } from 'lucide-react'

export const CostumersPage = () => {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between text-xl font-semibold text-gray-900 dark:text-white">
        <h2>Costumers Page</h2>
        <Button size="sm">
          <Link to="/costumers/new">
            <div className="flex items-center gap-2">
              <Plus />
              New Costumer
            </div>
          </Link>
        </Button>
      </div>
      <CostumersTable data={[]} />
    </div>
  )
}
