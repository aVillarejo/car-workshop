import { useCallback } from 'react'

import type { Customer, Vehicle } from '@/shared/stores/useCustomersStore'

interface UseOrderHelpersProps {
  customers: Customer[]
  vehicles: Vehicle[]
}

export function useOrderHelpers({ customers, vehicles }: UseOrderHelpersProps) {
  const getCustomerName = useCallback(
    (customerId: string) => {
      return customers.find((c) => c.id === customerId)?.name || 'N/A'
    },
    [customers]
  )

  const getVehicleInfo = useCallback(
    (vehicleId: string) => {
      const vehicle = vehicles.find((v) => v.id === vehicleId)
      return vehicle ? `${vehicle.plate} - ${vehicle.model}` : 'N/A'
    },
    [vehicles]
  )

  return {
    getCustomerName,
    getVehicleInfo,
  }
}
