import type { Metadata } from "next";

import { SettingsClient } from "./_components/settings-client";

export const metadata: Metadata = {
    title: "Settings",
    description:
        "Manage your Tapotik AI profile, workspace members, API keys and notification preferences.",
};

export default function SettingsPage() {
    return <SettingsClient />;
}
