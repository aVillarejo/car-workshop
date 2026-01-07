import { Button } from '@/shared/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/components/ui/table'
import { StatusBadge } from '@/features/orders/components/StatusBadge'
import type { RepairOrder } from '@/features/orders/types'

interface OrdersTableProps {
  orders: RepairOrder[]
  getCustomerName: (customerId: string) => string
  getVehicleInfo: (vehicleId: string) => string
  formatCurrency: (amount: number) => string
  onViewOrdenDetails: (orderId: string) => void
}

export function WorkshopOrdersTable({
  orders,
  getCustomerName,
  getVehicleInfo,
  formatCurrency,
  onViewOrdenDetails,
}: OrdersTableProps) {
  return (
    <div className="hidden lg:block bg-white border border-gray-200 rounded-lg overflow-hidden">
      <Table className='overflow-hidden'>
        <TableHeader>
          <TableRow>
            <TableHead className="font-medium text-xs">Folio</TableHead>
            <TableHead className="font-medium text-xs">Cliente</TableHead>
            <TableHead className="font-medium text-xs">Vehículo</TableHead>
            <TableHead className="font-medium text-xs">Estado</TableHead>
            <TableHead className="font-medium text-xs text-right">Autorizado</TableHead>
            <TableHead className="font-medium text-xs text-right">Real</TableHead>
            <TableHead className="font-medium text-xs text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow
              key={order.id}
              className="hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => onViewOrdenDetails(order.id)}
            >
              <TableCell>
                <div>
                  <p className="font-medium text-gray-900 text-sm">{order.orderId}</p>
                  <p className="text-gray-500 text-xs">{order.source}</p>
                </div>
              </TableCell>
              <TableCell className="text-gray-900 whitespace-normal">
                {getCustomerName(order.customerId)}
              </TableCell>
              <TableCell className="text-gray-900 whitespace-normal">
                {getVehicleInfo(order.vehicleId)}
              </TableCell>
              <TableCell className="whitespace-break-spaces">
                <StatusBadge status={order.status} />
              </TableCell>
              <TableCell className="text-gray-900 text-right">
                {order.authorizedAmount > 0 ? formatCurrency(order.authorizedAmount) : '-'}
              </TableCell>
              <TableCell className="text-gray-900 text-right">
                {order.realTotal > 0 ? formatCurrency(order.realTotal) : '-'}
              </TableCell>
              <TableCell className='text-sm'>
                <Button variant="outline" size="sm">
                  Ver Detalle
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
