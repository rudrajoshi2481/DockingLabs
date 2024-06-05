import { Button } from "@/components/ui/button";
import { CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { CircleCheckBig, Link } from "lucide-react";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function CreateNewRepository() {
  return (
    <div className="flex flex-col h-full ">
      <div className="flex  h-full">
        <div className="flex-1  flex-col flex ">
          {/* sidebar */}
          <div className="flex gap-6 items-center  p-6">
            <div>
              <svg
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
              >
                <path
                  d="M2.5 4.5a2 2 0 110-4 2 2 0 010 4zm0 0v6m2 2a2 2 0 11-2-2m2 2a2 2 0 00-2-2m2 2h5a3 3 0 003-3v-2m0 0a2 2 0 110-4 2 2 0 010 4z"
                  stroke="currentColor"
                ></path>
              </svg>
            </div>
            <div>
              <h1 className="font-semibold ">New Repository</h1>
              <p>Sorcery Labs</p>
            </div>
          </div>
          <Separator />
          <div className="p-6">
            <p>
              See{" "}
              <span className="mx-1 underline font-semibold">
                Our documentation
              </span>{" "}
              for more information on how to create and manage Git Repository
            </p>
          </div>
          <Separator />
          <div className="p-6">
            <h1 className="font-bold">Supported Fetures</h1>
            <ul className="py-3">
              <li className="flex items-center py-1">
                <CircleCheckBig size={18} className="mr-3" />
                Git Repo
              </li>
              <li className="flex items-center py-1">
                <CircleCheckBig size={18} className="mr-3" />
                Git Repo
              </li>
              <li className="flex items-center py-1">
                <CircleCheckBig size={18} className="mr-3" />
                Git Repo
              </li>
              <li className="flex items-center py-1">
                <CircleCheckBig size={18} className="mr-3" />
                Git Repo
              </li>
            </ul>
          </div>
        </div>
        <div className="flex-1 border-l px-6 min-w-[40vw]">
          <FormConp />
        </div>
      </div>
      <div className=" gap-6 mt-6 justify-end flex">
        <Button variant={"outline"}>Cancle</Button>
        <Button>Create </Button>
      </div>
    </div>
  );
}

const FormConp = () => {
  return (
    <div>
      <form className="flex flex-col gap-3 ">
        <div>
          <Tabs defaultValue="new-repo" className="w-full ">
            <TabsList className=" w-full justify-start grid grid-cols-2" >
              <TabsTrigger value="new-repo">Create New Repo</TabsTrigger>
              <TabsTrigger value="fork-repo">Fork New Repo</TabsTrigger>
            </TabsList>
            <TabsContent value="new-repo" className="mt-4 border p-4">
              <h1 className="font-semibold">1. Name of New Repository</h1>
              <div className="mt-2">
                <Input placeholder="demo" className=" border-black"/>
              </div>
            </TabsContent>
            <TabsContent value="fork-repo" className="mt-4 border p-4">
              <h1 className="font-semibold">
                1. Fork a Repo from other Providers 
              </h1>
              <div className=" my-2 flex flex-row gap-3 ">
                <div className="flex flex-col flex-1">
                <h1 className="mt-2 text-sm flex ">
                  <Link size={18} className="mr-3" />
                  URL of Repo:
                </h1>
                <Input placeholder="https://github.com/rudrajoshi2481/demo.git" className="mt-2  border-black"/>
                </div>
                <div className="flex flex-col flex-1">
                <h1 className=" mt-2 text-sm">Name of the Repo:</h1>
                <Input placeholder="demo" className="mt-2  border-black "/>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
        {/* <Separator className="my-3" /> */}
        <div className=" border p-4">
          <h1 className="font-semibold">2. Description of The Repo</h1>

          <p className="font-light text-sm">
            You will not able to change the name later
          </p>
          <Textarea className="mt-2  border-black" placeholder="Sweet Description of this repository"/>
        </div>
        
        <div className=" border p-4">
          <h1 className="font-semibold ">3. Repository Private/Public</h1>
          <div className="flex mt-3 flex-col border-black gap-2 rounded-lg border p-3 shadow-sm">
            <div className="space-y-4 ">
              <div className="space-y-0.5 flex items-center justify-between">
                <div className="space-y-0.5  ">
                  <p className="pr-6 text-sm">
                    No one on the internet can see this repository. You choose
                    who can commit.
                  </p>
                </div>

                <div>
                  <Switch
                    name="visiblity"
                    type="button"
                    // onCheckedChange={(e) =>
                    //   setFieldValue("visiblity", e, true)
                    // }
                    // checked={values.visiblity}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateNewRepository;

// "use client";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Switch } from "@/components/ui/switch";
// import { Textarea } from "@/components/ui/textarea";
// import { createNewRepository } from "@/logic/createNewRepository";
// import { Formik } from "formik";
// import { Plus } from "lucide-react";
// import Image from "next/image";
// import React, { useCallback, useState } from "react";
// import { toast } from "sonner";
// import { boolean, object, string } from "yup";

// function CreateNewRepository() {
//   const validateSchema = object({
//     name: string()
//       .min(8, "Name must be at least 8 characters")
//       .required("Name is required"),
//     description: string()
//       .min(0, "Description must be at least 30 characters")
//       .required("Description is required"),
//     visiblity: boolean(),
//   });

//   return (
//     <div>
//       <Formik
//         initialValues={{ name: "", description: "", visiblity: false }}
//         validationSchema={validateSchema}
//         onSubmit={(values, { setSubmitting }: any) => {
//           createNewRepository({ ...values })
//             .then((res) => {
//               if (res.status === 201) {
//                 toast("Successfully Created Repository");
//               } else {
//                 toast.error("FACED ERROR CREATING REPO");
//               }
//             })
//             .catch((err) => {
//               console.log(err);
//             });
//         }}
//       >
//         {({
//           values,
//           errors,
//           touched,
//           handleChange,
//           handleBlur,
//           handleSubmit,
//           isSubmitting,
//           setFieldValue,
//         }) => (
//           <form onSubmit={handleSubmit}>
//             <div className="flex mt-3 flex-col gap-2 rounded-lg border p-3 shadow-sm ">
//               <div className="space-y-4 ">
//                 <div className="space-y-0.5 ">
//                   <Label>Name of Repository:</Label>
//                   <Input
//                     name="name"
//                     type="text"
//                     onChange={handleChange("name")}
//                     onBlur={handleBlur}
//                     value={values.name}
//                     placeholder="Name of Repository"
//                   />
//                   <p className="text-red-500">
//                     {errors.name && touched.name && errors.name}
//                   </p>
//                 </div>
//               </div>
//               <div className="space-y-4 ">
//                 <div className="space-y-0.5 ">
//                   <Label>Description:</Label>
//                   <Textarea
//                     name="description"
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     value={values.description}
//                     placeholder="Description of Repository"
//                   />
//                   <p className="text-red-500">
//                     {errors.description &&
//                       touched.description &&
//                       errors.description}
//                   </p>
//                 </div>
//               </div>
//               <div className="flex mt-3 flex-col gap-2 rounded-lg border p-3 shadow-sm">
//                 <div className="space-y-4 ">
//                   <div className="space-y-0.5 flex items-center">
//                     <div className="space-y-0.5">
//                       <Label>private Repository</Label>

//                       <DialogDescription className="pr-6">
//                         No one on the internet can see this repository. You
//                         choose who can commit.
//                       </DialogDescription>
//                     </div>

//                     <div>
//                       <Switch
//                         name="visiblity"
//                         type="button"
//                         onCheckedChange={(e) =>
//                           setFieldValue("visiblity", e, true)
//                         }
//                         checked={values.visiblity}
//                       />
//                       <p className="text-red-500">
//                         {errors.visiblity &&
//                           touched.visiblity &&
//                           errors.visiblity}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="mt-6 w-full flex gap-2">
//               <Button type="submit" disabled={isSubmitting} className="w-full">
//                 Create Repositorie
//               </Button>
//             </div>
//           </form>
//         )}
//       </Formik>
//     </div>
//   );
// }

// export default CreateNewRepository;
