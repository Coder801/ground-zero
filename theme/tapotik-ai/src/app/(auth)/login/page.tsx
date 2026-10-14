import type { Metadata } from "next";

import { LoginForm } from "../_components/login-form";

export const metadata: Metadata = {
    title: "Sign in",
    description:
        "Sign in to your Tapotik AI workspace — chat, image, voice and agents in one place.",
};

export default function LoginPage() {
    return <LoginForm />;
}
