import { create } from "zustand";

export const useNGLStore = create((set) => ({
  stage: null,
  refresh: false,
  addStage: (data: any) => set({ stage: data }),
  setRefresh: () => {
    set((state:any) => {
      return {refresh:!state.refresh}
    });
  },
}));

// import {proxy} from "valtio"

// export const useNGLStore:any = proxy({stage:null})
