import NextAuth from "next-auth/next";
import { optionsAuth } from "./options";
import { NextRequest } from "next/server";


const handler = async (req: NextRequest, context: any) => {
    return NextAuth(req, context, optionsAuth);
};

export { handler as GET, handler as POST };