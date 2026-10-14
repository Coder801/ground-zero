"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
    ArrowRightIcon,
    BotIcon,
    ImageIcon,
    MessageSquareIcon,
    PlayIcon,
    SparklesIcon,
    ZapIcon,
} from "lucide-react";

import { AuroraBackground } from "@/components/effects/aurora-background";
import { Typewriter } from "@/components/effects/typewriter";
import { Magnetic } from "@/components/effects/magnetic";
import { AnimatedCounter } from "@/components/effects/animated-counter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAppReady } from "@/components/app-ready";
import { stats } from "@/lib/data";

function HeroVisual() {
    const ready = useAppReady();
    return (
        <motion.div
            initial={{ opacity: 0, y: 48, scale: 0.96 }}
            animate={ready ? { opacity: 1, y: 0, scale: 1 } : undefined}
            transition={{
                duration: 0.9,
                delay: 0.4,
                ease: [0.21, 0.47, 0.32, 0.98],
            }}
            className="relative mx-auto mt-16 w-full max-w-5xl lg:mt-20"
        >
            <div
                aria-hidden
                className="absolute -inset-x-8 top-8 h-full rounded-4xl bg-linear-to-r from-primary/25 via-secondary/20 to-accent/15 blur-3xl"
            />

            <div className="relative overflow-hidden rounded-2xl shadow-2xl glass-strong">
                <div className="flex items-center gap-2 border-b border-border px-5 py-3.5">
                    <span className="size-3 rounded-full bg-destructive/70" />
                    <span className="size-3 rounded-full bg-warning/70" />
                    <span className="size-3 rounded-full bg-success/70" />
                    <div className="mx-auto flex h-7 w-full max-w-sm items-center justify-center gap-2 rounded-lg bg-muted/60 font-mono text-xs text-muted-foreground">
                        <SparklesIcon className="size-3 text-primary" />
                        app.tapotik.ai/studio
                    </div>
                </div>

                <div className="grid grid-cols-12 gap-0">
                    <div className="col-span-3 hidden border-r border-border p-4 sm:block">
                        <div className="space-y-1.5">
                            {[
                                {
                                    icon: MessageSquareIcon,
                                    label: "AI Chat",
                                    active: true,
                                },
                                { icon: ImageIcon, label: "AI Image" },
                                { icon: BotIcon, label: "Agents" },
                                { icon: ZapIcon, label: "Workflows" },
                            ].map((item) => (
                                <div
                                    key={item.label}
                                    className={`flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium ${
                                        item.active
                                            ? "bg-primary/15 text-primary"
                                            : "text-muted-foreground"
                                    }`}
                                >
                                    <item.icon className="size-3.5" />
                                    {item.label}
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 space-y-2">
                            <div className="h-2 w-3/4 rounded-full bg-muted" />
                            <div className="h-2 w-1/2 rounded-full bg-muted" />
                            <div className="h-2 w-2/3 rounded-full bg-muted" />
                        </div>
                    </div>

                    <div className="col-span-12 flex flex-col gap-4 p-5 sm:col-span-9 sm:p-6">
                        <div className="flex justify-end">
                            <div className="max-w-[75%] rounded-2xl rounded-br-sm bg-primary px-4 py-2.5 text-left text-xs text-primary-foreground sm:text-sm">
                                Generate a launch plan for our new AI voice
                                product
                            </div>
                        </div>
                        <div className="flex items-start gap-3">
                            <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-linear-to-br from-primary to-secondary">
                                <SparklesIcon className="size-3.5 text-white" />
                            </div>
                            <div className="max-w-[80%] space-y-2.5 rounded-2xl rounded-tl-sm px-4 py-3 glass">
                                <p className="text-xs text-foreground/90 sm:text-sm">
                                    Here&apos;s a 4-week launch plan with
                                    channel strategy, content calendar and
                                    success metrics:
                                </p>
                                <div className="space-y-1.5">
                                    <motion.div
                                        className="h-2 rounded-full bg-linear-to-r from-primary/60 to-secondary/60"
                                        initial={{ width: "0%" }}
                                        animate={
                                            ready ? { width: "92%" } : undefined
                                        }
                                        transition={{
                                            duration: 1.1,
                                            delay: 0.9,
                                        }}
                                    />
                                    <motion.div
                                        className="h-2 rounded-full bg-muted"
                                        initial={{ width: "0%" }}
                                        animate={
                                            ready ? { width: "70%" } : undefined
                                        }
                                        transition={{
                                            duration: 1.1,
                                            delay: 1.1,
                                        }}
                                    />
                                    <motion.div
                                        className="h-2 rounded-full bg-muted"
                                        initial={{ width: "0%" }}
                                        animate={
                                            ready ? { width: "82%" } : undefined
                                        }
                                        transition={{
                                            duration: 1.1,
                                            delay: 1.3,
                                        }}
                                    />
                                </div>
                                <div className="flex items-center gap-1.5 pt-1">
                                    <span className="size-1.5 animate-pulse rounded-full bg-accent" />
                                    <span className="font-mono text-[10px] text-muted-foreground">
                                        tapotik-v4 · 87ms · streaming
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <motion.div
                aria-hidden
                className="absolute top-1/4 -left-6 hidden w-44 animate-float rounded-xl p-3.5 shadow-xl glass-strong lg:block"
                initial={{ opacity: 0, x: -24 }}
                animate={ready ? { opacity: 1, x: 0 } : undefined}
                transition={{ delay: 0.8, duration: 0.7 }}
            >
                <div className="flex items-center gap-2">
                    <div className="flex size-8 items-center justify-center rounded-lg bg-accent/15">
                        <ZapIcon className="size-4 text-accent" />
                    </div>
                    <div>
                        <p className="text-xs font-semibold">Tokens / sec</p>
                        <p className="text-[10px] text-muted-foreground">
                            realtime
                        </p>
                    </div>
                </div>
                <p className="mt-2 text-gradient font-heading text-2xl font-bold">
                    1,284
                </p>
            </motion.div>

            <motion.div
                aria-hidden
                className="absolute top-8 -right-4 hidden w-48 animate-float-slow rounded-xl p-3.5 shadow-xl glass-strong lg:block"
                initial={{ opacity: 0, x: 24 }}
                animate={ready ? { opacity: 1, x: 0 } : undefined}
                transition={{ delay: 1.0, duration: 0.7 }}
            >
                <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold">Agent run</p>
                    <Badge variant="success" className="px-2 py-0 text-[10px]">
                        Success
                    </Badge>
                </div>
                <div className="mt-2.5 space-y-1.5">
                    {["Plan", "Execute", "Verify"].map((step) => (
                        <div key={step} className="flex items-center gap-2">
                            <span className="size-1.5 rounded-full bg-success" />
                            <span className="text-[10px] text-muted-foreground">
                                {step}
                            </span>
                            <div className="ml-auto h-1 w-16 overflow-hidden rounded-full bg-muted">
                                <div className="h-full w-full rounded-full bg-linear-to-r from-primary to-accent" />
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </motion.div>
    );
}

export function Hero() {
    const ready = useAppReady();
    return (
        <section className="relative overflow-hidden pt-32 pb-16 lg:pt-44 lg:pb-24">
            <AuroraBackground intensity="strong" />
            <div
                aria-hidden
                className="absolute inset-0 bg-grid mask-[radial-gradient(ellipse_70%_60%_at_50%_30%,black,transparent)]"
            />

            <div className="relative container-wide">
                <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={ready ? { opacity: 1, y: 0 } : undefined}
                        transition={{ duration: 0.6 }}
                    >
                        <Badge
                            variant="glow"
                            className="mb-6 gap-2 py-1.5 pr-4 pl-1.5"
                        >
                            <span className="rounded-full bg-primary px-2 py-0.5 text-[10px] font-bold text-white">
                                NEW
                            </span>
                            Tapotik Agents 2.8 — autonomy you can trust
                            <ArrowRightIcon className="size-3" />
                        </Badge>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 24 }}
                        animate={ready ? { opacity: 1, y: 0 } : undefined}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="text-4xl leading-[1.08] font-bold tracking-tight text-balance sm:text-6xl lg:text-7xl"
                    >
                        The AI platform to <br className="hidden sm:block" />
                        <Typewriter
                            className="text-gradient"
                            words={[
                                "build products",
                                "automate work",
                                "generate media",
                                "deploy agents",
                            ]}
                        />
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 24 }}
                        animate={ready ? { opacity: 1, y: 0 } : undefined}
                        transition={{ duration: 0.7, delay: 0.2 }}
                        className="mt-6 max-w-2xl text-base leading-relaxed text-balance text-muted-foreground sm:text-lg lg:text-xl"
                    >
                        Chat, image, video, voice and autonomous agents — one
                        platform, one API, one beautiful workspace. Ship
                        AI-powered experiences your users will love.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        animate={ready ? { opacity: 1, y: 0 } : undefined}
                        transition={{ duration: 0.7, delay: 0.3 }}
                        className="mt-9 flex flex-col items-center gap-3.5 sm:flex-row"
                    >
                        <Magnetic>
                            <Button
                                asChild
                                size="xl"
                                variant="gradient"
                                className="group"
                            >
                                {/* prefetch={false}: keeps the (auth) chunk group
                                    (own framer-motion copy) off the homepage. */}
                                <Link href="/signup" prefetch={false}>
                                    Start building free
                                    <ArrowRightIcon className="transition-transform duration-300 group-hover:translate-x-1" />
                                </Link>
                            </Button>
                        </Magnetic>
                        <Button
                            asChild
                            size="xl"
                            variant="glass"
                            className="group"
                        >
                            <Link href="/ai-chat">
                                <PlayIcon className="size-4 text-primary" />
                                Watch demo
                            </Link>
                        </Button>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={ready ? { opacity: 1 } : undefined}
                        transition={{ duration: 0.7, delay: 0.45 }}
                        className="mt-5 text-xs text-muted-foreground"
                    >
                        Free forever plan · No credit card required · SOC 2 Type
                        II
                    </motion.p>
                </div>

                <HeroVisual />

                <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-8 lg:mt-20 lg:grid-cols-4">
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={
                                ready ? { opacity: 1, y: 0 } : undefined
                            }
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.08 }}
                            className="flex flex-col items-center gap-1 text-center"
                        >
                            <span className="font-heading text-3xl font-bold sm:text-4xl">
                                <AnimatedCounter
                                    value={stat.value}
                                    suffix={stat.suffix}
                                    decimals={stat.decimals ?? 0}
                                />
                            </span>
                            <span className="text-xs text-muted-foreground sm:text-sm">
                                {stat.label}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
