"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import {
    Area,
    AreaChart,
    Cell,
    Pie,
    PieChart,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import {
    ArrowDownRightIcon,
    ArrowUpRightIcon,
    BotIcon,
    ImageIcon,
    MessageSquareIcon,
    MicIcon,
    ZapIcon,
    type LucideIcon,
} from "lucide-react";

import { AnimatedCounter } from "@/components/effects/animated-counter";
import { FixedSizeChart } from "@/components/effects/fixed-size-chart";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { brandHex } from "@/lib/brand-colors";

type Stat = {
    label: string;
    value: number;
    suffix?: string;
    decimals?: number;
    change: string;
    /** Whether the trend is good news (green) or bad news (red). */
    positive: boolean;
    /** Direction of the arrow, independent of sentiment (latency going down is good). */
    down?: boolean;
    icon: LucideIcon;
    color: string;
    spark: number[];
};

const statCards: Stat[] = [
    {
        label: "Credits used",
        value: 17,
        suffix: "K",
        change: "+12.4%",
        positive: true,
        icon: ZapIcon,
        color: brandHex.primary,
        spark: [12, 14, 13, 16, 18, 17, 20, 22, 21, 24, 26, 25],
    },
    {
        label: "API requests",
        value: 84.2,
        suffix: "K",
        decimals: 1,
        change: "+8.1%",
        positive: true,
        icon: MessageSquareIcon,
        color: brandHex.secondary,
        spark: [30, 34, 31, 38, 36, 42, 40, 45, 44, 49, 47, 53],
    },
    {
        label: "Avg latency",
        value: 142,
        suffix: "ms",
        change: "-6.4%",
        positive: true,
        down: true,
        icon: ZapIcon,
        color: brandHex.accent,
        spark: [58, 54, 56, 50, 48, 51, 46, 44, 45, 41, 42, 38],
    },
    {
        label: "Active agents",
        value: 12,
        change: "+2 this week",
        positive: true,
        icon: BotIcon,
        color: brandHex.pink,
        spark: [4, 5, 5, 6, 7, 7, 8, 9, 9, 10, 11, 12],
    },
];

/** Last 30 days of usage — deterministic pseudo-random series. */
const usageData = Array.from({ length: 30 }, (_, i) => {
    const day = i + 4;
    const label = day <= 30 ? `Jun ${day}` : `Jul ${day - 30}`;
    const requests = Math.round(
        2600 + i * 52 + 640 * Math.sin(i / 3.4) + 320 * Math.sin(i * 1.7),
    );
    const credits = Math.round(
        1500 + i * 34 + 420 * Math.sin(i / 2.8 + 1.2) + 180 * Math.sin(i * 1.3),
    );
    return { label, requests, credits };
});

const modelUsage = [
    { name: "tapotik-v4", value: 48, color: brandHex.primary },
    { name: "tapotik-mini", value: 24, color: brandHex.secondary },
    { name: "gpt-4o", value: 17, color: brandHex.accent },
    { name: "claude-sonnet", value: 11, color: brandHex.pink },
];

type Generation = {
    type: "chat" | "image" | "voice" | "agent";
    prompt: string;
    model: string;
    status: "Complete" | "Processing" | "Failed";
    time: string;
    cost: string;
};

const generations: Generation[] = [
    {
        type: "chat",
        prompt: "Summarize Q2 churn analysis and propose retention plays",
        model: "tapotik-v4",
        status: "Complete",
        time: "2m ago",
        cost: "$0.014",
    },
    {
        type: "image",
        prompt: "Isometric glass dashboard, neon indigo lighting, 4k",
        model: "tapotik-image",
        status: "Complete",
        time: "14m ago",
        cost: "$0.032",
    },
    {
        type: "voice",
        prompt: "Podcast intro script — Nova voice, warm delivery",
        model: "tapotik-voice",
        status: "Processing",
        time: "26m ago",
        cost: "$0.011",
    },
    {
        type: "agent",
        prompt: "Weekly support triage across 3 inboxes",
        model: "support-triage",
        status: "Complete",
        time: "1h ago",
        cost: "$0.240",
    },
    {
        type: "chat",
        prompt: "Draft 5-step onboarding email sequence for trial users",
        model: "tapotik-mini",
        status: "Complete",
        time: "2h ago",
        cost: "$0.006",
    },
    {
        type: "image",
        prompt: "Brand pattern explorations, aurora gradients (4 variants)",
        model: "tapotik-image",
        status: "Failed",
        time: "3h ago",
        cost: "$0.000",
    },
];

const generationMeta: Record<
    Generation["type"],
    { icon: LucideIcon; className: string }
> = {
    chat: {
        icon: MessageSquareIcon,
        className: "bg-primary/10 text-primary border-primary/20",
    },
    image: {
        icon: ImageIcon,
        className: "bg-pink/10 text-pink border-pink/20",
    },
    voice: {
        icon: MicIcon,
        className:
            "bg-accent/10 text-accent-foreground dark:text-accent border-accent/20",
    },
    agent: {
        icon: BotIcon,
        className: "bg-secondary/10 text-secondary border-secondary/20",
    },
};

const statusVariant: Record<
    Generation["status"],
    "success" | "glow" | "destructive"
> = {
    Complete: "success",
    Processing: "glow",
    Failed: "destructive",
};

const quickActions = [
    {
        label: "New chat",
        description: "Ask anything",
        href: "/dashboard/chat",
        icon: MessageSquareIcon,
        className:
            "from-primary/20 via-primary/5 border-primary/25 text-primary",
    },
    {
        label: "Generate image",
        description: "Prompt to pixels",
        href: "/dashboard/image",
        icon: ImageIcon,
        className: "from-pink/20 via-pink/5 border-pink/25 text-pink",
    },
    {
        label: "Create voiceover",
        description: "Text to speech",
        href: "/dashboard/voice",
        icon: MicIcon,
        className:
            "from-accent/20 via-accent/5 border-accent/25 text-accent-foreground dark:text-accent",
    },
    {
        label: "Build agent",
        description: "Automate a task",
        href: "/dashboard/agents",
        icon: BotIcon,
        className:
            "from-secondary/20 via-secondary/5 border-secondary/25 text-secondary",
    },
];

const agentRuns = [
    {
        agent: "support-triage",
        task: "Categorized 142 tickets",
        status: "success",
        duration: "4m 12s",
        time: "2m ago",
    },
    {
        agent: "lead-enricher",
        task: "Enriching 38 new signups",
        status: "running",
        duration: "1m 38s",
        time: "now",
    },
    {
        agent: "report-writer",
        task: "Weekly usage digest",
        status: "success",
        duration: "12m 04s",
        time: "1h ago",
    },
    {
        agent: "code-reviewer",
        task: "PR #482 — rate limiter",
        status: "failed",
        duration: "0m 44s",
        time: "3h ago",
    },
    {
        agent: "data-syncer",
        task: "CRM → warehouse sync",
        status: "success",
        duration: "2m 51s",
        time: "5h ago",
    },
] as const;

function Sparkline({ data, color }: { data: number[]; color: string }) {
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const points = data
        .map((v, i) => {
            const x = (i / (data.length - 1)) * 100;
            const y = 28 - ((v - min) / range) * 24;
            return `${x.toFixed(1)},${y.toFixed(1)}`;
        })
        .join(" ");

    return (
        <svg
            viewBox="0 0 100 32"
            preserveAspectRatio="none"
            aria-hidden
            className="h-8 w-full"
        >
            <polyline
                points={`0,32 ${points} 100,32`}
                fill={color}
                fillOpacity={0.12}
                stroke="none"
            />
            <polyline
                points={points}
                fill="none"
                stroke={color}
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

const tooltipStyle = {
    background: "var(--popover)",
    border: "1px solid var(--border)",
    borderRadius: "12px",
    fontSize: "12px",
    color: "var(--popover-foreground)",
} as const;

function StatusDot({ status }: { status: "success" | "running" | "failed" }) {
    return (
        <span className="relative flex size-2 shrink-0" aria-hidden>
            {status === "running" && (
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/60" />
            )}
            <span
                className={cn(
                    "relative inline-flex size-2 rounded-full",
                    status === "success" && "bg-success",
                    status === "running" && "bg-primary",
                    status === "failed" && "bg-destructive",
                )}
            />
        </span>
    );
}

const emptySubscribe = () => () => {};
let cachedNow: Date | null = null;
/** Client-only current date — `null` during SSR/prerender to avoid hydration mismatch. */
const getClientNow = () => (cachedNow ??= new Date());
const getServerNow = () => null;

export function OverviewClient() {
    const now = useSyncExternalStore(
        emptySubscribe,
        getClientNow,
        getServerNow,
    );

    const hour = now?.getHours() ?? 9;
    const greeting = !now
        ? "Welcome back"
        : hour < 12
          ? "Good morning"
          : hour < 18
            ? "Good afternoon"
            : "Good evening";

    return (
        <div className="mx-auto w-full max-w-350 space-y-6 p-4 sm:p-6 lg:p-8">
            <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                    <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
                        {greeting}, Alex
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                        {now
                            ? now.toLocaleDateString("en-US", {
                                  weekday: "long",
                                  month: "long",
                                  day: "numeric",
                                  year: "numeric",
                              })
                            : "Here's what's happening across your workspace."}
                    </p>
                </div>
                <Badge variant="glow" className="font-mono text-[11px]">
                    All systems operational
                </Badge>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {statCards.map((stat) => (
                    <div
                        key={stat.label}
                        className="group relative overflow-hidden rounded-2xl border bg-card p-5 transition-colors hover:border-primary/30"
                    >
                        <div className="flex items-center justify-between">
                            <p className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                                <span
                                    aria-hidden
                                    className="flex size-6 items-center justify-center rounded-lg border"
                                    style={{
                                        color: stat.color,
                                        borderColor: `color-mix(in srgb, ${stat.color} 25%, transparent)`,
                                        background: `color-mix(in srgb, ${stat.color} 10%, transparent)`,
                                    }}
                                >
                                    <stat.icon className="size-3.5" />
                                </span>
                                {stat.label}
                            </p>
                            <span
                                className={cn(
                                    "flex items-center gap-0.5 text-[11px] font-semibold",
                                    stat.positive
                                        ? "text-success"
                                        : "text-destructive",
                                )}
                            >
                                {stat.down ? (
                                    <ArrowDownRightIcon className="size-3" />
                                ) : (
                                    <ArrowUpRightIcon className="size-3" />
                                )}
                                {stat.change}
                            </span>
                        </div>
                        <p className="mt-2 font-heading text-3xl font-bold tracking-tight">
                            <AnimatedCounter
                                value={stat.value}
                                suffix={stat.suffix ?? ""}
                                decimals={stat.decimals ?? 0}
                            />
                        </p>
                        <div className="mt-3">
                            <Sparkline data={stat.spark} color={stat.color} />
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="rounded-2xl border bg-card p-5 lg:col-span-2 lg:p-6">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                            <h3 className="font-heading text-base font-semibold">
                                Usage
                            </h3>
                            <p className="text-xs text-muted-foreground">
                                Requests and credits · last 30 days
                            </p>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1.5">
                                <span
                                    aria-hidden
                                    className="size-2 rounded-full bg-primary"
                                />
                                Requests
                            </span>
                            <span className="flex items-center gap-1.5">
                                <span
                                    aria-hidden
                                    className="size-2 rounded-full"
                                    style={{ background: brandHex.accent }}
                                />
                                Credits
                            </span>
                        </div>
                    </div>
                    <div className="mt-4 h-72 w-full">
                        <FixedSizeChart>
                            {({ width, height }) => (
                                <AreaChart
                                    width={width}
                                    height={height}
                                    data={usageData}
                                    margin={{
                                        top: 8,
                                        right: 8,
                                        left: -14,
                                        bottom: 0,
                                    }}
                                >
                                    <defs>
                                        <linearGradient
                                            id="ov-req"
                                            x1="0"
                                            y1="0"
                                            x2="0"
                                            y2="1"
                                        >
                                            <stop
                                                offset="0%"
                                                stopColor={brandHex.primary}
                                                stopOpacity={0.45}
                                            />
                                            <stop
                                                offset="100%"
                                                stopColor={brandHex.primary}
                                                stopOpacity={0}
                                            />
                                        </linearGradient>
                                        <linearGradient
                                            id="ov-cred"
                                            x1="0"
                                            y1="0"
                                            x2="0"
                                            y2="1"
                                        >
                                            <stop
                                                offset="0%"
                                                stopColor={brandHex.accent}
                                                stopOpacity={0.3}
                                            />
                                            <stop
                                                offset="100%"
                                                stopColor={brandHex.accent}
                                                stopOpacity={0}
                                            />
                                        </linearGradient>
                                    </defs>
                                    <XAxis
                                        dataKey="label"
                                        axisLine={false}
                                        tickLine={false}
                                        interval={4}
                                        tick={{
                                            fontSize: 11,
                                            fill: "var(--muted-foreground)",
                                        }}
                                        dy={6}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{
                                            fontSize: 11,
                                            fill: "var(--muted-foreground)",
                                        }}
                                        tickFormatter={(v: number) =>
                                            `${(v / 1000).toFixed(1)}k`
                                        }
                                    />
                                    <Tooltip
                                        cursor={{ stroke: "var(--border)" }}
                                        contentStyle={tooltipStyle}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="requests"
                                        stroke={brandHex.primary}
                                        strokeWidth={2}
                                        fill="url(#ov-req)"
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="credits"
                                        stroke={brandHex.accent}
                                        strokeWidth={2}
                                        fill="url(#ov-cred)"
                                    />
                                </AreaChart>
                            )}
                        </FixedSizeChart>
                    </div>
                </div>

                <div className="flex flex-col rounded-2xl border bg-card p-5 lg:p-6">
                    <div>
                        <h3 className="font-heading text-base font-semibold">
                            Model usage
                        </h3>
                        <p className="text-xs text-muted-foreground">
                            Share of requests by model
                        </p>
                    </div>
                    <div className="relative mx-auto mt-2 h-52 w-full max-w-60">
                        <FixedSizeChart>
                            {({ width, height }) => (
                                <PieChart width={width} height={height}>
                                    <Tooltip
                                        contentStyle={tooltipStyle}
                                        formatter={(value) => [
                                            `${value ?? 0}%`,
                                        ]}
                                    />
                                    <Pie
                                        data={modelUsage}
                                        dataKey="value"
                                        nameKey="name"
                                        innerRadius={62}
                                        outerRadius={84}
                                        paddingAngle={4}
                                        cornerRadius={6}
                                        strokeWidth={0}
                                    >
                                        {modelUsage.map((m) => (
                                            <Cell key={m.name} fill={m.color} />
                                        ))}
                                    </Pie>
                                </PieChart>
                            )}
                        </FixedSizeChart>
                        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                            <p className="font-heading text-2xl font-bold">
                                84.2K
                            </p>
                            <p className="text-[11px] text-muted-foreground">
                                requests
                            </p>
                        </div>
                    </div>
                    <ul className="mt-4 space-y-2.5">
                        {modelUsage.map((m) => (
                            <li
                                key={m.name}
                                className="flex items-center justify-between text-sm"
                            >
                                <span className="flex items-center gap-2.5">
                                    <span
                                        aria-hidden
                                        className="size-2.5 rounded-full"
                                        style={{ background: m.color }}
                                    />
                                    <span className="font-mono text-xs">
                                        {m.name}
                                    </span>
                                </span>
                                <span className="text-xs font-semibold text-muted-foreground">
                                    {m.value}%
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="rounded-2xl border bg-card lg:col-span-2">
                    <div className="flex items-center justify-between p-5 pb-0 lg:p-6 lg:pb-0">
                        <div>
                            <h3 className="font-heading text-base font-semibold">
                                Recent generations
                            </h3>
                            <p className="text-xs text-muted-foreground">
                                Latest activity across all products
                            </p>
                        </div>
                        <Button
                            asChild
                            variant="ghost"
                            size="sm"
                            className="text-xs"
                        >
                            <Link href="/dashboard/chat">
                                View all
                                <ArrowUpRightIcon className="size-3.5" />
                            </Link>
                        </Button>
                    </div>
                    <div className="mt-4 border-t">
                        <Table>
                            <TableHeader>
                                <TableRow className="hover:bg-transparent">
                                    <TableHead className="pl-5 lg:pl-6">
                                        Type
                                    </TableHead>
                                    <TableHead>Prompt</TableHead>
                                    <TableHead>Model</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Time</TableHead>
                                    <TableHead className="pr-5 text-right lg:pr-6">
                                        Cost
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {generations.map((g) => {
                                    const meta = generationMeta[g.type];
                                    return (
                                        <TableRow key={g.prompt}>
                                            <TableCell className="pl-5 lg:pl-6">
                                                <span
                                                    className={cn(
                                                        "flex size-8 items-center justify-center rounded-lg border",
                                                        meta.className,
                                                    )}
                                                >
                                                    <meta.icon className="size-4" />
                                                </span>
                                            </TableCell>
                                            <TableCell className="max-w-52">
                                                <p className="truncate text-sm">
                                                    {g.prompt}
                                                </p>
                                            </TableCell>
                                            <TableCell>
                                                <span className="font-mono text-xs text-muted-foreground">
                                                    {g.model}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={
                                                        statusVariant[g.status]
                                                    }
                                                    className="px-2 py-0.5 text-[10px]"
                                                >
                                                    {g.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-xs text-muted-foreground">
                                                {g.time}
                                            </TableCell>
                                            <TableCell className="pr-5 text-right font-mono text-xs lg:pr-6">
                                                {g.cost}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-3">
                        {quickActions.map((action) => (
                            <Link
                                key={action.label}
                                href={action.href}
                                className={cn(
                                    "group relative overflow-hidden rounded-2xl border bg-linear-to-br to-card p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg",
                                    action.className,
                                )}
                            >
                                <action.icon className="size-5" />
                                <p className="mt-3 text-sm font-semibold text-foreground">
                                    {action.label}
                                </p>
                                <p className="text-[11px] text-muted-foreground">
                                    {action.description}
                                </p>
                                <ArrowUpRightIcon className="absolute top-3.5 right-3.5 size-3.5 text-muted-foreground opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" />
                            </Link>
                        ))}
                    </div>

                    <div className="rounded-2xl border bg-card p-5">
                        <div className="flex items-center justify-between">
                            <h3 className="font-heading text-base font-semibold">
                                Agent runs
                            </h3>
                            <Button
                                asChild
                                variant="ghost"
                                size="sm"
                                className="text-xs"
                            >
                                <Link href="/dashboard/agents">All runs</Link>
                            </Button>
                        </div>
                        <ul className="mt-4 space-y-1">
                            {agentRuns.map((run) => (
                                <li
                                    key={`${run.agent}-${run.time}`}
                                    className="flex items-center gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-muted/50"
                                >
                                    <StatusDot status={run.status} />
                                    <div className="min-w-0 flex-1">
                                        <p className="truncate font-mono text-xs font-medium">
                                            {run.agent}
                                        </p>
                                        <p className="truncate text-[11px] text-muted-foreground">
                                            {run.task}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-mono text-[11px] text-muted-foreground">
                                            {run.duration}
                                        </p>
                                        <p className="text-[10px] text-muted-foreground/70">
                                            {run.time}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
