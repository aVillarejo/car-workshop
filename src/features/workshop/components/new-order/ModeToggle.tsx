type Mode = 'existing' | 'new'

interface ModeSegment {
  value: Mode
  label: string
  icon: React.ReactNode
}

interface ModeToggleProps {
  value: Mode
  onChange: (mode: Mode) => void
  segments: ModeSegment[]
}

export function ModeToggle({ value, onChange, segments }: ModeToggleProps) {
  return (
    <div className="inline-flex bg-gray-100 mb-6 sm:mb-8 p-1 rounded-lg w-full">
      {segments.map((segment) => (
        <button
          key={segment.value}
          type="button"
          onClick={() => onChange(segment.value)}
          className={`flex-1 px-3 sm:px-4 py-2 sm:py-2.5 rounded-md font-medium text-xs sm:text-sm transition-all duration-200 ${
            value === segment.value
              ? 'bg-white text-blue-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <span className="flex justify-center items-center gap-1.5 sm:gap-2">
            {segment.icon}
            {segment.label}
          </span>
        </button>
      ))}
    </div>
  )
}
