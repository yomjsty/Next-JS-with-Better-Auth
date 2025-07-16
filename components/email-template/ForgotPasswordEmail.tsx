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

interface iAppProps {
    email: string;
    url: string;
}

export function ForgotPasswordEmail({ email, url }: iAppProps) {

    return (
        <Html lang="en" dir="ltr">
            <Head />
            <Preview>Reset your password - Action required</Preview>
            <Tailwind>
                <Body className="bg-gray-100 font-sans py-[40px]">
                    <Container className="bg-white rounded-[8px] shadow-sm max-w-[600px] mx-auto p-[40px]">
                        {/* Header */}
                        <Section className="text-center mb-[32px]">
                            <Heading className="text-[24px] font-bold text-gray-900 m-0 mb-[8px]">
                                Reset Your Password
                            </Heading>
                            <Text className="text-[16px] text-gray-600 m-0">
                                We received a request to reset your password
                            </Text>
                        </Section>

                        {/* Main Content */}
                        <Section className="mb-[32px]">
                            <Text className="text-[16px] text-gray-700 mb-[16px] leading-[24px]">
                                Hello,
                            </Text>
                            <Text className="text-[16px] text-gray-700 mb-[16px] leading-[24px]">
                                We received a request to reset the password for your account associated with <strong>{email}</strong>.
                            </Text>
                            <Text className="text-[16px] text-gray-700 mb-[24px] leading-[24px]">
                                Click the button below to create a new password:
                            </Text>
                        </Section>

                        {/* Reset Button */}
                        <Section className="text-center mb-[32px]">
                            <Button
                                href={url}
                                className="bg-blue-600 text-white px-[32px] py-[12px] rounded-[6px] text-[16px] font-semibold no-underline box-border inline-block"
                            >
                                Reset Password
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

                        {/* Security Information */}
                        <Section className="border-t border-gray-200 pt-[24px] mb-[32px]">
                            <Text className="text-[14px] text-gray-600 mb-[12px] leading-[20px]">
                                <strong>Important security information:</strong>
                            </Text>
                            <Text className="text-[14px] text-gray-600 mb-[8px] leading-[20px]">
                                • This link will expire in 30 minutes
                            </Text>
                            <Text className="text-[14px] text-gray-600 mb-[8px] leading-[20px]">
                                • If you didn&apos;t request this reset, please ignore this email
                            </Text>
                            <Text className="text-[14px] text-gray-600 mb-[16px] leading-[20px]">
                                • For security reasons, this link can only be used once
                            </Text>
                            <Text className="text-[14px] text-gray-600 leading-[20px]">
                                If you continue to have problems, please contact our support team.
                            </Text>
                        </Section>

                        <Section className="border-t border-gray-200 pt-[24px]">
                            <Text className="text-[12px] text-gray-500 text-center mb-[8px] m-0">
                                © 2025 Next.js with Better Auth. All rights reserved.
                            </Text>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}