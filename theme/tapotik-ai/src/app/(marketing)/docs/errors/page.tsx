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
    title: "Errors",
    description:
        "Error format, HTTP status codes and retry guidance for the Tapotik AI API.",
};

export default function ErrorsPage() {
    return (
        <DocPage
            title="Errors"
            description="The API uses conventional HTTP status codes and a consistent error envelope. Codes in the 4xx range indicate a problem with the request; 5xx codes indicate a problem on our side."
        >
            <DocH2>Error format</DocH2>
            <DocP>
                Every error response contains a machine-readable{" "}
                <DocInlineCode>code</DocInlineCode>, a human-readable message
                and — when relevant — the parameter at fault plus a{" "}
                <DocInlineCode>request_id</DocInlineCode> to reference in
                support tickets.
            </DocP>
            <DocCode
                language="json"
                filename="response (422)"
                code={`{
  "error": {
    "type": "invalid_request_error",
    "code": "parameter_invalid",
    "message": "temperature must be between 0 and 2, got 3.5",
    "param": "temperature",
    "request_id": "req_8f4b21c9d0"
  }
}`}
            />

            <DocH2>Status codes</DocH2>
            <DocTable
                headers={["Status", "Code", "Meaning"]}
                rows={[
                    [
                        "400",
                        <DocInlineCode key="c">invalid_request</DocInlineCode>,
                        "Malformed JSON or missing required fields.",
                    ],
                    [
                        "401",
                        <DocInlineCode key="c">
                            authentication_error
                        </DocInlineCode>,
                        "Missing, revoked or malformed API key.",
                    ],
                    [
                        "403",
                        <DocInlineCode key="c">
                            permission_denied
                        </DocInlineCode>,
                        "Key lacks the required scope, or the feature isn't on your plan.",
                    ],
                    [
                        "404",
                        <DocInlineCode key="c">not_found</DocInlineCode>,
                        "Resource doesn't exist or belongs to another workspace.",
                    ],
                    [
                        "409",
                        <DocInlineCode key="c">conflict</DocInlineCode>,
                        "Concurrent modification — re-fetch and retry with fresh state.",
                    ],
                    [
                        "422",
                        <DocInlineCode key="c">
                            parameter_invalid
                        </DocInlineCode>,
                        "Well-formed request with semantically invalid values.",
                    ],
                    [
                        "422",
                        <DocInlineCode key="c">
                            content_policy_violation
                        </DocInlineCode>,
                        "Input or requested output violates the acceptable use policy.",
                    ],
                    [
                        "429",
                        <DocInlineCode key="c">
                            rate_limit_exceeded
                        </DocInlineCode>,
                        "Too many requests or tokens — honor Retry-After.",
                    ],
                    [
                        "429",
                        <DocInlineCode key="c">
                            insufficient_credits
                        </DocInlineCode>,
                        "Monthly credits exhausted; top up or upgrade to continue.",
                    ],
                    [
                        "500",
                        <DocInlineCode key="c">server_error</DocInlineCode>,
                        "Unexpected failure on our side — safe to retry with backoff.",
                    ],
                    [
                        "503",
                        <DocInlineCode key="c">overloaded</DocInlineCode>,
                        "Capacity is saturated; retry with backoff or switch to -flash.",
                    ],
                ]}
            />

            <DocH2>Retry guidance</DocH2>
            <DocList
                items={[
                    <>
                        <span className="font-medium text-foreground">
                            Retryable:
                        </span>{" "}
                        <DocInlineCode>429</DocInlineCode>,{" "}
                        <DocInlineCode>500</DocInlineCode>,{" "}
                        <DocInlineCode>503</DocInlineCode> — use exponential
                        backoff with jitter (see{" "}
                        <Link
                            href="/docs/rate-limits"
                            className="font-medium text-primary underline-offset-4 hover:underline"
                        >
                            rate limits
                        </Link>
                        ).
                    </>,
                    <>
                        <span className="font-medium text-foreground">
                            Not retryable:
                        </span>{" "}
                        <DocInlineCode>400</DocInlineCode>,{" "}
                        <DocInlineCode>401</DocInlineCode>,{" "}
                        <DocInlineCode>403</DocInlineCode>,{" "}
                        <DocInlineCode>422</DocInlineCode> — fix the request
                        first; identical retries will fail identically.
                    </>,
                    <>
                        Generation requests accept an{" "}
                        <DocInlineCode>Idempotency-Key</DocInlineCode> header,
                        making network-level retries safe against double
                        billing.
                    </>,
                ]}
            />

            <DocH2>Catching errors in the SDK</DocH2>
            <DocCode
                language="typescript"
                filename="app/handle-errors.ts"
                code={`import Tapotik from "@tapotik/sdk";

try {
  await client.chat.completions.create({ model: "tapotik-2-pro", messages });
} catch (err) {
  if (err instanceof Tapotik.RateLimitError) {
    // 429 — SDK already retried twice; queue and slow down
  } else if (err instanceof Tapotik.AuthenticationError) {
    // 401 — rotate or re-provision the key
  } else if (err instanceof Tapotik.APIError) {
    console.error(err.status, err.code, err.requestId);
  } else {
    throw err; // network failure, bug, etc.
  }
}`}
            />

            <DocCallout type="info">
                Include the <code>request_id</code> when contacting support — it
                lets us trace a request end-to-end across the edge network in
                seconds.
            </DocCallout>
        </DocPage>
    );
}
