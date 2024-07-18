"use client";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import "ketcher-react/dist/index.css";
import { StandaloneStructServiceProvider } from "ketcher-standalone";
const Editor = dynamic(
  () => import("ketcher-react").then((mod) => mod.Editor),
  {
    ssr: false,
  }
);

function MainChemdraw2DCanvas() {
  const [standalone, setstandalone]: any = useState(null);
  const [isloaded, setisloaded] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setstandalone(new StandaloneStructServiceProvider());
      setisloaded(true);
    } else {
      // setstandalone("")
      setisloaded(false);
    }
  }, []);
  return (
    <div className="w-full h-[80vh]">
      <div className="h-full" style={{ all: "revert", height: "80vh" }}>
        {standalone && (
          <Editor
            errorHandler={() => {}}
            // @ts-ignore
            staticResourcesUrl={""}
            structServiceProvider={standalone}
          />
        )}
      </div>
    </div>
  );
}

export default MainChemdraw2DCanvas;
