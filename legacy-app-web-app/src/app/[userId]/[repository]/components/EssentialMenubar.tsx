import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React from "react";
import CreateNewFileDialog from "./CreateNewFileDialog";
import CreateNewFolderDialog from "./CreateNewFolderDialog";

function EssentialMenubar() {
  return (
    <div className="flex gap-3">
      <div>
        <CreateNewFileDialog />
      </div>
      <div>
        <CreateNewFolderDialog />
      </div>
    </div>
  );
}

export default EssentialMenubar;
