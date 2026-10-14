import type { Metadata } from "next";

import {
    DocCallout,
    DocCode,
    DocEndpoint,
    DocH2,
    DocInlineCode,
    DocList,
    DocP,
    DocPage,
    DocTable,
} from "@/components/docs/doc-blocks";

export const metadata: Metadata = {
    title: "Webhooks",
    description:
        "Subscribe to Tapotik AI events — job completions, agent approvals and billing alerts — with signed, retried deliveries.",
};

export default function WebhooksPage() {
    return (
        <DocPage
            title="Webhooks"
            description="Webhooks push events to your server as they happen — async job completions, agent lifecycle transitions and billing alerts — so you never have to poll."
        >
            <DocH2>Create an endpoint</DocH2>
            <DocEndpoint method="POST" path="/v1/webhooks" />
            <DocP>
                Register an HTTPS URL and the events you care about. Each
                endpoint gets its own signing secret, shown once at creation.
            </DocP>
            <DocCode
                language="bash"
                filename="terminal"
                code={`curl https://api.tapotik.ai/v1/webhooks \\
  -H "Authorization: Bearer $TAPOTIK_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://example.com/api/tapotik/webhook",
    "events": ["image.batch.completed", "agent.run.*"]
  }'

# -> { "id": "wh_31xk", "secret": "whsec_Zk83jf...", ... }`}
            />

            <DocH2>Events</DocH2>
            <DocTable
                headers={["Event", "Fires when"]}
                rows={[
                    [
                        <DocInlineCode key="e">
                            image.batch.completed
                        </DocInlineCode>,
                        "An async image batch finishes; payload includes signed URLs.",
                    ],
                    [
                        <DocInlineCode key="e">
                            video.render.completed
                        </DocInlineCode>,
                        "A video render finishes (or fails, with a reason).",
                    ],
                    [
                        <DocInlineCode key="e">
                            voice.render.completed
                        </DocInlineCode>,
                        "A long-form speech job finishes.",
                    ],
                    [
                        <DocInlineCode key="e">
                            agent.run.awaiting_approval
                        </DocInlineCode>,
                        "An agent run pauses on a gated action.",
                    ],
                    [
                        <DocInlineCode key="e">
                            agent.run.completed
                        </DocInlineCode>,
                        "An agent run completes with its verified result.",
                    ],
                    [
                        <DocInlineCode key="e">agent.run.failed</DocInlineCode>,
                        "An agent run fails or exhausts max_steps.",
                    ],
                    [
                        <DocInlineCode key="e">
                            billing.credits.low
                        </DocInlineCode>,
                        "Remaining monthly credits drop below your alert threshold.",
                    ],
                    [
                        <DocInlineCode key="e">key.auto_revoked</DocInlineCode>,
                        "A leaked key is detected and revoked by our scanners.",
                    ],
                ]}
            />
            <DocP>
                Wildcards are supported per resource, e.g.{" "}
                <DocInlineCode>agent.run.*</DocInlineCode> subscribes to every
                agent run transition.
            </DocP>

            <DocH2>Verify signatures</DocH2>
            <DocP>
                Every delivery is signed with HMAC-SHA256. Verify the{" "}
                <DocInlineCode>Tapotik-Signature</DocInlineCode> header before
                trusting a payload — and always compare with a timing-safe
                function.
            </DocP>
            <DocTable
                headers={["Header", "Description"]}
                rows={[
                    [
                        <DocInlineCode key="h">
                            Tapotik-Signature
                        </DocInlineCode>,
                        <>
                            Hex HMAC of{" "}
                            <DocInlineCode>{`{timestamp}.{body}`}</DocInlineCode>{" "}
                            using your endpoint secret.
                        </>,
                    ],
                    [
                        <DocInlineCode key="h">
                            Tapotik-Timestamp
                        </DocInlineCode>,
                        "Unix seconds when the delivery was signed.",
                    ],
                    [
                        <DocInlineCode key="h">Tapotik-Event-Id</DocInlineCode>,
                        "Unique delivery ID — use it to deduplicate retries.",
                    ],
                ]}
            />
            <DocCode
                language="typescript"
                filename="app/api/tapotik/webhook/route.ts"
                code={`import { createHmac, timingSafeEqual } from "node:crypto";

export async function POST(req: Request) {
  const body = await req.text();
  const timestamp = req.headers.get("tapotik-timestamp") ?? "";
  const signature = req.headers.get("tapotik-signature") ?? "";

  // Reject stale deliveries (> 5 minutes) to prevent replay.
  if (Math.abs(Date.now() / 1000 - Number(timestamp)) > 300) {
    return new Response("stale", { status: 400 });
  }

  const expected = createHmac("sha256", process.env.TAPOTIK_WEBHOOK_SECRET!)
    .update(\`\${timestamp}.\${body}\`)
    .digest("hex");

  const valid =
    signature.length === expected.length &&
    timingSafeEqual(Buffer.from(signature), Buffer.from(expected));

  if (!valid) return new Response("invalid signature", { status: 401 });

  const event = JSON.parse(body);
  // handle event.type, event.data ...

  return new Response("ok", { status: 200 });
}`}
            />

            <DocH2>Delivery and retries</DocH2>
            <DocList
                items={[
                    <>
                        Respond with a <DocInlineCode>2xx</DocInlineCode> within
                        10 seconds — do heavy work async after acknowledging.
                    </>,
                    <>
                        Failed deliveries retry with exponential backoff: 1m,
                        5m, 30m, 2h, 12h, then the endpoint is paused and admins
                        are emailed.
                    </>,
                    <>
                        Deliveries can arrive out of order and, rarely, more
                        than once — deduplicate on{" "}
                        <DocInlineCode>Tapotik-Event-Id</DocInlineCode>.
                    </>,
                    <>
                        Replay any event from the last 30 days in{" "}
                        <span className="font-medium text-foreground">
                            Dashboard → Webhooks → Deliveries
                        </span>
                        .
                    </>,
                ]}
            />

            <DocCallout type="info">
                Developing locally?{" "}
                <code>
                    tapotik listen --forward localhost:3000/api/tapotik/webhook
                </code>{" "}
                tunnels events to your machine with the same signatures as
                production.
            </DocCallout>
        </DocPage>
    );
}
