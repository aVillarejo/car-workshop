import { Settings, User } from 'lucide-react'

import { RoleCard } from './RoleCard'

interface RoleSelectorProps {
  onSelectRole: (role: 'TALLER' | 'CLIENTE') => void
}

export const RoleSelector = ({ onSelectRole }: RoleSelectorProps) => {
  return (
    <div className="space-y-4">
      <RoleCard
        title="Taller / Mecánico"
        description="Acceso completo para gestionar órdenes de reparación, diagnósticos, servicios y autorizaciones."
        icon={
          <div className="bg-blue-100 p-3 rounded-lg shrink-0">
            <Settings className="w-5 h-5 text-blue-600" />
          </div>
        }
        borderColor="hover:border-blue-400"
        onClick={() => onSelectRole('TALLER')}
      />

      <RoleCard
        title="Cliente"
        description="Consulta tus órdenes, acepta propuestas y solicita nuevas reparaciones."
        icon={
          <div className="bg-green-100 p-3 rounded-lg">
            <User className="w-5 h-5 text-green-600" />
          </div>
        }
        borderColor="hover:border-green-400"
        onClick={() => onSelectRole('CLIENTE')}
      />
    </div>
  )
}