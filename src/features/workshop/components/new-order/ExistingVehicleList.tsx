import type { Vehicle } from '@/features/orders/types'

import {Car, Check, CircleAlert } from 'lucide-react'

interface ExistingVehicleListProps {
  vehicles: Vehicle[]
  selectedId: string
  onSelect: (vehicleId: string) => void
  error?: string
}

export function ExistingVehicleList({ vehicles, selectedId, onSelect, error }: ExistingVehicleListProps) {
  return (
    <div className="space-y-3">
      <label className="block mb-3 font-medium text-gray-700 text-sm">Selecciona un vehículo</label>
      <div className="space-y-3 pr-2 max-h-72 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {vehicles.map((vehicle) => (
          <button
            key={vehicle.id}
            type="button"
            onClick={() => onSelect(vehicle.id)}
            className={`w-full flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 transition-all duration-200 text-left ${
              selectedId === vehicle.id
                ? 'border-blue-500 bg-blue-50 shadow-sm'
                : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
            }`}
          >
            <div
              className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl shrink-0 ${
                selectedId === vehicle.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
              }`}
            >
              <Car className="w-6 h-6" />
            </div>
            <div className="flex-1 min-w-0">
              <div
                className={`font-bold text-base sm:text-lg ${
                  selectedId === vehicle.id ? 'text-blue-900' : 'text-gray-900'
                }`}
              >
                {vehicle.plate}
              </div>
              <div className="mt-0.5 text-gray-600 text-xs sm:text-sm">{vehicle.model}</div>
            </div>
            {selectedId === vehicle.id && (
              <Check className="stroke-blue-600 w-5 sm:w-6 h-5 sm:h-6" />
            )}
          </button>
        ))}
      </div>
      {error && (
        <p className="flex items-center gap-1 mt-2 text-red-600 text-sm">
          <CircleAlert className="w-4.5 h-4.5" fill="currentColor" stroke="white" />
          {error}
        </p>
      )}
    </div>
  )
}
