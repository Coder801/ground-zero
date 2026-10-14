"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
    GaugeIcon,
    PlugZapIcon,
    RocketIcon,
    RouteIcon,
    WorkflowIcon,
} from "lucide-react";

import { SectionHeading } from "@/components/site/section-heading";

const steps = [
    {
        n: "01",
        icon: PlugZapIcon,
        title: "Connect your stack",
        desc: "Bring your data, models and tools together. Native integrations, webhooks and typed SDKs get you wired in minutes — not sprints.",
        gradient: "from-primary to-secondary",
    },
    {
        n: "02",
        icon: WorkflowIcon,
        title: "Build with agents & workflows",
        desc: "Compose chat, image, voice and autonomous agents into visual workflows. Branching, retries and human approval — no glue code.",
        gradient: "from-secondary to-accent",
    },
    {
        n: "03",
        icon: RocketIcon,
        title: "Deploy in one click",
        desc: "Ship to production instantly. Versioning, instant rollbacks and global edge delivery are built in from the first request.",
        gradient: "from-accent to-primary",
    },
    {
        n: "04",
        icon: GaugeIcon,
        title: "Scale with confidence",
        desc: "Full observability, cost controls and guardrails as you grow — from your first prototype to millions of requests a day.",
        gradient: "from-pink to-secondary",
    },
];

function StackCard({
    step,
    index,
}: {
    step: (typeof steps)[number];
    index: number;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });
    // Recede as the next card scrolls over this one.
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
    const opacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0.55]);
    const Icon = step.icon;

    return (
        <div
            ref={ref}
            className="sticky"
            style={{ top: `calc(6rem + ${index * 1.6}rem)` }}
        >
            <motion.div style={{ scale, opacity }} className="origin-top">
                <div className="group relative flex min-h-76 flex-col justify-between overflow-hidden rounded-3xl border bg-card p-8 shadow-2xl lg:min-h-96 lg:flex-row lg:items-center lg:gap-12 lg:p-14 xl:p-16">
                    <div
                        aria-hidden
                        className={`pointer-events-none absolute -top-16 -right-16 size-64 rounded-full bg-linear-to-br ${step.gradient} opacity-15 blur-3xl`}
                    />
                    <div className="relative max-w-xl lg:max-w-2xl xl:max-w-3xl">
                        <div className="flex items-center gap-4">
                            <div
                                className={`flex size-14 items-center justify-center rounded-2xl bg-linear-to-br ${step.gradient} shadow-lg lg:size-16`}
                            >
                                <Icon className="size-6 text-white lg:size-7" />
                            </div>
                            <span className="font-heading text-5xl font-bold text-muted-foreground/70 lg:text-7xl">
                                {step.n}
                            </span>
                        </div>
                        <h3 className="mt-6 font-heading text-2xl font-bold tracking-tight lg:text-4xl">
                            {step.title}
                        </h3>
                        <p className="mt-3 text-base leading-relaxed text-muted-foreground lg:mt-4 lg:text-xl">
                            {step.desc}
                        </p>
                    </div>

                    <div
                        aria-hidden
                        className="relative mt-8 hidden shrink-0 lg:mt-0 lg:block"
                    >
                        <div
                            className={`grid size-48 place-items-center overflow-hidden rounded-3xl bg-linear-to-br ${step.gradient} opacity-90 shadow-xl xl:size-60`}
                        >
                            {/* Fly-through on hover: first icon exits top-right while
                                a second flies in from bottom-left (reversed on hover-out). */}
                            <Icon className="col-start-1 row-start-1 size-20 text-white/90 transition-all duration-500 ease-out group-hover:translate-x-[150%] group-hover:translate-y-[-150%] group-hover:opacity-0 xl:size-24" />
                            <Icon className="col-start-1 row-start-1 size-20 translate-x-[-150%] translate-y-[150%] text-white/90 opacity-0 transition-all duration-500 ease-out group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100 xl:size-24" />
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export function HowItWorks() {
    return (
        <section className="relative py-16 lg:py-24">
            <div className="container-wide">
                <SectionHeading
                    eyebrow="How it works"
                    eyebrowIcon={RouteIcon}
                    title={
                        <>
                            From idea to production in{" "}
                            <span className="text-gradient">four steps</span>
                        </>
                    }
                    description="A single platform that takes you from first prompt to a scaled, observable AI product."
                />

                <div className="flex flex-col gap-6">
                    {steps.map((step, i) => (
                        <StackCard key={step.n} step={step} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
