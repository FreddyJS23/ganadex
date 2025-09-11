import { create } from "zustand";

type States = {
  darkMode: boolean;
};

interface Actions {
  activateDarkMode: () => void;
  disableDarkMode: () => void;
}

export const useThemeStore = create<States & Actions>()((set) => ({
  darkMode: true,
  activateDarkMode: () => set({ darkMode: true }),
  disableDarkMode: () => set({ darkMode: false }),
}));
