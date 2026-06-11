import { create } from 'zustand';

interface AppState {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  // Session State
  isSessionActive: boolean;
  startSession: () => void;
  endSession: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  isSidebarOpen: false,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  
  isSessionActive: false,
  startSession: () => set({ isSessionActive: true }),
  endSession: () => set({ isSessionActive: false }),
}));
