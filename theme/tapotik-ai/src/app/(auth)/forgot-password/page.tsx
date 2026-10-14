import type { Metadata } from "next";

import { ForgotPasswordForm } from "../_components/forgot-password-form";

export const metadata: Metadata = {
    title: "Reset password",
    description:
        "Request a secure password reset link for your Tapotik AI account.",
};

export default function ForgotPasswordPage() {
    return <ForgotPasswordForm />;
}
