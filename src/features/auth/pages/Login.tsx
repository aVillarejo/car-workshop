import { LoginHeader } from "../components/LoginHeader"
import { RoleSelector } from "../components/RoleSelector"
import { ClientSelector } from "../components/ClientSelector"
import { useLoginFlow } from '../hooks/useLoginFlow'

export default function LoginPage() {
  const {
    selectedRole,
    selectedCustomerId,
    customers,
    handleRoleSelection,
    handleClientLogin,
    handleBackToRoleSelection,
    setSelectedCustomerId,
  } = useLoginFlow()

  return (
    <div className="flex justify-center items-center p-4 min-h-screen bg-gray-50">
      <div className="px-4 w-full max-w-md text-center">
        <LoginHeader />
        
        {!selectedRole ? (
          <RoleSelector onSelectRole={handleRoleSelection} />
        ) : selectedRole === 'CLIENTE' ? (
          <ClientSelector
            customers={customers}
            selectedCustomerId={selectedCustomerId}
            onSelectCustomer={setSelectedCustomerId}
            onLogin={handleClientLogin}
            onBack={handleBackToRoleSelection}
          />
        ) : null}
      </div>
    </div>
  )
}
