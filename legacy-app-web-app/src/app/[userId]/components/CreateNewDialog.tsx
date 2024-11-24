import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Building2, Microscope, Plus, UsersRound } from "lucide-react";
import { Button } from "@/components/ui/button";
import CreateNewRepository from "./CreateNewRepository";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

function CreateNewDialog() {
  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <Button variant={"outline"} size={"icon"}>
            <Plus />
          </Button>
        </DialogTrigger>
        <DialogContent className="flex flex-col min-w-[60vw] min-h-[60vh] ">
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <Separator className="my-0"/>
          <div >
            <Tabs defaultValue="account" className=" ">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="new-repo">
                  <Microscope size={18} className="mr-1" />
                  New Repository
                </TabsTrigger>

                <TabsTrigger value="new-team">
                  {" "}
                  <UsersRound size={18} className="mr-1" />
                  New Team
                </TabsTrigger>
                <TabsTrigger value="new-lab">
                  <Building2 size={18} className="mr-1" /> New Organization
                </TabsTrigger>
              </TabsList>
           <div className="mt-3">
           <TabsContent value="new-repo" className="min-w-[30vw] bg-white h-full">
                <CreateNewRepository />
              </TabsContent>

              <TabsContent value="new-team">
                Change your password here.
              </TabsContent>
              <TabsContent value="new-lab">
                Change your password here.
              </TabsContent>
           </div>
            </Tabs>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default CreateNewDialog;
