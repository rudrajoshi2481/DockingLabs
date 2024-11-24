import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useCallback, useEffect, useState } from "react";
import { createAvatar, Options } from "@dicebear/core";
import { notionists, lorelei } from "@dicebear/collection";
import Image from "next/image";
import { updateProfileAvatar } from "@/logic/updateProfileAvatar";

function GenerateRandomAvatarDiceBeer() {
  const [selected, setselected]: any = useState();

  const [avatarsNotionist, setavatarsNotionist]: any = useState();
  const [avatarsLorelei, setavatarsLorelei]: any = useState();

  const generateAvatars = useCallback(async () => {
    let avatarsNotionistURI: any = [];
    let avatarsLoreleiURI: any = [];
    for (let i = 0; i < 5; i++) {
      const avat = createAvatar(lorelei, {
        seed: `random ${i + Date.now()}`,
        size: 128,
      });

      const avatarDataUri = await avat.toDataUri();
      let avatarDataUriSVG:any = await avat.png({includeExif:true}).toDataUri()

      
      avatarsLoreleiURI.push({ avatarDataUri, avatarDataUriSVG,id: i });
    }

    for (let i = 0; i < 5; i++) {
      const avat = createAvatar(notionists, {
        seed: `random ${i + Date.now()}`,
        gesture: [
          "wavePointLongArms",
          "waveOkLongArms",
          "waveLongArms",
          "waveLongArm",
          "pointLongArm",
          "okLongArm",
          "point",
          "ok",
          "hand",
          "handPhone",
        ],
        gestureProbability: 10,
        lips: [`variant25`],
        size: 128,
      });

      // Convert PNG image data to Base64
      const avatarDataUri = await avat.toDataUri();
      // const avatarBase64 = avatarDataUri.split(",")[1]; // Extract base64 part

        // const avatarDataUri = await avat.toDataUri();
        let avatarDataUriSVG:any = await avat.png({includeExif:true}).toDataUri()
        
      //   let d = avat.toJson()

      avatarsNotionistURI.push({ avatarDataUri, avatarDataUriSVG, id: i + 25 });
    }

    setavatarsNotionist(avatarsNotionistURI);
    setavatarsLorelei(avatarsLoreleiURI);
  }, []);

  useEffect(() => {
    generateAvatars();
  }, [generateAvatars]);

  return (
    <Dialog>
      <DialogTrigger className="w-full my-1">
        <Button variant={"default"} className="w-full my-1" size={"sm"}>
          Update Avatar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] min-w-[70vw] min-h-[60vh]">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <div className="flex ">
          <div className="flex flex-col justify-center ">
            {/* <h1 className="my-3 text-xl font-bold">Style Notionist</h1> */}
            <div className="flex   flex-wrap gap-5 mt-9">
              {avatarsNotionist?.map((e: any) => {
                return (
                  <div>
                    <Image
                      onClick={(i) => {
                        setselected(e);
                      }}
                      key={e}
                      src={e.avatarDataUri}
                      className="p-3 border border-black shadow-md hover:border-3 hover:shadow-xl hover:border-blue-500"
                      width={150}
                      height={150}
                      alt="image"
                    />
                  </div>
                );
              })}
            </div>
            {/* <h1 className="my-3 mt-9 text-xl font-bold text-left">Style Lorelei</h1> */}
            <div className="flex  flex-wrap gap-5 mt-9">
              {avatarsLorelei?.map((e: any) => {
                return (
                  <div>
                    
                    <Image
                      key={e}
                      onClick={(i) => {
                        setselected(e);
                      }}
                      src={e.avatarDataUri}
                      className="p-3 border border-black shadow-md hover:border-3 hover:shadow-xl hover:border-blue-500"
                      width={150}
                      height={150}
                      alt="image"
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex align-middle ml-12">
            {selected && (
              <div className="flex justify-center items-center">
                <div>
                  <h1 className="mb-3 font-bold text-2xl text-center">
                    Selected Avatar{" "}
                  </h1>

                  <Image
                    key={selected}
                    src={selected.avatarDataUri}
                    className="p-3 border border-black shadow-md hover:border-3 hover:shadow-xl hover:border-blue-500"
                    width={250}
                    height={250}
                    alt="image"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button
            variant={"outline"}
            className="mt-6"
            onClick={() => {
              generateAvatars();
            }}
          >
            Generate Random
          </Button>
          <Button
            className="mt-6"
            onClick={() => {
              //   const b = new Buffer.from().toString("base64");

              console.log(selected.avatarDataUriSVG.split(",")[1]);
              //    console.log(btoa(selected.avatarBase64))
              updateProfileAvatar({ image: selected.avatarDataUriSVG.split(",")[1] })
                .then((res) => {
                  console.log(res);
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
          >
            Update Profile
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default GenerateRandomAvatarDiceBeer;
