import { User, UserRole } from './index'

export interface AuthState {
  user: User | null
  isLoading: boolean
  error: string | null
  isAuthenticated: boolean
}

export interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, displayName: string) => Promise<void>
  logout: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  updateProfile: (displayName: string, photoURL?: string) => Promise<void>
  checkUserRole: () => Promise<UserRole | null>
}

export interface LoginFormData {
  email: string
  password: string
}

export interface RegisterFormData {
  email: string
  password: string
  confirmPassword: string
  displayName: string
  acceptTerms: boolean
}

export interface ResetPasswordFormData {
  email: string
}
