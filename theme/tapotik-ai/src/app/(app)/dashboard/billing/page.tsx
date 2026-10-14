import type { Metadata } from "next";

import { BillingClient } from "./_components/billing-client";

export const metadata: Metadata = {
    title: "Billing",
    description:
        "Manage your Tapotik AI plan, credits, payment method and invoice history.",
};

export default function BillingPage() {
    return <BillingClient />;
}
