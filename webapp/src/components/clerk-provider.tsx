'use client';

import { ClerkProvider as Clerk } from "@clerk/nextjs";

export function ClerkProvider({ children }: { children: React.ReactNode }) {
  return (
    <Clerk>{children}</Clerk>
  );
}
