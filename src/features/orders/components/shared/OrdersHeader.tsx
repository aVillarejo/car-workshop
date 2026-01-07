import { Plus } from 'lucide-react'

import { Button } from '@/shared/components/ui/button'

interface OrdersHeaderProps {
  title: string
  ordersCount: number
  buttonText: string
  buttonIcon?: React.ReactNode
  onCreateOrder: () => void
}

export function OrdersHeader({
  title,
  ordersCount,
  buttonText,
  buttonIcon = <Plus className="w-5 h-5" />,
  onCreateOrder,
}: OrdersHeaderProps) {
  return (
    <div className="flex sm:flex-row flex-col sm:justify-between sm:items-center gap-4 mb-6">
      <div>
        <h2 className="font-semibold text-gray-900 text-xl">{title}</h2>
        <p className="text-gray-500 text-sm">
          {ordersCount} {ordersCount === 1 ? 'orden encontrada' : 'órdenes encontradas'}
        </p>
      </div>
      <Button
        onClick={onCreateOrder}
        className="gap-2 px-6 py-3 w-full sm:w-auto min-h-12 font-medium text-base"
      >
        {buttonIcon}
        {buttonText}
      </Button>
    </div>
  )
}
