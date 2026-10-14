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
    DocSteps,
    DocTable,
} from "@/components/docs/doc-blocks";

export const metadata: Metadata = {
    title: "Agents API",
    description:
        "Deploy autonomous agents that plan, execute and verify multi-step workflows — with tool calling, approval gates and full audit logs.",
};

export default function AgentsApiPage() {
    return (
        <DocPage
            title="Agents"
            description="Agents plan and execute multi-step work across your tools — up to 25 chained tool calls per run, with human approval gates on sensitive actions and a complete audit trail."
        >
            <DocH2>How a run works</DocH2>
            <DocSteps
                steps={[
                    {
                        title: "Define an agent",
                        body: (
                            <DocP>
                                An agent is a reusable configuration:
                                instructions, a model, and the tools it may
                                call. Define agents once via the API or the
                                dashboard&apos;s visual builder.
                            </DocP>
                        ),
                    },
                    {
                        title: "Start a run with a goal",
                        body: (
                            <DocP>
                                A run gives the agent a concrete goal. The agent
                                produces a plan, then executes it step by step —
                                calling tools, checking results and revising the
                                plan when reality disagrees with it.
                            </DocP>
                        ),
                    },
                    {
                        title: "Approve gated actions",
                        body: (
                            <DocP>
                                Tools marked{" "}
                                <DocInlineCode>requires_approval</DocInlineCode>{" "}
                                pause the run and emit an{" "}
                                <DocInlineCode>
                                    agent.run.awaiting_approval
                                </DocInlineCode>{" "}
                                webhook. A human (or your code) approves or
                                rejects, and the run resumes.
                            </DocP>
                        ),
                    },
                    {
                        title: "Collect the verified result",
                        body: (
                            <DocP>
                                Before finishing, the agent runs a verification
                                pass against the original goal. The final state,
                                every tool call and every token spent are
                                recorded in the audit log.
                            </DocP>
                        ),
                    },
                ]}
            />

            <DocH2>Create an agent</DocH2>
            <DocEndpoint method="POST" path="/v1/agents" />
            <DocCode
                language="typescript"
                filename="app/agent.ts"
                code={`const agent = await client.agents.create({
  name: "Refund triage",
  model: "tapotik-2-pro",
  instructions:
    "Investigate refund requests. Verify order state in Stripe, check our refund policy, then issue or escalate.",
  tools: [
    { type: "hosted", name: "web_search" },
    { type: "function", function: getOrderSchema },
    {
      type: "function",
      function: issueRefundSchema,
      requires_approval: true, // human gate on the sensitive action
    },
  ],
  max_steps: 25,
});`}
            />

            <DocH2>Start a run</DocH2>
            <DocEndpoint method="POST" path="/v1/agents/{agent_id}/runs" />
            <DocCode
                language="bash"
                filename="terminal"
                code={`curl https://api.tapotik.ai/v1/agents/agt_4kd82/runs \\
  -H "Authorization: Bearer $TAPOTIK_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "goal": "Customer usr_8f2k requests a refund for order ord_1231. Handle it.",
    "metadata": { "ticket": "SUP-4821" }
  }'`}
            />
            <DocP>
                Runs are asynchronous. Poll{" "}
                <DocInlineCode>
                    GET /v1/agents/{"{agent_id}"}/runs/{"{run_id}"}
                </DocInlineCode>{" "}
                or subscribe to <Link href="/docs/webhooks">webhooks</Link> for
                transitions.
            </DocP>

            <DocH3>Run lifecycle</DocH3>
            <DocTable
                headers={["Status", "Meaning"]}
                rows={[
                    [
                        <DocInlineCode key="s">queued</DocInlineCode>,
                        "Accepted and waiting for a worker.",
                    ],
                    [
                        <DocInlineCode key="s">planning</DocInlineCode>,
                        "The agent is producing or revising its execution plan.",
                    ],
                    [
                        <DocInlineCode key="s">executing</DocInlineCode>,
                        "Tool calls are in flight — watch the live execution graph in the dashboard.",
                    ],
                    [
                        <DocInlineCode key="s">
                            awaiting_approval
                        </DocInlineCode>,
                        "Paused on a gated action until a human approves or rejects.",
                    ],
                    [
                        <DocInlineCode key="s">verifying</DocInlineCode>,
                        "Checking the outcome against the goal before completion.",
                    ],
                    [
                        <DocInlineCode key="s">completed</DocInlineCode>,
                        "Finished successfully — result available on the run object.",
                    ],
                    [
                        <DocInlineCode key="s">failed</DocInlineCode>,
                        "Unrecoverable error or max_steps exhausted; partial trace preserved.",
                    ],
                ]}
            />

            <DocH2>Approvals</DocH2>
            <DocEndpoint
                method="POST"
                path="/v1/agents/runs/{run_id}/approvals/{approval_id}"
            />
            <DocCode
                language="typescript"
                code={`await client.agents.runs.approvals.resolve("run_9c1x", "apr_55e2", {
  decision: "approve", // or "reject" with a reason
  note: "Verified order state manually — refund is valid.",
});`}
            />
            <DocCallout type="info">
                Approvals can also be resolved from Slack or email with one
                click — connect the integrations in{" "}
                <span className="font-medium">Dashboard → Integrations</span>.
            </DocCallout>

            <DocH2>Limits and billing</DocH2>
            <DocP>
                Runs bill the underlying model tokens plus 2 credits per run for
                orchestration. A run may chain up to 25 tool calls (Enterprise:
                custom). Concurrent runs scale with your plan — see{" "}
                <Link href="/docs/rate-limits">rate limits</Link>.
            </DocP>
        </DocPage>
    );
}
