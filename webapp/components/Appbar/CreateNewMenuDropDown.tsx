import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import CreateNewRepository from "@/app/[userId]/components/CreateNewRepository";
import CreateNewOrganization from "@/app/[userId]/components/CreateNewOrganization";

function CreateNewMenuDropDown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant={"outline"} size={"sm"} className="flex space-x-2">
          <svg
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
          >
            <path d="M7.5 1v13M1 7.5h13" stroke="currentColor"></path>
          </svg>
          <Separator orientation="vertical" />
          <p>Create ...</p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Create New</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          
          onClick={(e) => {
            e.preventDefault();
            
          }}
        >
          <CreateNewRepository />
        </DropdownMenuItem >
        <DropdownMenuItem onClick={(e) => {
            e.preventDefault();
          }}><CreateNewOrganization /></DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default CreateNewMenuDropDown;
