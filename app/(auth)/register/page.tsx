"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import logo from "@/public/next.svg"
import Image from "next/image";
import {
    GithubOAuthButton,
    //  GoogleOAuthButton
} from "../_components/OAuthButton";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { registerSchema, RegisterSchemaType } from "@/lib/zodSchema";
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
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
    const [isVisible, setIsVisible] = useState<boolean>(false)
    const toggleVisibility = () => setIsVisible((prevState) => !prevState)
    const [emailPending, startEmailTransition] = useTransition();
    const router = useRouter();
    const form = useForm<RegisterSchemaType>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
        },
    })

    function onSubmit(values: RegisterSchemaType) {
        startEmailTransition(async () => {
            const isConfirmationMatch = values.password === values.confirmPassword;

            if (!isConfirmationMatch) {
                toast.error("Password and confirmation do not match");
                return;
            }

            await authClient.signUp.email({
                email: values.email,
                password: values.password,
                name: values.name,
                callbackURL: "/login"
            }, {
                onSuccess: () => {
                    toast.success("Register success, please check your email for a verification link.")
                    router.push("/login")
                },
                onError: (ctx) => {
                    toast.error(ctx.error.message)
                },
            });
        })
    }

    return (
        <Card className="pb-0">
            <CardHeader>
                <Image src={logo} alt="logo" width={100} height={100} className="pb-4 dark:invert w-1/3 h-auto" priority />
                <CardTitle>Register</CardTitle>
                <CardDescription>
                    Welcome! Create an account to get started
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
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="John Doe" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
                                    <FormLabel htmlFor="password">Password</FormLabel>
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
                                    <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
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
                        <div className="space-y-2">
                            <Button type="submit" className="w-full" disabled={emailPending}>
                                {emailPending && <Loader2 className="h-4 w-4 animate-spin" />}
                                Register
                            </Button>
                            <p className="text-xs text-muted-foreground">By clicking register, you agree to our <Link href="/terms" className="text-primary hover:underline underline-offset-4">Terms of Service</Link> and <Link href="/privacy" className="text-primary hover:underline underline-offset-4">Privacy Policy</Link></p>
                        </div>
                    </form>
                </Form>
            </CardContent>
            <CardFooter className="p-1">
                <div className="bg-muted-foreground/10 rounded-xl w-full px-4 py-5 text-center">
                    <p className="text-sm">
                        Already have an account? <Link href="/login" className="text-primary hover:underline underline-offset-4">Login</Link>
                    </p>
                </div>
            </CardFooter>
        </Card>
    )
}
