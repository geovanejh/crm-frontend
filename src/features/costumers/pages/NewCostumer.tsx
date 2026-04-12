import { Button } from '@/shared/components/ui/Button'
import { MoveLeft } from 'lucide-react'
import { useNavigate } from 'react-router'
import { CostumerForm } from '../components/CostumerForm'

export const NewCostumer = () => {
  const navigate = useNavigate()

  return (
    <>
      <div className="flex justify-between text-xl font-semibold text-gray-900 dark:text-white">
        <h1>New Costumer</h1>
        <Button size="sm" onClick={() => navigate(-1)}>
          <div className="flex items-center gap-2">
            <MoveLeft />
            Go back
          </div>
        </Button>
      </div>
      <CostumerForm />
    </>
  )
}
