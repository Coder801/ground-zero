import type { Metadata } from "next";
import Link from "next/link";

import {
    DocCallout,
    DocCode,
    DocEndpoint,
    DocH2,
    DocH3,
    DocInlineCode,
    DocP,
    DocPage,
    DocTable,
} from "@/components/docs/doc-blocks";

export const metadata: Metadata = {
    title: "Chat API",
    description:
        "Create multi-model chat completions with streaming, tool calling, structured output and persistent memory.",
};

export default function ChatApiPage() {
    return (
        <DocPage
            title="Chat API"
            description="One endpoint for every conversational model on the platform — with streaming, tool calling, structured JSON output and optional persistent memory."
        >
            <DocH2>Create a completion</DocH2>
            <DocEndpoint method="POST" path="/v1/chat/completions" />
            <DocP>
                Send a list of messages and receive the assistant&apos;s reply.
                The request shape is identical across all models, so switching
                models is a one-line change.
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
      { "role": "system", "content": "You are a concise support agent." },
      { "role": "user", "content": "How do credits roll over?" }
    ],
    "temperature": 0.4,
    "max_tokens": 600
  }'`}
            />
            <DocCode
                language="typescript"
                filename="app/chat.ts"
                code={`const completion = await client.chat.completions.create({
  model: "tapotik-2-pro",
  messages: [
    { role: "system", content: "You are a concise support agent." },
    { role: "user", content: "How do credits roll over?" },
  ],
  temperature: 0.4,
  max_tokens: 600,
});

console.log(completion.choices[0].message.content);
console.log(completion.usage); // { input_tokens, output_tokens, credits }`}
            />

            <DocH3>Request parameters</DocH3>
            <DocTable
                headers={["Parameter", "Type", "Description"]}
                rows={[
                    [
                        <DocInlineCode key="p">model</DocInlineCode>,
                        "string · required",
                        <>
                            Model ID, e.g.{" "}
                            <DocInlineCode>tapotik-2-pro</DocInlineCode> or{" "}
                            <DocInlineCode>router/auto</DocInlineCode> for smart
                            routing.
                        </>,
                    ],
                    [
                        <DocInlineCode key="p">messages</DocInlineCode>,
                        "array · required",
                        <>
                            Conversation history. Roles:{" "}
                            <DocInlineCode>system</DocInlineCode>,{" "}
                            <DocInlineCode>user</DocInlineCode>,{" "}
                            <DocInlineCode>assistant</DocInlineCode>,{" "}
                            <DocInlineCode>tool</DocInlineCode>.
                        </>,
                    ],
                    [
                        <DocInlineCode key="p">stream</DocInlineCode>,
                        "boolean · default false",
                        "Stream tokens as server-sent events instead of a single response.",
                    ],
                    [
                        <DocInlineCode key="p">temperature</DocInlineCode>,
                        "number · 0–2 · default 0.7",
                        "Higher values increase creativity; lower values increase determinism.",
                    ],
                    [
                        <DocInlineCode key="p">max_tokens</DocInlineCode>,
                        "integer",
                        "Hard cap on generated tokens. Defaults to the model maximum.",
                    ],
                    [
                        <DocInlineCode key="p">tools</DocInlineCode>,
                        "array",
                        "JSON-schema tool definitions the model may call.",
                    ],
                    [
                        <DocInlineCode key="p">response_format</DocInlineCode>,
                        "object",
                        <>
                            Set{" "}
                            <DocInlineCode>{`{ "type": "json_schema" }`}</DocInlineCode>{" "}
                            with a schema for guaranteed structured output.
                        </>,
                    ],
                    [
                        <DocInlineCode key="p">memory_id</DocInlineCode>,
                        "string",
                        "Attach a persistent memory store so context survives across sessions.",
                    ],
                    [
                        <DocInlineCode key="p">metadata</DocInlineCode>,
                        "object",
                        "Up to 16 key-value pairs echoed back in webhooks and the audit log.",
                    ],
                ]}
            />

            <DocH2>Streaming</DocH2>
            <DocP>
                With <DocInlineCode>stream: true</DocInlineCode> the endpoint
                returns <DocInlineCode>text/event-stream</DocInlineCode> chunks.
                The final event is <DocInlineCode>[DONE]</DocInlineCode> and
                includes usage totals on the preceding chunk.
            </DocP>
            <DocCode
                language="typescript"
                filename="app/stream.ts"
                code={`const stream = await client.chat.completions.create({
  model: "router/auto",
  messages: [{ role: "user", content: "Summarize this ticket thread." }],
  stream: true,
});

for await (const chunk of stream) {
  process.stdout.write(chunk.choices[0]?.delta?.content ?? "");
}`}
            />

            <DocH2>Tool calling</DocH2>
            <DocP>
                Describe functions with JSON Schema and the model will return a{" "}
                <DocInlineCode>tool_calls</DocInlineCode> array when it wants to
                use one. Execute the call on your side, then append the result
                as a <DocInlineCode>tool</DocInlineCode> message and continue
                the loop.
            </DocP>
            <DocCode
                language="typescript"
                filename="app/tools.ts"
                code={`const completion = await client.chat.completions.create({
  model: "tapotik-2-pro",
  messages,
  tools: [
    {
      type: "function",
      function: {
        name: "get_invoice",
        description: "Fetch an invoice by ID",
        parameters: {
          type: "object",
          properties: { invoice_id: { type: "string" } },
          required: ["invoice_id"],
        },
      },
    },
  ],
});

const call = completion.choices[0].message.tool_calls?.[0];
// -> { id, function: { name: "get_invoice", arguments: '{"invoice_id":"inv_231"}' } }`}
            />

            <DocH2>Available models</DocH2>
            <DocTable
                headers={[
                    "Model",
                    "Context",
                    "Best for",
                    "Credits / 1K tokens",
                ]}
                rows={[
                    [
                        <DocInlineCode key="m">tapotik-2-pro</DocInlineCode>,
                        "200K",
                        "Flagship quality, tools and reasoning",
                        "1.0",
                    ],
                    [
                        <DocInlineCode key="m">tapotik-2-flash</DocInlineCode>,
                        "128K",
                        "High-volume, latency-sensitive workloads",
                        "0.25",
                    ],
                    [
                        <DocInlineCode key="m">router/auto</DocInlineCode>,
                        "varies",
                        "Smart routing to the best model per request",
                        "metered by routed model",
                    ],
                    [
                        <DocInlineCode key="m">openai/gpt-4o</DocInlineCode>,
                        "128K",
                        "Frontier model via unified API",
                        "2.0",
                    ],
                    [
                        <DocInlineCode key="m">
                            anthropic/claude-4-sonnet
                        </DocInlineCode>,
                        "200K",
                        "Long-context analysis and writing",
                        "1.8",
                    ],
                ]}
            />
            <DocCallout type="info">
                <code>router/auto</code> requires a Pro plan or above. It routes
                each request based on prompt complexity, latency targets and
                your monthly budget — teams typically save 40–60% on credits
                with no quality loss.
            </DocCallout>

            <DocP>
                See also: <Link href="/docs/rate-limits">rate limits</Link> for
                throughput per plan, and <Link href="/docs/errors">errors</Link>{" "}
                for retry guidance.
            </DocP>
        </DocPage>
    );
}
