import { useNavigate } from "react-router"

import { LoginHeader } from "../components/LoginHeader"
import { RoleSelector } from "../components/RoleSelector"

export default function RoleSelectionPage() {
  const navigate = useNavigate()

  const handleSelectRole = (role: 'TALLER' | 'CLIENTE') => {
    navigate(role === 'TALLER' ? '/taller' : '/cliente')
  }
  
  return (
    <div className="flex justify-center items-center bg-gray-50 p-4 min-h-screen">
      <div className="px-4 w-full max-w-md text-center">
        <LoginHeader />
        <RoleSelector onSelectRole={handleSelectRole} />
      </div>
    </div>
  )
}
