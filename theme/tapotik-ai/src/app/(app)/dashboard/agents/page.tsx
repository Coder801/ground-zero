import type { Metadata } from "next";

import { AgentsClient } from "./_components/agents-client";

export const metadata: Metadata = {
    title: "Agents",
    description:
        "Build and monitor autonomous agents — run history, step timelines and tool-call traces.",
};

export default function AgentsPage() {
    return <AgentsClient />;
}
