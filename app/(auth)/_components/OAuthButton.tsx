"use client"

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";
import { useTransition } from "react";
import { IoLogoGithub, IoLogoGoogle } from "react-icons/io";
import { toast } from "sonner";

export function GithubOAuthButton() {
    const [pending, startTransition] = useTransition();

    async function loginWithGithub() {
        startTransition(async () => {
            await authClient.signIn.social({
                provider: "github",
                callbackURL: "/dashboard",
                fetchOptions: {
                    onSuccess: () => {
                        toast.success("Redirecting. Please wait...")
                    },
                    onError: (error) => {
                        toast.error(error.error.message || "Something went wrong")
                    }
                }
            })
        })
    }

    return (
        <Button variant="outline" size="lg" className="w-full" onClick={loginWithGithub} disabled={pending}>
            <IoLogoGithub className="size-5" />
            Github
            {pending && <Loader2 className="size-4 ml-2 animate-spin" />}
        </Button>
    )
}

export function GoogleOAuthButton() {
    const [pending, startTransition] = useTransition();

    async function loginWithGoogle() {
        startTransition(async () => {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/dashboard",
                fetchOptions: {
                    onSuccess: () => {
                        toast.success("Redirecting. Please wait...")
                    },
                    onError: (error) => {
                        toast.error(error.error.message || "Something went wrong")
                    }
                }
            })
        })
    }

    return (
        <Button variant="outline" size="lg" className="w-full" onClick={loginWithGoogle} disabled={pending}>
            <IoLogoGoogle className="size-5" />
            Google
            {pending && <Loader2 className="size-4 ml-2 animate-spin" />}
        </Button>
    )
}