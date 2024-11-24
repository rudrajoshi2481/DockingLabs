import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

function AppbarSearch() {
  return (
    <div className="flex relative " >
      
      <Input type="search"  className="min-w-[20vw] mr-1" placeholder="Search & Explore Open Source Projects ..."  />
      
    </div>
  );
}

export default AppbarSearch;
