import { Card, CardContent } from '@/shared/components/ui/card'

interface EmptyOrdersStateProps {
  icon?: React.ReactNode
  title?: string
  description?: string
}

export function EmptyOrdersState({
  icon = null,
  title = 'No se encontraron órdenes',
  description = 'Intenta ajustar los filtros o crea una nueva orden',
}: EmptyOrdersStateProps) {
  return (
    <Card className="hover:shadow-lg mx-auto p-8 py-20 border border-gray-200 max-w-screen text-center transition-shadow">
      <CardContent>
        <div className="text-gray-400 text-5xl">{icon}</div>
        <p className="mt-4 text-gray-600">{title}</p>
        <p className="mt-1 text-gray-500 text-sm">{description}</p>
      </CardContent>
    </Card>
  )
}
