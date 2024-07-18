import { create } from "zustand";

export const userStateStore = create((set) => ({
  displayUserData: null,
  allReposList: null,
  allOrgsList: null,
  heatmap: null,
  updateDisplayUserUser: (data: any) =>
    set(() => {
      
      return {  displayUserData: data };
    }),
  
  updateAllReposList: (data: any) => set({ allReposList: data }),
  updateAllOrgsList: (data: any) => set({ allOrgsList: data }),
  updateHeatmap: (data: any) => set({ heatmap: data }),
}));
