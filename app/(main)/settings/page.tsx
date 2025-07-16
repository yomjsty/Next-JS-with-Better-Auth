import { requireUser } from "@/dal/user/require-user"
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { AccountForm } from "./_components/AccountForm";
import { ArrowLeftIcon, Loader2 } from "lucide-react";
import { SecurityForm } from "./_components/SecurityForm";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export const metadata = {
    title: "Account",
    description: "Manage your account settings.",
};

export default function ProfilePage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-4 max-w-md w-full mx-auto">
            <div className="flex justify-between gap-2 w-full">
                <Link href="/dashboard" className={cn(buttonVariants({ variant: "outline" }))}>
                    <ArrowLeftIcon className="size-4" />
                    Dashboard
                </Link>
                <h1 className="text-2xl font-bold">Account Settings</h1>
            </div>
            <Suspense fallback={
                <div className="flex flex-col gap-2 justify-center items-center py-4">
                    <Loader2 className="size-12 animate-spin" />
                    Loading Account Info...
                </div>
            }>
                <RenderSettingsForm />
            </Suspense>
        </div>
    )
}

async function RenderSettingsForm() {
    const user = await requireUser();

    if (!user) {
        redirect("/login")
    }

    return (
        <div className="space-y-4 w-full">
            <AccountForm
                user={{
                    name: user.name,
                    email: user.email,
                }}
            />
            <SecurityForm userId={user.id} />
        </div>
    )
}
