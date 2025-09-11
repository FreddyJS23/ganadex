import { create } from "zustand";

type States = {
  isLoading: boolean;
};

interface Actions {
  activateLoading: () => void;
  disableLoading: () => void;
}

export const useLoadingButtonModal = create<States & Actions>()((set) => ({
  isLoading: false,
  activateLoading: () => set({ isLoading: true }),
  disableLoading: () => set({ isLoading: false }),
}));
