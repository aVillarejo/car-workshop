import { Card } from '@/shared/components/ui/card'

import type { Authorization } from '@/features/orders/types'
import { formatDate, formatCurrency } from '@/shared/lib/formatters'

interface AuthorizationsCardProps {
  authorizations: Authorization[]
}

export function AuthorizationsCard({ authorizations }: AuthorizationsCardProps) {
  if (authorizations.length === 0) return null

  return (
    <Card className="p-4">
      <h3 className="mb-3 font-semibold text-gray-900 text-sm">Autorizaciones</h3>
      <div className="space-y-2">
        {authorizations.map((auth) => (
          <div key={auth.id} className="bg-gray-50 p-2 rounded text-sm">
            <p className="font-medium text-gray-900">{formatCurrency(auth.amount)}</p>
            <p className="text-gray-600 text-xs">{formatDate(auth.createdAt)}</p>
            {auth.comment && <p className="text-gray-500 text-xs">{auth.comment}</p>}
          </div>
        ))}
      </div>
    </Card>
  )
}
