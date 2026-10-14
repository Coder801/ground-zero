"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
    BellIcon,
    CheckCircle2Icon,
    DatabaseIcon,
    FileTextIcon,
    GitBranchIcon,
    SparklesIcon,
    WebhookIcon,
    WorkflowIcon,
} from "lucide-react";

import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/effects/reveal";
import { Badge } from "@/components/ui/badge";
import { brandHex } from "@/lib/brand-colors";

const nodes = [
    {
        id: "trigger",
        icon: WebhookIcon,
        title: "Webhook Trigger",
        subtitle: "New support ticket",
        color: "text-warning",
        bg: "bg-warning/12 border-warning/25",
        col: "lg:col-start-1 lg:row-start-2",
    },
    {
        id: "retrieve",
        icon: DatabaseIcon,
        title: "Retrieve Context",
        subtitle: "Vector search · docs",
        color: "text-accent",
        bg: "bg-accent/12 border-accent/25",
        col: "lg:col-start-2 lg:row-start-1",
    },
    {
        id: "generate",
        icon: SparklesIcon,
        title: "Generate Reply",
        subtitle: "tapotik-v4 · temp 0.3",
        color: "text-primary",
        bg: "bg-primary/12 border-primary/25",
        col: "lg:col-start-2 lg:row-start-3",
    },
    {
        id: "branch",
        icon: GitBranchIcon,
        title: "Confidence Gate",
        subtitle: "score ≥ 0.92 ?",
        color: "text-secondary",
        bg: "bg-secondary/12 border-secondary/25",
        col: "lg:col-start-3 lg:row-start-2",
    },
    {
        id: "send",
        icon: CheckCircle2Icon,
        title: "Auto-resolve",
        subtitle: "Reply + close ticket",
        color: "text-success",
        bg: "bg-success/12 border-success/25",
        col: "lg:col-start-4 lg:row-start-1",
    },
    {
        id: "escalate",
        icon: BellIcon,
        title: "Escalate to Human",
        subtitle: "Slack · #support",
        color: "text-pink",
        bg: "bg-pink/12 border-pink/25",
        col: "lg:col-start-4 lg:row-start-3",
    },
];

const edges: [string, string][] = [
    ["trigger", "retrieve"],
    ["trigger", "generate"],
    ["retrieve", "branch"],
    ["generate", "branch"],
    ["branch", "send"],
    ["branch", "escalate"],
];

type Connector = {
    d: string;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
};

function FlowNode({
    node,
    index,
    nodeRef,
}: {
    node: (typeof nodes)[number];
    index: number;
    nodeRef: (el: HTMLDivElement | null) => void;
}) {
    return (
        <motion.div
            ref={nodeRef}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: index * 0.12, duration: 0.55 }}
            className={`relative z-10 flex w-full items-center gap-3.5 rounded-xl border p-4 shadow-lg glass-strong ${node.col}`}
        >
            <div
                className={`flex size-10 shrink-0 items-center justify-center rounded-lg border ${node.bg}`}
            >
                <node.icon className={`size-4.5 ${node.color}`} />
            </div>
            <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{node.title}</p>
                <p className="truncate font-mono text-xs text-muted-foreground">
                    {node.subtitle}
                </p>
            </div>
        </motion.div>
    );
}

// Connectors are measured from rendered node positions (not hardcoded coords)
// so the curves land exactly on the card edges at any width.
function useConnectors() {
    const canvasRef = useRef<HTMLDivElement>(null);
    const nodeEls = useRef(new Map<string, HTMLDivElement>());
    const [connectors, setConnectors] = useState<Connector[]>([]);

    const setNodeRef = useCallback(
        (id: string) => (el: HTMLDivElement | null) => {
            if (el) nodeEls.current.set(id, el);
            else nodeEls.current.delete(id);
        },
        [],
    );

    const measure = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        // Grid collapses below lg — connectors are hidden there.
        if (!window.matchMedia("(min-width: 1024px)").matches) {
            setConnectors([]);
            return;
        }
        const next: Connector[] = [];
        for (const [from, to] of edges) {
            const a = nodeEls.current.get(from);
            const b = nodeEls.current.get(to);
            if (!a || !b) continue;
            // Use offset* (layout box), NOT getBoundingClientRect: immune to the cards'
            // framer-motion entry transforms, so dots sit on the true node centre.
            const x1 = a.offsetLeft + a.offsetWidth;
            const y1 = a.offsetTop + a.offsetHeight / 2;
            const x2 = b.offsetLeft;
            const y2 = b.offsetTop + b.offsetHeight / 2;
            const bend = Math.max((x2 - x1) * 0.5, 24);
            next.push({
                d: `M ${x1} ${y1} C ${x1 + bend} ${y1}, ${x2 - bend} ${y2}, ${x2} ${y2}`,
                x1,
                y1,
                x2,
                y2,
            });
        }
        // Keep the previous array when nothing moved to avoid re-rendering the
        // whole section for identical paths.
        setConnectors((prev) =>
            prev.length === next.length &&
            prev.every((c, i) => c.d === next[i].d)
                ? prev
                : next,
        );
    }, []);

    useEffect(() => {
        // Measure once after first paint, then again once web fonts load (reflow
        // changes card height → dot centre). No resize listener by design.
        let cancelled = false;
        const run = () => {
            if (!cancelled) measure();
        };
        const raf = requestAnimationFrame(run);
        document.fonts?.ready?.then(run);
        return () => {
            cancelled = true;
            cancelAnimationFrame(raf);
        };
    }, [measure]);

    return { canvasRef, setNodeRef, connectors };
}

export function WorkflowBuilder() {
    const { canvasRef, setNodeRef, connectors } = useConnectors();
    const inViewRef = useRef<HTMLDivElement>(null);
    const inView = useInView(inViewRef, { once: true, margin: "-80px" });

    return (
        <section className="relative overflow-hidden py-16 lg:py-24">
            <div
                aria-hidden
                className="absolute inset-0 bg-dots mask-[radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]"
            />
            <div className="relative container-wide">
                <SectionHeading
                    eyebrow="Workflow Builder"
                    eyebrowIcon={WorkflowIcon}
                    title={
                        <>
                            Automate anything with{" "}
                            <span className="text-gradient">
                                visual workflows
                            </span>
                        </>
                    }
                    description="Chain triggers, models, tools and conditions into production automations. No glue code, full observability, one-click deploy."
                />

                <Reveal>
                    <div
                        ref={inViewRef}
                        className="relative mx-auto max-w-5xl rounded-3xl border p-6 shadow-2xl glass-strong lg:p-10"
                    >
                        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
                            <div className="flex items-center gap-3">
                                <FileTextIcon className="size-4 text-muted-foreground" />
                                <span className="text-sm font-medium">
                                    support-auto-resolver.flow
                                </span>
                                <Badge
                                    variant="success"
                                    className="text-[10px]"
                                >
                                    ● Live
                                </Badge>
                            </div>
                            <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                                <span>2,418 runs today</span>
                                <span className="text-border">|</span>
                                <span className="text-success">
                                    99.2% success
                                </span>
                            </div>
                        </div>

                        <div ref={canvasRef} className="relative">
                            {/* z-20: dots render above the z-10 cards so they sit
                                centered on the card border. */}
                            <svg
                                aria-hidden
                                className="pointer-events-none absolute inset-0 z-20 hidden h-full w-full lg:block"
                            >
                                <defs>
                                    <linearGradient
                                        id="flow-line"
                                        x1="0"
                                        y1="0"
                                        x2="1"
                                        y2="0"
                                    >
                                        <stop
                                            offset="0%"
                                            stopColor={brandHex.primary}
                                            stopOpacity="0.7"
                                        />
                                        <stop
                                            offset="100%"
                                            stopColor={brandHex.accent}
                                            stopOpacity="0.7"
                                        />
                                    </linearGradient>
                                </defs>
                                {connectors.map((c, i) => (
                                    <g key={i}>
                                        <motion.path
                                            d={c.d}
                                            fill="none"
                                            stroke="url(#flow-line)"
                                            strokeWidth="1.5"
                                            strokeDasharray="5 5"
                                            initial={{
                                                pathLength: 0,
                                                opacity: 0,
                                            }}
                                            animate={
                                                inView
                                                    ? {
                                                          pathLength: 1,
                                                          opacity: 1,
                                                      }
                                                    : undefined
                                            }
                                            transition={{
                                                duration: 0.9,
                                                delay: 0.4 + i * 0.12,
                                            }}
                                        />
                                        <motion.circle
                                            cx={c.x1}
                                            cy={c.y1}
                                            r="3"
                                            className="fill-primary"
                                            initial={{ opacity: 0 }}
                                            animate={
                                                inView
                                                    ? { opacity: 1 }
                                                    : undefined
                                            }
                                            transition={{
                                                delay: 0.4 + i * 0.12,
                                            }}
                                        />
                                        <motion.circle
                                            cx={c.x2}
                                            cy={c.y2}
                                            r="3"
                                            className="fill-accent"
                                            initial={{ opacity: 0 }}
                                            animate={
                                                inView
                                                    ? { opacity: 1 }
                                                    : undefined
                                            }
                                            transition={{
                                                delay: 1.1 + i * 0.12,
                                            }}
                                        />
                                    </g>
                                ))}
                            </svg>

                            <div className="grid grid-cols-1 items-center gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-3 lg:gap-x-14 lg:gap-y-4">
                                {nodes.map((node, i) => (
                                    <FlowNode
                                        key={node.id}
                                        node={node}
                                        index={i}
                                        nodeRef={setNodeRef(node.id)}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="mt-9 flex flex-wrap items-center justify-center gap-2.5">
                            {[
                                "60+ triggers",
                                "40+ actions",
                                "Branching",
                                "Loops",
                                "Human approval",
                                "Retries & DLQ",
                            ].map((chip) => (
                                <Badge
                                    key={chip}
                                    variant="secondary"
                                    className="font-mono text-[11px]"
                                >
                                    {chip}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
