import { create } from 'zustand';

interface UiState {
  panelOpen: boolean;
  openPanel: () => void;
  closePanel: () => void;
}

export const useUiStore = create<UiState>((set) => ({
  panelOpen: false,
  openPanel: () => set({ panelOpen: true }),
  closePanel: () => set({ panelOpen: false }),
}));
