import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { userStateStore } from "@/state/UserMetaData";
import Image from "next/image";
import React from "react";
import { checkLastLoginHoursAgo } from "@/logic/misc/checkLastLoginHoursAgo";
import GenerateRandomAvatarDiceBeer from "./GenerateRandomAvatarDiceBeer";

function UserInfoEditAlertDialog() {
  const userGiteaData = userStateStore((state: any) => state.displayUserData);

  // console.log(userGiteaData,"this data")

  return (
    <Dialog>
      <DialogTrigger className="w-full my-1">
        <Button size={"sm"} className="w-full my-1">
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] min-w-[60vw] min-h-[60vh]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you{"'"}re done.
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <form className="flex justify-center align-middle mt-3">
          <div className="min-w-[350px] ">
            {/* avatar */}
            <div className="w-[320px] ">
              <AspectRatio ratio={9 / 7.5} className="justify-center align-middle flex">
                {userGiteaData ? (
                 <>
                  <Image
                    src={userGiteaData?.avatar_url}
                    alt="Image"
                    className="rounded-md object-cover"
                    width={250}
                    height={250}
                  />
                  </>
                ) : (
                  <Skeleton className="h-[250px] mb-3 w-[250px] rounded-xl" />
                )}
              </AspectRatio>
              <Separator className="my-3 w-full" />
           
            </div>
          </div>
          <div className="flex flex-col gap-2 gap-y-2 rounded-lg border p-3 shadow-sm ">
            <div className="flex flex-wrap gap-y-2 justify-between">
              <div className="space-y-4 ">
                <div className="space-y-0.5 ">
                  <Label>Login Name:</Label>
                  <Input placeholder="Jhon Doe" />
                </div>
              </div>
              <div className="space-y-4 ">
                <div className="space-y-0.5 ">
                  <Label>Full Name:</Label>
                  <Input placeholder="Jhon Doe" />
                </div>
              </div>
              <div className="space-y-4 ">
                <div className="space-y-0.5 ">
                  <Label>User Name:</Label>
                  <Input placeholder="Jhon Doe" />
                </div>
              </div>
            </div>

            <div className="space-y-4 ">
              <div className="space-y-0.5 ">
                <Label>Description:</Label>
                <Textarea placeholder="Jhon Doe" />
              </div>
            </div>
            <div className="space-y-4 ">
              <div className="space-y-0.5 ">
                <Label>Email:</Label>
                <Input placeholder="Jhon Doe" />
              </div>
            </div>
            <div className="space-y-4 ">
              <div className="space-y-0.5 ">
                <Label>Location:</Label>
                <Input placeholder="Jhon Doe" />
              </div>
            </div>
            <div className="space-y-4 ">
              <div className="space-y-0.5 ">
                <Label>Website:</Label>
                <Input placeholder="Jhon Doe" />
              </div>
            </div>
            <div className="flex mt-3 flex-col gap-2 rounded-lg border p-3 shadow-sm ">
              <div className="space-y-4 ">
                <div className="space-y-0.5 flex justify-between items-center">
                  <div className="space-y-0.5">
                    <Label>Visiblity Public?</Label>

                    <DialogDescription className="pr-6">
                      Anyone on the internet can see this repository. You choose
                      who can commit.
                    </DialogDescription>
                  </div>

                  <div>
                    <Switch checked={true} aria-readonly />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
        {/* {JSON.stringify(userGiteaData, null, 2)} */}
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}



export default UserInfoEditAlertDialog;
