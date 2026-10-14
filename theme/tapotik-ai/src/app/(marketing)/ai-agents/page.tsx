import type { Metadata } from "next";
import {
    CalendarClockIcon,
    DatabaseIcon,
    FileCheckIcon,
    GitBranchIcon,
    ListChecksIcon,
    PlugIcon,
    ShieldCheckIcon,
    SirenIcon,
    TargetIcon,
    UserCheckIcon,
    WorkflowIcon,
    ZapIcon,
} from "lucide-react";

import {
    HowItWorks,
    ProductFAQ,
    ProductFeatureGrid,
    ProductHero,
    UseCases,
} from "@/components/pages/product-sections";
import { Pricing } from "@/components/sections/pricing";
import { CTA } from "@/components/sections/cta";
import { products } from "@/lib/data";
import { AgentsHeroDemo } from "./_components/agents-hero-demo";

const product = products.find((p) => p.href === "/ai-agents")!;

export const metadata: Metadata = {
    title: product.name,
    description: product.description,
};

const featureItems = [
    {
        title: "Multi-step planning",
        description:
            "Agents decompose a goal into a plan of up to 25 tool calls, visible as a live execution graph.",
        icon: ListChecksIcon,
    },
    {
        title: "Tool calling",
        description:
            "Native connectors plus your own APIs via OpenAPI — agents act across the same 6,000+ apps you do.",
        icon: PlugIcon,
    },
    {
        title: "Human approval gates",
        description:
            "Mark actions as sensitive and the agent pauses for sign-off — in Slack, email or the dashboard.",
        icon: UserCheckIcon,
    },
    {
        title: "Audit logs",
        description:
            "Every thought, call and result is written to an immutable log with one-click replay.",
        icon: FileCheckIcon,
    },
    {
        title: "Parallel execution",
        description:
            "Independent steps run concurrently — real runs finish 2.3× faster than sequential agents.",
        icon: ZapIcon,
    },
    {
        title: "Triggers & schedules",
        description:
            "Kick off runs from webhooks, app events or cron. Agents work while your team sleeps.",
        icon: CalendarClockIcon,
    },
];

const steps = [
    {
        title: "Define goal & guardrails",
        description:
            "Describe the outcome, connect tools and mark which actions need human approval.",
        icon: TargetIcon,
    },
    {
        title: "Agent plans & executes",
        description:
            "Watch the live execution graph as the agent works — pause, redirect or take over anytime.",
        icon: WorkflowIcon,
    },
    {
        title: "Verify & audit",
        description:
            "The agent checks its own results against the goal, then files a replayable audit log.",
        icon: ShieldCheckIcon,
    },
];

const useCases = [
    {
        title: "Back-office ops",
        description:
            "Invoice reconciliation, renewals and reporting — recurring work that runs itself on schedule.",
        icon: DatabaseIcon,
    },
    {
        title: "Pipeline hygiene",
        description:
            "Agents enrich leads, log activities and chase stale deals across your CRM overnight.",
        icon: GitBranchIcon,
    },
    {
        title: "Incident response",
        description:
            "Triage alerts, gather context from logs and draft the postmortem before the standup.",
        icon: SirenIcon,
    },
    {
        title: "Approval workflows",
        description:
            "Automate the 90% that's routine and route only genuine judgment calls to humans.",
        icon: UserCheckIcon,
    },
];

const faqItems = [
    {
        question: "How do approval gates work?",
        answer: "You mark specific tools or actions as sensitive — sending email, moving money, changing production data. When the agent reaches one, it pauses and pings a designated approver in Slack, email or the dashboard with full context. The run resumes the moment someone approves, and every decision is recorded in the audit log.",
    },
    {
        question: "What tools can agents use?",
        answer: "All native Tapotik integrations, anything reachable through Zapier, and your own internal APIs — just point an agent at an OpenAPI spec and its endpoints become callable tools with typed arguments. Per-agent allowlists control exactly what each agent can touch.",
    },
    {
        question: "What happens when an agent fails mid-run?",
        answer: "Runs are checkpointed after every step. Transient failures retry with backoff; hard failures stop the run, roll back reversible actions and notify the owner with the full trace. Nothing silently half-completes.",
    },
    {
        question: "Can I replay and audit past runs?",
        answer: "Yes. Every run writes an immutable log of the plan, each tool call, its inputs and outputs, and every approval decision. You can replay any run step-by-step, export logs via API, and retain them per your compliance policy.",
    },
];

export default function AIAgentsPage() {
    return (
        <>
            <ProductHero
                badge={product.name}
                icon={product.icon}
                gradient={product.gradient}
                layout="stacked"
                title={
                    <>
                        Autonomy that{" "}
                        <span className="text-gradient">ships real work</span>
                    </>
                }
                description={product.description}
                highlights={product.features}
                demo={<AgentsHeroDemo />}
            />

            <ProductFeatureGrid
                title={
                    <>
                        Trustworthy autonomy,{" "}
                        <span className="text-gradient">by design</span>
                    </>
                }
                description="Everything an agent needs to act — and everything you need to stay in control."
                items={featureItems}
                gradient={product.gradient}
            />

            <HowItWorks
                title={
                    <>
                        Delegation in{" "}
                        <span className="text-gradient">three steps</span>
                    </>
                }
                steps={steps}
                gradient={product.gradient}
            />

            <UseCases
                title={
                    <>
                        Work you&apos;ll never{" "}
                        <span className="text-gradient">do by hand again</span>
                    </>
                }
                description="Start with one recurring process. Most teams add a second agent within a week."
                items={useCases}
            />

            <Pricing />

            <ProductFAQ
                description="Control, failure modes and auditability — answered up front."
                items={faqItems}
            />

            <CTA />
        </>
    );
}
