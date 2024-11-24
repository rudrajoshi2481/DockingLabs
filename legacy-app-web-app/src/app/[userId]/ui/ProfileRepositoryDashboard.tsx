import { Badge } from "@/components/ui/badge";
import { userStateStore } from "@/state/UserMetaData";
import React, { useEffect, useState } from "react";
import ProfileRepositoryCard from "../components/ProfileRepositoryCard";
import { Separator } from "@/components/ui/separator";
import ProfileOrganizationCard from "../components/ProfileOrganizationCard";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import CreateNewRepository from "../components/CreateNewRepository";
import { CurrentlySelectedRepositoryState } from "@/state/CurrentlySelectedRepositoryState";
import SearchbarProfilePage from "./SearchbarProfilePage";

function ProfileRepositoryDashboard() {
  const allReposList = userStateStore((state: any) => state.allReposList);
  const allOrgsList = userStateStore((state: any) => state.allOrgsList);

  const reset = CurrentlySelectedRepositoryState((state: any) => state.reset);

  useEffect(() => {
    reset();
  }, []);

  useEffect(() => {
    // allReposList.sort
  }, [allReposList]);

  return (
    <div className="container">
      <SearchbarProfilePage />
      <div className="mt-6">
        <div className="flex justify-between item-center  w-full">
          <h1 className="font-semibold text-md">
            Repositories <Badge>{allReposList?.length}</Badge>
          </h1>
        </div>
        <div className="mt-3 flex gap-4 flex-wrap">
          {allReposList &&
            allReposList.map((e: any) => {
              return <ProfileRepositoryCard key={e} data={e} />;
            })}
        </div>
      </div>
    </div>
  );
}

export default ProfileRepositoryDashboard;
