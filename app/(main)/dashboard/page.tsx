import { requireUser } from "@/dal/user/require-user"
import { SignoutButton } from "../../../components/SignoutButton";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { HomeIcon, SettingsIcon } from "lucide-react";

export default async function DashboardPage() {
    const user = await requireUser();
    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-4">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p>Welcome <span className="font-medium">{user.name}</span></p>
            <div className="flex gap-4">
                <Link href="/login" className={cn(buttonVariants({ variant: "outline" }))}>
                    <HomeIcon className="size-4" />
                    Home
                </Link>
                <Link href="/settings" className={cn(buttonVariants({ variant: "outline" }))}>
                    <SettingsIcon className="size-4" />
                    Settings
                </Link>
                <SignoutButton />
            </div>
        </div>
    )
}
