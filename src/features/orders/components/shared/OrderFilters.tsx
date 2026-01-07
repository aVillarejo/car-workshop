import { Card } from '@/shared/components/ui/card'
import { Input } from '@/shared/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select'
import { OrderStatus } from '@/features/orders/types'

export interface FilterOption {
  value: string
  label: string
}

interface OrderFiltersProps {
  searchTerm: string
  searchPlaceholder?: string
  statusFilter: OrderStatus | 'ALL'
  statusOptions: FilterOption[]
  showStatusFilter?: boolean
  onSearchChange: (value: string) => void
  onStatusChange: (value: OrderStatus | 'ALL') => void
}

export function OrderFilters({
  searchTerm,
  searchPlaceholder = 'Buscar por folio o cliente...',
  statusFilter,
  statusOptions,
  showStatusFilter = true,
  onSearchChange,
  onStatusChange,
}: OrderFiltersProps) {
  return (
    <Card className="bg-white mb-6 p-4">
      <div className={`gap-4 grid grid-cols-1 ${showStatusFilter ? 'md:grid-cols-2' : ''}`}>
        <Input
          placeholder={searchPlaceholder}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="bg-white"
          
        />
        {showStatusFilter && (
          <Select value={statusFilter} onValueChange={onStatusChange}>
            <SelectTrigger className="bg-white w-full">
              <SelectValue placeholder="Todos los estados" />
            </SelectTrigger>
            <SelectContent>
              {statusOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
      </div>
    </Card>
  )
}
