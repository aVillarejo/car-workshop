import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { useShallow } from 'zustand/shallow'

export type UserRole = 'TALLER' | 'CLIENTE'

interface User {
  id: string
  name: string
  role: UserRole
  customerId?: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
}

interface AuthActions {
  login: (user: User) => void
  logout: () => void
}

type AuthStore = AuthState & AuthActions

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
}

export const useAuthStore = create<AuthStore>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,
        login: (user) => {
          set({
            user,
            isAuthenticated: true,
          },
            false,
            'auth/login'
          )
        },
        logout: () => {
          set({
            ...initialState,
          },
            false,
            'auth/logout'
          )
        },
      }),
      {
        name: 'auth-storage',
      }
    ),
    { name: 'AuthStore' }
  )
)


export const useUser = () => useAuthStore((state) => state.user)

export const useIsAuthenticated = () => useAuthStore((state) => state.isAuthenticated)

export const useCustomerId = () => useAuthStore((state) => state.user?.customerId)

export const useAuthActions = () =>
  useAuthStore(
    useShallow((state) => ({
      login: state.login,
      logout: state.logout,
    }))
  )


