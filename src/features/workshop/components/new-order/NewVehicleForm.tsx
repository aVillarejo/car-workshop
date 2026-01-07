import { Input } from '@/shared/components/ui/input'
import { CircleAlert, Info } from 'lucide-react'
interface NewVehicleData {
  plate: string
  model: string
}

interface NewVehicleFormProps {
  data: NewVehicleData
  onChange: (data: NewVehicleData) => void
  errors: Record<string, string>
  showNoVehiclesWarning?: boolean
}

export function NewVehicleForm({ data, onChange, errors, showNoVehiclesWarning }: NewVehicleFormProps) {
  return (
    <div className="space-y-4 sm:space-y-5">
      {showNoVehiclesWarning && (
        <div className="bg-blue-50 p-3 sm:p-4 border border-blue-200 rounded-lg sm:rounded-xl">
          <div className="flex gap-2 sm:gap-3">
            <Info className="w-4 sm:w-5 h-4 sm:h-5 text-blue-600" />
            <p className="text-blue-900 text-xs sm:text-sm">
              Agrega un vehículo para continuar.
            </p>
          </div>
        </div>
      )}

      <div className="gap-4 sm:gap-5 grid grid-cols-1 sm:grid-cols-2">
        <div>
          <label className="block mb-2 font-medium text-gray-700 text-sm">Placas *</label>
          <Input
            type="text"
            value={data.plate}
            onChange={(e) => onChange({ ...data, plate: e.target.value.toUpperCase() })}
            placeholder="ABC-123-D"
            maxLength={10}
            className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 min-h-10 text-sm sm:text-base border rounded-lg sm:rounded-xl outline-none transition-all uppercase ${
              errors['plate']
                ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                : 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            }`}
          />
          {errors['plate'] && (
            <p className="flex items-center gap-1 mt-1.5 text-red-600 text-sm">
              <CircleAlert className="w-4.5 h-4.5" fill="currentColor" stroke="white" />
              {errors['plate']}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700 text-sm">Modelo *</label>
          <Input
            type="text"
            value={data.model}
            onChange={(e) => onChange({ ...data, model: e.target.value })}
            placeholder="Toyota Corolla 2020"
            className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 min-h-10 text-sm sm:text-base border rounded-lg sm:rounded-xl outline-none transition-all ${
              errors['model']
                ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                : 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            }`}
          />
          {errors['model'] && (
            <p className="flex items-center gap-1 mt-1.5 text-red-600 text-sm">
              <CircleAlert className="w-4.5 h-4.5" fill="currentColor" stroke="white" />
              {errors['model']}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
