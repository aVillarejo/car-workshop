import type { Customer } from '@/features/orders/types'
import { Input } from '@/shared/components/ui/input'

import { SearchIcon, Contact, Phone, Mail, CircleAlert, Check } from 'lucide-react'

interface ExistingCustomerListProps {
  customers: Customer[]
  selectedId: string
  searchTerm: string
  onSearchChange: (term: string) => void
  onSelect: (customerId: string) => void
  error?: string
}

export function ExistingCustomerList({
  customers,
  selectedId,
  searchTerm,
  onSearchChange,
  onSelect,
  error,
}: ExistingCustomerListProps) {
  return (
    <div className="space-y-4 sm:space-y-5">
      <div className="relative">
        <div className="left-0 absolute inset-y-0 flex items-center pl-3 pointer-events-none">
          <SearchIcon className="w-4 h-4 text-gray-400" />
        </div>
        <Input
          type="text"
          placeholder="Buscar por nombre, teléfono o email..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="py-2.5 sm:py-3 pr-3 sm:pr-4 pl-9 sm:pl-10 border border-gray-300 focus:border-transparent rounded-lg sm:rounded-xl outline-none focus:ring-2 focus:ring-blue-500 w-full min-h-10 text-sm sm:text-base transition-all"
        />
      </div>

      <div className="space-y-3 pr-2 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {customers.length === 0 ? (
          <div className="py-12 text-center">
            <Contact className="mx-auto mb-3 w-16 h-16 text-gray-300" />
            <p className="text-gray-500 text-sm">No se encontraron clientes</p>
            {searchTerm && <p className="mt-1 text-gray-400 text-xs">Intenta con otro término de búsqueda</p>}
          </div>
        ) : (
          customers.map((customer) => (
            <button
              key={customer.id}
              type="button"
              onClick={() => onSelect(customer.id)}
              className={`w-full flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 transition-all duration-200 text-left ${
                selectedId === customer.id
                  ? 'border-blue-500 bg-blue-50 shadow-sm'
                  : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
              }`}
            >
              <div
                className={`flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full text-base sm:text-lg font-semibold shrink-0 ${
                  selectedId === customer.id ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'
                }`}
              >
                {customer.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div
                  className={`font-semibold truncate text-sm sm:text-base ${
                    selectedId === customer.id ? 'text-blue-900' : 'text-gray-900'
                  }`}
                >
                  {customer.name}
                </div>
                <div className="flex items-center gap-2 mt-0.5 text-gray-600 text-xs sm:text-sm">
                  <span className="flex items-center gap-1">
                    <Phone className="w-3 sm:w-3.5 h-3 sm:h-3.5"/>
                    {customer.phone}
                  </span>
                  {customer.email && (
                    <span className="flex items-center gap-1">
                      <span>•</span>
                      <Mail className="w-3 sm:w-3.5 h-3 sm:h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" />
                      <span className="truncate">{customer.email}</span>
                    </span>
                  )}
                </div>
              </div>
              {selectedId == customer.id && (
                <Check className="stroke-blue-600 w-5 sm:w-6 h-5 sm:h-6" />
              )}
            </button>
          ))
        )}
      </div>
      {error && (
        <p className="flex items-center gap-1 mt-2 text-red-600 text-sm">
          <CircleAlert className="w-4.5 h-4.5" fill="currentColor" stroke="white"/>
          {error}
        </p>
      )}
    </div>
  )
}
