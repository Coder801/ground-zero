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
    title: "Rate limits",
    description:
        "Throughput tiers per plan, rate limit headers and recommended backoff strategies for the Tapotik AI API.",
};

export default function RateLimitsPage() {
    return (
        <DocPage
            title="Rate limits"
            description="Limits are applied per API key across three dimensions: requests per minute (RPM), tokens per minute (TPM) and concurrent jobs. Your tier follows your plan and upgrades take effect immediately."
        >
            <DocH2>Limits by plan</DocH2>
            <DocTable
                headers={[
                    "Plan",
                    "Requests / min",
                    "Tokens / min",
                    "Concurrent jobs",
                ]}
                rows={[
                    ["Starter", "60", "50,000", "2"],
                    [
                        <span key="pro" className="font-medium">
                            Pro
                        </span>,
                        "600",
                        "500,000",
                        "20",
                    ],
                    [
                        "Enterprise",
                        "Custom",
                        "Custom",
                        "Custom — dedicated clusters",
                    ],
                ]}
            />
            <DocP>
                &quot;Jobs&quot; are async workloads: image batches, long voice
                renders, video generations and agent runs. Chat completions
                count against RPM/TPM only. Enterprise plans run on dedicated
                inference clusters, so limits are negotiated to your traffic
                profile — see <Link href="/pricing">pricing</Link>.
            </DocP>

            <DocH2>Rate limit headers</DocH2>
            <DocP>
                Every response includes live quota information so clients can
                self-regulate before hitting a limit.
            </DocP>
            <DocTable
                headers={["Header", "Description"]}
                rows={[
                    [
                        <DocInlineCode key="h">
                            X-RateLimit-Limit-Requests
                        </DocInlineCode>,
                        "Your RPM ceiling for this key.",
                    ],
                    [
                        <DocInlineCode key="h">
                            X-RateLimit-Remaining-Requests
                        </DocInlineCode>,
                        "Requests left in the current window.",
                    ],
                    [
                        <DocInlineCode key="h">
                            X-RateLimit-Limit-Tokens
                        </DocInlineCode>,
                        "Your TPM ceiling for this key.",
                    ],
                    [
                        <DocInlineCode key="h">
                            X-RateLimit-Remaining-Tokens
                        </DocInlineCode>,
                        "Tokens left in the current window.",
                    ],
                    [
                        <DocInlineCode key="h">
                            X-RateLimit-Reset
                        </DocInlineCode>,
                        "Seconds until the window resets.",
                    ],
                    [
                        <DocInlineCode key="h">Retry-After</DocInlineCode>,
                        "On 429 responses only — seconds to wait before retrying.",
                    ],
                ]}
            />

            <DocH2>Handling 429s</DocH2>
            <DocP>
                When a limit is exceeded the API returns{" "}
                <DocInlineCode>429 rate_limit_exceeded</DocInlineCode>. Respect{" "}
                <DocInlineCode>Retry-After</DocInlineCode> and retry with
                exponential backoff and jitter:
            </DocP>
            <DocCode
                language="typescript"
                filename="lib/backoff.ts"
                code={`async function withBackoff<T>(fn: () => Promise<T>, maxRetries = 5): Promise<T> {
  for (let attempt = 0; ; attempt++) {
    try {
      return await fn();
    } catch (err) {
      if (!(err instanceof Tapotik.RateLimitError) || attempt >= maxRetries) throw err;

      const retryAfter = Number(err.headers?.["retry-after"] ?? 0);
      const backoff = Math.min(2 ** attempt * 500, 30_000);
      const jitter = Math.random() * 250;

      await new Promise((r) => setTimeout(r, Math.max(retryAfter * 1000, backoff) + jitter));
    }
  }
}

const completion = await withBackoff(() =>
  client.chat.completions.create({ model: "tapotik-2-flash", messages })
);`}
            />
            <DocCallout type="info">
                The official SDKs retry <code>429</code> and <code>503</code>{" "}
                responses automatically (twice by default). Tune with{" "}
                <code>maxRetries</code> in the client constructor before rolling
                your own.
            </DocCallout>

            <DocH2>Staying under the limits</DocH2>
            <DocList
                items={[
                    <>
                        Stream long completions — streaming counts tokens as
                        they generate, smoothing TPM spikes.
                    </>,
                    <>
                        Use <DocInlineCode>tapotik-2-flash</DocInlineCode> or{" "}
                        <DocInlineCode>router/auto</DocInlineCode> for
                        high-volume traffic; flash tokens are cheaper and faster
                        to schedule.
                    </>,
                    <>
                        Batch image variations into a single{" "}
                        <DocInlineCode>n &gt; 1</DocInlineCode> request instead
                        of parallel single requests.
                    </>,
                    <>
                        Split traffic across keys per service — limits are per
                        key, and per-key budgets isolate noisy neighbors.
                    </>,
                ]}
            />

            <DocCallout type="warning">
                Limits protect shared capacity — they are not a throughput
                guarantee. If you consistently run above 80% of Pro limits, talk
                to us about Enterprise dedicated clusters before launch week,
                not during it.
            </DocCallout>
        </DocPage>
    );
}
