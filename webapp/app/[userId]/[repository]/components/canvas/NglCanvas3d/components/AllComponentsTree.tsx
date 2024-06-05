import React, { useEffect, useState } from "react";

import { Eye, EyeOff, SquareMinus, SquarePlus, Trash2 } from "lucide-react";
import { useNGLStore } from "../state/nglCanvasState";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function AllComponentsTree({ data }: any) {
  return (
    <div className="flex gap-3 overflow-hidden flex-col">
      {data?.map((e: any) => {
        return <ComponentEntity e={e} />;
      })}
    </div>
  );
}

const ComponentEntity = ({ e }: any) => {
  const [showSubList, setshowSubList] = useState(true);
  const [isVisible, setisVisible] = useState(true);
  const setRefresh = useNGLStore((state: any) => state.setRefresh);
  const [stage, setstage]: any = useState(useNGLStore.getState());
  useEffect(() => {
    useNGLStore.subscribe(setstage);
  }, []);

  const visiblityHandler = (o: any) => {
    o.preventDefault();

    stage.stage.compList.map((i: any) => {
      if (e.uuid === i.uuid) {
        i.reprList.map((j: any) => {
          j.setVisibility(!isVisible);
        });
      }
    });
    setRefresh();
  };

  const checkVisiblityHandler = () => {
    let anyOneVisible = false;
    stage.stage.compList.map((i: any) => {
      if (e.uuid === i.uuid) {
        i.reprList.map((j: any) => {
          if (j.getVisibility()) {
            anyOneVisible = true;
          }
        });
      }
    });

    setisVisible(anyOneVisible);
  };
  useEffect(() => {
    checkVisiblityHandler();
  }, [stage]);

  return (
    <>
      <ul className="tree text-xs">
        <li className="li flex cursor-pointer">
          <div className="flex justify-between  bg-black text-white rounded-md p-1 align-middle  w-full">
            <div
              className="flex flex-3 "
              onClick={(e) => setshowSubList(!showSubList)}
            >
              <p className="mr-2 flex  items-center">
                {showSubList ? (
                  <SquareMinus size={14} />
                ) : (
                  <SquarePlus size={14} />
                )}
              </p>
              <p className="font-bold">{e.name}</p>
            </div>
            <div className="flex gap-2">
              <p
                onClick={(e) => {
                  visiblityHandler(e);
                }}
              >
                {isVisible ? <Eye size={16} /> : <EyeOff size={16} />}
              </p>
              <p className="text-white pr-2">
                <Trash2 size={16} />
              </p>
            </div>
          </div>
        </li>
        {showSubList && (
          <ul className="ml-8">
            {e.reprList.map((i: any) => {
              return (
                <SubEntity
                  isVisibleParent={isVisible}
                  parentUUID={e.uuid}
                  i={i}
                />
              );
            })}
          </ul>
        )}
      </ul>
    </>
  );
};

const SubEntity = ({ i, parentUUID, isVisibleParent }: any) => {
  const [isVisible, setisVisible] = useState(true);
  const [isParentVisible, setisParentVisible] = useState(null);
  const [stage, setstage]: any = useState(useNGLStore.getState());
  useEffect(() => {
    useNGLStore.subscribe(setstage);
  }, []);

  useEffect(() => {
    setisParentVisible(isVisibleParent);
  }, [isVisibleParent]);

  const visiblityHandler = (e: any) => {
    e.preventDefault();
    stage.stage.compList.map((j: any) => {
      if (parentUUID === j.uuid) {
        j.reprList.map((h: any) => {
          if (h.uuid === i.uuid) {
            setisVisible(h.getVisibility());
            h.setVisibility(!isVisible);
            setisVisible(h.getVisibility());
          }
        });
      }
    });
  };

  const representationChangeHandler = () => {};

  return (
    <>
      <li className="text-xs flex  align-middle cursor-pointer hover:bg-gray-100 ">
        <div className="flex pr-1 relative justify-between w-full">
          <div className="flex w-[50px]">
            <p className=" ">{i.parameters.sele}</p>
          </div>
          <div>
            <SelectRepresentationcomponent />
          </div>
          <div className="flex gap-2 ">
            <p
              onClick={(e: any) => {
                visiblityHandler(e);
              }}
            >
              {isVisible && isParentVisible ? (
                <Eye size={16} />
              ) : (
                <EyeOff size={16} />
              )}
            </p>
            <p className="text-red-600 pr-2">
              <Trash2 size={16} />
            </p>
          </div>
        </div>
      </li>
    </>
  );
};

const SelectRepresentationcomponent = () => {
  return (
    <>
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>Place content for the popover here.</PopoverContent>
      </Popover>
    </>
    // <Select >
    //   <SelectTrigger className="w-[120px] h-[14px] rounded-none text-sm">
    //     <SelectValue placeholder="Theme" />
    //   </SelectTrigger>
    //   <SelectContent className="text-sm">
    //     <SelectItem value="light" className="text-xs h-[18px]">Light</SelectItem>
    //     <SelectItem value="dark" className="text-xs h-[18px]">Dark</SelectItem>
    //     <SelectItem value="system" className="text-xs h-[18px]">System</SelectItem>
    //   </SelectContent>
    // </Select>
  );
};

export default AllComponentsTree;
