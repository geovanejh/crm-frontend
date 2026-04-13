import { Button } from '@/shared/components/ui/Button'
import { FileUser, MoveLeft, Settings, UserPen, type LucideIcon } from 'lucide-react'
import { useNavigate } from 'react-router'
import { MultiStepsForm } from '@/shared/components/multistepsForm/MultiStepsForm'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { PersonalInfoStep } from '../components/CostumersForm/PersonalInfoStep'
import { ContactInfoStep } from '../components/CostumersForm/ContactInfoStep'
import {
  costumerSchema,
  type CostumerFormData,
  getPersonalInfoFields,
  contactInfoFields,
  accountDetailsFields,
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
      type: 'PF',
      name: '',
      document: '',
      birthDate: '',
      gender: '',
      maritalStatus: '',
      nationality: '',
      nomeFantasia: '',
      razaoSocial: '',
      email: '',
      phone: '',
      cep: '',
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
      plan: '',
      startDate: new Date().toISOString().split('T')[0],
      endDate: '',
      notes: '',
    },
  })

  const getStepFields = (step: number): readonly string[] => {
    if (step === 1) return getPersonalInfoFields(form.getValues('type'))
    if (step === 2) return contactInfoFields
    return accountDetailsFields
  }

  const handleValidateStep = async (step: number) => {
    const fields = getStepFields(step)
    const result = await form.trigger(fields as (keyof CostumerFormData)[])
    return result
  }

  const onSubmit = (data: CostumerFormData) => {
    console.log('Form submitted:', data)
    toast.success('Cliente cadastrado com sucesso!', {
      description: (
        <pre className="mt-2 max-h-64 w-full overflow-auto rounded-md bg-code p-4 text-code-foreground text-xs">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      position: 'bottom-right',
      duration: 10000,
    })
  }

  const formSteps: FormSteps[] = [
    {
      title: 'Personal Info',
      description: 'Provide your personal details',
      icon: UserPen,
      content: <PersonalInfoStep control={form.control} watch={form.watch} />,
    },
    {
      title: 'Contact Info',
      description: 'Provide your contact information',
      icon: FileUser,
      content: <ContactInfoStep control={form.control} setValue={form.setValue} />,
    },
    {
      title: 'Account Details',
      description: 'Set up your account preferences',
      icon: Settings,
      content: <AccountDetailsStep control={form.control} />,
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="mb-6">
        <MultiStepsForm
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          formSteps={formSteps}
          onValidateStep={handleValidateStep}
        />
      </form>
    </>
  )
}
