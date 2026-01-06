import { type ReactNode } from 'react'
import { Menu, LogOut, User } from "lucide-react"

import { useUser, useAuthActions } from '@/shared/stores/useAuthStore'
import { Button } from "@/shared/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/shared/components/ui/sheet"

interface AppHeaderProps {
  title: string
  subtitle?: string
  icon?: ReactNode
  onLogout?: () => void
}

const AppHeader = ({ title, subtitle, icon, onLogout }: AppHeaderProps) => {
  const user = useUser()
  const { logout } = useAuthActions()

  const handleLogout = () => {
    logout()
    onLogout?.()
  }

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex gap-4 justify-between items-center py-4">
          <div className="flex gap-3 items-center min-w-0">
            {icon && (
              <div className="flex justify-center items-center w-10 h-10 rounded-lg bg-primary shrink-0">
                {icon}
              </div>
            )}
            <div className="min-w-0">
              <h1 className="text-xl font-bold text-gray-900 truncate sm:text-2xl">
                {title}
              </h1>
              {subtitle && (
                <p className="text-sm text-gray-600 truncate">{subtitle}</p>
              )}
            </div>
          </div>

          <div className="hidden gap-4 items-center sm:flex">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500 uppercase">{user?.role}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="gap-2"
              aria-label="Cerrar sesión"
            >
              <LogOut className="w-4 h-4" />
              <span>Cerrar sesión</span>
            </Button>
          </div>
          
          <div className="sm:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Menú</SheetTitle>
                </SheetHeader>
                <div className="space-y-2">
                  <div className="py-4 mb-6 border-t border-b border-gray-200">
                  <div className="flex gap-3 items-center p-3 rounded-lg">
                    <div className="flex justify-center items-center w-10 h-10 bg-blue-100 rounded-full">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                      <p className="text-xs text-gray-500 capitalize">{user?.role}</p>
                    </div>
                  </div>
                  </div>
                  <Button
                    variant="ghost"
                    className="justify-start w-full text-red-600 hover:bg-red-50 hover:text-red-700"
                  >
                    <LogOut className="mr-2 w-4 h-4" />
                    Cerrar sesión
                  </Button>
                </div>
                <div className="absolute right-4 bottom-4 left-4 p-4 text-center border-t">
                  <p className="text-xs text-gray-500">Taller de Gestión de Reparaciones</p>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}

export { AppHeader }
