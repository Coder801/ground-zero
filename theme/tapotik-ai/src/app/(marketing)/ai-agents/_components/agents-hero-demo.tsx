"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
    BotIcon,
    CheckIcon,
    CircleCheckIcon,
    ListChecksIcon,
    LoaderCircleIcon,
    PlayIcon,
    ShieldCheckIcon,
    WrenchIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

// Scripted run: step advances on a timer once in view.
// Steps 0-7: plan → tool calls → approval gate → verify → complete.
const STEP_MS = 1300;
const FINAL_STEP = 7;

const phases = [
    { label: "Plan", icon: ListChecksIcon, doneAt: 1 },
    { label: "Execute", icon: WrenchIcon, doneAt: 5 },
    { label: "Verify", icon: ShieldCheckIcon, doneAt: 7 },
];

function StatusDot({ state }: { state: "pending" | "running" | "done" }) {
    if (state === "done") {
        return (
            <span className="flex size-4 items-center justify-center rounded-full bg-accent/20">
                <CheckIcon className="size-2.5 text-accent" />
            </span>
        );
    }
    if (state === "running") {
        return (
            <LoaderCircleIcon className="size-4 animate-spin text-primary" />
        );
    }
    return <span className="size-4 rounded-full border border-border" />;
}

export function AgentsHeroDemo() {
    const ref = useRef<HTMLDivElement>(null);
    const [step, setStep] = useState(-1);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) setStep((s) => (s < 0 ? 0 : s));
            },
            { rootMargin: "-80px" },
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (step < 0 || step >= FINAL_STEP) return;
        const t = setTimeout(() => setStep((s) => s + 1), STEP_MS);
        return () => clearTimeout(t);
    }, [step]);

    const complete = step >= FINAL_STEP;

    return (
        <div
            ref={ref}
            className="relative mx-auto w-full max-w-2xl overflow-hidden rounded-3xl border shadow-2xl glass-strong"
        >
            <div className="flex items-center justify-between border-b px-5 py-3.5">
                <div className="flex items-center gap-2.5">
                    <div className="flex size-8 items-center justify-center rounded-lg bg-linear-to-br from-primary to-accent">
                        <BotIcon className="size-4 text-white" />
                    </div>
                    <div>
                        <p className="text-sm leading-none font-semibold">
                            invoice-reconciler
                        </p>
                        <p className="mt-0.5 font-mono text-[10px] text-muted-foreground">
                            run #4,812 · trigger: weekly
                        </p>
                    </div>
                </div>
                <Badge
                    variant={complete ? "success" : "glow"}
                    className="text-[10px]"
                >
                    {complete ? "✓ Complete · 41s" : "● Running"}
                </Badge>
            </div>

            <div className="border-b px-5 py-3.5">
                <div className="flex items-center">
                    {phases.map((phase, i) => {
                        const done = step >= phase.doneAt;
                        const active =
                            !done &&
                            (i === 0
                                ? step >= 0
                                : step >= phases[i - 1].doneAt);
                        return (
                            <div
                                key={phase.label}
                                className="flex flex-1 items-center last:flex-none"
                            >
                                <div className="flex items-center gap-2">
                                    <span
                                        className={cn(
                                            "flex size-7 items-center justify-center rounded-full border transition-colors duration-500",
                                            done
                                                ? "border-accent/50 bg-accent/15 text-accent"
                                                : active
                                                  ? "border-primary/50 bg-primary/15 text-primary"
                                                  : "border-border bg-card text-muted-foreground",
                                        )}
                                    >
                                        <phase.icon className="size-3.5" />
                                    </span>
                                    <span
                                        className={cn(
                                            "text-xs font-medium transition-colors duration-500",
                                            done || active
                                                ? "text-foreground"
                                                : "text-muted-foreground",
                                        )}
                                    >
                                        {phase.label}
                                    </span>
                                </div>
                                {i < phases.length - 1 && (
                                    <div className="relative mx-3 h-px flex-1 overflow-hidden rounded-full bg-border">
                                        <motion.div
                                            className="absolute inset-y-0 left-0 bg-linear-to-r from-primary to-accent"
                                            animate={{
                                                width: done ? "100%" : "0%",
                                            }}
                                            transition={{ duration: 0.6 }}
                                        />
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            <div className="flex min-h-75 flex-col gap-2.5 p-5">
                {step >= 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-xl border bg-card/70 px-4 py-3"
                    >
                        <div className="flex items-center gap-2.5">
                            <StatusDot state={step >= 1 ? "done" : "running"} />
                            <p className="text-xs font-semibold">
                                {step >= 1
                                    ? "Plan approved · 3 steps"
                                    : "Planning run…"}
                            </p>
                        </div>
                        {step >= 1 && (
                            <ul className="mt-2.5 space-y-1 pl-6.5">
                                {[
                                    "Pull unpaid invoices from Stripe",
                                    "Cross-check against ledger sheet",
                                    "Draft reminders for overdue accounts",
                                ].map((item, i) => (
                                    <li
                                        key={item}
                                        className="font-mono text-[10.5px] text-muted-foreground"
                                    >
                                        <span className="mr-1.5 text-primary">
                                            {i + 1}.
                                        </span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </motion.div>
                )}

                {step >= 2 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-xl border bg-card/70 px-4 py-3"
                    >
                        <div className="flex items-center gap-2.5">
                            <StatusDot state={step >= 3 ? "done" : "running"} />
                            <p className="font-mono text-[11px]">
                                <span className="text-primary">stripe</span>
                                <span className="text-muted-foreground">
                                    .invoices.list
                                </span>
                                <span className="text-muted-foreground">
                                    ({'{ status: "open" }'})
                                </span>
                            </p>
                        </div>
                        {step >= 3 && (
                            <p className="mt-1.5 pl-6.5 font-mono text-[10.5px] text-accent-foreground dark:text-accent">
                                → 42 invoices · $18,340 outstanding
                            </p>
                        )}
                    </motion.div>
                )}

                {step >= 3 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-xl border bg-card/70 px-4 py-3"
                    >
                        <div className="flex items-center gap-2.5">
                            <StatusDot state={step >= 4 ? "done" : "running"} />
                            <p className="font-mono text-[11px]">
                                <span className="text-primary">sheets</span>
                                <span className="text-muted-foreground">
                                    .reconcile
                                </span>
                                <span className="text-muted-foreground">
                                    (ledger_q2)
                                </span>
                            </p>
                        </div>
                        {step >= 4 && (
                            <p className="mt-1.5 pl-6.5 font-mono text-[10.5px] text-accent-foreground dark:text-accent">
                                → matched 39 · flagged 3 overdue &gt; 30 days
                            </p>
                        )}
                    </motion.div>
                )}

                {step >= 4 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        className={cn(
                            "rounded-xl border px-4 py-3 transition-colors duration-500",
                            step >= 5
                                ? "border-success/40 bg-success/5"
                                : "border-warning/50 bg-warning/10",
                        )}
                    >
                        <div className="flex items-center justify-between gap-3">
                            <div className="flex items-center gap-2.5">
                                <ShieldCheckIcon
                                    className={cn(
                                        "size-4",
                                        step >= 5
                                            ? "text-success"
                                            : "text-warning",
                                    )}
                                />
                                <div>
                                    <p className="text-xs font-semibold">
                                        Approval gate · send 3 reminder emails
                                    </p>
                                    <p className="font-mono text-[10px] text-muted-foreground">
                                        {step >= 5
                                            ? "Approved by h.sato · 12:04:31"
                                            : "Waiting for a human sign-off…"}
                                    </p>
                                </div>
                            </div>
                            {step >= 5 ? (
                                <Badge variant="success" className="text-[9px]">
                                    Approved
                                </Badge>
                            ) : (
                                <span className="flex gap-1.5">
                                    <span className="rounded-full bg-success/15 px-2.5 py-1 text-[10px] font-medium text-success">
                                        Approve
                                    </span>
                                    <span className="rounded-full bg-muted px-2.5 py-1 text-[10px] font-medium text-muted-foreground">
                                        Reject
                                    </span>
                                </span>
                            )}
                        </div>
                    </motion.div>
                )}

                {step >= 6 && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-xl border bg-card/70 px-4 py-3"
                    >
                        <div className="flex items-center gap-2.5">
                            <StatusDot state={step >= 7 ? "done" : "running"} />
                            <p className="text-xs font-semibold">
                                {step >= 7
                                    ? "Verified — 3 emails sent, ledger updated, report filed"
                                    : "Verifying outcomes against plan…"}
                            </p>
                        </div>
                        {step >= 7 && (
                            <p className="mt-1.5 flex items-center gap-1.5 pl-6.5 font-mono text-[10.5px] text-muted-foreground">
                                <CircleCheckIcon className="size-3 text-success" />
                                audit log #4812 written · replay available
                            </p>
                        )}
                    </motion.div>
                )}

                {step < 0 && (
                    <div className="flex flex-1 items-center justify-center gap-2 text-muted-foreground">
                        <PlayIcon className="size-4" />
                        <span className="text-xs">
                            Agent run starts when in view…
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}
