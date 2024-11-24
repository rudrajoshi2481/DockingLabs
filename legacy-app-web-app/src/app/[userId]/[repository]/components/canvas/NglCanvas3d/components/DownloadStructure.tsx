import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useEffect, useState } from "react";
import { useNGLStore } from "../state/nglCanvasState";

function DownloadStructure() {
  const [source, setsource] = useState("pdb");
  const [sourceid, setsourceid]: any = useState("7aad");

  
  const stage = useNGLStore((state: any) => state.stage);
  
  const setRefresh = useNGLStore((state: any) => state.setRefresh);

  const onFetchHandler = () => {
    console.log("fetch fired");
    if (source && sourceid) {
      stage
        ?.loadFile(`http://files.rcsb.org/download/${sourceid}.pdb`)
        .then((component: any) => {
          component.addRepresentation("cartoon", { color: "atomindex",sele:"polymer" });
          component.addRepresentation("ball+stick",{sele:"water"});
          component.addRepresentation("ball+stick", { sele: 'ion'});
          component.addRepresentation("ball+stick", { sele: "ligand" });
          stage?.autoView(200);
          stage?.viewer.setBackground("white");
          setRefresh()
        });

    }

    console.log("fetch fired over");
  };

  useEffect(() => {}, [stage]);

  return (
    <form className="flex gap-3 flex-col">
      <div className=" flex justify-between items-center">
        <Label className="font-bold">Source:</Label>
        <Select defaultValue="rcsb">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Source" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="rcsb">RCSB</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex justify-between items-center">
        <Label className="font-bold">PDB ID:</Label>
        <Input
          value={sourceid}
          className="w-[180px]"
          onChange={(e) => {
            setsourceid(e.target.value);
          }}
        ></Input>
      </div>
      <Button 
      size={"sm"}
        onClick={(e) => {
          e.preventDefault();
          onFetchHandler();
        }}
      >
        Fetch Structure
      </Button>
    </form>
  );
}

export default DownloadStructure;
