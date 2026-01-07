import { Button } from '@/shared/components/ui/button'
import { Card } from '@/shared/components/ui/card'
import { StatusBadge } from '@/features/orders/components/StatusBadge'
import type { RepairOrder } from '@/features/orders/types'

interface OrdersCardsProps {
  orders: RepairOrder[]
  getCustomerName: (customerId: string) => string
  getVehicleInfo: (vehicleId: string) => string
  formatCurrency: (amount: number) => string
  onViewOrdenDetails: (orderId: string) => void
}

export function WorkshopOrdersCards({
  orders,
  getCustomerName,
  getVehicleInfo,
  formatCurrency,
  onViewOrdenDetails,
}: OrdersCardsProps) {
  return (
    <div className="lg:hidden space-y-4">
      {orders.map((order) => (
        <Card
          key={order.orderId}
          className="gap-4 bg-white hover:shadow-lg p-4 border border-gray-200 transition-shadow cursor-pointer"
          onClick={() => onViewOrdenDetails(order.id)}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="font-semibold text-gray-900">{order.orderId}</p>
              <p className="text-gray-500 text-sm">{getCustomerName(order.customerId)}</p>
            </div>
            <StatusBadge status={order.status} />
          </div>
          <div className="space-y-2">
            <div>
              <p className="text-gray-500 text-sm">Vehículo:</p>
              <p className="font-medium text-gray-900 text-sm">{getVehicleInfo(order.vehicleId)}</p>
            </div>
            {!!order.authorizedAmount && (
              <div className="flex gap-4">
                <div>
                  <p className="text-gray-500 text-sm">Autorizado:</p>
                  <p className="font-medium text-gray-900 text-sm">
                    {formatCurrency(order.authorizedAmount)}
                  </p>
                </div>
                {!!order.realTotal && (
                  <div>
                    <p className="text-gray-500 text-sm">Real:</p>
                    <p className="font-medium text-gray-900 text-sm">
                      {formatCurrency(order.realTotal)}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
          <Button variant="outline" className="bg-transparent w-full">
            Ver Detalle →
          </Button>
        </Card>
      ))}
    </div>
  )
}
