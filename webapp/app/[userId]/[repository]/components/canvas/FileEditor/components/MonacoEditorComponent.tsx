import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { CurrentlySelectedRepositoryState } from "@/state/CurrentlySelectedRepositoryState";
import { poppins } from "@/app/layout";
function MonacoEditorComponent() {

  const [Value, setValue]:any = useState(null)

  const currentlySelectedEditorFile = CurrentlySelectedRepositoryState(
    (state: any) => state.currentlySelectedEditorFile
  );


  useEffect(() => {
    
    let decodedString = atob(currentlySelectedEditorFile.content);
    
    
    setValue(decodedString)

  },[])

  return (
    <div style={{ height: "80vh" }} className="shadow-sm">
      <Editor defaultLanguage="pdb" value={Value} className={poppins.className}/>
    </div>
  );
}

export default MonacoEditorComponent;
