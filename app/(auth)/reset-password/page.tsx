"use client"

import { Button, buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { resetPasswordSchema, ResetPasswordSchemaType } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState, useTransition } from "react"
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function ResetPasswordRoute() {
    return (
        <Suspense>
            <ResetPasswordPage />
        </Suspense>
    )
}

function ResetPasswordPage() {
    const searchParams = useSearchParams();
    const token = new URLSearchParams(searchParams).get("token");
    const router = useRouter()
    const [pending, startTransition] = useTransition()
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const toggleVisibility = () => setIsVisible((prevState) => !prevState)
    const form = useForm<ResetPasswordSchemaType>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    })

    function onSubmit(values: ResetPasswordSchemaType) {
        startTransition(async () => {
            const isConfirmationMatch = values.password === values.confirmPassword;

            if (!isConfirmationMatch) {
                toast.error("Password and confirmation do not match");
                return;
            }

            try {
                await authClient.resetPassword({
                    newPassword: values.password,
                    token: token ?? "",
                });
                toast.success("Password reset successfully, redirecting to login...")
                router.push("/login")
            } catch {
                toast.error("Something went wrong. Please try again.")
            }
        })
    }

    if (!token) {
        return (
            <Card className="">
                <CardContent>
                    <h1 className="text-2xl font-bold text-center mb-4">Invalid reset password token</h1>
                    <Link href="/login" className={cn(buttonVariants({ variant: "outline", className: "w-full" }))}>
                        Back to login
                    </Link>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>
                    Reset Password
                </CardTitle>
                <CardDescription>
                    Please enter your new password
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                className="pe-9"
                                                {...field}
                                                type={isVisible ? "text" : "password"}
                                            />
                                            <button
                                                className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                                                type="button"
                                                onClick={toggleVisibility}
                                                aria-label={isVisible ? "Hide password" : "Show password"}
                                                aria-pressed={isVisible}
                                                aria-controls="password"
                                            >
                                                {isVisible ? (
                                                    <EyeOffIcon size={16} aria-hidden="true" />
                                                ) : (
                                                    <EyeIcon size={16} aria-hidden="true" />
                                                )}
                                            </button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <div className="relative">
                                            <Input
                                                className="pe-9"
                                                {...field}
                                                type={isVisible ? "text" : "password"}
                                            />
                                            <button
                                                className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                                                type="button"
                                                onClick={toggleVisibility}
                                                aria-label={isVisible ? "Hide password" : "Show password"}
                                                aria-pressed={isVisible}
                                                aria-controls="password"
                                            >
                                                {isVisible ? (
                                                    <EyeOffIcon size={16} aria-hidden="true" />
                                                ) : (
                                                    <EyeIcon size={16} aria-hidden="true" />
                                                )}
                                            </button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full" disabled={pending}>
                            {pending && <Loader2 className="h-4 w-4 animate-spin" />}
                            Reset Password
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}