import { Building2 } from 'lucide-react'

export function LoginHeader() {
  return (
    <div className="flex flex-col justify-center items-center mb-8">
      <div className="bg-blue-600 shadow-lg p-4 rounded-xl">
        <Building2 className="w-8 h-8 text-white" />
      </div>
      <h1 className="mt-4 font-semibold text-gray-900 text-2xl">
        Sistema de Gestión de Reparaciones
      </h1>
      <p className="mt-2 text-gray-600 text-sm">
        Selecciona tu rol para continuar
      </p>
    </div>
  )
}
