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
    <header className="top-0 z-30 sticky bg-white shadow-sm border-gray-200 border-b">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="flex justify-between items-center gap-4 py-4">
          <div className="flex items-center gap-3 min-w-0">
            {icon && (
              <div className="flex justify-center items-center bg-primary rounded-lg w-10 h-10 shrink-0">
                {icon}
              </div>
            )}
            <div className="min-w-0">
              <h1 className="font-bold text-gray-900 text-xl sm:text-2xl truncate">
                {title}
              </h1>
              {subtitle && (
                <p className="text-gray-600 text-sm truncate">{subtitle}</p>
              )}
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-4">
            <div className="text-right">
              <p className="font-medium text-gray-900 text-sm">{user?.name}</p>
              <p className="text-gray-500 text-xs uppercase">{user?.role}</p>
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
                  <div className="mb-6 py-4 border-gray-200 border-t border-b">
                  <div className="flex items-center gap-3 p-3 rounded-lg">
                    <div className="flex justify-center items-center bg-blue-100 rounded-full w-10 h-10">
                      <User className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 text-sm">{user?.name}</p>
                      <p className="text-gray-500 text-xs capitalize">{user?.role}</p>
                    </div>
                  </div>
                  </div>
                  <Button
                    onClick={handleLogout}
                    variant="ghost"
                    className="justify-start hover:bg-red-50 w-full text-red-600 hover:text-red-700"
                  >
                    <LogOut className="mr-2 w-4 h-4" />
                    Cerrar sesión
                  </Button>
                </div>
                <div className="right-4 bottom-4 left-4 absolute p-4 border-t text-center">
                  <p className="text-gray-500 text-xs">Taller de Gestión de Reparaciones</p>
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
