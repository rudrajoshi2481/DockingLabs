import { getSingleCommitsFromSHA } from "@/logic/getSingleCommitsFromSHA";
import { CurrentlySelectedRepositoryState } from "@/state/CurrentlySelectedRepositoryState";
import { Folder, Trash2 } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function RepoFolderComponent({ data }: any) {
  function convertIsoStringToTimeUnit(isoString:any) {
    const date = new Date(isoString);
    const diffInMilliseconds = Date.now() - date.getTime();
    const diffInSeconds = Math.floor(diffInMilliseconds / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInMonths = Math.floor(diffInDays / 30);
    const diffInYears = Math.floor(diffInMonths / 12);
  
    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`;
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} minutes ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else if (diffInDays < 30) {
      return `${diffInDays} days ago`;
    } else if (diffInMonths < 12) {
      return `${diffInMonths} months ago`;
    } else {
      return `${diffInYears} years ago`;
    }
  }
  

  const [details, setdetails]: any = useState(null);

  const displayRepoMetaData = CurrentlySelectedRepositoryState(
    (state: any) => state.displayRepoMetaData
  );

  const selectedBranch = CurrentlySelectedRepositoryState(
    (state: any) => state.selectedBranch
  );
  const userName: any = displayRepoMetaData.owner.username;
  const RepoName = displayRepoMetaData.name;

  const main = async () => {


    getSingleCommitsFromSHA({
      giteaUserName: userName,
      repoName: RepoName,
      shaId: data.last_commit_sha,
    }).then((d: any) => {
      setdetails(d.data[0]);
    });
  };

  useEffect(() => {
    main();
  }, []);

  return (
    <div
      className="w-full flex justify-evenly p-2 border-b hover:bg-slate-50 text-sm"
      style={{ cursor: "pointer" }}
    >
      <div className="flex-1 font-medium">
      <Link
          href={`/${userName}/${RepoName}/${"src"}/branch/${selectedBranch}/${
            data.path
          }`}
        >
        <div className="flex ">
          <Folder />
          <p className="ml-1 ">{data.name}</p>
        </div>
        </Link>
      </div>
      <div className="flex-1 ">
        <div className=" max-w-[20vw] text-gray-700 items-start">
          {details && <p className="truncate max-w-[15vw]  ">{details.commit.message}</p>}
        </div>
      </div>
      <div className="flex-1 justify-end flex ">
        {details && <p>{convertIsoStringToTimeUnit(details?.created)}</p>}
        <div className="ml-3">
          <Trash2 color="#ff0000" />
        </div>
      </div>
    </div>
  );
}


export default RepoFolderComponent;
