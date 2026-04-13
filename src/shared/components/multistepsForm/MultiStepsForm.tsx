import { MoveLeft, MoveRight, type LucideIcon } from 'lucide-react'
import { Header } from './Header'
import { Button } from '../ui/Button'

interface MultiStepsFormProps {
  currentStep: number
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>
  formSteps: { title: string; description: string; icon: LucideIcon; content: React.ReactNode }[]
  onValidateStep?: (step: number) => Promise<boolean>
}

export const MultiStepsForm = ({ currentStep, setCurrentStep, formSteps, onValidateStep }: MultiStepsFormProps) => {
  const handleNext = async () => {
    if (onValidateStep) {
      const isValid = await onValidateStep(currentStep)
      if (!isValid) return
    }
    setCurrentStep((prev) => prev + 1)
  }

  const handleStepChange = async (targetStep: number) => {
    if (targetStep <= currentStep) {
      setCurrentStep(targetStep)
      return
    }

    if (!onValidateStep) {
      setCurrentStep(targetStep)
      return
    }

    for (let step = currentStep; step < targetStep; step++) {
      const isValid = await onValidateStep(step)
      if (!isValid) {
        setCurrentStep(step)
        return
      }
    }
    setCurrentStep(targetStep)
  }

  return (
    <>
      <Header currentStep={currentStep} onStepChange={handleStepChange} formSteps={formSteps} />
      <div className="mt-10">{formSteps[currentStep - 1].content}</div>
      <div className="mt-6 flex justify-between">
        <Button type="button" onClick={() => setCurrentStep((prev) => prev - 1)} disabled={currentStep === 1}>
          <MoveLeft />
          Previous
        </Button>
        {currentStep < formSteps.length ? (
          <Button type="button" onClick={handleNext}>
            Next
            <MoveRight />
          </Button>
        ) : <Button type="submit" variant="submit">Submit</Button>}
      </div>
    </>
  )
}
