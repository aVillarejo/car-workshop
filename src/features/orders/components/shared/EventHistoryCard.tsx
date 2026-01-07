import { Card } from '@/shared/components/ui/card'

import type { Event } from '@/features/orders/types'
import { formatDate } from '@/shared/lib/formatters'
import {getEventLabel} from "@/features/orders/types/constants";

interface EventHistoryCardProps {
  events: Event[]

}

export function EventHistoryCard({ events }: EventHistoryCardProps) {
  return (
    <Card className="p-4 sm:p-6">
      <h2 className="mb-4 font-semibold text-gray-900 text-base sm:text-lg">Historial de Eventos</h2>

      <div className="relative space-y-6">
        <div
          className="top-2 bottom-2 left-2 absolute bg-gray-200 w-px"
          style={{ height: 'calc(100% - 1rem)' }}
          aria-hidden="true"
        />

        {events.map((event) => (
          <div key={event.id} className="relative flex gap-4">
            <div className="z-10 relative shrink-0">
              <div className="bg-blue-500 shadow border-4 border-white rounded-full w-4 h-4" />
            </div>
            <div className="flex-1 pb-2">
              <p className="font-medium text-gray-900 text-sm">{getEventLabel(event.type)}</p>
              {event.comment && <p className="mt-1 text-gray-600 text-xs">{event.comment}</p>}
              <p className="mt-1 text-gray-500 text-xs">{formatDate(event.timestamp)}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
