import React, { useEffect, useState } from "react";
import AllComponentsTree from "./AllComponentsTree";
import DownloadStructure from "./DownloadStructure";
import { useNGLStore } from "../state/nglCanvasState";

function WorldComponent() {
  const [stage, setstage]: any = useState(useNGLStore.getState());
  useEffect(() => {
    useNGLStore.subscribe(setstage);
  }, []);

  const [fileTree, setfileTree] = useState(null);

  useEffect(() => {
    if (!stage) return;

    let finalTree: any = [];

    console.log(stage?.stage)

    stage?.stage?.compList.map((e: any) => {
      finalTree.push({
        reprList: e.reprList,
        title: e.object.title,
        name: e.object.name,
        uuid: e.uuid,
      });
    });

    setfileTree(finalTree);
  }, [stage]);

  return (
    <div className="relative ">
      <form className="grid w-full items-start gap-6 overflow-auto p-0 pb-3 pt-0 ">
        <fieldset className="grid gap-6 rounded-lg border p-3 bg-white">
          <legend className="-ml-1 px-1 text-sm font-medium">
            All Components
          </legend>
          <AllComponentsTree data={fileTree} />
        </fieldset>
      </form>

      <div className="border p-6 rounded-md sticky  bottom-0 bg-white">
        <DownloadStructure />
      </div>
    </div>
  );
}

export default WorldComponent;
