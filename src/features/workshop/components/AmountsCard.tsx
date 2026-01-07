import { Card } from '@/shared/components/ui/card'

import { OrderStatus } from '@/features/orders/types'
import type { RepairOrder } from '@/features/orders/types'
import { formatCurrency } from '@/shared/lib/formatters'

interface AmountsCardProps {
  order: RepairOrder
  overcostLimit: number
}

export function AmountsCard({ order, overcostLimit }: AmountsCardProps) {
  return (
    <Card className="p-4 sm:p-6">
      <h2 className="mb-4 font-semibold text-gray-900 text-base sm:text-lg">Montos</h2>

      <div className="gap-4 grid grid-cols-2 lg:grid-cols-4">
        <div>
          <label className="block mb-1 text-gray-600 text-xs sm:text-sm">Subtotal Estimado</label>
          <p className="font-semibold text-gray-900 text-sm sm:text-base">
            {formatCurrency(order.subtotalEstimated)}
          </p>
        </div>

        <div>
          <label className="block mb-1 text-gray-600 text-xs sm:text-sm">Autorizado</label>
          <p className="font-semibold text-blue-600 text-sm sm:text-base">
            {order.authorizedAmount > 0 ? formatCurrency(order.authorizedAmount) : '-'}
          </p>
        </div>

        <div>
          <label className="block mb-1 text-gray-600 text-xs sm:text-sm">Límite 110%</label>
          <p className="font-semibold text-yellow-600 text-sm sm:text-base">
            {overcostLimit > 0 ? formatCurrency(overcostLimit) : '-'}
          </p>
        </div>

        <div>
          <label className="block mb-1 text-gray-600 text-xs sm:text-sm">Costo Real</label>
          <p
            className={`font-semibold text-sm sm:text-base ${
              order.realTotal > overcostLimit && overcostLimit > 0 ? 'text-red-600' : 'text-green-600'
            }`}
          >
            {order.realTotal > 0 ? formatCurrency(order.realTotal) : '-'}
          </p>
        </div>
      </div>

      {order.status === OrderStatus.WAITING_FOR_APPROVAL && (
        <div className="bg-yellow-50 mt-4 p-3 border border-yellow-200 rounded-md">
          <p className="font-medium text-yellow-900 text-sm">
            ⚠️ Esta orden requiere reautorización por sobrecosto
          </p>
        </div>
      )}
    </Card>
  )
}
