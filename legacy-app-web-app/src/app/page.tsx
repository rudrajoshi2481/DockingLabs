"use client";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Button } from "@/components/ui/button";
import { MovingBorderButton } from "@/components/ui/moving-border";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useSession } from "next-auth/react";
import Link from "next/link";

function Page() {
  const { data }: any = useSession();

  return (
    <div className="px-3">
      <AuroraBackground className="mt-3">
        <div className="flex justify-center flex-col items-center my-[15vh]">
          <h1 className="text-8xl font-bold">No code Bioinformatics</h1>
          <p className="text-2xl mt-2 max-w-[50vw] text-center">
            Sorcery dock is an AI-driven software creation platform where everyone can
            build, share, and ship Research fast.
          </p>

          <div className="mt-6">
            <MovingBorderButton
              borderRadius="0"
              className="bg-white  dark:bg-slate-900 text-black dark:text-white border-neutral-200  dark:border-slate-800 px-6 py-3"
            >
              Start Researching
            </MovingBorderButton>
          </div>
        </div>
      </AuroraBackground>
    </div>
  );
}

export default Page;