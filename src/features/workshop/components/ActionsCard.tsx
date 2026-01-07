import { Card } from '@/shared/components/ui/card'
import { Button } from '@/shared/components/ui/button'

import { OrderStatus, getStatusLabel } from '@/features/orders/types'
import type { RepairOrder, BusinessError } from '@/features/orders/types'

interface ActionsCardProps {
  order: RepairOrder
  availableTransitions: OrderStatus[]
  onTransition: (status: OrderStatus) => void
  onReauthorize: () => void
}

export function ActionsCard({ order, availableTransitions, onTransition, onReauthorize }: ActionsCardProps) {
  return (
    <>
      {order.errors.length > 0 && (
        <Card className="gap-4 bg-red-50 p-4 border-red-200">
          <h3 className="font-semibold text-red-900 text-sm">Errores de Negocio</h3>
          <div className="space-y-2">
            {order.errors.map((error: BusinessError) => (
              <div key={error.id} className="text-red-800 text-sm">
                <p>{error.message}</p>
              </div>
            ))}
          </div>
        </Card>
      )}

      <Card className="gap-4 space-y-4 p-4 py-6">
        <h3 className="mb-3 font-semibold text-gray-900">Cambiar Estado</h3>
        <div className="space-y-2">
          {availableTransitions.map((status) => (
            <Button
              key={status}
              variant="outline"
              size="sm"
              className="justify-start bg-transparent w-full"
              onClick={() => onTransition(status)}
            >
              → {getStatusLabel(status)}
            </Button>
          ))}

          {order.status === OrderStatus.WAITING_FOR_APPROVAL && (
            <Button variant="default" size="sm" className="w-full" onClick={onReauthorize}>
              Reautorizar
            </Button>
          )}
        </div>
      </Card>
    </>
  )
}
