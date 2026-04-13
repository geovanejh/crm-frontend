import { Button } from '@/shared/components/ui/Button'
import { FileUser, MoveLeft, Settings, UserPen, type LucideIcon } from 'lucide-react'
import { useNavigate } from 'react-router'
import { MultiStepsForm } from '@/shared/components/multistepsForm/MultiStepsForm'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { PersonalInfoStep } from '../components/CostumersForm/PersonalInfoStep'
import { ContactInfoStep } from '../components/CostumersForm/ContactInfoStep'
import {
  costumerSchema,
  type CostumerFormData,
} from '../schemas/costumer.schema'
import { AccountDetailsStep } from '../components/CostumersForm/AccountDetailsStep'

export const NewCostumer = () => {
  interface FormSteps {
    title: string
    description: string
    icon: LucideIcon
    content: React.ReactNode
  }

  const navigate = useNavigate()

  const [currentStep, setCurrentStep] = useState(1)

  const form = useForm<CostumerFormData>({
    resolver: zodResolver(costumerSchema),
    defaultValues: {
      name: '',
      document: '',
      birthDate: '',
      email: '',
      phone: '',
      notes: '',
    },
  })

  const formSteps: FormSteps[] = [
    {
      title: 'Personal Info',
      description: 'Provide your personal details',
      icon: UserPen,
      content: <PersonalInfoStep control={form.control} />,
    },
    {
      title: 'Contact Info',
      description: 'Provide your contact information',
      icon: FileUser,
      content: <ContactInfoStep control={form.control}/>,
    },  
    {
      title: 'Account Details',
      description: 'Set up your account preferences',
      icon: Settings,
      content: <AccountDetailsStep control={form.control}/>,
    },
  ]

  return (
    <>
      <div className="flex justify-between text-xl font-semibold text-gray-900 dark:text-white mb-6">
        <h1>New Costumer</h1>
        <Button size="sm" onClick={() => navigate(-1)}>
          <div className="flex items-center gap-2">
            <MoveLeft />
            Go back
          </div>
        </Button>
      </div>
      <div className="mb-6">
        <MultiStepsForm
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          formSteps={formSteps}
        ></MultiStepsForm>
      </div>
    </>
  )
}
