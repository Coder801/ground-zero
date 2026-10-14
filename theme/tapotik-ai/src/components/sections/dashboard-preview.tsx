"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useInView } from "framer-motion";
import {
    ArrowRightIcon,
    ArrowUpIcon,
    BotIcon,
    ImageIcon,
    LayoutDashboardIcon,
    MessageSquareIcon,
    MicIcon,
} from "lucide-react";

import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/effects/reveal";
import { Parallax } from "@/components/effects/parallax";
import { TiltCard } from "@/components/effects/tilt-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AnimatedCounter } from "@/components/effects/animated-counter";

// Recharts is ~100 KiB over the wire — keep it out of the homepage bundle and
// only fetch the chunk once the (below-the-fold) chart scrolls near the viewport.
const DashboardChart = dynamic(
    () =>
        import("@/components/sections/dashboard-chart").then(
            (mod) => mod.DashboardChart,
        ),
    { ssr: false },
);

const usageTiles = [
    {
        icon: MessageSquareIcon,
        label: "Chat requests",
        value: 182,
        suffix: "K",
        change: "+12.4%",
    },
    {
        icon: ImageIcon,
        label: "Images generated",
        value: 48,
        suffix: "K",
        change: "+31.2%",
    },
    {
        icon: MicIcon,
        label: "Voice minutes",
        value: 12,
        suffix: "K",
        change: "+8.7%",
    },
    {
        icon: BotIcon,
        label: "Agent runs",
        value: 9.4,
        suffix: "K",
        change: "+44.1%",
    },
];

export function DashboardPreview() {
    const chartRef = useRef<HTMLDivElement>(null);
    // once: true — the chunk loads a single time; margin pre-loads it one
    // viewport early so the chart is ready before the user reaches it.
    const chartInView = useInView(chartRef, { once: true, margin: "100%" });

    return (
        <section className="relative py-16 lg:py-24">
            <div className="container-wide">
                <SectionHeading
                    eyebrow="Dashboard"
                    eyebrowIcon={LayoutDashboardIcon}
                    title={
                        <>
                            Total visibility,{" "}
                            <span className="text-gradient">zero setup</span>
                        </>
                    }
                    description="Usage, costs, latency and quality metrics per project, model and teammate — live from your first request."
                />

                <Parallax speed={26}>
                    <Reveal>
                        <TiltCard maxTilt={4} className="mx-auto max-w-5xl">
                            <div className="relative overflow-hidden rounded-3xl border shadow-2xl glass-strong">
                                <div
                                    aria-hidden
                                    className="pointer-events-none absolute -top-24 right-0 size-72 rounded-full bg-secondary/15 blur-3xl"
                                />
                                <div className="flex flex-col gap-6 p-6 lg:p-8">
                                    <div className="flex flex-wrap items-center justify-between gap-3">
                                        <div>
                                            <h3 className="font-heading text-lg font-semibold">
                                                Usage Overview
                                            </h3>
                                            <p className="text-xs text-muted-foreground">
                                                Last 7 days · all projects
                                            </p>
                                        </div>
                                        <Badge
                                            variant="glow"
                                            className="font-mono text-[11px]"
                                        >
                                            Live
                                        </Badge>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                                        {usageTiles.map((tile) => (
                                            <div
                                                key={tile.label}
                                                className="rounded-xl border bg-card/50 p-4"
                                            >
                                                <div className="flex items-center justify-between">
                                                    <tile.icon className="size-4 text-muted-foreground" />
                                                    <span className="flex items-center gap-0.5 text-[11px] font-medium text-success">
                                                        <ArrowUpIcon className="size-3" />
                                                        {tile.change}
                                                    </span>
                                                </div>
                                                <p className="mt-3 font-heading text-2xl font-bold">
                                                    <AnimatedCounter
                                                        value={tile.value}
                                                        suffix={tile.suffix}
                                                        decimals={
                                                            tile.value % 1 !== 0
                                                                ? 1
                                                                : 0
                                                        }
                                                    />
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {tile.label}
                                                </p>
                                            </div>
                                        ))}
                                    </div>

                                    <div
                                        ref={chartRef}
                                        className="h-64 w-full rounded-xl border bg-card/50 p-4"
                                    >
                                        {chartInView && <DashboardChart />}
                                    </div>
                                </div>
                            </div>
                        </TiltCard>
                    </Reveal>
                </Parallax>

                <Reveal delay={0.15} className="mt-10 flex justify-center">
                    <Button
                        asChild
                        size="lg"
                        variant="outline"
                        className="group"
                    >
                        {/* prefetch={false}: the dashboard route group bundles its own
                            framer-motion + recharts (~100 KiB) — keep off the homepage. */}
                        <Link href="/dashboard" prefetch={false}>
                            Explore the full dashboard
                            <ArrowRightIcon className="transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    </Button>
                </Reveal>
            </div>
        </section>
    );
}
