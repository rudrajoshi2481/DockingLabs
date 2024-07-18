import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useUserAuthStore = create()(
  persist(
    (set) => ({
      user: false,
      isAuthenticated: false,
      signIn: (data: any) => set({ user: data,isAuthenticated: true }),
      signOut: () =>
        set({
          
          user: null,
          isAuthenticated: false,
        }),
    }),
    {
      name: "sorcecry-labs-auth",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useUserAuthStore;
