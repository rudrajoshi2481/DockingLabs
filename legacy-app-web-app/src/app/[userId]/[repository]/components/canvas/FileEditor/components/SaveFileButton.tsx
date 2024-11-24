import { Button } from "@/components/ui/button";
import React from "react";

function SaveFileButton() {
  return (
    <div className="flex gap-2">
      <Button>Save File</Button>
      <Button variant={"outline"}>Cancle</Button>
    </div>
  );
}

export default SaveFileButton;
