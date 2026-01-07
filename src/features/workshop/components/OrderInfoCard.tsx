import { Card } from '@/shared/components/ui/card'
import { Badge } from '@/shared/components/ui/badge'
import { StatusBadge } from '@/features/orders/components/StatusBadge'

import type { RepairOrder } from '@/features/orders/types'
import type { Customer, Vehicle } from '@/shared/stores/useCustomersStore'
import { formatDate } from '@/shared/lib/formatters'

interface OrderInfoCardProps {
  order: RepairOrder
  customer: Customer
  vehicle: Vehicle
}

export function OrderInfoCard({ order, customer, vehicle }: OrderInfoCardProps) {
  return (
    <Card className="p-4 sm:p-6">
      <div className="flex justify-between items-start mb-4">
        <h2 className="font-semibold text-gray-900 text-base sm:text-lg">Información General</h2>
        <StatusBadge status={order.status} />
      </div>

      <div className="gap-4 grid grid-cols-1 sm:grid-cols-2">
        <div>
          <label className="block mb-1 font-medium text-gray-700 text-sm">Cliente</label>
          <p className="text-gray-900">{customer.name}</p>
          <p className="text-gray-600 text-sm">{customer.phone}</p>
          {customer.email && <p className="text-gray-600 text-sm">{customer.email}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700 text-sm">Vehículo</label>
          <p className="text-gray-900">{vehicle.plate}</p>
          <p className="text-gray-600 text-sm">{vehicle.model}</p>
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700 text-sm">Origen</label>
          <Badge variant={order.source === 'TALLER' ? 'blue' : 'green'}>{order.source}</Badge>
        </div>

        <div>
          <label className="block mb-1 font-medium text-gray-700 text-sm">Creada</label>
          <p className="text-gray-900 text-sm">{formatDate(order.createdAt)}</p>
        </div>
      </div>
    </Card>
  )
}
