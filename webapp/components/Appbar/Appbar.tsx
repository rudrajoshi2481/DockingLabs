import React from "react";
import { Libre_Baskerville } from "next/font/google";
import { NavigationMenuHome } from "./NavigationMenuHome";
import { Button } from "../ui/button";
import Link from "next/link";
import useUserAuthStore from "@/state/userAuthStore";
import { UserNav } from "./UserNav";
import { FolderGit2, Plus } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import CreateNewRepository from "@/app/[userId]/components/CreateNewRepository";
import CreateNewDialog from "@/app/[userId]/components/CreateNewDialog";

export const Libre_Baskerville_fonts = Libre_Baskerville({
  weight: ["700"],
  subsets: ["latin"],
});

function Appbar() {
  const user = useUserAuthStore((state: any) => state.user);

  return (
    <div>
      <div className="container my-3 align-middle items-center flex justify-between w-full">
        <div className="flex gap-9 items-center">
          <div>
            <Link href="/">
              <h1
                className={`${Libre_Baskerville_fonts.className} text-xl font-extrabold`}
              >
                Sorcery-Labs
              </h1>
            </Link>
          </div>
        </div>
        {!user && <NavigationMenuHome />}
        <div className="flex gap-6">
          {!user && (
            <div className="flex flex-row gap-3">
              <Link href="/auth?createNewAccount=false">
                <Button variant={"outline"}>Log in</Button>
              </Link>
              <Button>Start Researching</Button>
            </div>
          )}

          {user && (
            <div className="flex gap-6">
              
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <CreateNewDialog />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Create New Repository</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          )}

          {user && (
            <div>
              <UserNav />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Appbar;
{
  /* 

// import React from "react";
// import { UserNav } from "./UserNav";
// import { useSession } from "next-auth/react";
// import SheetNavbar from "./SheetNavbar";
// import AppbarSearch from "./AppbarSearch";
// import Link from "next/link";
// import CreateNewMenuDropDown from "./CreateNewMenuDropDown";
// import { Button } from "../ui/button";
// import CreateNewRepository from "@/app/[userId]/components/CreateNewRepository";

// function Appbar() {
//   const { status } = useSession();

//   return (
//     <>
//       {/* {status === "authenticated" && <div className="p-1 bg-green-200 " />}
//       {status === "loading" && (
//         <div className="p-1 bg-yellow-200 text-center">App is loading ...</div>
//       )}

//       {status === "unauthenticated" && (
//         <div className="p-1 bg-red-400 text-center" />
//       )} */
}

//       <div className="flex justify-between p-3 ">
//         <div>
//           <div className="flex items-center">
//             {/* sidedrawer */}
//             <SheetNavbar />
//             <Link href="/">
//               {" "}
//               <svg
//                 viewBox="0 0 15 15"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="20"
//                 height="20"
//                 className="ml-3"
//               >
//                 <path
//                   d="M7.5.5l.325-.38a.5.5 0 00-.65 0L7.5.5zm-7 6l-.325-.38L0 6.27v.23h.5zm5 8v.5a.5.5 0 00.5-.5h-.5zm4 0H9a.5.5 0 00.5.5v-.5zm5-8h.5v-.23l-.175-.15-.325.38zM1.5 15h4v-1h-4v1zm13.325-8.88l-7-6-.65.76 7 6 .65-.76zm-7.65-6l-7 6 .65.76 7-6-.65-.76zM6 14.5v-3H5v3h1zm3-3v3h1v-3H9zm.5 3.5h4v-1h-4v1zm5.5-1.5v-7h-1v7h1zm-15-7v7h1v-7H0zM7.5 10A1.5 1.5 0 019 11.5h1A2.5 2.5 0 007.5 9v1zm0-1A2.5 2.5 0 005 11.5h1A1.5 1.5 0 017.5 10V9zm6 6a1.5 1.5 0 001.5-1.5h-1a.5.5 0 01-.5.5v1zm-12-1a.5.5 0 01-.5-.5H0A1.5 1.5 0 001.5 15v-1z"
//                   fill="currentColor"
//                 ></path>
//               </svg>
//             </Link>
//           </div>
//           <div>
//             <div>{/* sorcery dock logo */}</div>
//             <div>{/* userId / name */}</div>
//           </div>
//         </div>
//         <div className="flex ">
//           <div>
//             <AppbarSearch />
//           </div>
//           <div className="mx-6">
//             {
//               status === "authenticated" && <CreateNewRepository />
//             }
//             {/* <CreateNewMenuDropDown /> */}
//           </div>
//           <div>
//             {/* profile icons */}
//             {status === "authenticated" ? (
//               <UserNav />
//             ) : (
//               <Link href="/auth">
//                 <Button>Log in</Button>
//               </Link>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Appbar; */}
