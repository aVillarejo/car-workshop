import { Check } from "lucide-react";

interface ProgressBarProps {
  currentStep: number
  totalSteps: number
  steps: Array<{ label: string; icon?: string }>
}

export function ProgressBar({ currentStep, totalSteps, steps }: ProgressBarProps) {
  return (
    <div className="relative mb-6 sm:mb-8">
      <div className="flex justify-between items-center">
        {steps.map((step, index) => {
          const stepNumber = index + 1
          const isCompleted = currentStep > stepNumber
          const isCurrent = currentStep >= stepNumber

          return (
            <>
              <div key={stepNumber} className="flex flex-col flex-1 items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                    isCurrent ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-gray-200 text-gray-600'
                  } font-semibold text-sm`}
                >
                  {isCompleted ?
                    <Check className="w-4 h-4" /> :
                    stepNumber}
                </div>
                <span
                  className={`mt-2 text-xs font-medium ${isCurrent ? 'text-blue-600' : 'text-gray-500'}`}
                >
                  {step.label}
                </span>
              </div>
              {stepNumber < totalSteps && (
                <div
                  key={`connector-${stepNumber}`}
                  className={`flex-1 h-0.5 -mt-5 transition-all duration-300 ${
                    currentStep > stepNumber ? 'bg-blue-600' : 'bg-gray-200'
                  }`}
                />
              )}
            </>
          )
        })}
      </div>
    </div>
  )
}
