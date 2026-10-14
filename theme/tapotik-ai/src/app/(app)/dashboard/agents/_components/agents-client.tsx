"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
    BotIcon,
    BrainCircuitIcon,
    CheckIcon,
    PlusIcon,
    ShieldCheckIcon,
    XIcon,
    ZapIcon,
    type LucideIcon,
} from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { IconTile } from "@/components/effects/icon-tile";

type AgentStatus = "Active" | "Paused" | "Draft";

const agents: {
    name: string;
    description: string;
    status: AgentStatus;
    tools: string[];
    runs: string;
    successRate: string;
    lastRun: string;
    gradient: string;
}[] = [
    {
        name: "support-triage",
        description:
            "Categorizes inbound tickets, drafts replies and escalates edge cases to humans.",
        status: "Active",
        tools: ["Zendesk", "Slack", "tapotik-v4"],
        runs: "1,284",
        successRate: "98.2%",
        lastRun: "2m ago",
        gradient: "from-primary to-secondary",
    },
    {
        name: "lead-enricher",
        description:
            "Enriches new signups with firmographics and routes hot leads to account execs.",
        status: "Active",
        tools: ["Clearbit", "Salesforce", "Webhooks"],
        runs: "863",
        successRate: "96.7%",
        lastRun: "12m ago",
        gradient: "from-accent to-primary",
    },
    {
        name: "report-writer",
        description:
            "Compiles the weekly usage digest and posts it to #leadership every Monday.",
        status: "Paused",
        tools: ["BigQuery", "Notion", "Slack"],
        runs: "214",
        successRate: "99.1%",
        lastRun: "3d ago",
        gradient: "from-warning to-pink",
    },
    {
        name: "code-reviewer",
        description:
            "First-pass review on pull requests — style, missing tests and obvious bugs.",
        status: "Draft",
        tools: ["GitHub", "tapotik-v4"],
        runs: "12",
        successRate: "91.4%",
        lastRun: "1w ago",
        gradient: "from-pink to-secondary",
    },
];

const agentStatusVariant: Record<
    AgentStatus,
    "success" | "warning" | "secondary"
> = {
    Active: "success",
    Paused: "warning",
    Draft: "secondary",
};

type RunStatus = "Completed" | "Running" | "Failed";

type ToolCall = {
    tool: string;
    action: string;
    duration: string;
    ok: boolean;
};

type Phase = {
    name: "Plan" | "Execute" | "Verify";
    status: "done" | "active" | "failed" | "pending";
    duration: string;
    summary: string;
    toolCalls: ToolCall[];
};

type Run = {
    id: string;
    agent: string;
    trigger: "Schedule" | "Webhook" | "Manual";
    stepsDone: number;
    stepsTotal: number;
    status: RunStatus;
    duration: string;
    timestamp: string;
    timeline: Phase[];
};

const runs: Run[] = [
    {
        id: "run_8f2c41",
        agent: "support-triage",
        trigger: "Schedule",
        stepsDone: 5,
        stepsTotal: 5,
        status: "Completed",
        duration: "4m 12s",
        timestamp: "Today, 09:42",
        timeline: [
            {
                name: "Plan",
                status: "done",
                duration: "0:14",
                summary: "Fetched 142 open tickets, clustered into 6 intents.",
                toolCalls: [
                    {
                        tool: "zendesk.list_tickets",
                        action: "142 tickets fetched",
                        duration: "3.2s",
                        ok: true,
                    },
                    {
                        tool: "tapotik-v4.classify",
                        action: "6 intent clusters",
                        duration: "8.1s",
                        ok: true,
                    },
                ],
            },
            {
                name: "Execute",
                status: "done",
                duration: "3:21",
                summary: "Drafted 134 replies, tagged 8 for human review.",
                toolCalls: [
                    {
                        tool: "tapotik-v4.draft_reply",
                        action: "134 drafts generated",
                        duration: "2m 58s",
                        ok: true,
                    },
                    {
                        tool: "zendesk.update_ticket",
                        action: "142 tickets updated",
                        duration: "18.4s",
                        ok: true,
                    },
                    {
                        tool: "slack.post_message",
                        action: "8 escalations → #support",
                        duration: "2.2s",
                        ok: true,
                    },
                ],
            },
            {
                name: "Verify",
                status: "done",
                duration: "0:37",
                summary: "Spot-checked 10% of drafts — 0 policy violations.",
                toolCalls: [
                    {
                        tool: "tapotik-v4.judge",
                        action: "14/14 drafts pass rubric",
                        duration: "31s",
                        ok: true,
                    },
                ],
            },
        ],
    },
    {
        id: "run_7d90aa",
        agent: "lead-enricher",
        trigger: "Webhook",
        stepsDone: 3,
        stepsTotal: 5,
        status: "Running",
        duration: "1m 38s",
        timestamp: "Today, 09:44",
        timeline: [
            {
                name: "Plan",
                status: "done",
                duration: "0:09",
                summary: "38 new signups queued for enrichment.",
                toolCalls: [
                    {
                        tool: "webhook.receive",
                        action: "batch of 38 signups",
                        duration: "0.3s",
                        ok: true,
                    },
                ],
            },
            {
                name: "Execute",
                status: "active",
                duration: "1:29",
                summary: "Enriching companies and scoring fit…",
                toolCalls: [
                    {
                        tool: "clearbit.enrich",
                        action: "26/38 companies resolved",
                        duration: "1m 12s",
                        ok: true,
                    },
                    {
                        tool: "tapotik-mini.score",
                        action: "scoring in progress",
                        duration: "—",
                        ok: true,
                    },
                ],
            },
            {
                name: "Verify",
                status: "pending",
                duration: "—",
                summary: "Waiting on execute phase.",
                toolCalls: [],
            },
        ],
    },
    {
        id: "run_6b11f0",
        agent: "report-writer",
        trigger: "Schedule",
        stepsDone: 5,
        stepsTotal: 5,
        status: "Completed",
        duration: "12m 04s",
        timestamp: "Mon, 08:00",
        timeline: [
            {
                name: "Plan",
                status: "done",
                duration: "0:22",
                summary: "Pulled 7-day usage metrics across 4 products.",
                toolCalls: [
                    {
                        tool: "bigquery.query",
                        action: "3 queries, 1.2M rows scanned",
                        duration: "14s",
                        ok: true,
                    },
                ],
            },
            {
                name: "Execute",
                status: "done",
                duration: "10:41",
                summary: "Wrote digest with 5 charts and 3 callouts.",
                toolCalls: [
                    {
                        tool: "tapotik-v4.write",
                        action: "1,240-word digest",
                        duration: "1m 51s",
                        ok: true,
                    },
                    {
                        tool: "notion.create_page",
                        action: "page + 5 embeds",
                        duration: "8m 32s",
                        ok: true,
                    },
                ],
            },
            {
                name: "Verify",
                status: "done",
                duration: "1:01",
                summary: "Numbers cross-checked against dashboard totals.",
                toolCalls: [
                    {
                        tool: "bigquery.query",
                        action: "totals match ±0.1%",
                        duration: "9s",
                        ok: true,
                    },
                    {
                        tool: "slack.post_message",
                        action: "posted → #leadership",
                        duration: "1.1s",
                        ok: true,
                    },
                ],
            },
        ],
    },
    {
        id: "run_5c77e3",
        agent: "code-reviewer",
        trigger: "Webhook",
        stepsDone: 2,
        stepsTotal: 4,
        status: "Failed",
        duration: "0m 44s",
        timestamp: "Today, 06:15",
        timeline: [
            {
                name: "Plan",
                status: "done",
                duration: "0:06",
                summary: "PR #482 — 14 files changed, rate limiter refactor.",
                toolCalls: [
                    {
                        tool: "github.get_diff",
                        action: "+412 −128 lines",
                        duration: "1.8s",
                        ok: true,
                    },
                ],
            },
            {
                name: "Execute",
                status: "failed",
                duration: "0:38",
                summary: "Context window exceeded on generated lockfile.",
                toolCalls: [
                    {
                        tool: "tapotik-v4.review",
                        action: "error: input too large",
                        duration: "36s",
                        ok: false,
                    },
                ],
            },
            {
                name: "Verify",
                status: "pending",
                duration: "—",
                summary: "Skipped — execute phase failed.",
                toolCalls: [],
            },
        ],
    },
    {
        id: "run_49d2b8",
        agent: "support-triage",
        trigger: "Manual",
        stepsDone: 5,
        stepsTotal: 5,
        status: "Completed",
        duration: "3m 51s",
        timestamp: "Yesterday, 17:20",
        timeline: [
            {
                name: "Plan",
                status: "done",
                duration: "0:12",
                summary: "Backlog sweep requested by Alex — 96 tickets.",
                toolCalls: [
                    {
                        tool: "zendesk.list_tickets",
                        action: "96 tickets fetched",
                        duration: "2.9s",
                        ok: true,
                    },
                ],
            },
            {
                name: "Execute",
                status: "done",
                duration: "3:04",
                summary: "Resolved 71, drafted 25 replies for review.",
                toolCalls: [
                    {
                        tool: "tapotik-v4.draft_reply",
                        action: "96 drafts generated",
                        duration: "2m 41s",
                        ok: true,
                    },
                    {
                        tool: "zendesk.update_ticket",
                        action: "96 tickets updated",
                        duration: "15.2s",
                        ok: true,
                    },
                ],
            },
            {
                name: "Verify",
                status: "done",
                duration: "0:35",
                summary: "Rubric pass on sampled drafts, CSAT projection 4.8.",
                toolCalls: [
                    {
                        tool: "tapotik-v4.judge",
                        action: "10/10 drafts pass rubric",
                        duration: "29s",
                        ok: true,
                    },
                ],
            },
        ],
    },
];

const runStatusVariant: Record<RunStatus, "success" | "glow" | "destructive"> =
    {
        Completed: "success",
        Running: "glow",
        Failed: "destructive",
    };

const phaseIcon: Record<Phase["name"], LucideIcon> = {
    Plan: BrainCircuitIcon,
    Execute: ZapIcon,
    Verify: ShieldCheckIcon,
};

function PhaseNode({ phase, last }: { phase: Phase; last: boolean }) {
    const Icon = phaseIcon[phase.name];
    return (
        <li className="relative pl-11">
            {!last && (
                <span
                    aria-hidden
                    className="absolute top-9 left-3.75 h-[calc(100%-20px)] w-px bg-border"
                />
            )}
            <span
                className={cn(
                    "absolute top-1 left-0 flex size-8 items-center justify-center rounded-full border",
                    phase.status === "done" &&
                        "border-success/40 bg-success/10 text-success",
                    phase.status === "active" &&
                        "border-primary/40 bg-primary/10 text-primary",
                    phase.status === "failed" &&
                        "border-destructive/40 bg-destructive/10 text-destructive",
                    phase.status === "pending" &&
                        "border-border bg-muted text-muted-foreground",
                )}
            >
                {phase.status === "active" ? (
                    <span className="relative flex">
                        <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary/40" />
                        <Icon className="relative size-4" />
                    </span>
                ) : (
                    <Icon className="size-4" />
                )}
            </span>

            <div className="pb-6">
                <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-semibold">{phase.name}</p>
                    <span className="font-mono text-[11px] text-muted-foreground">
                        {phase.duration}
                    </span>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">
                    {phase.summary}
                </p>

                {phase.toolCalls.length > 0 && (
                    <div className="mt-2.5 space-y-1.5 rounded-xl border bg-background/50 p-2.5">
                        {phase.toolCalls.map((call) => (
                            <div
                                key={`${call.tool}-${call.action}`}
                                className="flex items-center gap-2 text-xs"
                            >
                                {call.ok ? (
                                    <CheckIcon className="size-3 shrink-0 text-success" />
                                ) : (
                                    <XIcon className="size-3 shrink-0 text-destructive" />
                                )}
                                <code className="shrink-0 rounded-sm bg-muted px-1.5 py-0.5 font-mono text-[10px]">
                                    {call.tool}
                                </code>
                                <span className="min-w-0 flex-1 truncate text-muted-foreground">
                                    {call.action}
                                </span>
                                <span className="shrink-0 font-mono text-[10px] text-muted-foreground/70">
                                    {call.duration}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </li>
    );
}

export function AgentsClient() {
    const [selectedRun, setSelectedRun] = useState(0);
    const run = runs[selectedRun];

    return (
        <div className="mx-auto w-full max-w-350 space-y-6 p-4 sm:p-6 lg:p-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                    <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
                        Agents
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Autonomous workflows that plan, execute and verify their
                        own work.
                    </p>
                </div>
                <Button
                    variant="gradient"
                    onClick={() =>
                        toast.info("Agent builder opens in the full product")
                    }
                >
                    <PlusIcon className="size-4" />
                    New agent
                </Button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {agents.map((agent) => (
                    <div
                        key={agent.name}
                        className="group flex flex-col rounded-2xl border bg-card p-5 transition-colors hover:border-primary/30"
                    >
                        <div className="flex items-start justify-between">
                            <IconTile
                                icon={BotIcon}
                                className={cn(
                                    "size-10 rounded-xl bg-linear-to-br text-white shadow-lg",
                                    agent.gradient,
                                )}
                                iconClassName="size-5"
                            />
                            <Badge
                                variant={agentStatusVariant[agent.status]}
                                className="px-2 py-0.5 text-[10px]"
                            >
                                {agent.status}
                            </Badge>
                        </div>

                        <p className="mt-4 font-mono text-sm font-semibold">
                            {agent.name}
                        </p>
                        <p className="mt-1.5 flex-1 text-xs leading-relaxed text-muted-foreground">
                            {agent.description}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-1">
                            {agent.tools.map((tool) => (
                                <span
                                    key={tool}
                                    className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground"
                                >
                                    {tool}
                                </span>
                            ))}
                        </div>

                        <div className="mt-4 grid grid-cols-3 gap-2 border-t pt-3 text-center">
                            <div>
                                <p className="font-heading text-sm font-bold">
                                    {agent.runs}
                                </p>
                                <p className="text-[10px] text-muted-foreground">
                                    runs
                                </p>
                            </div>
                            <div>
                                <p className="font-heading text-sm font-bold text-success">
                                    {agent.successRate}
                                </p>
                                <p className="text-[10px] text-muted-foreground">
                                    success
                                </p>
                            </div>
                            <div>
                                <p className="font-heading text-sm font-bold">
                                    {agent.lastRun}
                                </p>
                                <p className="text-[10px] text-muted-foreground">
                                    last run
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-5">
                <div className="rounded-2xl border bg-card xl:col-span-3">
                    <div className="p-5 pb-0 lg:p-6 lg:pb-0">
                        <h3 className="font-heading text-base font-semibold">
                            Recent runs
                        </h3>
                        <p className="text-xs text-muted-foreground">
                            Select a run to inspect its timeline
                        </p>
                    </div>
                    <div className="mt-4 border-t">
                        <Table>
                            <TableHeader>
                                <TableRow className="hover:bg-transparent">
                                    <TableHead className="pl-5 lg:pl-6">
                                        Agent
                                    </TableHead>
                                    <TableHead>Trigger</TableHead>
                                    <TableHead>Steps</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Duration</TableHead>
                                    <TableHead className="pr-5 lg:pr-6">
                                        When
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {runs.map((r, i) => (
                                    <TableRow
                                        key={r.id}
                                        data-state={
                                            i === selectedRun
                                                ? "selected"
                                                : undefined
                                        }
                                        onClick={() => setSelectedRun(i)}
                                        onKeyDown={(e) => {
                                            if (
                                                e.key === "Enter" ||
                                                e.key === " "
                                            ) {
                                                if (e.key === " ")
                                                    e.preventDefault();
                                                setSelectedRun(i);
                                            }
                                        }}
                                        tabIndex={0}
                                        role="button"
                                        aria-label={`Select run ${r.id} for ${r.agent}, ${r.status}`}
                                        aria-current={
                                            i === selectedRun ? true : undefined
                                        }
                                        className="cursor-pointer"
                                    >
                                        <TableCell className="pl-5 lg:pl-6">
                                            <p className="font-mono text-xs font-medium">
                                                {r.agent}
                                            </p>
                                            <p className="font-mono text-[10px] text-muted-foreground">
                                                {r.id}
                                            </p>
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant="outline"
                                                className="px-2 py-0 text-[10px]"
                                            >
                                                {r.trigger}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Progress
                                                    value={
                                                        (r.stepsDone /
                                                            r.stepsTotal) *
                                                        100
                                                    }
                                                    className="h-1 w-14"
                                                    indicatorClassName={
                                                        r.status === "Failed"
                                                            ? "from-destructive to-destructive"
                                                            : undefined
                                                    }
                                                />
                                                <span className="font-mono text-[10px] text-muted-foreground">
                                                    {r.stepsDone}/{r.stepsTotal}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant={
                                                    runStatusVariant[r.status]
                                                }
                                                className="px-2 py-0.5 text-[10px]"
                                            >
                                                {r.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="font-mono text-xs text-muted-foreground">
                                            {r.duration}
                                        </TableCell>
                                        <TableCell className="pr-5 text-xs text-muted-foreground lg:pr-6">
                                            {r.timestamp}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>

                <div className="rounded-2xl border bg-card p-5 lg:p-6 xl:col-span-2">
                    <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0">
                            <h3 className="font-heading text-base font-semibold">
                                Run timeline
                            </h3>
                            <p className="truncate font-mono text-xs text-muted-foreground">
                                {run.agent} · {run.id}
                            </p>
                        </div>
                        <Badge
                            variant={runStatusVariant[run.status]}
                            className="shrink-0 px-2 py-0.5 text-[10px]"
                        >
                            {run.status}
                        </Badge>
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.ol
                            key={run.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.25 }}
                            className="mt-6"
                        >
                            {run.timeline.map((phase, i) => (
                                <PhaseNode
                                    key={phase.name}
                                    phase={phase}
                                    last={i === run.timeline.length - 1}
                                />
                            ))}
                        </motion.ol>
                    </AnimatePresence>

                    <div className="mt-2 flex items-center justify-between rounded-xl border bg-muted/40 px-3.5 py-2.5">
                        <span className="text-xs text-muted-foreground">
                            Total wall time
                        </span>
                        <span className="font-mono text-xs font-semibold">
                            {run.duration}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
