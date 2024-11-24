import React, { useState } from "react";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CurrentlySelectedRepositoryState } from "@/state/CurrentlySelectedRepositoryState";
import { deleteReposititory } from "@/logic/DeleteRepository";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function DeleteThisRepoDialog() {
  const [inputValue, setinputValue]: any = useState(null);

  const router = useRouter();
  const displayRepoMetaData = CurrentlySelectedRepositoryState(
    (state: any) => state.displayRepoMetaData
  );
  const userName = displayRepoMetaData.owner.username;
  const RepoName = displayRepoMetaData.name;

  const onDeleteHandler = (e: any) => {
    if (inputValue === RepoName) {
      deleteReposititory({ giteaUserName: userName, repoName: RepoName })
        .then(() => {
          toast.success(`${RepoName} Repository is deleted.`);
          router.push(`/${userName}`);
        })
        .catch((err) => {
          toast.error(`${RepoName} Repository is not deleted.`);
        });
    } else {
      toast.warning(`File name is required in input`);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        {" "}
        <Button variant={"destructive"}>Delete this repository</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription className="flex font-medium text-black">
            I want to delete <p className="font-bold px-3">{RepoName}</p> Repository
          </AlertDialogDescription>
          <label className="font-bold">Project Name:</label>
          <Input
            onChange={(e) => setinputValue(e.target.value)}
            value={inputValue}
          />
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e: any) => onDeleteHandler(e)}
            className="bg-red-600 hover:bg-red-600"
          >
            Delete this repo
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteThisRepoDialog;
