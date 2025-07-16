"use client"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { CardContent } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"
import { accountSchema, AccountSchemaType } from "@/lib/zodSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

export function AccountForm({ user }: { user: AccountSchemaType }) {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    const form = useForm<AccountSchemaType>({
        resolver: zodResolver(accountSchema),
        defaultValues: {
            name: user.name,
            email: user.email,
        },
    })

    function onSubmit(values: AccountSchemaType) {
        startTransition(async () => {
            try {
                await authClient.updateUser({
                    name: values.name,
                })
                toast.success("Account updated successfully")
                router.refresh()
            } catch {
                toast.error("An unexpected error occurred. Please try again later.")
            }
        })
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Account Information</CardTitle>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input type="email" disabled readOnly {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        You cannot change your email address.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="John Doe" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={isPending || !form.formState.isDirty}>
                            {isPending ? (
                                <>
                                    <Loader2 className="size-4 animate-spin" />
                                    Saving...
                                </>
                            ) : "Save"}
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}