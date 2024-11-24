import React, { useEffect, useState } from "react";
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
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { createNewFileInRepo } from "@/logic/CreateNewFileInRepo";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

function CreateNewFileDialog() {
  const [fileName, setfileName]: any = useState(null);
  const [exension, setexension]: any = useState(".txt");

  const displayRepoMetaData = CurrentlySelectedRepositoryState(
    (state: any) => state.displayRepoMetaData
  );
  const pwd = CurrentlySelectedRepositoryState((state: any) => state.pwd);

  const selectedBranch = CurrentlySelectedRepositoryState(
    (state: any) => state.selectedBranch
  );

  const userName = displayRepoMetaData.owner.username;
  const RepoName = displayRepoMetaData.name;

  const [message, setmessage]: any = useState(null);

  const onFileCreateHandler = (e: any) => {
    if (fileName != null && exension != null) {
      createNewFileInRepo({
        userName: userName,
        repoName: RepoName,
        filePath: pwd,
        fileName:fileName,
        extension:exension,
        authorMail: displayRepoMetaData.owner.email,
        branch: selectedBranch,
        message: message,
      })
        .then((res) => {
          console.log(res);
          toast.success(`${fileName}${exension} has been created.`);
        })
        .catch((err) => {
          toast.error(`${fileName}${exension} has been created.`);
        });
    } else {
      toast.warning(`Name & extension required`);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button size={"sm"} variant={"outline"}>
          <Plus size={18} className="mr-3" />
          New File
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
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
          <Separator className="mt-3" />
          <form className="flex flex-col gap-3">
            <div>
              <label className="font-bold ">FileName:</label>
              <div className="flex  mt-2 gap-2">
                <Input
                  placeholder="file name"
                  onChange={(e) => setfileName(e.target.value)}
                  value={fileName}
                />
                <Select onValueChange={(e) => setexension(e)}>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder=".txt" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value=".txt">.txt</SelectItem>
                    <SelectItem value=".pdb">.pdb</SelectItem>
                    <SelectItem value=".smi">.smi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
              <Textarea
                placeholder="message"
                // value={message}
                onChange={(e) => setmessage(e.target.value)}
              />
          </form>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={(e: any) => onFileCreateHandler(e)}>
            Create File
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default CreateNewFileDialog;
