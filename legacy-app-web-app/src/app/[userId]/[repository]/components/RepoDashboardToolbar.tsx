import React from "react";
import { BranchSelectroComboBox } from "./BranchSelectorComboBox";
import { CurrentlySelectedRepositoryState } from "@/state/CurrentlySelectedRepositoryState";
import { Badge } from "@/components/ui/badge";
import { Copy } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import EssentialMenubar from "./EssentialMenubar";

function RepoDashboardToolbar() {
  const repoBranchList = CurrentlySelectedRepositoryState(
    (state: any) => state.repoBranchList
  );
  const displayRepoMetaData = CurrentlySelectedRepositoryState(
    (state: any) => state.displayRepoMetaData
  );
  const pwd = CurrentlySelectedRepositoryState((state: any) => state.pwd);

  const currentCommitId = CurrentlySelectedRepositoryState(
    (state: any) => state.currentCommitId
  );

  const selectedBranch = CurrentlySelectedRepositoryState(
    (state: any) => state.selectedBranch
  );
  const shaId: any = currentCommitId?.split("").splice(0, 10);
  const userName = displayRepoMetaData.owner.username;
  const RepoName = displayRepoMetaData.name;

  return (
    <div>
      <div className="flex justify-between">
        <div className="flex gap-3 items-center">
          <div>{repoBranchList && <BranchSelectroComboBox />}</div>
          <div className="ml-3">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <Link href={`/${userName}/${RepoName}`}>{RepoName}</Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                {pwd &&
                  pwd?.map((e: any) => {
                    return (
                      <>
                        <BreadcrumbItem>
                          <Link
                            href={`/${userName}/${RepoName}/src/branch/${selectedBranch}${e.link}`}
                          >
                            {e.name}
                          </Link>
                        </BreadcrumbItem>
                        <BreadcrumbSeparator />
                      </>
                    );
                  })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
        <div className="flex gap-3">
          <EssentialMenubar />
          <Badge variant={"outline"}>
            <Copy className="mr-3" size={"20"} />
            {shaId}
          </Badge>
        </div>
      </div>
    </div>
  );
}

export default RepoDashboardToolbar;
