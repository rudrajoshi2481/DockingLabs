import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FormControl, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
// // {
// //   "auto_init": true,
// //   "default_branch": "string",
// //   "description": "string",
// //   "gitignores": "string",
// //   "issue_labels": "string",
// //   "license": "string",
// //   "name": "string",
// //   "private": true,
// //   "readme": "string",
// //   "template": true,
// //   "trust_model": "default"
// // }

function CreateNewOrganization() {
  return (
    <Dialog>
      <DialogTrigger>New Organization</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>

          <form>
            <div className="flex mt-3 flex-col gap-2 rounded-lg border p-3 shadow-sm">
              <div className="space-y-4 ">
                <div className="space-y-0.5 ">
                  <Label>Name of Orginazation:</Label>
                  <Input placeholder="Name of Orginazation" />
                </div>
              </div>
              <div className="space-y-4 ">
                <div className="space-y-0.5 ">
                  <Label>Description:</Label>
                  <Textarea placeholder="Description of Orginazation" />
                </div>
              </div>
              <div className="flex mt-3 flex-col gap-2 rounded-lg border p-3 shadow-sm">
                <div className="space-y-4 ">
                  <div className="space-y-0.5 flex items-center">
                    <div className="space-y-0.5">
                      <Label>Public Orginazation</Label>

                      <DialogDescription className="pr-6">
                        Anyone on the internet can see this Orginazation. You
                        choose who can commit.
                      </DialogDescription>
                    </div>

                    <div>
                      <Switch
                        checked={true}
                        // checked={field.value}
                        // onCheckedChange={field.onChange}
                        // disabled
                        aria-readonly
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 w-full ">
            <Button type="submit" className="w-full">Create Orginazation</Button>
            </div>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default CreateNewOrganization;
