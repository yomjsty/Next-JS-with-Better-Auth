import { Card, CardTitle, CardContent, CardHeader } from "@/components/ui/card";
import { SetPassword } from "./SetPassword";
import { ChangePassword } from "./ChangePassword";
import { isPasswordSet } from "../actions";

export async function SecurityForm({ userId }: { userId: string }) {
    const havePassword = await isPasswordSet(userId);

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent>
                {havePassword.success ? <ChangePassword /> : <SetPassword />}
            </CardContent>
        </Card>
    )
}
