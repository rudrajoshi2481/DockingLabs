import { fetchFileTreeFromGitea } from "@/logic/fetchFileTreeFromGitea";
import { create } from "zustand";
export function createPWDData(
  path: string[]
): { name: string; link: string }[] {
  const data: { name: string; link: string }[] = [];
  let currentLink = "";

  for (const segment of path) {
    currentLink += `/${segment}`;
    data.push({
      name: segment,
      link: currentLink,
    });
  }

  return data;
}

export const CurrentlySelectedRepositoryState = create((set) => ({
  displayRepoMetaData: null,
  repoBranchList: null,
  selectedBranch: "main",
  currentCommitId: null,
  fileTree: [],
  rootDisplayFilesPath: null, // this are files related to readme Liscence on main pages so if pwd is root this page will appear
  content: [],
  pwd: null,
  currentlySelectedEditorFile: null,
  updateDisplayRepoMetaData: (data: any) => set({ displayRepoMetaData: data }),
  updateRepoBranchList: (data: any) => set({ repoBranchList: data }),
  updateSelectedBranch: (data: any) =>
    set((state: any) => {
      const findCommitId = state.repoBranchList.filter(
        (e: any) => e.name === data
      );

      return {
        selectedBranch: data,
        currentCommitId: findCommitId[0].commit.id,
      };
    }),
  updateRootDisplayFilesPath: (data: any) =>
    set({ rootDisplayFilesPath: data }),
  updateFileTree: (data: any) => set({ fileTree: data }),
  updateContent: (data: any) =>
    set(() => {
      let pathArray = data[0].path.split("/");

      pathArray.splice(pathArray.length - 1);

      const path = createPWDData(pathArray);

      return { content: data, pwd: path };
    }),
  reset: (data: any) =>
    set({
      content: [],
      fileTree: [],
      currentCommitId: null,
      selectedBranch: "main",
      repoBranchList: null,
      displayRepoMetaData: null,
      pwd: null,
    }),
  updatePwd: (data: any) => set({ pwd: data }),
  updateCurrentlySelectedEditorFile: (data: any) =>
    set(() => {
      let path = null;

      if (data?.path) {
        let pathArray = data?.path.split("/");
        pathArray.splice(pathArray.length );
        path = createPWDData(pathArray);
      }

      return { currentlySelectedEditorFile: data, pwd: path };
    }),
}));
