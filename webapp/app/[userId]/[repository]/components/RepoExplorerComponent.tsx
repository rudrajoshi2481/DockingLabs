import React, { useEffect } from "react";
import RepoFileComponent from "./RepoFileComponent";
import { Separator } from "@/components/ui/separator";
import RepoFolderComponent from "./RepoFolderComponent";
import { CurrentlySelectedRepositoryState } from "@/state/CurrentlySelectedRepositoryState";
import { fetchFileTreeFromGitea } from "@/logic/fetchFileTreeFromGitea";
import { FetchAllTheContentsFromRepoByPath } from "@/logic/FetchAllTheContentsFromRepo";
import HeroFileViewerComponent from "./HeroFileViewerComponent";
import { usePathname } from "next/navigation";
import { FetchSpecificFile } from "@/logic/FetchSpecificFile";
import FileEditorCanvasMain from "./canvas/FileEditor/FileEditorCanvasMain";

function RepoExplorerComponent() {
  const pathname = usePathname();
  let pathArray = pathname.split("/").filter((r) => r != "");
  let isSubDir = pathArray.length <= 2;
  let path = isSubDir ? "" : pathArray.splice(5).join("/");

  // if the file path is null after {ownerName}/{repoName} the fetch root
  // and if there is url like /src/branch/{branchName}/file
  // then if its file then show file
  // if its folder show folder

  const displayRepoMetaData = CurrentlySelectedRepositoryState(
    (state: any) => state.displayRepoMetaData
  );

  const currentCommitId = CurrentlySelectedRepositoryState(
    (state: any) => state.currentCommitId
  );

  const updateRootDisplayFilesPath = CurrentlySelectedRepositoryState(
    (state: any) => state.updateRootDisplayFilesPath
  );

  const rootDisplayFilesPath = CurrentlySelectedRepositoryState(
    (state: any) => state.rootDisplayFilesPath
  );

  const updateContent = CurrentlySelectedRepositoryState(
    (state: any) => state.updateContent
  );
  const content = CurrentlySelectedRepositoryState(
    (state: any) => state.content
  );

  const pwd = CurrentlySelectedRepositoryState((state: any) => state.pwd);

  const updateCurrentlySelectedEditorFile = CurrentlySelectedRepositoryState(
    (state: any) => state.updateCurrentlySelectedEditorFile
  );

  const currentlySelectedEditorFile = CurrentlySelectedRepositoryState(
    (state: any) => state.currentlySelectedEditorFile
  );

  const userName = displayRepoMetaData.owner.username;
  const RepoName = displayRepoMetaData.name;

  const main = async () => {
    let data: any = [];

    // console.log(path)

    const content = await FetchAllTheContentsFromRepoByPath({
      giteaUserName: userName,
      repoName: RepoName,
      shaId: currentCommitId,
      path: path,
    });

    data = content.data;

    return data;
  };

  // this hook is for fetching the data when the commit id changes
  // & it also fetch when the page render's
  useEffect(() => {
    if (!currentCommitId) return;

    updateCurrentlySelectedEditorFile(null);
    // if end is file extension then instead use this function
    // FetchSpecificFile()

    if (pathname.split(".").length >= 2) {

      
      FetchSpecificFile({
        giteaUserName: userName,
        repoName: RepoName,
        shaId: currentCommitId,
        filePath: path,
      })
      .then((rep) => {
          
            updateCurrentlySelectedEditorFile(rep.data);
        })
        .catch((err: any) => {
          console.log("Fetch file Error", err);
        });

      return;
    }

    main().then((rep: any) => {
      // console.log(rep)
      updateContent(rep);
    });
  }, [currentCommitId, pathname]);

  // this use effect is to display all the readme files root of repo
  useEffect(() => {
    // check wether the project contains a read me file or not

    if (isSubDir) {
      const filesType = [
        "readme.md",
        // "license",
        // "code_of_conduct.md",
        // "code-of-conduct.md",
      ];
      let presentFiles: any = [];
      content.map((e: any) => {
        if (e.type === "file") {
          // match the file name in the array e.name
          if (filesType.includes(e.name.toLowerCase())) {
            presentFiles.push(e);
          }
        }
      });

      updateRootDisplayFilesPath(presentFiles);
    }
  }, [content]);

  // this hooks checks if there is any extencion on the end of file
  //  Example : http://localhost:3000/ru/webssh202/src/branch/main/app/client/src/js/index.ts
  // if there is index.ts at end of the file
  // then File editor will be show
  useEffect(() => {
    // console.log("Editor Level",pathname)
  }, []);

  return (
    <div className=" w-full  mt-2">
      {currentlySelectedEditorFile ? (
        <><FileEditorCanvasMain /></>
      ) : (
        <div className="border shadow rounded-md">
          {/* if its tree then render this component  */}
          {content &&
            content?.map((e: any) => {
              if (e.type === "file") {
                return <RepoFileComponent data={e} />;
              } else {
                return <RepoFolderComponent data={e} />;
              }
            })}
        </div>
      )}
      <div>
        {/* Hero File viewer is to show mdx file on initial pages  */}
        {/* it's not optimized we need to work on that */}
        {pwd?.length <= 0 && rootDisplayFilesPath?.length >= 1 && (
          <HeroFileViewerComponent />
        )}

       
      </div>
    </div>
  );
}

export default RepoExplorerComponent;
