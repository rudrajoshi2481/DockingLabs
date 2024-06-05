import React from "react";
import FileEditorMenuBar from "./FileEditorMenuBar";

import SaveFileButton from "./SaveFileButton";

function FileEditorToolbar() {
  return (
    <>
      <div className="flex justify-end">
        {/* <FileEditorMenuBar /> */}
        <SaveFileButton />
        
      </div>
    </>
  );
}

export default FileEditorToolbar;
