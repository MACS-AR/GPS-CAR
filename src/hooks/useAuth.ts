import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { ROUTES } from '@/constants'

export const useAuth = () => {
  const { user, isAuthenticated, isLoading } = useAuthStore()
  return { user, isAuthenticated, isLoading }
}

export const useRequireAuth = () => {
  const { user, isAuthenticated, isLoading } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate(ROUTES.LOGIN)
    }
  }, [isAuthenticated, isLoading, navigate])

  return { user, isAuthenticated, isLoading }
}

export const useRequireRole = (allowedRoles: string[]) => {
  const { user, isLoading } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isLoading && user) {
      if (!allowedRoles.includes(user.role)) {
        navigate(ROUTES.HOME)
      }
    }
  }, [user, isLoading, allowedRoles, navigate])

  return { user, isLoading }
}
