"use client"

import { buttonVariants } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { SignoutButton } from "../components/SignoutButton";
import { LayoutDashboardIcon } from "lucide-react";

export default function Home() {
  const { data: session, isPending } = authClient.useSession()

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h1 className="text-2xl font-bold">Home</h1>
      <p>Playing with <span className="font-medium">Better-Auth</span> on <span className="font-medium">Next.js</span></p>
      {
        isPending
          ?
          null
          :
          session
            ?
            (
              <div className="flex gap-2">
                <Link href="/dashboard" className={cn(buttonVariants({ variant: "outline" }))}>
                  <LayoutDashboardIcon className="size-4" />
                  Dashboard
                </Link>
                <SignoutButton />
              </div>
            )
            :
            <Link href="/login" className={cn(buttonVariants({ variant: "outline" }))}>Login</Link>
      }
    </div>
  );
}
