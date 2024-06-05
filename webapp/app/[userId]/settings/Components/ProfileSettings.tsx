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
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

function ProfileSettings() {
  return (
    <>
      <Card x-chunk="dashboard-04-chunk-1" className="shadow-none">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>
            Used to identify your store in the marketplace.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex gap-3  ">
            <div className="flex flex-col gap-4 flex-1 align-top">
              <div>
                <label className="font-bold">User Name:</label>
                <Input placeholder="Store Name" />
              </div>
              <div>
                <label className="font-bold">Email Address:</label>
                <Input placeholder="Store Name" />
              </div>
              <div>
                <label className="font-bold">Description:</label>
                <Textarea placeholder="Store Name" />
              </div>
              <div>
                <label className="font-bold">Location:</label>
                <Input placeholder="Store Name" />
              </div>
              <div>
                <label className="font-bold">Website:</label>
                <Input placeholder="Store Name" />
              </div>
            </div>
            <div className="flex-1 px-6 max-w-[250px]">
              <AspectRatio ratio={1 / 1}>
                <Image
                  src="https://avatars.githubusercontent.com/u/55957273?v=4"
                  alt="Photo by Drew Beamer"
                  fill
                  className="rounded-full object-cover border-2"
                />
              </AspectRatio>
            </div>
          </form>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button>Update</Button>
        </CardFooter>
      </Card>
      <Card
          x-chunk="dashboard-04-chunk-1"
          className="border-red-500 shadow-red-600"
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
                    <label className="font-bold">Delete your profile</label>
                    <p className="font-light">
                      No one on the internet can see this repository. You choose
                      who can commit.
                    </p>
                  </div>
                  <div>
                    <Button variant={"destructive"}>
                      Delete your profile
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
    </>
  );
}

export default ProfileSettings;
