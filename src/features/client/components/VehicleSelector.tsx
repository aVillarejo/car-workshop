import { CarFrontIcon, Check, CircleAlert, Info, LayoutList, Plus } from 'lucide-react'

import type { Vehicle } from '@/shared/stores/useCustomersStore'
import { Input } from '@/shared/components/ui/input'

interface VehicleSelectorProps {
  vehicles: Vehicle[]
  selectedVehicle: string
  isNewVehicle: boolean
  newPlate: string
  newModel: string
  errors: Record<string, string>
  onToggleMode: (isNew: boolean) => void
  onSelectVehicle: (vehicleId: string) => void
  onPlateChange: (plate: string) => void
  onModelChange: (model: string) => void
}

export function VehicleSelector({
  vehicles,
  selectedVehicle,
  isNewVehicle,
  newPlate,
  newModel,
  errors,
  onToggleMode,
  onSelectVehicle,
  onPlateChange,
  onModelChange,
}: VehicleSelectorProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-semibold text-gray-900 text-xl">Vehículo</h2>
      </div>
      {vehicles.length > 0 && (
        <div className="inline-flex bg-gray-100 mb-6 p-1 rounded-lg w-full">
          <button
            type="button"
            onClick={() => onToggleMode(false)}
            className={`flex-1 px-4 py-2.5 rounded-md font-medium text-sm transition-all duration-200 ${
              !isNewVehicle
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <span className="flex justify-center items-center gap-2">
              <LayoutList className="w-4 h-4" />
              Mis Vehículos
            </span>
          </button>
          <button
            type="button"
            onClick={() => onToggleMode(true)}
            className={`flex-1 px-4 py-2.5 rounded-md font-medium text-sm transition-all duration-200 ${
              isNewVehicle
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <span className="flex justify-center items-center gap-2">
              <Plus className="w-4 h-4" />
              Nuevo Vehículo
            </span>
          </button>
        </div>
      )}

      {!isNewVehicle && vehicles.length > 0 && (
        <div className="space-y-3">
          <label className="block mb-3 font-medium text-gray-700 text-sm">
            Selecciona un vehículo
          </label>
          {vehicles.map((vehicle) => (
            <button
              key={vehicle.id}
              type="button"
              onClick={() => onSelectVehicle(vehicle.id)}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                selectedVehicle === vehicle.id
                  ? 'border-blue-500 bg-blue-50 shadow-sm'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
              }`}
            >
              <div
                className={`flex items-center justify-center w-12 h-12 rounded-xl shrink-0 ${
                  selectedVehicle === vehicle.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                <CarFrontIcon
                  className="w-6 h-6"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div
                  className={`font-bold text-lg ${
                    selectedVehicle === vehicle.id ? 'text-blue-900' : 'text-gray-900'
                  }`}
                >
                  {vehicle.plate}
                </div>
                <div className="mt-0.5 text-gray-600 text-sm">{vehicle.model}</div>
              </div>
              {selectedVehicle === vehicle.id && (
                <Check className='w-6 h-6 text-blue-600'/>
              )}
            </button>
          ))}
          {errors['selectedVehicle'] && <FieldError message={errors['selectedVehicle']} />}
        </div>
      )}

      {(isNewVehicle || vehicles.length === 0) && (
        <div className="space-y-5">
          {vehicles.length !== 0 && (
            <div className="bg-blue-50 p-4 border border-blue-100 rounded-xl">
              <div className="flex items-center gap-3">
                <Info className="w-5 h-5 text-blue-600" />
                <p className="text-blue-900 text-sm">
                  Registra tu vehículo para continuar con la solicitud.
                </p>
              </div>
            </div>
          )}

          <div className="gap-5 grid grid-cols-1 sm:grid-cols-2">
            <div>
              <label className="block mb-2 font-medium text-gray-700 text-sm">
                Placas *
              </label>
              <Input
                type="text"
                value={newPlate}
                onChange={(e) => onPlateChange(e.target.value.toUpperCase())}
                placeholder="ABC-123-D"
                maxLength={10}
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 min-h-12 text-sm sm:text-base border rounded-lg sm:rounded-xl outline-none transition-all uppercase ${
                  errors['plate']
                    ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                    : 'border-gray-300 focus:ring-2 focus:border-transparent'
                }`}
              />
              {errors['newPlate'] && <FieldError message={errors['newPlate']} />}
            </div>

            <div>
              <label className="block mb-2 font-medium text-gray-700 text-sm">
                Modelo *
              </label>
              <Input
                type="text"
                value={newModel}
                onChange={(e) => onModelChange(e.target.value)}
                placeholder="Honda Civic 2020"
                className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 min-h-12 text-sm sm:text-base border rounded-lg sm:rounded-xl outline-none transition-all uppercase ${
                  errors['plate']
                    ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                    : 'border-gray-300 focus:ring-2 focus:border-transparent'
                }`}
              />
              {errors['newModel'] && <FieldError message={errors['newModel']} />}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function FieldError({ message }: { message: string }) {
  return (
    <p className="flex items-center gap-1 mt-1.5 text-red-600 text-sm">
        <CircleAlert
        className="w-4 h-4"
      />
      {message}
    </p>
  )
}
