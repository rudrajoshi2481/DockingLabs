"use client";
import React, { useEffect } from "react";
import { Separator } from "@/components/ui/separator";

import ProfileSidebar from "./ui/ProfileSidebar";
import ProfileRepositoryDashboard from "./ui/ProfileRepositoryDashboard";
import { fetchAllRepoOfUser } from "@/logic/fetchAllRepoOfUser";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { fetchUserDetailsFromGitea } from "@/logic/fetchUserDetailsFromGitea";
import { userStateStore } from "@/state/UserMetaData";
import { Textarea } from "@/components/ui/textarea";
import CreateNewRepository from "./components/CreateNewRepository";

function Page({ params }: any) {
  const updateDisplayUserUser = userStateStore(
    (state: any) => state.updateDisplayUserUser
  );
  const updateAllReposList = userStateStore(
    (state: any) => state.updateAllReposList
  );
  const path = usePathname();

  // fetch the user profil from gitea

  const fetchDetails = async () => {
    const details = await fetchUserDetailsFromGitea({
      giteaUserName: path.split("/")[1],
    });

    const repos = await fetchAllRepoOfUser({
      giteaUserName: path.split("/")[1],
    });

    updateAllReposList(repos.data);

    updateDisplayUserUser(details.data);
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <div >
      <Separator />
      <div>
        <ProfileSidebar />
      </div>
      <Separator />
      <div className="mt-6">
      <ProfileRepositoryDashboard />   
      </div>
    </div>
  );
}



// <div className="px-8 flex   border-t  min-h-[80vh]">
// <div>
//   <ProfileSidebar />
// </div>
// <div className="flex">
//   <Separator orientation="vertical" className=" h-full" />
// </div>
// <div className=" py-6" >
//   <ProfileRepositoryDashboard />
// </div>

// </div>

export default Page;
