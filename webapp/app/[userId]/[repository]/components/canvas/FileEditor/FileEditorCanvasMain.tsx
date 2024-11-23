import React, { useEffect, useState } from "react";

import FileEditorToolbar from "./components/FileEditorToolbar";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { CurrentlySelectedRepositoryState } from "@/state/CurrentlySelectedRepositoryState";
import { MovingBorderButton } from "@/components/ui/moving-border";
import MainChemdraw2DCanvas from "../chemdraw2d/MainChemdraw2DCanvas";
import MainNglCanvas from "../NglCanvas3d/MainNglCanvas";

const FileViewer = dynamic(() => import("./components/FileViewer"), {
  ssr: false,
  loading: () => <h1>Loading</h1>,
});


function FileEditorCanvasMain() {
  const [show, setshow] = useState("text-editor")
  const currentlySelectedEditorFile = CurrentlySelectedRepositoryState(
    (state: any) => state.currentlySelectedEditorFile
  );


  return (
    <>
      {/* <FileEditorToolbar /> */}

      <div className="bg-gray-50  mt-3 border  w-full ">
        <ul className="flex file-editor-canvas overflow-x-scroll">

          <div className="border bg-white px-1 flex text-sm items-center">
            <li className="pl-2">{currentlySelectedEditorFile.name}</li>
            <Button size={"sm"} variant={"ghost"} className="ml-2">
              <X size={18} />
            </Button>
          </div>


          {/* right now multiple tabs is not implemented  */}
          {/* {data.map((e) => {
            return (
              <div className="border bg-white px-1 flex text-sm items-center">
                <li className="pl-2">{e.fileName}</li>
                <Button size={"sm"} variant={"ghost"} className="ml-2">
                  <X size={18} />
                </Button>
              </div>
            );
          })} */}
        </ul>
      </div>
          <div>
            <Button onClick={() => {
              setshow("text-editor")
            }}>Show Text Editor</Button>
            <Button onClick={() => {
              setshow("chemdraw")
            }}>Chemdraw</Button>
            <Button onClick={() => {
              setshow("pymol")
            }}>Molecular visualizer</Button>
            </div>
      <div className="border  my-3">
        <div className="min-h-[80vh]">
          {
            show === "text-editor" ? <FileViewer /> : null
          }
          {
            show === "chemdraw" ? <MainChemdraw2DCanvas /> : null
          }
          {
            show === "pymol" ? <MainNglCanvas /> : null
          }
        </div>
      </div>
    </>
  );
}

export default FileEditorCanvasMain;
