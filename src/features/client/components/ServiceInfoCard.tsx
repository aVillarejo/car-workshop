import { AlertTriangle, Calendar, Car, DollarSign, Info } from 'lucide-react'

import { Card } from '@/shared/components/ui/card'
import { StatusBadge } from '@/features/orders/components/StatusBadge'
import type { Vehicle } from '@/shared/stores/useCustomersStore'
import type { RepairOrder } from '@/features/orders/types'

import { formatCurrency, formatDate } from '@/shared/lib/formatters'

interface ServiceInfoCardProps {
  order: RepairOrder
  vehicle: Vehicle
  canApprove: boolean
  canReauthorize: boolean
  isActionRequired: boolean
}

export function ServiceInfoCard({
  order,
  vehicle,
  canApprove,
  canReauthorize,
  isActionRequired,
}: ServiceInfoCardProps) {
  return (
    <Card className="shadow-md p-6 transition-shadow">
      <div className="flex justify-between items-center gap-4 p-0 pb-4 border-border border-b">
        <div className="flex items-start gap-3">
          <div className="flex justify-center items-center bg-muted rounded-lg w-10 h-10 shrink-0">
            <Calendar className="w-5 h-5 text-muted-foreground" />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-medium text-muted-foreground text-sm uppercase tracking-wide">
              Fecha
            </span>
            <span className="font-medium text-foreground text-sm">
              {formatDate(order.createdAt, 'short')}
            </span>
          </div>
        </div>
        <StatusBadge
          status={order.status}
          className="px-3 py-1 w-fit font-medium text-xs sm:text-sm"
        />
      </div>

      <div className="space-y-5">
        <div className="gap-4 grid sm:grid-cols-2">
          <div className="flex items-start gap-3">
            <div className="flex justify-center items-center bg-muted p-2 rounded-lg shrink-0">
              <Car className="w-10 h-10 text-muted-foreground" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-medium text-muted-foreground text-sm uppercase tracking-wide">
                Vehículo
              </span>
              <span className="font-semibold text-foreground text-sm truncate">{vehicle.plate}</span>
              <span className="text-muted-foreground text-sm">{vehicle.model}</span>
            </div>
          </div>

          {order.subtotalEstimated > 0 && (
            <div className="flex items-center gap-3 rounded-lg">
              <div className="flex justify-center items-center bg-muted p-2 rounded-lg shrink-0">
                <DollarSign className="w-10 h-10 text-muted-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
                  Subtotal
                </span>
                <span className="font-medium text-foreground text-sm sm:text-2xl">
                  {formatCurrency(order.subtotalEstimated)}
                </span>
              </div>
            </div>
          )}
          {order.authorizedAmount > 0 && (
            <div className="flex items-center gap-3 rounded-lg">
              <div className="flex justify-center items-center bg-muted p-2 rounded-lg shrink-0">
                <DollarSign className="w-10 h-10 text-muted-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
                  Monto Autorizado
                </span>
                <span className="font-medium text-foreground text-sm sm:text-2xl">
                  {formatCurrency(order.authorizedAmount)}
                </span>
              </div>
            </div>
          )}
        </div>

        {isActionRequired && canApprove && (
          <div className="flex items-center gap-2 bg-blue-50 mt-2 p-3 border border-blue-100 rounded-md">
            <Info className="stroke-blue-900 w-5 h-5" />
            <p className="font-medium text-blue-900 text-sm">
              Diagnóstico completado - Pendiente de tu autorización
            </p>
          </div>
        )}

        {isActionRequired && canReauthorize && (
          <div className="flex items-center gap-2 bg-yellow-50 mt-2 p-3 border border-yellow-100 rounded-md">
            <AlertTriangle className="stroke-amber-900 w-5 h-5" />
            <p className="font-medium text-yellow-900 text-sm">
              Se requiere tu aprobación para continuar con la reparación
            </p>
          </div>
        )}
      </div>
    </Card>
  )
}
