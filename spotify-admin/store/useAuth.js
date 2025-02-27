import { create } from "zustand";
import { createJSONStorage, persist } from 'zustand/middleware';

export const useAuth = create(persist((set) => ({
    user: null,
    jwt: null,
    setUser: (user) => set({ user }),
    setJWT: (jwt) => set({ jwt }),
    logout: () => set({ user: null, jwt: null }),

}), {
    name: 'auth_store',
    partialize: (data) => ({ ...data }),
    storage: createJSONStorage(() => localStorage)
}));