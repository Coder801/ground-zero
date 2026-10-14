import type { Metadata } from "next";

import { SignupForm } from "../_components/signup-form";

export const metadata: Metadata = {
    title: "Create account",
    description:
        "Create a free Tapotik AI account and get 1,000 credits — chat, image, voice and agents included.",
};

export default function SignupPage() {
    return <SignupForm />;
}
