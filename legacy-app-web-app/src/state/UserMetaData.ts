import { create } from 'zustand';

interface UserState {
  id: number | null;
  username: string | null;
  email: string | null;
  fullName: string | null;
  avatarUrl: string | null;
  isAuthenticated: boolean;
  accessToken: string | null;
  setUser: (user: Partial<UserState>) => void;
  clearUser: () => void;
}

export const userStateStore = create<UserState>((set) => ({
  id: null,
  username: null,
  email: null,
  fullName: null,
  avatarUrl: null,
  isAuthenticated: false,
  accessToken: null,
  setUser: (user) => set((state) => ({ ...state, ...user })),
  clearUser: () => set({
    id: null,
    username: null,
    email: null,
    fullName: null,
    avatarUrl: null,
    isAuthenticated: false,
    accessToken: null,
  }),
}));
