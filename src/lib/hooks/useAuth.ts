import { useState, useEffect, useCallback } from 'react';
import { authService } from '../firebase/auth';
import { useAuthStore } from '../stores/auth.store';
import { firestoreService } from '../firebase/firestore';
import { User } from '../types';

export const useAuth = () => {
  const store = useAuthStore();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChange(async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const idTokenResult = await authService.getIdTokenResult();
          const customClaims = idTokenResult.claims;
          const tenantId = customClaims.tenantId as string;
          const role = customClaims.role as any;

          store.setUser({
            uid: firebaseUser.uid,
            email: firebaseUser.email || '',
            emailVerified: firebaseUser.emailVerified,
          });
          store.setRole(role);
          store.setTenant(customClaims);
          store.setAuthenticated(true);
        } catch (err) {
          console.error('Failed to get token claims:', err);
          setError('Failed to load user data');
          store.setLoading(false);
        }
      } else {
        store.logout();
      }
      store.setLoading(false);
    });

    return unsubscribe;
  }, [store]);

  const signup = useCallback(
    async (email: string, password: string, displayName: string) => {
      try {
        setError(null);
        await authService.signup(email, password, displayName);
      } catch (err: any) {
        const errorMessage = err.message || 'Signup failed';
        setError(errorMessage);
        throw err;
      }
    },
    []
  );

  const login = useCallback(async (email: string, password: string) => {
    try {
      setError(null);
      await authService.login(email, password);
    } catch (err: any) {
      const errorMessage = err.message || 'Login failed';
      setError(errorMessage);
      throw err;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      setError(null);
      await authService.logout();
      store.logout();
    } catch (err: any) {
      setError('Logout failed');
      throw err;
    }
  }, [store]);

  const resetPassword = useCallback(async (email: string) => {
    try {
      setError(null);
      await authService.resetPassword(email);
    } catch (err: any) {
      setError('Password reset failed');
      throw err;
    }
  }, []);

  return {
    user: store.user,
    tenant: store.tenant,
    role: store.role,
    isLoading: store.isLoading,
    isAuthenticated: store.isAuthenticated,
    error,
    signup,
    login,
    logout,
    resetPassword,
  };
};
