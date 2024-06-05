"use client";
import React from "react";
import MainChemdraw2DCanvas from "../[userId]/[repository]/components/canvas/chemdraw2d/MainChemdraw2DCanvas";
import MainNglCanvas from "../[userId]/[repository]/components/canvas/NglCanvas3d/MainNglCanvas";
import FileEditorCanvasMain from "../[userId]/[repository]/components/canvas/FileEditor/FileEditorCanvasMain";

function page() {
  return (
    <div className="flex justify-center items-center">
      <div className="w-[70vw] h-[80vh] ">
        {/* <MainNglCanvas /> */}
<FileEditorCanvasMain />

{/* <MainChemdraw2DCanvas /> */}
        
      </div>
    </div>
  );
}

export default page;
