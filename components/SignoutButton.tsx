"use client"

import { Button } from "@/components/ui/button";
import { useSignOut } from "@/hooks/use-signout";
import { LogOutIcon } from "lucide-react";

export function SignoutButton() {
    const handleSignout = useSignOut();

    return (
        <Button onClick={handleSignout} variant="outline">
            <LogOutIcon className="size-4 rotate-180" />
            Signout
        </Button>
    )
}