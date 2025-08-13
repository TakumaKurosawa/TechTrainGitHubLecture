import { create } from 'zustand';

interface AppState {
  count: number;
  user: string;
  increment: () => void;
  decrement: () => void;
  setUser: (user: string) => void;
}

export const useAppStore = create<AppState>((set) => ({
  count: 0,
  user: 'Guest',
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  setUser: (user: string) => set({ user }),
}));
