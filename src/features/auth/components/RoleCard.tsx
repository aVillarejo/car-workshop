import { type ReactNode } from 'react'
import { ChevronRight } from 'lucide-react'

import { Card } from '@/shared/components/ui/card'

interface RoleCardProps {
  title: string
  description: string
  icon: ReactNode
  borderColor?: string
  onClick: () => void
}


export const RoleCard = ({ 
  title, 
  description, 
  icon, 
  borderColor = 'hover:border-blue-500',
  onClick 
}: RoleCardProps) => {
  return (
    <Card className={`bg-white shadow-sm hover:shadow-md p-0 border border-gray-200 ${borderColor} rounded-lg transition-all cursor-pointer`}>
      <button
        onClick={onClick}
        className="p-6 w-full text-left cursor-pointer"
      >
        <div className="flex items-start gap-4">
          <div className="shrink-0">
            {icon}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-950 text-lg">{title}</h3>
            <p className="mt-1 text-gray-500 text-sm">{description}</p>
          </div>
          <ChevronRight className="hidden sm:block mt-1 w-5 h-5 text-gray-400 shrink-0"/>
        </div>
      </button>
    </Card>
  )
}
