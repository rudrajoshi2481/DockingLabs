import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function ProfileOrganizationCard({ data }: any) {
  
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Card className="rounded-md min-w-[350px] border-2 shadow-sm max-w-[350px] max-h-[220px] text-sm hover:shadow-md hover:rounded-lg ">
          <CardHeader>
            <div className="flex items-center">
              <Avatar>
                <AvatarImage src={data?.avatar_url} alt="icon" />
                <AvatarFallback>{data?.name}</AvatarFallback>
              </Avatar>

              <CardTitle className="ml-2 text">{data?.name}</CardTitle>
              <Badge variant={"outline"} className="ml-3">
                {data?.visibility}
              </Badge>
            </div>
            <CardDescription className="line-clamp-2 ">
              {data?.description}
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <div className="flex flex-col gap-2">
            <div className="flex align-middle">
              <Image
                src={"/location.svg"}
                width={"15"}
                height={"15"}
                alt="location"
              />
              <p className="ml-2">{data?.location}</p>
            </div>
            <div className="flex align-middle">
              <Image
                src={"/link.svg"}
                width={"15"}
                height={"15"}
                alt="location"
              />
              <Link href={data?.website}><p className="ml-2">{data?.website}</p></Link>
            </div>
            </div>
          </CardFooter>
        </Card>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Profile</ContextMenuItem>
        <ContextMenuItem>Billing</ContextMenuItem>
        <ContextMenuItem>Team</ContextMenuItem>
        <ContextMenuItem>Subscription</ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}

export default ProfileOrganizationCard;
