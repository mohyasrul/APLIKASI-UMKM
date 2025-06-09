import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/lib/types/common';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

interface AuthActions {
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthState & AuthActions>()(
  persist(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (set, get) => ({
      // State
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // Actions
      login: async (username: string, password: string) => {
        set({ isLoading: true, error: null });

        try {
          // TODO: Implement actual authentication logic
          // For now, simulate a successful login
          await new Promise(resolve => setTimeout(resolve, 1000));

          if (username === 'admin' && password === 'admin') {
            const user: User = {
              id: '1',
              username: 'admin',
              email: 'admin@umkm.com',
              role: 'admin',
              isActive: true,
              createdAt: new Date(),
              updatedAt: new Date(),
              lastLogin: new Date(),
            };

            set({
              user,
              isAuthenticated: true,
              isLoading: false,
            });
            return true;
          } else {
            set({
              error: 'Username atau password salah',
              isLoading: false,
            });
            return false;
          }
        } catch (error) {
          console.error('Login error:', error);
          set({
            error: 'Terjadi kesalahan saat login',
            isLoading: false,
          });
          return false;
        }
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          error: null,
        });
      },

      setUser: (user: User | null) => {
        set({
          user,
          isAuthenticated: !!user,
        });
      },

      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },

      setError: (error: string | null) => {
        set({ error });
      },

      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'auth-storage',
      partialize: state => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
