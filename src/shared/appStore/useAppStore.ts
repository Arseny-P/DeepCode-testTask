import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { api } from '../api/api';

type AppState = {
  token: string;
  perPage: number;
  totalPages: number;

  setToken: (token: string) => void;
  setPerPage: (perPage: number) => void;
  setTotalPages: (totalPages: number) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      token: '',
      perPage: 10,
      totalPages: 0,

      setToken: (token: string) => {
        set({ token });
        api.defaults.headers.Authorization = `Bearer ${token}`;
      },
      setPerPage: (perPage: number) => set({ perPage}),
      setTotalPages: (totalPages: number) => set({ totalPages }),
    }),
    {
      name: 'gorest-app-storage',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        if (state?.token) {
          api.defaults.headers.Authorization = `Bearer ${state.token}`;
        }
      },
    }
  )
);