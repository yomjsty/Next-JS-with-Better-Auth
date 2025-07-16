import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import db from "./db";
import {
    admin,
    haveIBeenPwned
} from "better-auth/plugins"
import { nextCookies } from "better-auth/next-js";
import { env } from "./env";
import { sendEmailVerificationEmail, sendForgotPasswordEmail } from "@/actions/resend";


export const auth = betterAuth({
    appName: "Next.js with Better Auth",
    database: prismaAdapter(db, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true,
        autoSignIn: false, // set to true to auto sign in after registration
        requireEmailVerification: false, // set to true to require email verification
        sendResetPassword: async ({ user, url }) => {
            await sendForgotPasswordEmail({
                email: user.email,
                url: url,
                subject: "Reset your password",
            });
        },
        resetPasswordTokenExpiresIn: 30 * 60 * 1000, // 30 minutes
    },
    emailVerification: {
        sendVerificationEmail: async ({ user, url }) => {
            await sendEmailVerificationEmail({
                fullName: user.name,
                email: user.email,
                url: url,
                subject: "Verify your email address",
            });
        },
        expiresIn: 60 * 60 * 1000, // 1 hour
        sendOnSignUp: false, // set to true to send verification email on sign up
    },
    socialProviders: {
        github: {
            clientId: env.GITHUB_CLIENT_ID,
            clientSecret: env.GITHUB_CLIENT_SECRET,
        },
        // Enable Google OAuth2.0
        // google: {
        //     clientId: env.GOOGLE_CLIENT_ID,
        //     clientSecret: env.GOOGLE_CLIENT_SECRET,
        // },
    },
    plugins: [
        admin(),
        haveIBeenPwned(),
        nextCookies(),
    ]
})