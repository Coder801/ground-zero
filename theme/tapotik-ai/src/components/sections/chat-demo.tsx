"use client";

import { useEffect, useRef, useState } from "react";
import { useScrollToBottom } from "@/lib/use-scroll-to-bottom";
import { AnimatePresence, motion, useInView } from "framer-motion";
import {
    CopyIcon,
    MessageSquareIcon,
    PaperclipIcon,
    RefreshCwIcon,
    SendIcon,
    SparklesIcon,
    ThumbsUpIcon,
} from "lucide-react";

import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/effects/reveal";
import { Badge } from "@/components/ui/badge";

const script = [
    {
        role: "user" as const,
        text: "Summarize last week's customer feedback and flag churn risks.",
    },
    {
        role: "assistant" as const,
        text: "Analyzed 342 conversations. Top themes: onboarding friction (28%), pricing questions (19%), feature requests for API v2 (15%). I flagged 7 accounts with churn signals — 3 high priority. Want me to draft retention outreach for those three?",
    },
    {
        role: "user" as const,
        text: "Yes, draft them and schedule a review with the CS team.",
    },
    {
        role: "assistant" as const,
        text: "Done. Three personalized emails are in your drafts, and I scheduled a 30-min review Thursday 10:00 with the CS team — invites sent. I'll monitor those accounts and alert you on any new signals.",
    },
];

function useTypedScript(active: boolean) {
    const [visible, setVisible] = useState(0);
    const [typed, setTyped] = useState("");

    useEffect(() => {
        if (!active) return;
        if (visible >= script.length) return;

        const current = script[visible];
        if (current.role === "user") {
            const t = setTimeout(() => {
                setVisible((v) => v + 1);
            }, 900);
            return () => clearTimeout(t);
        }

        if (typed.length < current.text.length) {
            const t = setTimeout(() => {
                setTyped(current.text.slice(0, typed.length + 3));
            }, 14);
            return () => clearTimeout(t);
        }
        const t = setTimeout(() => {
            setTyped("");
            setVisible((v) => v + 1);
        }, 1200);
        return () => clearTimeout(t);
    }, [active, visible, typed]);

    return { visible, typed };
}

export function ChatDemo() {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-120px" });
    const { visible, typed } = useTypedScript(inView);
    const messagesRef = useScrollToBottom<HTMLDivElement>([visible, typed]);

    return (
        <section className="relative overflow-hidden py-16 lg:py-24">
            <div
                aria-hidden
                className="pointer-events-none absolute top-1/3 -left-40 size-96 rounded-full bg-primary/12 blur-3xl"
            />
            <div className="container-wide">
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
                    <div className="order-2 lg:order-1">
                        <Reveal>
                            <div
                                ref={ref}
                                className="relative mx-auto flex h-120 max-w-lg flex-col overflow-hidden rounded-3xl border shadow-2xl glass-strong"
                            >
                                <div className="flex items-center justify-between border-b px-5 py-3.5">
                                    <div className="flex items-center gap-2.5">
                                        <div className="flex size-8 items-center justify-center rounded-lg bg-linear-to-br from-primary to-secondary">
                                            <SparklesIcon className="size-4 text-white" />
                                        </div>
                                        <div>
                                            <p className="text-sm leading-none font-semibold">
                                                Tapotik Assistant
                                            </p>
                                            <p className="mt-0.5 font-mono text-[10px] text-muted-foreground">
                                                tapotik-v4 · memory on
                                            </p>
                                        </div>
                                    </div>
                                    <Badge
                                        variant="accent"
                                        className="text-[10px]"
                                    >
                                        ● Online
                                    </Badge>
                                </div>

                                <div
                                    ref={messagesRef}
                                    data-lenis-prevent
                                    className="flex flex-1 flex-col gap-4 overflow-y-auto p-5"
                                >
                                    <AnimatePresence>
                                        {script
                                            .slice(0, visible + 1)
                                            .map((msg, i) => {
                                                const isTyping =
                                                    i === visible &&
                                                    msg.role === "assistant";
                                                const text = isTyping
                                                    ? typed
                                                    : msg.text;
                                                if (i > visible) return null;
                                                return (
                                                    <motion.div
                                                        key={i}
                                                        initial={{
                                                            opacity: 0,
                                                            y: 12,
                                                        }}
                                                        animate={{
                                                            opacity: 1,
                                                            y: 0,
                                                        }}
                                                        transition={{
                                                            duration: 0.35,
                                                        }}
                                                        className={
                                                            msg.role === "user"
                                                                ? "flex justify-end"
                                                                : "flex items-start gap-2.5"
                                                        }
                                                    >
                                                        {msg.role ===
                                                            "assistant" && (
                                                            <div className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-md bg-linear-to-br from-primary to-secondary">
                                                                <SparklesIcon className="size-3 text-white" />
                                                            </div>
                                                        )}
                                                        <div
                                                            className={
                                                                msg.role ===
                                                                "user"
                                                                    ? "max-w-[80%] rounded-2xl rounded-br-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground"
                                                                    : "max-w-[85%] rounded-2xl rounded-tl-sm px-4 py-2.5 text-sm leading-relaxed glass"
                                                            }
                                                        >
                                                            {text}
                                                            {isTyping &&
                                                                text.length <
                                                                    msg.text
                                                                        .length && (
                                                                    <span className="ml-0.5 inline-block h-3.5 w-0.5 animate-caret rounded-full bg-accent align-middle" />
                                                                )}
                                                            {msg.role ===
                                                                "assistant" &&
                                                                (!isTyping ||
                                                                    text.length ===
                                                                        msg.text
                                                                            .length) && (
                                                                    <span className="mt-2 flex items-center gap-2 text-muted-foreground">
                                                                        <CopyIcon className="size-3 cursor-pointer transition-colors hover:text-foreground" />
                                                                        <RefreshCwIcon className="size-3 cursor-pointer transition-colors hover:text-foreground" />
                                                                        <ThumbsUpIcon className="size-3 cursor-pointer transition-colors hover:text-foreground" />
                                                                    </span>
                                                                )}
                                                        </div>
                                                    </motion.div>
                                                );
                                            })}
                                    </AnimatePresence>
                                </div>

                                <div className="border-t p-4">
                                    <div className="flex items-center gap-2 rounded-xl border bg-card/60 px-3.5 py-2.5">
                                        <PaperclipIcon className="size-4 text-muted-foreground" />
                                        <span className="flex-1 text-sm text-muted-foreground">
                                            Ask anything...
                                        </span>
                                        <span className="flex size-7 items-center justify-center rounded-lg bg-primary">
                                            <SendIcon className="size-3.5 text-white" />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    </div>

                    <div className="order-1 lg:order-2">
                        <SectionHeading
                            align="left"
                            eyebrow="AI Chat"
                            eyebrowIcon={MessageSquareIcon}
                            title={
                                <>
                                    An assistant that{" "}
                                    <span className="text-gradient">
                                        actually does the work
                                    </span>
                                </>
                            }
                            description="Not just answers — actions. Tapotik Chat reads your context, calls your tools and completes multi-step tasks while you watch it think."
                            className="mb-8"
                        />
                        <Reveal delay={0.1}>
                            <ul className="space-y-4">
                                {[
                                    {
                                        title: "Persistent memory",
                                        desc: "Remembers your projects, preferences and past decisions across sessions.",
                                    },
                                    {
                                        title: "Tool calling",
                                        desc: "Connects to calendars, CRMs, databases and 6,000+ apps to take real action.",
                                    },
                                    {
                                        title: "Multi-model routing",
                                        desc: "Automatically picks the best model per request — quality when it matters, speed when it doesn't.",
                                    },
                                ].map((item) => (
                                    <li
                                        key={item.title}
                                        className="flex gap-3.5"
                                    >
                                        <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-accent/15">
                                            <span className="size-1.5 rounded-full bg-accent" />
                                        </span>
                                        <div>
                                            <p className="text-sm font-semibold">
                                                {item.title}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {item.desc}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    );
}
