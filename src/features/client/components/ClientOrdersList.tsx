import type { RepairOrder } from '@/features/orders/types'
import { ClientOrderListItem } from './ClientOrderListItem'

interface ClientOrdersListProps {
  orders: RepairOrder[]
  getVehicleInfo: (vehicleId: string) => string
  requiresAction: (order: RepairOrder) => boolean
  handleViewDetail: (orderId: string) => void
}

export const ClientOrdersList = ({ orders, getVehicleInfo, requiresAction, handleViewDetail }: ClientOrdersListProps) => {

  return (
    <div className="space-y-4 mx-0 md:mx-auto">
      {orders.map((order) => (
        <ClientOrderListItem
          key={order.id}
          order={order}
          getVehicleInfo={getVehicleInfo}
          requiresAction={requiresAction}
          onViewDetail={handleViewDetail}
        />
      ))}
    </div>
  )
}
