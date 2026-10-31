import { create } from 'zustand';

export type ToastKind = 'success' | 'reward' | 'info';

export interface ToastItem {
  id: string;
  title: string;
  description?: string;
  kind: ToastKind;
}

interface ToastState {
  items: ToastItem[];
  push: (title: string, description?: string, kind?: ToastKind) => void;
  dismiss: (id: string) => void;
}

export const useToastStore = create<ToastState>((set) => ({
  items: [],
  push: (title, description, kind = 'success') =>
    set((state) => ({
      items: [
        ...state.items,
        { id: `t-${Date.now()}-${Math.random().toString(16).slice(2)}`, title, description, kind },
      ].slice(-4),
    })),
  dismiss: (id) => set((state) => ({ items: state.items.filter((item) => item.id !== id) })),
}));

export const toast = {
  success: (title: string, description?: string) =>
    useToastStore.getState().push(title, description, 'success'),
  reward: (title: string, description?: string) =>
    useToastStore.getState().push(title, description, 'reward'),
  info: (title: string, description?: string) =>
    useToastStore.getState().push(title, description, 'info'),
};
