import React from 'react'
import { ChevronRight, type LucideIcon } from 'lucide-react'
import { MultiStepsFormItem } from './HeaderItem'

interface HeaderProps {
  currentStep: number
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>
  formSteps: { title: string; description: string; icon: LucideIcon }[]
}

export const Header = ({ currentStep, setCurrentStep, formSteps }: HeaderProps) => {
  return (
    <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-3 xl:gap-0">
      {formSteps.map((step, index) => (
        <React.Fragment key={index}>
          <MultiStepsFormItem
            title={step.title}
            description={step.description}
            isCurrentStep={currentStep === index + 1}
            step={index + 1}
            setCurrentStep={setCurrentStep}
            icon={step.icon}
          />
          {index < formSteps.length - 1 && <ChevronRight className="hidden xl:block text-gray-500" />}
        </React.Fragment>
      ))}
    </div>
  )
}
