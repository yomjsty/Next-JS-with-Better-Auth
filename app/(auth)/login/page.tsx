"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import logo from "@/public/next.svg"
import Image from "next/image";
import {
    GithubOAuthButton,
    // GoogleOAuthButton
} from "../_components/OAuthButton";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { loginSchema, LoginSchemaType } from "@/lib/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { EyeIcon, EyeOffIcon, Loader2 } from "lucide-react";
import { useState, useTransition } from "react";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export default function LoginPage() {
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const toggleVisibility = () => setIsVisible((prevState) => !prevState)
    const [emailPending, startEmailTransition] = useTransition();
    const form = useForm<LoginSchemaType>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
    })

    function onSubmit(values: LoginSchemaType) {
        startEmailTransition(async () => {
            await authClient.signIn.email({
                email: values.email,
                password: values.password,
                rememberMe: values.rememberMe,
                callbackURL: "/dashboard"
            }, {
                onSuccess: () => {
                    toast.success("Login success, redirecting...")
                },
                onError: async (error) => {
                    if (error.error.status === 403) {
                        toast.error("Please check your email for a verification link.",
                            // {
                            //     action: {
                            //         label: 'Send verification email',
                            //         onClick: () => sendVerificationEmail(values)
                            //     },
                            // }
                        );
                        return;
                    }
                    toast.error(error.error.message || "Something went wrong")
                }
            })
        })
    }

    // function sendVerificationEmail(values: LoginSchemaType) {
    //     authClient.sendVerificationEmail({
    //         email: values.email,
    //         callbackURL: "/dashboard",
    //     });
    // }

    return (
        <Card className="pb-0">
            <CardHeader>
                <Image src={logo} alt="logo" width={100} height={100} className="pb-4 dark:invert w-1/3 h-auto" priority />
                <CardTitle>Login</CardTitle>
                <CardDescription>
                    Welcome back! Login to continue
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-2">
                    <GithubOAuthButton />
                    {/* <GoogleOAuthButton /> */}
                </div>
                <div className="flex gap-2 items-center w-full">
                    <Separator className="flex-1" />
                    <span className="text-sm text-muted-foreground">or continue with</span>
                    <Separator className="flex-1" />
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" placeholder="johndoe@mail.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <div className="flex items-center">
                                        <FormLabel htmlFor="password">Password</FormLabel>
                                        <Link
                                            href="/forgot-password"
                                            className="ml-auto inline-block text-xs underline underline-offset-2 text-muted-foreground"
                                        >
                                            Forgot your password?
                                        </Link>
                                    </div>
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
                            name="rememberMe"
                            render={({ field }) => (
                                <FormItem className="flex items-center gap-2">
                                    <FormControl>
                                        <Checkbox
                                            id="rememberMe"
                                            name={field.name}
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            ref={field.ref}
                                        />
                                    </FormControl>
                                    <FormLabel htmlFor="rememberMe">Remember me</FormLabel>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full" disabled={emailPending}>
                            {emailPending && <Loader2 className="h-4 w-4 animate-spin" />}
                            Login
                        </Button>
                    </form>
                </Form>
            </CardContent>
            <CardFooter className="p-1">
                <div className="bg-muted-foreground/10 rounded-xl w-full px-4 py-5 text-center">
                    <p className="text-sm">
                        Don&apos;t have an account? <Link href="/register" className="text-primary hover:underline underline-offset-4">Register</Link>
                    </p>
                </div>
            </CardFooter>
        </Card>
    )
}
