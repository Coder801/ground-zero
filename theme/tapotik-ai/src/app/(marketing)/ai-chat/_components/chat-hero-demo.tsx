"use client";

import { useEffect, useRef, useState } from "react";
import { useScrollToBottom } from "@/lib/use-scroll-to-bottom";
import { motion, useInView } from "framer-motion";
import {
    GlobeIcon,
    MessageSquareIcon,
    MicIcon,
    PaperclipIcon,
    SendIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";

type Stage =
    | { kind: "user"; text: string }
    | { kind: "tool"; text: string }
    | { kind: "assistant"; text: string };

const stages: Stage[] = [
    {
        kind: "user",
        text: "What did our competitors ship this week? Anything we should react to?",
    },
    { kind: "tool", text: "Browsing 14 sources · changelogs, X, press" },
    {
        kind: "assistant",
        text: "Two launches matter: Acme added voice agents (pricing undercuts us by ~12%) and Nimbus shipped SSO on their free tier. I'd counter with our approval-gates story — want a one-pager for Monday's exec sync?",
    },
    { kind: "user", text: "Yes — and add a pricing comparison table." },
    {
        kind: "assistant",
        text: 'Done. One-pager drafted with a 3-column pricing table and talking points — it\'s in your Drafts as "Competitive brief · June".',
    },
];

const STEP_MS = 1600;

export function ChatHeroDemo() {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });
    const [step, setStep] = useState(0);
    const threadRef = useScrollToBottom<HTMLDivElement>([step]);

    useEffect(() => {
        if (!inView) return;
        if (step >= stages.length) return;
        const t = setTimeout(() => setStep((s) => s + 1), STEP_MS);
        return () => clearTimeout(t);
    }, [inView, step]);

    return (
        <div
            ref={ref}
            className="relative mx-auto flex h-115 w-full max-w-lg flex-col overflow-hidden rounded-3xl border shadow-2xl glass-strong"
        >
            <div className="flex items-center justify-between border-b px-5 py-3.5">
                <div className="flex items-center gap-2.5">
                    <div className="flex size-8 items-center justify-center rounded-lg bg-linear-to-br from-primary to-secondary">
                        <MessageSquareIcon className="size-4 text-white" />
                    </div>
                    <div>
                        <p className="text-sm leading-none font-semibold">
                            AI Chat
                        </p>
                        <p className="mt-0.5 font-mono text-[10px] text-muted-foreground">
                            smart routing · web on
                        </p>
                    </div>
                </div>
                <Badge variant="accent" className="text-[10px]">
                    ● Online
                </Badge>
            </div>

            <div
                ref={threadRef}
                data-lenis-prevent
                className="flex flex-1 flex-col gap-3.5 overflow-y-auto p-5"
            >
                {stages.slice(0, step + 1).map((stage, i) => {
                    if (stage.kind === "tool") {
                        return (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.35 }}
                                className="flex justify-start"
                            >
                                <span className="flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1.5 font-mono text-[10px] text-accent-foreground dark:text-accent">
                                    <GlobeIcon className="size-3 animate-spin-slow" />
                                    {stage.text}
                                </span>
                            </motion.div>
                        );
                    }
                    const isUser = stage.kind === "user";
                    const isLast = i === step;
                    return (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.35 }}
                            className={
                                isUser
                                    ? "flex justify-end"
                                    : "flex items-start gap-2.5"
                            }
                        >
                            {!isUser && (
                                <div className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md bg-linear-to-br from-primary to-secondary">
                                    <MessageSquareIcon className="size-3 text-white" />
                                </div>
                            )}
                            <div
                                className={
                                    isUser
                                        ? "max-w-[80%] rounded-2xl rounded-br-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground"
                                        : "max-w-[85%] rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm leading-relaxed glass"
                                }
                            >
                                {stage.text}
                                {!isUser && isLast && (
                                    <span className="ml-1 inline-block h-3.5 w-0.5 animate-caret rounded-full bg-accent align-middle" />
                                )}
                            </div>
                        </motion.div>
                    );
                })}
                {step + 1 < stages.length &&
                    stages[step + 1].kind === "assistant" && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex items-center gap-2.5"
                        >
                            <div className="flex size-6 items-center justify-center rounded-md bg-linear-to-br from-primary to-secondary">
                                <MessageSquareIcon className="size-3 text-white" />
                            </div>
                            <span className="flex items-center gap-1 rounded-2xl rounded-tl-sm px-3.5 py-2.5 glass">
                                {[0, 1, 2].map((dot) => (
                                    <motion.span
                                        key={dot}
                                        animate={{ opacity: [0.3, 1, 0.3] }}
                                        transition={{
                                            duration: 1.1,
                                            repeat: Infinity,
                                            delay: dot * 0.18,
                                        }}
                                        className="size-1.5 rounded-full bg-muted-foreground"
                                    />
                                ))}
                            </span>
                        </motion.div>
                    )}
            </div>

            <div className="border-t p-4">
                <div className="flex items-center gap-2.5 rounded-xl border bg-card/60 px-3.5 py-2.5">
                    <PaperclipIcon className="size-4 text-muted-foreground" />
                    <span className="flex-1 text-sm text-muted-foreground">
                        Message AI Chat…
                    </span>
                    <MicIcon className="size-4 text-muted-foreground" />
                    <span className="flex size-7 items-center justify-center rounded-lg bg-primary">
                        <SendIcon className="size-3.5 text-white" />
                    </span>
                </div>
            </div>
        </div>
    );
}
