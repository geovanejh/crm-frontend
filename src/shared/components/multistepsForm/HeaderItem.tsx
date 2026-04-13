import { type LucideIcon } from 'lucide-react'

interface MultiStepsFormItemProps {
  title: string
  description?: string
  isCurrentStep?: boolean
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>
  step: number
  icon: LucideIcon
}

export const MultiStepsFormItem = (props: MultiStepsFormItemProps) => {
  return (
    <div>
      <div className="flex align-middle gap-3 cursor-pointer" onClick={() => props.setCurrentStep(props.step)}>
        <div
          className={`flex items-center justify-center rounded-full w-10 h-10 ${props.isCurrentStep ? 'bg-black' : 'bg-gray-100'}`}
        >
          <props.icon className={` ${props.isCurrentStep ? 'text-white' : 'text-black'}`} size={16} />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold">{props.title}</span>
          <span className="text-sm text-muted-foreground">{props.description}</span>
        </div>
      </div>
    </div>
  )
}
