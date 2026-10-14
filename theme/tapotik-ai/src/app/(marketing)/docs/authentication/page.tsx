import type { Metadata } from "next";
import Link from "next/link";

import {
    DocCallout,
    DocCode,
    DocH2,
    DocInlineCode,
    DocList,
    DocP,
    DocPage,
    DocTable,
} from "@/components/docs/doc-blocks";

export const metadata: Metadata = {
    title: "Authentication",
    description:
        "Authenticate Tapotik AI requests with bearer API keys, scoped tokens and workspace headers.",
};

export default function AuthenticationPage() {
    return (
        <DocPage
            title="Authentication"
            description="The API uses bearer authentication with per-workspace API keys. Keys carry scopes, can be rotated without downtime, and every request is attributed to a key in the audit log."
        >
            <DocH2>API keys</DocH2>
            <DocP>
                Create and manage keys in{" "}
                <span className="font-medium text-foreground">
                    Dashboard → API keys
                </span>
                . A key is shown in full exactly once at creation time — after
                that only the prefix and last four characters are visible.
            </DocP>
            <DocTable
                headers={["Prefix", "Environment", "Behavior"]}
                rows={[
                    [
                        <DocInlineCode key="live">tp_live_</DocInlineCode>,
                        "Production",
                        "Bills credits, full rate limits, writes to production data.",
                    ],
                    [
                        <DocInlineCode key="test">tp_test_</DocInlineCode>,
                        "Test",
                        "Free simulated responses, relaxed limits, isolated sandbox data.",
                    ],
                    [
                        <DocInlineCode key="scoped">tp_scoped_</DocInlineCode>,
                        "Short-lived",
                        "Minted server-side for browser/mobile use. Expires in ≤ 15 minutes.",
                    ],
                ]}
            />

            <DocH2>Making authenticated requests</DocH2>
            <DocP>
                Pass your key in the{" "}
                <DocInlineCode>Authorization</DocInlineCode> header of every
                request. Requests without a valid key return{" "}
                <DocInlineCode>401 authentication_error</DocInlineCode>.
            </DocP>
            <DocCode
                language="bash"
                filename="terminal"
                code={`curl https://api.tapotik.ai/v1/models \\
  -H "Authorization: Bearer $TAPOTIK_API_KEY"`}
            />
            <DocCode
                language="typescript"
                filename="lib/tapotik.ts"
                code={`import Tapotik from "@tapotik/sdk";

// Reads TAPOTIK_API_KEY from the environment by default.
export const tapotik = new Tapotik({
  apiKey: process.env.TAPOTIK_API_KEY,
});`}
            />

            <DocH2>Workspaces and projects</DocH2>
            <DocP>
                Keys belong to a workspace. If your organization has multiple
                projects, attribute usage with the optional{" "}
                <DocInlineCode>Tapotik-Project</DocInlineCode> header — usage
                analytics and budgets are broken down per project.
            </DocP>
            <DocCode
                language="bash"
                code={`curl https://api.tapotik.ai/v1/chat/completions \\
  -H "Authorization: Bearer $TAPOTIK_API_KEY" \\
  -H "Tapotik-Project: proj_support_copilot" \\
  -H "Content-Type: application/json" \\
  -d '{ "model": "router/auto", "messages": [...] }'`}
            />

            <DocH2>Scoped tokens for clients</DocH2>
            <DocP>
                Never ship <DocInlineCode>tp_live_</DocInlineCode> keys to
                browsers or mobile apps. Instead, mint a short-lived scoped
                token from your backend and hand that to the client.
            </DocP>
            <DocCode
                language="typescript"
                filename="app/api/token/route.ts"
                code={`import { tapotik } from "@/lib/tapotik";

export async function POST() {
  const token = await tapotik.tokens.create({
    scopes: ["chat.completions:create"],
    expires_in: 900, // seconds, max 900
    metadata: { user_id: "usr_8f2k" },
  });

  return Response.json({ token: token.value }); // "tp_scoped_..."
}`}
            />

            <DocH2>Key rotation and hygiene</DocH2>
            <DocList
                items={[
                    <>
                        Rotate keys from the dashboard — the old key keeps
                        working for a configurable grace period (default 24
                        hours) so deploys can roll.
                    </>,
                    <>
                        Scope keys to the minimum surface: a key used only for
                        image generation should carry only{" "}
                        <DocInlineCode>images:create</DocInlineCode>.
                    </>,
                    <>
                        Set per-key monthly budgets to cap blast radius if a key
                        leaks.
                    </>,
                    <>
                        Watch the audit log — every request records key, IP,
                        model and credit spend.
                    </>,
                ]}
            />

            <DocCallout type="warning">
                If a key is exposed publicly (commits, client bundles, logs),
                revoke it immediately in the dashboard. Our scanners also
                monitor public GitHub repositories and will auto-revoke leaked{" "}
                <code>tp_live_</code> keys and email your workspace admins.
            </DocCallout>

            <DocP>
                Next: check <Link href="/docs/rate-limits">rate limits</Link>{" "}
                for per-key throughput, or head back to the{" "}
                <Link href="/docs/quickstart">quickstart</Link>.
            </DocP>
        </DocPage>
    );
}
