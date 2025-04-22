import { ILoginResponse } from '@/entities/dashboard';
import { create } from 'zustand';


type UserStore = {
  user: ILoginResponse | null;
  setUser: (user: ILoginResponse) => void;
  clearUser: () => void;
};

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));
