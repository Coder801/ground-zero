import type { Metadata } from "next";

import { OverviewClient } from "./_components/overview-client";

export const metadata: Metadata = {
    title: "Dashboard",
    description:
        "Usage, costs and activity across chat, image, voice and agents — live in one dashboard.",
};

export default function DashboardPage() {
    return <OverviewClient />;
}
