import { userStateStore } from "@/state/UserMetaData";
import { getCookie } from "cookies-next";
import React from "react";
import { Separator } from "@/components/ui/separator";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import Image from "next/image";

import { Skeleton } from "@/components/ui/skeleton";
import UserInfoEditAlertDialog from "../components/UserInfoEditAlertDialog";
import Link from "next/link";
import GenerateRandomAvatarDiceBeer from "../components/GenerateRandomAvatarDiceBeer";
import { useSession } from "next-auth/react";
import { AtSign, Link2, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

function ProfileSidebar() {
  const userData = userStateStore((state: any) => state.displayUserData);
  const { data, status } = useSession();

  return (
    <div className="container">
      <div className="flex my-9">
        <div>
          <div className="w-[300px] ">
            <AspectRatio
              ratio={6 / 6}
              className=" flex justify-center border-2  rounded-full"
            >
              {userData ? (
                <>
                  <Image
                    src={userData?.avatar_url}
                    quality={100}
                    alt="Image"
                    className="rounded-full object-cover"
                    width={200}
                    height={200}
                  />
                </>
              ) : (
                <Skeleton className="h-[300px]  w-[300px] rounded-full" />
              )}
            </AspectRatio>
          </div>
        </div>
        <div className="p-9 flex justify-between w-full">
          <div className="flex-1 max-w-[30vw]">
            {userData && (
              <>
                <h3 className="font-bold text-3xl">{userData?.full_name}</h3>

                <h3 className="font-semibold flex items-center mt-2">
                  <Mail className="mr-2" />
                  {userData?.email}
                </h3>
                <Separator className="my-2"/>
                <p className="text-justify">{userData?.description}</p>
                <Separator className="my-2"/>
                <div >
                  <Link target="_blank" href={userData?.website}>
                    <p className="flex text-blue-500">
                      <Link2 className="mr-2" />
                      {userData?.website}
                    </p>
                  </Link>
                </div>
                <p className="mt-2 flex">
                  <MapPin className="mr-2" />
                  {userData?.location}
                </p>
              </>
            )}
          </div>
          <div className="flex flex-col ">
            <div className="flex text-lg">
              <div className="mr-2 flex">
                <p className="font-bold mr-1">{userData?.followers_count}</p>{" "}
                followers
              </div>
              <div className="flex">
                <p className="font-bold mr-1"> {userData?.following_count}</p>{" "}
                following
              </div>
            </div>
            <div className="mt-2">
              <Button className="w-full">Follow</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileSidebar;

// import { userStateStore } from "@/state/UserMetaData";
// import { getCookie } from "cookies-next";
// import React from "react";
// import { Separator } from "@/components/ui/separator";
// import { AspectRatio } from "@/components/ui/aspect-ratio";
// import Image from "next/image";

// import { Skeleton } from "@/components/ui/skeleton";
// import UserInfoEditAlertDialog from "../components/UserInfoEditAlertDialog";
// import Link from "next/link";
// import GenerateRandomAvatarDiceBeer from "../components/GenerateRandomAvatarDiceBeer";
// import { useSession } from "next-auth/react";

// function ProfileSidebar() {
//   const userData = userStateStore((state: any) => state.displayUserData);
//   const { data, status } = useSession();

//   return (
//     <div className="max-w-[20vw]  top-5 min-w-[20vw] pr-9  text-sm">
//       <div className="flex justify-center">
//         <div className="w-[250px] my-6">
//           <AspectRatio
//             ratio={5 / 5}
//             className=" flex justify-center border-2  rounded-full"
//           >
//             {userData ? (
//               <>
//                 <Image
//                   src={userData?.avatar_url}
//                   quality={100}
//                   alt="Image"
//                   className="rounded-md object-cover"
//                   width={200}
//                   height={200}
//                 />
//               </>
//             ) : (
//               <Skeleton className="h-[250px] mb-3 w-[250px] rounded-xl" />
//             )}
//           </AspectRatio>
//         </div>
//       </div>

//       <Separator className="my-2" />
//       {userData ? (
//         <div>
//           <h3 className="font-bold text-xl">{userData?.full_name}</h3>
//           <h3 className="text-sm">{userData?.email}</h3>
//           <p className="mt-2  text-sm ">{userData?.description}</p>
//           {status === "authenticated" && (
//             <>
//               {/* <GenerateRandomAvatarDiceBeer /> */}
//               {/* <UserInfoEditAlertDialog /> */}
//             </>
//           )}
//           {/* button of edit profile */}
//           <div className="flex items-center mt-3 text-lg">
//             <div className="mr-2">
//               <svg
//                 viewBox="0 0 15 15"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="15"
//                 height="15"
//               >
//                 <path
//                   d="M10.5 14.49v.5h.5v-.5h-.5zm-10 0H0v.5h.5v-.5zm14 .01v.5h.5v-.5h-.5zM8 3.498a2.499 2.499 0 01-2.5 2.498v1C7.433 6.996 9 5.43 9 3.498H8zM5.5 5.996A2.499 2.499 0 013 3.498H2a3.499 3.499 0 003.5 3.498v-1zM3 3.498A2.499 2.499 0 015.5 1V0A3.499 3.499 0 002 3.498h1zM5.5 1A2.5 2.5 0 018 3.498h1A3.499 3.499 0 005.5 0v1zm5 12.99H.5v1h10v-1zm-9.5.5v-1.996H0v1.996h1zm2.5-4.496h4v-1h-4v1zm6.5 2.5v1.996h1v-1.997h-1zm-2.5-2.5a2.5 2.5 0 012.5 2.5h1a3.5 3.5 0 00-3.5-3.5v1zm-6.5 2.5a2.5 2.5 0 012.5-2.5v-1a3.5 3.5 0 00-3.5 3.5h1zM14 13v1.5h1V13h-1zm.5 1H12v1h2.5v-1zM12 11a2 2 0 012 2h1a3 3 0 00-3-3v1zm-.5-3A1.5 1.5 0 0110 6.5H9A2.5 2.5 0 0011.5 9V8zM13 6.5A1.5 1.5 0 0111.5 8v1A2.5 2.5 0 0014 6.5h-1zM11.5 5A1.5 1.5 0 0113 6.5h1A2.5 2.5 0 0011.5 4v1zm0-1A2.5 2.5 0 009 6.5h1A1.5 1.5 0 0111.5 5V4z"
//                   fill="currentColor"
//                 ></path>
//               </svg>
//             </div>
//             <div className="mr-2 flex">
//               <p className="font-bold mr-1">{userData?.followers_count}</p>{" "}
//               followers
//             </div>
//             <div className="flex">
//               <p className="font-bold mr-1"> {userData?.following_count}</p>{" "}
//               following
//             </div>
//           </div>
//           {/* following and followers */}
//           <Separator className="my-3" />
//           <div className="flex flex-col space-y-2 text-sm">
//             {userData?.location && (
//               <div className="flex items-center">
//                 <Image
//                   src={"/location.svg"}
//                   alt="location"
//                   width={15}
//                   height={15}
//                 />
//                 <p className="ml-2">{userData?.location}</p>
//               </div>
//             )}
//             {userData?.website && (
//               <div className="flex item-center">
//                 <Image
//                   src={"/link.svg"}
//                   alt="location"
//                   width={15}
//                   height={15}
//                 />
//                 {userData && (
//                   <Link target="_blank" href={userData?.website}>
//                     <p className="ml-2">{userData?.website}</p>
//                   </Link>
//                 )}
//               </div>
//             )}
//           </div>
//         </div>
//       ) : (
//         <div>
//           <Skeleton className="w-[200px] mt-2 h-[20px] rounded-full" />
//           <Skeleton className="w-[200px] mt-2 h-[20px] rounded-full" />
//           <Skeleton className="w-[300px] mt-2 h-[20px] rounded-full" />
//           <Skeleton className="w-[300px] mt-2 h-[20px] rounded-full" />
//           <Skeleton className="w-[300px] mt-2 h-[20px] rounded-full" />
//           <Skeleton className="w-[300px] mt-2 h-[20px] rounded-full" />
//         </div>
//       )}
//     </div>
//   );
// }

// export default ProfileSidebar;
