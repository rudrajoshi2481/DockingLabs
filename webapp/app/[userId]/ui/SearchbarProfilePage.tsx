import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

function SearchbarProfilePage() {
  return (
    <div className="flex gap-3">
      <Input className="border-black border" placeholder="search for people, projects, workflow, ideas in space" />
      <Button>Explore</Button>
    </div>
  );
}

export default SearchbarProfilePage;
