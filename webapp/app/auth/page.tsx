"use client";
import { Libre_Baskerville_fonts } from "@/components/Appbar/Appbar";
import { AuroraBackground } from "@/components/ui/aurora-background";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { SignInComponent } from "./components/SignInComponent";
import {
  usePathname,
  useRouter,
  useParams,
  useSearchParams,
} from "next/navigation";
import { CreateNewAccount } from "./components/CreateNewAccount";

function page() {
  const router = useSearchParams();
  const [showCreateNewAcc, setshowCreateNewAcc] = useState(
    router.get("createNewAccount") === "true"
  );
  
  useEffect(() => {
    const newShowCreateNewAcc = router.get("createNewAccount") === "true";
    if (showCreateNewAcc !== newShowCreateNewAcc) {
      setshowCreateNewAcc(newShowCreateNewAcc);
    }
  }, [router]);
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[600px]">
      <div className="flex items-center justify-center h-full">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1
              className={`${Libre_Baskerville_fonts.className} text-4xl font-extrabold`}
            >
              Sorcery-Labs
            </h1>
            {/* <h1 className="text-3xl font-bold">Login</h1> */}
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          {showCreateNewAcc ? (
            <CreateNewAccount />
          ) : (
            <>
              <SignInComponent />
            </>
          )}
          {showCreateNewAcc ? (
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/auth?createNewAccount=false" className="underline">
                log in
              </Link>
            </div>
          ) : (
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/auth?createNewAccount=true" className="underline">
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
      <div className="hidden bg-muted lg:block h-full">
        <div className="grid gap-4"></div>
        <AuroraBackground className="h-[600px] w-full">
          <h1
            className={`${Libre_Baskerville_fonts.className} text-4xl font-extrabold`}
          >
            Sorcery-Labs
          </h1>
          <p className="mt-3 max-w-[550px] text-justify">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
          <p className="mt-3 max-w-[550px] text-justify">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </AuroraBackground>
      </div>
    </div>
  );
}

export default page;
