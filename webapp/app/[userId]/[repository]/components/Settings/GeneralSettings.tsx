import React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import DeleteThisRepoDialog from "./DeleteThisRepoDialog";
function GeneralSettings() {
  return (
    <div className="text-sm">
      {" "}
      <div className="grid gap-6">
        <Card x-chunk="dashboard-04-chunk-1" className=" shadow-none">
          <CardHeader>
            <CardTitle>Repository</CardTitle>
            <CardDescription>
              Used to identify your store in the marketplace.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="flex flex-col gap-6 text-sm">
              <label>
                Repository Name:
                <Input placeholder="Store Name" className="mt-2" />
              </label>
              <label>
                Description:
                <Textarea placeholder="Store Name" className="mt-2" />
              </label>
            </form>
          </CardContent>
          <CardFooter className="border-t px-6 py-4">
            <Button>Update</Button>
          </CardFooter>
        </Card>
        <Card
          x-chunk="dashboard-04-chunk-1"
          className="border-red-500 shadow-orange-600"
        >
          <CardHeader>
            <CardTitle>Danger Zone</CardTitle>
            <CardDescription>
              Used to identify your store in the marketplace.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex mt-3 flex-col gap-2 rounded-lg border p-3 shadow-sm">
              <div className="space-y-4 ">
                <div className="space-y-0.5 flex justify-between items-center">
                  <div className="space-y-0.5">
                    <label className="font-bold">private Repository</label>
                    <p className="font-light">
                      No one on the internet can see this repository. You choose
                      who can commit.
                    </p>
                  </div>
                  <div>
                    <Switch name="visiblity" type="button" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex mt-3 flex-col gap-2 rounded-lg border p-3 shadow-sm">
              <div className="space-y-4 ">
                <div className="space-y-0.5 flex justify-between items-center">
                  <div className="space-y-0.5">
                    <label className="font-bold">Archive this Repository</label>
                    <p className="font-light">
                      No one on the internet can see this repository. You choose
                      who can commit.
                    </p>
                  </div>
                  <div>
                    <Switch name="visiblity" type="button" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex mt-3 flex-col gap-2 rounded-lg border p-3 shadow-sm">
              <div className="space-y-4 ">
                <div className="space-y-0.5 flex justify-between items-center">
                  <div className="space-y-0.5">
                    <label className="font-bold">Transfer ownership</label>
                    <p className="font-light">
                      No one on the internet can see this repository. You choose
                      who can commit.
                    </p>
                  </div>
                  <div>
                    <Switch name="visiblity" type="button" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex mt-3 flex-col gap-2 rounded-lg border p-3 shadow-sm">
              <div className="space-y-4 ">
                <div className="space-y-0.5 flex justify-between items-center">
                  <div className="space-y-0.5">
                    <label className="font-bold">Delete this Repository</label>
                    <p className="font-light">
                      No one on the internet can see this repository. You choose
                      who can commit.
                    </p>
                  </div>
                  <div>
                  <DeleteThisRepoDialog />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default GeneralSettings;
