import { Outlet } from 'react-router-dom'
import { useRequireRole } from '@/hooks/useAuth'
import SellerSidebar from '@/components/seller/SellerSidebar'
import SellerHeader from '@/components/seller/SellerHeader'

const SellerLayout = () => {
  const { isLoading } = useRequireRole(['seller'])

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">جاري التحميل...</div>
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <SellerSidebar />
      <div className="flex-1 flex flex-col">
        <SellerHeader />
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default SellerLayout
