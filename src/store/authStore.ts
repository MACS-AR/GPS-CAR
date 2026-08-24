import { create } from 'zustand'
import { auth, db } from '@/firebase/config'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged,
} from 'firebase/auth'
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore'
import { User, UserRole } from '@/types'

interface AuthStore {
  user: User | null
  isLoading: boolean
  error: string | null
  isAuthenticated: boolean
  initAuth: () => void
  login: (email: string, password: string) => Promise<void>
  register: (email: string, password: string, displayName: string) => Promise<void>
  logout: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  updateUserProfile: (displayName: string, photoURL?: string) => Promise<void>
  checkUserRole: () => Promise<UserRole | null>
  clearError: () => void
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  isLoading: true,
  error: null,
  isAuthenticated: false,

  initAuth: () => {
    onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid))
          if (userDoc.exists()) {
            const userData = userDoc.data()
            set({
              user: {
                id: firebaseUser.uid,
                email: firebaseUser.email || '',
                displayName: firebaseUser.displayName || '',
                photoURL: firebaseUser.photoURL || undefined,
                role: userData.role || 'customer',
                isActive: userData.isActive !== false,
                isVerified: firebaseUser.emailVerified,
                createdAt: userData.createdAt?.toDate?.() || new Date(),
                updatedAt: userData.updatedAt?.toDate?.() || new Date(),
              },
              isAuthenticated: true,
              isLoading: false,
            })
          }
        } catch (error) {
          console.error('Error fetching user data:', error)
          set({ isLoading: false })
        }
      } else {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false,
        })
      }
    })
  },

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null })
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      const userDoc = await getDoc(doc(db, 'users', result.user.uid))
      
      if (!userDoc.exists()) {
        throw new Error('بيانات المستخدم غير موجودة')
      }

      const userData = userDoc.data()
      
      if (!userData.isActive) {
        await signOut(auth)
        throw new Error('حسابك معطل')
      }

      set({
        user: {
          id: result.user.uid,
          email: result.user.email || '',
          displayName: result.user.displayName || '',
          photoURL: result.user.photoURL || undefined,
          role: userData.role || 'customer',
          isActive: userData.isActive,
          isVerified: result.user.emailVerified,
          createdAt: userData.createdAt?.toDate?.() || new Date(),
          updatedAt: userData.updatedAt?.toDate?.() || new Date(),
        },
        isAuthenticated: true,
        isLoading: false,
      })
    } catch (error: any) {
      set({
        error: error.message || 'خطأ في تسجيل الدخول',
        isLoading: false,
      })
      throw error
    }
  },

  register: async (email: string, password: string, displayName: string) => {
    set({ isLoading: true, error: null })
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)
      
      await updateProfile(result.user, { displayName })
      
      const now = new Date()
      await setDoc(doc(db, 'users', result.user.uid), {
        email,
        displayName,
        role: 'customer',
        isActive: true,
        isVerified: false,
        createdAt: now,
        updatedAt: now,
      })

      set({
        user: {
          id: result.user.uid,
          email,
          displayName,
          role: 'customer',
          isActive: true,
          isVerified: false,
          createdAt: now,
          updatedAt: now,
        },
        isAuthenticated: true,
        isLoading: false,
      })
    } catch (error: any) {
      set({
        error: error.message || 'خطأ في إنشاء الحساب',
        isLoading: false,
      })
      throw error
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null })
    try {
      await signOut(auth)
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      })
    } catch (error: any) {
      set({
        error: error.message || 'خطأ في تسجيل الخروج',
        isLoading: false,
      })
      throw error
    }
  },

  resetPassword: async (email: string) => {
    set({ isLoading: true, error: null })
    try {
      await sendPasswordResetEmail(auth, email)
      set({ isLoading: false })
    } catch (error: any) {
      set({
        error: error.message || 'خطأ في إعادة تعيين كلمة المرور',
        isLoading: false,
      })
      throw error
    }
  },

  updateUserProfile: async (displayName: string, photoURL?: string) => {
    set({ isLoading: true, error: null })
    try {
      if (!auth.currentUser) throw new Error('لا يوجد مستخدم مسجل')

      await updateProfile(auth.currentUser, {
        displayName,
        photoURL: photoURL || null,
      })

      const user = get().user
      if (user) {
        await updateDoc(doc(db, 'users', user.id), {
          displayName,
          photoURL: photoURL || null,
          updatedAt: new Date(),
        })

        set({
          user: {
            ...user,
            displayName,
            photoURL,
            updatedAt: new Date(),
          },
          isLoading: false,
        })
      }
    } catch (error: any) {
      set({
        error: error.message || 'خطأ في تحديث البيانات',
        isLoading: false,
      })
      throw error
    }
  },

  checkUserRole: async () => {
    const user = get().user
    if (!user) return null
    return user.role
  },

  clearError: () => {
    set({ error: null })
  },
}))
