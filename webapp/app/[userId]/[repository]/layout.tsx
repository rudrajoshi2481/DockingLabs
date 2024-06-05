"use client";
import React, { useEffect } from "react";
import RepoHeaderComponent from "./components/RepoHeaderComponent";
import { CurrentlySelectedRepositoryState } from "@/state/CurrentlySelectedRepositoryState";
import { fetchOwnerRepository } from "@/logic/fetchOwnerRepository";
import { getAllRepoBranchList } from "@/logic/getAllRepoBranchList";
import TabsSelectorRepoDashboardComponent from "./components/TabsSelectorRepoDashboardComponent";
import { Separator } from "@/components/ui/separator";
import { MovingBorderButton } from "@/components/ui/moving-border";
import { Microscope, Satellite } from "lucide-react";
function layout({ children, params }: any) {
  const updateDisplayRepoMetaData = CurrentlySelectedRepositoryState(
    (state: any) => state.updateDisplayRepoMetaData
  );

  const displayRepoMetaData = CurrentlySelectedRepositoryState(
    (state: any) => state.displayRepoMetaData
  );

  const updateRepoBranchList = CurrentlySelectedRepositoryState(
    (state: any) => state.updateRepoBranchList
  );

  const updateSelectedBranch = CurrentlySelectedRepositoryState(
    (state: any) => state.updateSelectedBranch
  );

  const pwd = CurrentlySelectedRepositoryState((state: any) => state.pwd);

  const main = async () => {
    await fetchOwnerRepository({
      giteaUserName: params.userId,
      repoName: params.repository,
    })
      .then((d) => {
        updateDisplayRepoMetaData(d.data);
      })
      .catch((err) => {
        console.log(err);
      });

    await getAllRepoBranchList({
      giteaUserName: params.userId,
      repoName: params.repository,
    })
      .then((d) => {
        updateRepoBranchList(d.data);
      })
      .catch((err) => {
        console.log(err);
      });

    await updateSelectedBranch("main");
  };

  useEffect(() => {
    main();
  }, []);

  return (
    <div className="">
      <div className="lg:container  md:px-4 mb-9">
        <div className="mt-4">
          {displayRepoMetaData && <RepoHeaderComponent />}
        </div>
        <Separator className="my-4" />
        <div className=" flex  w-full  ">
          <div className=" w-full  ">
            <TabsSelectorRepoDashboardComponent />
          </div>

          {pwd?.length <= 0 && displayRepoMetaData && (
            <div className="max-w-[300px] min-w-[200px]  px-6">
              <h1 className="font-bold text-xl flex ">
                <Microscope className="mr-3" />
                About
              </h1>
              <p className="my-2">{displayRepoMetaData.description}</p>
              <MovingBorderButton
                borderRadius="0"
                className="bg-white  dark:bg-slate-900 text-black dark:text-white border-neutral-200  dark:border-slate-800 border rounded-sm flex  p-2 "
              >
                <h1 className="font-bold ">Project Size: </h1>
                <p className="flex ml-2">
                  {Math.floor(displayRepoMetaData.size / 1024)}
                  <p className="ml-1">mb</p>
                </p>
              </MovingBorderButton>
            </div>
          )}
        </div>
        {children}
      </div>
    </div>
  );
}

export default layout;
