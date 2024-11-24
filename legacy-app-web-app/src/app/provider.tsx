import { ThemeProvider } from "@/components/theme-provider";
import { addAxiosHeadersAuthorizationToken } from "@/logic/addAxiosHeadersAuthorizationTokens";
import { fetchUserDetailsFromGitea } from "@/logic/fetchUserDetailsFromGitea";
import { userDetailsFromDB } from "@/logic/userDetailsFromDB";
import { userStateStore } from "@/state/UserMetaData";
import useUserAuthStore from "@/state/userAuthStore";
import { getCookie } from "cookies-next";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";

function Provider({ children }: any) {
  const { data, status, update } = useSession();
  const signIn = useUserAuthStore((state: any) => state.signIn);
  const signOut = useUserAuthStore((state: any) => state.signOut);

  useEffect(() => {
    if (status === "authenticated" || getCookie("gitServerToken")) {
      const token = getCookie("gitServerToken");
      addAxiosHeadersAuthorizationToken({ token, status: true });
     
    } else {
      addAxiosHeadersAuthorizationToken({ token: "", status: false });
    }

    if (status === "unauthenticated") {
      signOut();
    }
  }, [status]);

  return <div><ThemeProvider   attribute="class"
  defaultTheme="light"
  // enableSystem
  disableTransitionOnChange>{...children}</ThemeProvider></div>;
}

export default Provider;
