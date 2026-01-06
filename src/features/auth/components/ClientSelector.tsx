import { Button } from '@/shared/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card'

export interface Customer {
  id: string
  name: string
  phone: string
  email?: string
}

interface ClientSelectorProps {
  customers: Customer[]
  selectedCustomerId: string
  onSelectCustomer: (customerId: string) => void
  onBack: () => void
  onLogin: () => void
}

export function ClientSelector({
  customers,
  selectedCustomerId,
  onSelectCustomer,
  onBack,
  onLogin,
}: ClientSelectorProps) {
  return (
    <Card className="border-gray-200">
      <CardHeader>
        <CardTitle>Selecciona tu cuenta</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {customers.map((customer) => (
            <button
              key={customer.id}
              onClick={() => onSelectCustomer(customer.id)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                selectedCustomerId === customer.id
                  ? 'border-green-500 bg-green-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="font-medium text-gray-900">{customer.name}</div>
              <div className="text-sm text-gray-600">{customer.phone}</div>
              {customer.email && (
                <div className="text-xs text-gray-500">{customer.email}</div>
              )}
            </button>
          ))}
        </div>

        <div className="flex gap-2 pt-4">
          <Button variant="outline" onClick={onBack} className="flex-1">
            Volver
          </Button>
          <Button
            onClick={onLogin}
            disabled={!selectedCustomerId}
            className="flex-1"
          >
            Continuar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
