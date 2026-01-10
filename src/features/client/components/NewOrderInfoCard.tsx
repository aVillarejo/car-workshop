import { Card } from '@/shared/components/ui/card'
import { InfoIcon } from 'lucide-react'

export function NewOrderInfoCard() {
  return (
    <Card className="bg-linear-to-r from-blue-50 to-indigo-50 shadow-sm mb-8 p-6 border-blue-200">
      <div className="flex gap-4">
        <div className="shrink-0">
          <div className="flex justify-center items-center bg-blue-600 rounded-full w-12 h-12">
              <InfoIcon
                className="w-6 h-6 text-white"
              />
          </div>
        </div>
        <div className="flex-1">
          <h3 className="mb-2 font-semibold text-blue-900 text-base">
            ¿Cómo funciona?
          </h3>
          <ol className="space-y-1 text-blue-800 text-sm">
            <li className="flex items-start gap-2">
              <span className="font-semibold">1.</span>
              <span>Selecciona o registra tu vehículo</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-semibold">2.</span>
              <span>Describe el problema que presenta</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-semibold">3.</span>
              <span>El taller revisará y enviará un diagnóstico</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-semibold">4.</span>
              <span>Recibirás una propuesta con servicios y costos</span>
            </li>
          </ol>
        </div>
      </div>
    </Card>
  )
}
