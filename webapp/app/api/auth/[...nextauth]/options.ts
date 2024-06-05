import { AuthServerURL, GiteaServerURL } from "@/config";
import axios from "axios";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { cookies } from "next/headers";
let tokenCookie: any;
let dataFromDB: any;
let dataFromGitea: any;

export const optionsAuth: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credential",
      credentials: {
        email: {
          label: "Email",
          placeholder: "jhon@gmail.com",
          type: "email",
        },
        password: {
          label: "Password",
          placeholder: "password",
          type: "password",
        },
      },
      async authorize(credentials, req) {
        await axios
          .post(`${AuthServerURL}/login/getUser`, { email: credentials?.email })
          .then((res) => {
            
            dataFromDB = res.data;
            tokenCookie = res.data.giteaAccessToken;
          })
          .catch((err: any) => {
            console.log(err);
          });
        await axios
          .get(`${GiteaServerURL}/users/${dataFromDB.giteaUserName}`, {
            headers: {
              Authorization: `token ${dataFromDB.giteaAccessToken}`,
            },
          })
          .then((res) => {
            dataFromGitea = res.data;
            return res;
          })
          .catch((err) => {
            return err;
          });
        
        if (credentials?.password === dataFromDB.password) {
          
          cookies().set({
            name: "gitServerToken",
            value: tokenCookie,
            httpOnly: false,
            
            secure:false,
            
          });

          return dataFromDB;
        } else {
          return null;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth?createNewAccount=false",
    error: "/auth/error", 
    
  },
 
  callbacks: {
    session({ session, token }) {
      session.user = {
        ...session.user,
        ...dataFromGitea,
        ...dataFromDB
      };
      return session;
    },
    signIn({ user, account, profile, email, credentials }) {
      if (user) {
        // Redirect to the user's ID page
        return true
      } else {
        // Return false to display a default error message
        return false;
      }
    },
  },

  events:{
    signOut(message) {
      cookies().delete("gitServerToken")
      console.log("messageSIGNOUT",message)
    },
  }
};
