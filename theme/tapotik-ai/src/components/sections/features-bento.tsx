"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
    BrainCircuitIcon,
    GlobeIcon,
    LayersIcon,
    LockIcon,
    ShieldCheckIcon,
    WorkflowIcon,
    ZapIcon,
} from "lucide-react";

import { SectionHeading } from "@/components/site/section-heading";
import { SpotlightCard } from "@/components/effects/spotlight-card";
import { Reveal } from "@/components/effects/reveal";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { brandHex } from "@/lib/brand-colors";

const workflowSteps = ["Trigger", "Generate", "Review", "Publish"];

function NeuralViz() {
    const nodes = [
        { cx: 20, cy: 30 },
        { cx: 20, cy: 70 },
        { cx: 20, cy: 110 },
        { cx: 90, cy: 20 },
        { cx: 90, cy: 55 },
        { cx: 90, cy: 90 },
        { cx: 90, cy: 125 },
        { cx: 160, cy: 45 },
        { cx: 160, cy: 95 },
    ];
    const links = [
        [0, 3],
        [0, 4],
        [1, 4],
        [1, 5],
        [2, 5],
        [2, 6],
        [3, 7],
        [4, 7],
        [4, 8],
        [5, 8],
        [6, 8],
    ];
    return (
        <svg viewBox="0 0 180 145" className="h-full w-full" aria-hidden>
            {links.map(([a, b], i) => (
                <motion.line
                    key={i}
                    x1={nodes[a].cx}
                    y1={nodes[a].cy}
                    x2={nodes[b].cx}
                    y2={nodes[b].cy}
                    stroke="url(#nn-grad)"
                    strokeWidth="1"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.6 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.06 }}
                />
            ))}
            {links.map(([a, b], i) => (
                <line
                    key={`flow-${i}`}
                    x1={nodes[a].cx}
                    y1={nodes[a].cy}
                    x2={nodes[b].cx}
                    y2={nodes[b].cy}
                    stroke={brandHex.accent}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeDasharray="2 10"
                    opacity={0.7}
                    className="animate-flow"
                    style={{ animationDelay: `${(i % 4) * 0.22}s` }}
                />
            ))}
            <defs>
                <linearGradient id="nn-grad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor={brandHex.primary} />
                    <stop offset="100%" stopColor={brandHex.accent} />
                </linearGradient>
            </defs>
            {nodes.map((n, i) => (
                <motion.circle
                    key={i}
                    cx={n.cx}
                    cy={n.cy}
                    r="5"
                    fill="#0E1325"
                    stroke={brandHex.primary}
                    strokeWidth="1.5"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                        delay: i * 0.05,
                        type: "spring",
                        stiffness: 260,
                    }}
                    className="fill-white dark:fill-[#0E1325]"
                />
            ))}
            <circle
                cx="90"
                cy="55"
                r="2.5"
                fill={brandHex.accent}
                className="animate-pulse"
            />
        </svg>
    );
}

const INITIAL_BARS = [42, 68, 35, 82, 55, 92, 48, 75, 60, 88];

function LatencyViz() {
    const reduced = useReducedMotion();
    // Seeded initial data so SSR and first client render match (no hydration
    // drift); Math.random only runs in the timer, never during render.
    const [heights, setHeights] = useState(INITIAL_BARS);

    useEffect(() => {
        if (reduced) return;
        let timer: ReturnType<typeof setTimeout>;
        const schedule = () => {
            timer = setTimeout(
                () => {
                    setHeights((prev) =>
                        prev.map(() => 24 + Math.round(Math.random() * 70)),
                    );
                    schedule();
                },
                10000 + Math.random() * 10000, // 10–20s between refreshes
            );
        };
        schedule();
        return () => clearTimeout(timer);
    }, [reduced]);

    return (
        <div className="flex h-full items-end gap-1.5 px-1" aria-hidden>
            {heights.map((h, i) => (
                <div
                    key={i}
                    className="flex-1 rounded-t-md bg-linear-to-t from-primary/30 to-accent/70 transition-[height] duration-700 ease-out"
                    style={{ height: `${h}%` }}
                />
            ))}
        </div>
    );
}

function WorkflowViz() {
    const reduced = useReducedMotion();
    const [active, setActive] = useState(1);

    // setState lives in the interval callback (not the effect body) so it doesn't
    // trip react-hooks/set-state-in-effect.
    useEffect(() => {
        if (reduced) return;
        const id = setInterval(
            () => setActive((a) => (a + 1) % workflowSteps.length),
            1400,
        );
        return () => clearInterval(id);
    }, [reduced]);

    return (
        <div className="flex h-full flex-col justify-center gap-2" aria-hidden>
            {workflowSteps.map((step, i) => (
                <motion.div
                    key={step}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12, duration: 0.5 }}
                    className="flex items-center gap-2.5"
                >
                    <div
                        className={cn(
                            "flex size-6 items-center justify-center rounded-md text-[10px] font-bold transition-all duration-300",
                            i === active
                                ? "scale-110 bg-primary text-white shadow-[0_0_16px_-4px_var(--glow-primary)]"
                                : "bg-muted text-muted-foreground",
                        )}
                    >
                        {i + 1}
                    </div>
                    <div
                        className={cn(
                            "flex-1 rounded-lg px-3 py-1.5 text-xs font-medium glass transition-colors duration-300",
                            i === active && "text-primary",
                        )}
                    >
                        {step}
                    </div>
                </motion.div>
            ))}
        </div>
    );
}

function GlobeViz() {
    return (
        <div
            className="relative flex h-full items-center justify-center"
            aria-hidden
        >
            <div className="relative size-28">
                <div className="absolute inset-0 rounded-full border border-primary/30" />
                <div className="absolute inset-2 rounded-full border border-secondary/25" />
                <div className="absolute inset-4 rounded-full border border-accent/20" />
                <div className="absolute inset-0 animate-spin-slow">
                    <span className="absolute -top-1 left-1/2 size-2 -translate-x-1/2 rounded-full bg-accent shadow-[0_0_12px_2px_rgba(0,245,212,0.5)]" />
                </div>
                <div className="absolute inset-0 animate-spin-slow animation-duration-[9s] direction-[reverse]">
                    <span className="absolute top-1/2 -left-1 size-1.5 -translate-y-1/2 rounded-full bg-pink shadow-[0_0_10px_2px_rgba(255,78,205,0.5)]" />
                </div>
                <div className="absolute inset-6 rounded-full bg-linear-to-br from-primary/20 to-secondary/20 blur-sm" />
            </div>
        </div>
    );
}

function SecurityViz() {
    return (
        <div className="flex h-full items-center justify-center" aria-hidden>
            <div className="relative">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 200 }}
                    className="flex size-16 items-center justify-center rounded-2xl border border-primary/25 bg-linear-to-br from-primary/15 to-accent/10"
                >
                    <LockIcon className="size-7 animate-zoom text-primary" />
                </motion.div>
                <span className="absolute -inset-3 -z-10 animate-pulse-glow rounded-3xl bg-primary/10 blur-xl" />
            </div>
        </div>
    );
}

export function FeaturesBento() {
    return (
        <section className="relative py-16 lg:py-24" id="features">
            <div className="container-wide">
                <SectionHeading
                    eyebrow="Platform"
                    eyebrowIcon={LayersIcon}
                    title={
                        <>
                            Everything you need to ship{" "}
                            <span className="text-gradient">AI-native</span>{" "}
                            products
                        </>
                    }
                    description="A complete toolkit — from frontier models to workflow automation — engineered for production from day one."
                />

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
                    <Reveal className="sm:col-span-2 lg:row-span-2">
                        <SpotlightCard className="flex h-full flex-col p-7">
                            <div className="mb-5 flex size-11 items-center justify-center rounded-xl border border-primary/20 bg-primary/12">
                                <BrainCircuitIcon className="size-5 text-primary" />
                            </div>
                            <h3 className="font-heading text-xl font-semibold">
                                Neural Engine
                            </h3>
                            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                Frontier foundation models fine-tuned for your
                                domain. Route between in-house and third-party
                                models automatically based on task complexity,
                                latency budget and cost.
                            </p>
                            <div className="mt-6 min-h-40 flex-1">
                                <NeuralViz />
                            </div>
                            <div className="mt-4 flex flex-wrap gap-2">
                                <Badge variant="secondary">tapotik-v4</Badge>
                                <Badge variant="secondary">GPT-4o</Badge>
                                <Badge variant="secondary">Claude</Badge>
                                <Badge variant="secondary">Gemini</Badge>
                            </div>
                        </SpotlightCard>
                    </Reveal>

                    <Reveal delay={0.08}>
                        <SpotlightCard className="flex h-full min-h-56 flex-col p-6">
                            <div className="flex items-center gap-2.5">
                                <ZapIcon className="size-4.5 text-accent" />
                                <h3 className="font-heading text-base font-semibold">
                                    Realtime Streaming
                                </h3>
                            </div>
                            <p className="mt-1.5 text-xs text-muted-foreground">
                                87ms average first token. Streaming everywhere.
                            </p>
                            <div className="mt-4 flex-1">
                                <LatencyViz />
                            </div>
                        </SpotlightCard>
                    </Reveal>

                    <Reveal delay={0.14}>
                        <SpotlightCard className="flex h-full min-h-56 flex-col p-6">
                            <div className="flex items-center gap-2.5">
                                <ShieldCheckIcon className="size-4.5 text-success" />
                                <h3 className="font-heading text-base font-semibold">
                                    Enterprise Security
                                </h3>
                            </div>
                            <p className="mt-1.5 text-xs text-muted-foreground">
                                SOC 2 Type II · GDPR · HIPAA · Zero retention
                            </p>
                            <div className="mt-2 flex-1">
                                <SecurityViz />
                            </div>
                        </SpotlightCard>
                    </Reveal>

                    <Reveal delay={0.1}>
                        <SpotlightCard className="flex h-full min-h-56 flex-col p-6">
                            <div className="flex items-center gap-2.5">
                                <WorkflowIcon className="size-4.5 text-secondary" />
                                <h3 className="font-heading text-base font-semibold">
                                    Workflow Automation
                                </h3>
                            </div>
                            <p className="mt-1.5 text-xs text-muted-foreground">
                                Chain models and tools without writing glue
                                code.
                            </p>
                            <div className="mt-4 flex-1">
                                <WorkflowViz />
                            </div>
                        </SpotlightCard>
                    </Reveal>

                    <Reveal delay={0.16}>
                        <SpotlightCard className="flex h-full min-h-56 flex-col p-6">
                            <div className="flex items-center gap-2.5">
                                <GlobeIcon className="size-4.5 text-pink" />
                                <h3 className="font-heading text-base font-semibold">
                                    Global Edge Network
                                </h3>
                            </div>
                            <p className="mt-1.5 text-xs text-muted-foreground">
                                Inference in 32 regions. Data residency built
                                in.
                            </p>
                            <div className="flex-1">
                                <GlobeViz />
                            </div>
                        </SpotlightCard>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
