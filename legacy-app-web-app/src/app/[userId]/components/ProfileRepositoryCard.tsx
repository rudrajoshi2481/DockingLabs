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
import { userStateStore } from "@/state/UserMetaData";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function ProfileRepositoryCard({ data }: any) {
  const router = useRouter();

  const displayUserData = userStateStore((state: any) => state.displayUserData);

  useEffect(() => {}, []);

  return (
    <>
      <Link href={`/${displayUserData.username}/${data.name}`}>
        <Card
          className="rounded-md min-w-[350px] border-2 shadow-sm max-w-[350px] h-[120px]  hover:shadow-md hover:rounded-lg"
          style={{ cursor: "pointer" }}
          onClick={() => {
            // console.log("working")
            // router.push(`/${displayUserData.username}/${data.name}` )
          }}
        >
          <CardHeader>
            <div className="flex items-center">
              <p>
                <svg
                  viewBox="0 0 15 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                >
                  <path
                    d="M1.5.5V0a.5.5 0 00-.5.5h.5zm0 13H1a.5.5 0 00.5.5v-.5zM4 0v15h1V0H4zM1.5 1h10V0h-10v1zM13 2.5v9h1v-9h-1zM11.5 13h-10v1h10v-1zm-9.5.5V.5H1v13h1zm11-2a1.5 1.5 0 01-1.5 1.5v1a2.5 2.5 0 002.5-2.5h-1zM11.5 1A1.5 1.5 0 0113 2.5h1A2.5 2.5 0 0011.5 0v1zM7 5h4V4H7v1z"
                    fill="currentColor"
                  ></path>
                </svg>
              </p>
              <div className="flex items-center justify-between w-full">
                <CardTitle className="ml-2 text">{data?.name}</CardTitle>
                <Badge variant={"default"} className={`ml-3`}>
                  {data?.private ? "Private" : "Public"}
                </Badge>
              </div>
            </div>
            <CardDescription className="line-clamp-2 ">
              {data?.description}
            </CardDescription>
          </CardHeader>
        </Card>
      </Link>
    </>
    // <ContextMenu>
    //   <ContextMenuTrigger>

    //   </ContextMenuTrigger>
    //   <ContextMenuContent>
    //     <ContextMenuItem>Profile</ContextMenuItem>
    //     <ContextMenuItem>Billing</ContextMenuItem>
    //     <ContextMenuItem>Team</ContextMenuItem>
    //     <ContextMenuItem className="text-red-400 hover:text-red-400">Delete Repo</ContextMenuItem>
    //   </ContextMenuContent>
    // </ContextMenu>
  );
}

export default ProfileRepositoryCard;
