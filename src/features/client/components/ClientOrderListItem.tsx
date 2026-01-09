import { AlertTriangle, Calendar, Car, DollarSign, Info } from "lucide-react"

import { Button } from "@/shared/components/ui/button"
import { Card } from "@/shared/components/ui/card"
import { StatusBadge } from '@/features/orders/components/StatusBadge'
import { OrderStatus } from '@/features/orders/types'
import type { RepairOrder } from '@/features/orders/types'

import { formatCurrency, formatDate } from "@/shared/lib/formatters"

interface ClientOrderListItemProps {
  order: RepairOrder
  getVehicleInfo: (vehicleId: string) => string
  requiresAction: (order: RepairOrder) => boolean
  onViewDetail: (orderId: string) => void
}

export const ClientOrderListItem = ({
  order,
  getVehicleInfo,
  requiresAction,
  onViewDetail,
}: ClientOrderListItemProps) => {
  return (
    <Card
      className="hover:shadow-md p-6 transition-shadow cursor-pointer"
      onClick={() => onViewDetail(order.id)}
    >
      <div className="flex justify-between items-center gap-4 p-0 pb-4 border-border border-b">
        <div className="flex items-center gap-3">
          <div className="flex flex-col">
            <span className="font-medium text-muted-foreground text-xs sm:text-sm">Orden de Reparación</span>
            <h3 className="font-bold text-foreground text-md sm:text-2xl">{order.orderId}</h3>
          </div>
        </div>
        <StatusBadge status={order.status} className="px-3 py-1 w-fit font-medium text-xs sm:text-sm" />
      </div>

      <div className="space-y-5">
        <div className="gap-4 grid sm:grid-cols-2 sm:p-4">
          <div className="flex items-start gap-3">
            <div className="flex justify-center items-center bg-muted rounded-lg w-10 h-10 shrink-0">
              <Car className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-medium text-muted-foreground text-sm uppercase tracking-wide">Vehículo</span>
              <span className="font-semibold text-foreground text-sm truncate">
                {getVehicleInfo(order.vehicleId)}
              </span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex justify-center items-center bg-muted rounded-lg w-10 h-10 shrink-0">
              <Calendar className="w-5 h-5 text-muted-foreground" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-medium text-muted-foreground text-sm uppercase tracking-wide">Fecha</span>
              <span className="font-medium text-foreground text-sm">{formatDate(order.createdAt)}</span>
            </div>
          </div>
        </div>

        {order.authorizedAmount > 0 && (
          <div className="flex items-center gap-3 bg-muted/50 sm:p-4 rounded-lg">
            <div className="flex justify-center items-center bg-primary/10 rounded-lg w-10 h-10 shrink-0">
              <DollarSign className="w-5 h-5 text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
                Monto Autorizado
              </span>
              <span className="font-bold text-foreground text-sm sm:text-2xl">
                {formatCurrency(order.authorizedAmount)}
              </span>
            </div>
          </div>
        )}

        {requiresAction(order) && order.status === OrderStatus.DIAGNOSED && (
          <div className="flex items-center gap-2 bg-blue-50 mt-2 p-3 border border-blue-100 rounded-md">
            <Info className="stroke-blue-900 w-5 h-5" />
            <p className="font-medium text-blue-900 text-sm">
              Diagnóstico completado - Pendiente de tu autorización
            </p>
          </div>
        )}

        {requiresAction(order) && order.status === OrderStatus.WAITING_FOR_APPROVAL && (
          <div className="flex items-center gap-2 bg-yellow-50 mt-2 p-3 border border-yellow-100 rounded-md">
            <AlertTriangle className="stroke-amber-900 w-5 h-5" />
            <p className="font-medium text-yellow-900 text-sm">
              Se requiere tu aprobación para continuar con la reparación
            </p>
          </div>
        )}
      </div>
      <div className="flex justify-end mt-4">
        <Button
          variant={requiresAction(order) ? 'default' : 'outline'}
          size="sm"
          onClick={(e) => {
            e.stopPropagation()
            onViewDetail(order.id)
          }}
        >
          {requiresAction(order) ? 'Revisar y Aprobar' : 'Ver Detalle'} →
        </Button>
      </div>
    </Card>
  )
}
