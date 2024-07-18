import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { CurrentlySelectedRepositoryState } from "@/state/CurrentlySelectedRepositoryState";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

function CreateNewFolderDialog() {

  const displayRepoMetaData = CurrentlySelectedRepositoryState(
    (state: any) => state.displayRepoMetaData
  );
  const pwd = CurrentlySelectedRepositoryState((state: any) => state.pwd);

  const userName = displayRepoMetaData.owner.username;
  const RepoName = displayRepoMetaData.name;
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button variant={"outline"} size={"sm"}>
          <Plus size={18} className="mr-3" />
          New Folder
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
          <AlertDialogDescription>
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>{RepoName}</BreadcrumbItem>
                <BreadcrumbSeparator />
                {pwd &&
                  pwd?.map((e: any) => {
                    return (
                      <>
                        <BreadcrumbItem>{e.name}</BreadcrumbItem>
                        <BreadcrumbSeparator />
                      </>
                    );
                  })}
              </BreadcrumbList>
            </Breadcrumb>
          </AlertDialogDescription>
          </AlertDialogDescription>
          <Separator className="mt-3" />
          <form className="flex gap-9">
            <div>
              <label className="font-bold ">Folder Name:</label>
              <div className="flex mb-9 mt-2">
                <Input />
                
              </div>
            </div>
          </form>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Create Folder</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default CreateNewFolderDialog;
