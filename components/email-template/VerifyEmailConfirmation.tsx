import * as React from 'react';
import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Html,
    Link,
    Preview,
    Section,
    Text,
    Tailwind,
} from '@react-email/components';
import { env } from "@/lib/env";

interface iAppProps {
    fullName: string;
    email: string;
    url: string;
}

export function EmailVerificationEmail({ fullName, email, url }: iAppProps) {

    return (
        <Html lang="en" dir="ltr">
            <Head />
            <Preview>Please verify your email address to complete your registration</Preview>
            <Tailwind>
                <Body className="bg-gray-100 font-sans py-[40px]">
                    <Container className="bg-white rounded-[8px] shadow-sm max-w-[600px] mx-auto p-[40px]">
                        {/* Header */}
                        <Section className="text-center mb-[32px]">
                            <Heading className="text-[28px] font-bold text-gray-900 m-0 mb-[8px]">
                                Welcome to Our Platform! 🎉
                            </Heading>
                            <Text className="text-[16px] text-gray-600 m-0">
                                Just one more step to get started
                            </Text>
                        </Section>

                        {/* Main Content */}
                        <Section className="mb-[32px]">
                            <Text className="text-[16px] text-gray-700 mb-[16px] leading-[24px]">
                                Hi {fullName},
                            </Text>
                            <Text className="text-[16px] text-gray-700 mb-[16px] leading-[24px]">
                                Thank you for signing up! We&apos;re excited to have you on board.
                            </Text>
                            <Text className="text-[16px] text-gray-700 mb-[24px] leading-[24px]">
                                To complete your registration and start using your account, please verify your email address <strong>{email}</strong> by clicking the button below:
                            </Text>
                        </Section>

                        {/* Verification Button */}
                        <Section className="text-center mb-[32px]">
                            <Button
                                href={url}
                                className="bg-green-600 text-white px-[32px] py-[14px] rounded-[6px] text-[16px] font-semibold no-underline box-border inline-block"
                            >
                                Verify Email Address
                            </Button>
                        </Section>

                        {/* Alternative Link */}
                        <Section className="mb-[32px]">
                            <Text className="text-[14px] text-gray-600 mb-[16px] leading-[20px]">
                                If the button above doesn&apos;t work, copy and paste the following link into your browser:
                            </Text>
                            <Text className="text-[14px] text-blue-600 break-all leading-[20px]">
                                <Link href={url} className="text-blue-600 underline">
                                    {url}
                                </Link>
                            </Text>
                        </Section>

                        {/* Important Information */}
                        <Section className="border-t border-gray-200 pt-[24px] mb-[32px]">
                            <Text className="text-[14px] text-gray-600 mb-[12px] leading-[20px]">
                                <strong>Important:</strong>
                            </Text>
                            <Text className="text-[14px] text-gray-600 mb-[8px] leading-[20px]">
                                • This verification link will expire in one hour
                            </Text>
                            <Text className="text-[14px] text-gray-600 mb-[8px] leading-[20px]">
                                • If you didn&apos;t create this account, please ignore this email
                            </Text>
                            <Text className="text-[14px] text-gray-600 mb-[16px] leading-[20px]">
                                • Need help? Contact our support team anytime
                            </Text>
                        </Section>

                        {/* Footer */}
                        <Section className="border-t border-gray-200 pt-[24px]">
                            <Text className="text-[12px] text-gray-500 text-center mb-[8px] m-0">
                                © 2025 {env.NEXT_PUBLIC_APP_NAME}. All rights reserved.
                            </Text>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};