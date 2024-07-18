"use client";
import { fetchOwnerRepository } from "@/logic/fetchOwnerRepository";
import { getAllRepoBranchList } from "@/logic/getAllRepoBranchList";
import { CurrentlySelectedRepositoryState } from "@/state/CurrentlySelectedRepositoryState";
import React, { useEffect } from "react";
import RepoHeaderComponent from "./components/RepoHeaderComponent";
import TabsSelectorRepoDashboardComponent from "./components/TabsSelectorRepoDashboardComponent";
import { fetchFileTreeFromGitea } from "@/logic/fetchFileTreeFromGitea";
import { Separator } from "@/components/ui/separator";

function page() {
  

  return (
    <>
    </>
  //   <div className="mt-6 flex p-4 w-full  ">
  //   <div className=" w-full  ">
      
  //       <TabsSelectorRepoDashboardComponent />
      
  //   </div>
  //  {
  //   false && <div className=" flex-1 min-w-[350px] px-9">
  //    <p className="font-bold">About</p>
  //    {/* <p className="mt-2">{displayRepoMetaData.description}</p> */}
  //    <Separator className="my-2" />
  //  </div>
  //  }
  // </div>
  );
}

export default page;
