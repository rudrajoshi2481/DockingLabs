import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CurrentlySelectedRepositoryState } from "@/state/CurrentlySelectedRepositoryState";
import { Eye, GitFork, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function RepoHeaderComponent() {
  const displayRepoMetaData = CurrentlySelectedRepositoryState(
    (state: any) => state.displayRepoMetaData
  );

  function convertGithubUrlToUsernameRepository(url: string) {
    const parts = url.split("/");
    const username = parts[3];
    const repoName = parts[4].split(".")[0];
    return `${username}/${repoName}`;
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        {/* appbar */}

        <div className="flex  flex-col gap-1">
        <div className="flex font-bold text-xl">
          {/* user name */}
          <Image width={25} height={25} alt="repo icon" src={"/book.svg"} />
          <Link href={`/${displayRepoMetaData.owner.username}`}>
            <p className="ml-3 ">{displayRepoMetaData.owner.username}</p>
          </Link>{" "}
          /
          <Link
            href={`/${displayRepoMetaData.owner.username}/${displayRepoMetaData.name}`}
          >
            <p className="">{displayRepoMetaData.name}</p>
          </Link>
          <Badge variant={"outline"} className="ml-3">
            {displayRepoMetaData.private ? "Private" : "Public"}
          </Badge>
        </div>

        {displayRepoMetaData.original_url && (
          <div className="text-xs">
            forked from : {" "}
            <Link target="_blank" className="text-blue-600 underline" href={displayRepoMetaData.original_url}>
              {convertGithubUrlToUsernameRepository(
                displayRepoMetaData.original_url
              )}
            </Link>
          </div>
        )}
        </div>
        <div className="flex gap-3">
          {/* watch */}
          {/* star  */}
          {/* fork */}
          <Button variant={"outline"}>
          <Eye size={18} className="mr-3" /> Watch{" "}
            <Badge className="ml-2" variant={"secondary"}>
              {" "}
              {displayRepoMetaData.watchers_count}{" "}
            </Badge>
          </Button>
          <Button variant={"outline"}>
          <Sparkles size={18} className="mr-3" /> Star{" "}
            <Badge className="ml-2" variant={"secondary"}>
              {" "}
              {displayRepoMetaData.stars_count}{" "}
            </Badge>
          </Button>
          <Button variant={"outline"}>
          <GitFork size={18} className="mr-3" />Fork{" "}
            <Badge className="ml-2" variant={"secondary"}>
              {" "}
              {displayRepoMetaData.forks_count}
            </Badge>
          </Button>
        </div>
      </div>

      {/* <div className="flex mt-2">
        <p className="mr-3 font-bold">Created : </p> <p>{RepoCreatedAt}</p>
      </div> */}
    </div>
  );
}

export default RepoHeaderComponent;
