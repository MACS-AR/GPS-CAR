import { create } from 'zustand';
import { AuthState, AuthUser, UserRole } from '../types';

interface AuthStore extends AuthState {
  setUser: (user: AuthUser | null) => void;
  setTenant: (tenant: any) => void;
  setRole: (role: UserRole | null) => void;
  setLoading: (isLoading: boolean) => void;
  setAuthenticated: (isAuthenticated: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  tenant: null,
  role: null,
  isLoading: true,
  isAuthenticated: false,
  setUser: (user) => set({ user }),
  setTenant: (tenant) => set({ tenant }),
  setRole: (role) => set({ role }),
  setLoading: (isLoading) => set({ isLoading }),
  setAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
  logout: () =>
    set({
      user: null,
      tenant: null,
      role: null,
      isAuthenticated: false,
    }),
}));
