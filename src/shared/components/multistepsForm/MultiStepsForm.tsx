import { MoveLeft, MoveRight, type LucideIcon } from 'lucide-react'
import { Header } from './Header'
import { Button } from '../ui/Button'

interface MultiStepsFormProps {
  currentStep: number
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>
  formSteps: { title: string; description: string; icon: LucideIcon; content: React.ReactNode }[]
}

export const MultiStepsForm = ({ currentStep, setCurrentStep, formSteps }: MultiStepsFormProps) => {
  return (
    <>
      <Header currentStep={currentStep} setCurrentStep={setCurrentStep} formSteps={formSteps} />
      <div className="mt-6">{formSteps[currentStep - 1].content}</div>
      <div className="mt-6 flex justify-between">
        <Button onClick={() => setCurrentStep((prev) => prev - 1)} disabled={currentStep === 1}>
          <MoveLeft />
          Previous
        </Button>
        {currentStep < formSteps.length ? (
          <Button onClick={() => setCurrentStep((prev) => prev + 1)} disabled={currentStep === formSteps.length}>
            Next
            <MoveRight />
          </Button>
        ) : <Button type="submit" variant="submit">Submit</Button>}
      </div>
    </>
  )
}
