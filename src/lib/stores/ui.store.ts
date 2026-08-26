import { create } from 'zustand';

interface UIStore {
  darkMode: boolean;
  sidebarOpen: boolean;
  language: 'ar' | 'en';
  toggleDarkMode: () => void;
  toggleSidebar: () => void;
  setLanguage: (lang: 'ar' | 'en') => void;
  setSidebarOpen: (open: boolean) => void;
}

export const useUIStore = create<UIStore>((set) => ({
  darkMode: localStorage.getItem('darkMode') === 'true',
  sidebarOpen: true,
  language: (localStorage.getItem('language') as 'ar' | 'en') || 'ar',
  toggleDarkMode: () =>
    set((state) => {
      localStorage.setItem('darkMode', String(!state.darkMode));
      return { darkMode: !state.darkMode };
    }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setLanguage: (lang) => {
    localStorage.setItem('language', lang);
    set({ language: lang });
  },
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
}));
