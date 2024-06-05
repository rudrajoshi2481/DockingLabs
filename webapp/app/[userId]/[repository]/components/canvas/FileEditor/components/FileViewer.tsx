import React from "react";

import MainChemdraw2DCanvas from "../../chemdraw2d/MainChemdraw2DCanvas";
import MainNglCanvas from "../../NglCanvas3d/MainNglCanvas";
import MonacoEditorComponent from "./MonacoEditorComponent";
import { CurrentlySelectedRepositoryState } from "@/state/CurrentlySelectedRepositoryState";

function FileViewer() {

  const currentlySelectedEditorFile = CurrentlySelectedRepositoryState(
    (state: any) => state.currentlySelectedEditorFile
  );


  return (
    <div className="h-full">
        <MonacoEditorComponent />
        {/* <MainNglCanvas /> */}
      {/* <MainChemdraw2DCanvas /> */}
    </div>
  );
}

export default FileViewer;
