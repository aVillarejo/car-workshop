import { Input } from "@/shared/components/ui/input"
import { CircleAlert, Info } from "lucide-react"

interface NewCustomerData {
  name: string
  phone: string
  email: string
}

interface NewCustomerFormProps {
  data: NewCustomerData
  onChange: (data: NewCustomerData) => void
  errors: Record<string, string>
}

export function NewCustomerForm({ data, onChange, errors }: NewCustomerFormProps) {
  return (
    <div className="space-y-4 sm:space-y-5">
      <div className="bg-blue-50 p-3 sm:p-4 border border-blue-100 rounded-lg sm:rounded-xl">
        <div className="flex items-center gap-2 sm:gap-3">
          <Info className="stroke-blue-600 mt-0.5 w-4 sm:w-5 h-4 sm:h-5" />
          <p className="text-blue-900 text-xs sm:text-sm">
            Los datos del cliente se guardarán en el sistema para futuras órdenes.
          </p>
        </div>
      </div>

      <div>
        <label className="block mb-2 font-medium text-gray-700 text-sm">Nombre Completo *</label>
        <Input
          type="text"
          value={data.name}
          onChange={(e) => onChange({ ...data, name: e.target.value })}
          placeholder="Juan Pérez García"
          className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 min-h-10 text-sm sm:text-base border rounded-lg sm:rounded-xl outline-none transition-all ${
            errors['name']
              ? 'border-red-500 focus:ring-2 focus:ring-red-200'
              : 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
          }`}
        />
        {errors['name'] && (
          <p className="flex items-center gap-1 mt-1.5 text-red-600 text-sm">
            <CircleAlert className="w-4.5 h-4.5" fill="currentColor" stroke="white" />
            {errors['name']}
          </p>
        )}
      </div>

      <div className="gap-4 sm:gap-5 grid grid-cols-1 sm:grid-cols-2">
        <div>
          <label className="block mb-2 font-medium text-gray-700 text-sm">Teléfono *</label>
          <Input
            type="tel"
            maxLength={10}
            inputMode="tel"
            value={data.phone}
            onChange={(e) => onChange({ ...data, phone: e.target.value })}
            placeholder="55-1234-5678"
            className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 min-h-10 text-sm sm:text-base border rounded-lg sm:rounded-xl outline-none transition-all ${
              errors['phone']
                ? 'border-red-500 focus:ring-2 focus:ring-red-200'
                : 'border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            }`}
          />
          {errors['phone'] && (
            <p className="flex items-center gap-1 mt-1.5 text-red-600 text-sm">
              <CircleAlert className="w-4.5 h-4.5" fill="currentColor" stroke="white" />
              {errors['phone']}
            </p>
          )}
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700 text-sm">
            Email <span className="text-gray-500">(opcional)</span>
          </label>
          <Input
            type="email"
            value={data.email}
            onChange={(e) => onChange({ ...data, email: e.target.value })}
            placeholder="cliente@email.com"
            className="px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 focus:border-transparent rounded-lg sm:rounded-xl outline-none focus:ring-2 focus:ring-blue-500 w-full min-h-10 text-sm sm:text-base transition-all"
          />
        </div>
      </div>
    </div>
  )
}
