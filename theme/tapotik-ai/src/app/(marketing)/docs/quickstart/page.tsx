import type { Metadata } from "next";
import Link from "next/link";

import {
    DocCallout,
    DocCode,
    DocH2,
    DocInlineCode,
    DocP,
    DocPage,
    DocSteps,
} from "@/components/docs/doc-blocks";

export const metadata: Metadata = {
    title: "Quickstart",
    description:
        "Make your first Tapotik AI request in under five minutes — create a key, install an SDK and stream your first completion.",
};

export default function QuickstartPage() {
    return (
        <DocPage
            title="Quickstart"
            description="From zero to your first streamed completion in under five minutes. Everything here works on the free Starter plan."
        >
            <DocH2>Get started</DocH2>
            <DocSteps
                steps={[
                    {
                        title: "Create an account and grab an API key",
                        body: (
                            <>
                                <DocP>
                                    Sign up at{" "}
                                    <Link href="/signup" prefetch={false}>
                                        tapotik.ai/signup
                                    </Link>{" "}
                                    — the Starter plan includes 1,000 free
                                    credits, no card required. Then create a key
                                    in{" "}
                                    <span className="font-medium text-foreground">
                                        Dashboard → API keys
                                    </span>
                                    . Keys look like{" "}
                                    <DocInlineCode>
                                        tp_live_a1b2c3…
                                    </DocInlineCode>{" "}
                                    and are shown once, so store yours in a
                                    secret manager.
                                </DocP>
                                <DocCode
                                    language="bash"
                                    filename=".env"
                                    code={`TAPOTIK_API_KEY=tp_live_a1b2c3d4e5f6...`}
                                />
                            </>
                        ),
                    },
                    {
                        title: "Install the SDK",
                        body: (
                            <>
                                <DocP>
                                    Typed SDKs are available for TypeScript,
                                    Python and Go. The raw REST API works with
                                    any HTTP client if you prefer.
                                </DocP>
                                <DocCode
                                    language="bash"
                                    code={`npm install @tapotik/sdk
# or: pip install tapotik / go get github.com/tapotik/tapotik-go`}
                                />
                            </>
                        ),
                    },
                    {
                        title: "Make your first request",
                        body: (
                            <>
                                <DocP>
                                    Send a chat completion. The same request
                                    shape works for every model on the platform.
                                </DocP>
                                <DocCode
                                    language="bash"
                                    filename="terminal"
                                    code={`curl https://api.tapotik.ai/v1/chat/completions \\
  -H "Authorization: Bearer $TAPOTIK_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "model": "tapotik-2-pro",
    "messages": [
      { "role": "user", "content": "Write a haiku about latency." }
    ]
  }'`}
                                />
                                <DocCode
                                    language="typescript"
                                    filename="app/main.ts"
                                    code={`import Tapotik from "@tapotik/sdk";

const client = new Tapotik({ apiKey: process.env.TAPOTIK_API_KEY });

const completion = await client.chat.completions.create({
  model: "tapotik-2-pro",
  messages: [{ role: "user", content: "Write a haiku about latency." }],
});

console.log(completion.choices[0].message.content);`}
                                />
                            </>
                        ),
                    },
                    {
                        title: "Stream the response",
                        body: (
                            <>
                                <DocP>
                                    Pass{" "}
                                    <DocInlineCode>stream: true</DocInlineCode>{" "}
                                    to receive server-sent events as tokens are
                                    generated — first tokens typically arrive in
                                    under 100ms.
                                </DocP>
                                <DocCode
                                    language="typescript"
                                    filename="app/stream.ts"
                                    code={`const stream = await client.chat.completions.create({
  model: "tapotik-2-pro",
  messages: [{ role: "user", content: "Explain vector search simply." }],
  stream: true,
});

for await (const chunk of stream) {
  process.stdout.write(chunk.choices[0]?.delta?.content ?? "");
}`}
                                />
                            </>
                        ),
                    },
                ]}
            />

            <DocCallout type="warning">
                Never expose <code>tp_live_…</code> keys in browser code or
                mobile apps. Call the API from your backend, or mint short-lived
                scoped tokens as described in{" "}
                <Link
                    href="/docs/authentication"
                    className="font-medium underline underline-offset-4"
                >
                    Authentication
                </Link>
                .
            </DocCallout>

            <DocH2>Where to go next</DocH2>
            <DocP>
                Explore the <Link href="/docs/chat">Chat API</Link> for tools
                and structured output, generate visuals with the{" "}
                <Link href="/docs/images">Image API</Link>, or wire up{" "}
                <Link href="/docs/webhooks">webhooks</Link> to react to async
                jobs. When you&apos;re ready for production, review{" "}
                <Link href="/docs/rate-limits">rate limits</Link> and{" "}
                <Link href="/docs/errors">error handling</Link>.
            </DocP>
        </DocPage>
    );
}
