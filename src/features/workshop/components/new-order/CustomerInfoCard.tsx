interface CustomerInfoCardProps {
  customerName: string
}

export function CustomerInfoCard({ customerName }: CustomerInfoCardProps) {
  return (
    <div className="bg-linear-to-r from-blue-50 to-indigo-50 mb-4 sm:mb-6 p-3 sm:p-4 border border-blue-100 rounded-lg sm:rounded-xl">
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="flex justify-center items-center bg-blue-600 rounded-full w-8 sm:w-10 h-8 sm:h-10 font-semibold text-white text-sm sm:text-base shrink-0">
          {customerName.charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="font-medium text-[10px] text-blue-600 sm:text-xs uppercase tracking-wide">
            Cliente seleccionado
          </p>
          <p className="font-semibold text-blue-900 text-sm sm:text-base">{customerName}</p>
        </div>
      </div>
    </div>
  )
}
