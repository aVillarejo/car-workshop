import { Card } from '@/shared/components/ui/card'

export interface StatItem {
  label: string
  value: number
  color?: 'default' | 'blue' | 'orange' | 'red' | 'green' | 'yellow'
}

interface OrderStatsProps {
  stats: StatItem[]
}

const colorClasses = {
  default: 'text-gray-900',
  blue: 'text-blue-600',
  orange: 'text-orange-600',
  red: 'text-red-600',
  green: 'text-green-600',
  yellow: 'text-yellow-600',
}

export function OrderStats({ stats }: OrderStatsProps) {
  return (
    <div className={`gap-4 grid grid-cols-2 lg:grid-cols-${Math.min(stats.length, 4)} mb-6`}>
      {stats.map((stat, index) => (
        <Card key={index} className="gap-2 p-4 border border-gray-200">
          <p className="text-gray-500 text-sm">{stat.label}</p>
          <p className={`flex-1 font-semibold text-2xl ${colorClasses[stat.color || 'default']}`}>
            {stat.value}
          </p>
        </Card>
      ))}
    </div>
  )
}
