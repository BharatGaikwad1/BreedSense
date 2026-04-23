import { create } from 'zustand';

const useThemeStore = create((set) => ({
  theme: (() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('breedsense-theme');
      if (stored) return stored;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  })(),

  setTheme: (theme) => {
    localStorage.setItem('breedsense-theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    set({ theme });
  },

  toggleTheme: () => {
    set((state) => {
      const newTheme = state.theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('breedsense-theme', newTheme);
      if (newTheme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return { theme: newTheme };
    });
  },

  initTheme: () => {
    set((state) => {
      if (state.theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return state;
    });
  },
}));

export default useThemeStore;
