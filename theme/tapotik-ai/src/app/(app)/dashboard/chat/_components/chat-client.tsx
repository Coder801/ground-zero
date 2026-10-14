"use client";

import { useRef, useState } from "react";
import { useScrollToBottom } from "@/lib/use-scroll-to-bottom";
import { AnimatePresence, motion } from "framer-motion";
import {
    CheckIcon,
    CopyIcon,
    MicIcon,
    PaperclipIcon,
    PlusIcon,
    SearchIcon,
    SendIcon,
    Share2Icon,
    SlidersHorizontalIcon,
    SparklesIcon,
} from "lucide-react";
import { toast } from "sonner";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { copyWithToast } from "@/lib/clipboard";

const conversations = [
    {
        title: "Rate limiter design review",
        preview: "Here's a sliding-window implementation in TypeScript…",
        time: "2m",
        unread: false,
    },
    {
        title: "Onboarding email sequence",
        preview: "Draft 3 of 5 — subject: “Your first agent in 5 minutes”",
        time: "1h",
        unread: true,
    },
    {
        title: "SQL for retention cohorts",
        preview: "WITH cohorts AS (SELECT user_id, DATE_TRUNC('week'…",
        time: "3h",
        unread: false,
    },
    {
        title: "Landing page hero copy",
        preview: "Option B tests 22% better in my judgment because…",
        time: "5h",
        unread: false,
    },
    {
        title: "Terraform module cleanup",
        preview: "You can collapse the three aws_iam_role blocks into…",
        time: "1d",
        unread: false,
    },
    {
        title: "Q2 board deck outline",
        preview: "Slide 4 should lead with the 48M requests/day stat…",
        time: "2d",
        unread: false,
    },
    {
        title: "Support macros refresh",
        preview: "Rewrote all 12 macros in a warmer tone, see below…",
        time: "4d",
        unread: false,
    },
];

type Message = {
    id: number;
    role: "user" | "assistant";
    content: string;
    /** Renders the rich markdown-style block instead of plain text. */
    rich?: boolean;
};

const initialMessages: Message[] = [
    {
        id: 1,
        role: "user",
        content:
            "We keep getting burst traffic from webhook retries. What's the cleanest way to rate-limit our public API in TypeScript?",
    },
    { id: 2, role: "assistant", content: "", rich: true },
    {
        id: 3,
        role: "user",
        content: "Nice. Why sliding window over a fixed window here?",
    },
    {
        id: 4,
        role: "assistant",
        content:
            "A fixed window resets all at once, so a client can send 2× the limit around the boundary (e.g. 100 requests at 11:59:59 and 100 more at 12:00:00). The sliding window weighs the previous window's count by overlap, smoothing bursts without the memory cost of a full sliding log. For webhook retry storms specifically, that boundary burst is exactly the failure mode you want to avoid.",
    },
];

const cannedReplies = [
    "Good question. For your traffic profile I'd start with the middleware approach above, set `limit: 120` per minute, and add a `Retry-After` header so well-behaved webhook senders back off automatically. Want me to sketch the Redis-backed version for multi-instance deployments?",
    "Here's how I'd approach it: keep the in-memory limiter per instance, then add a shared Redis counter only for the endpoints that see retry storms. That gives you 99% of the protection with ~1ms overhead. I can generate the full module with tests if you'd like.",
    "That depends on your p99 target. At 142ms average latency you have headroom for a distributed check — but if you want zero added latency, do local limiting with a gossip-style sync every second. Happy to compare both with rough numbers.",
];

const codeLines = [
    { text: "const WINDOW_MS = 60_000;", indent: 0 },
    { text: "const LIMIT = 100;", indent: 0 },
    { text: "", indent: 0 },
    {
        text: "export function slidingWindow(store: Map<string, Hit[]>) {",
        indent: 0,
    },
    { text: "return (req: Request): boolean => {", indent: 1 },
    { text: "const now = Date.now();", indent: 2 },
    { text: "const hits = store.get(req.ip) ?? [];", indent: 2 },
    {
        text: "const fresh = hits.filter(h => now - h.ts < WINDOW_MS);",
        indent: 2,
    },
    { text: "fresh.push({ ts: now });", indent: 2 },
    { text: "store.set(req.ip, fresh);", indent: 2 },
    { text: "return fresh.length <= LIMIT; // allow?", indent: 2 },
    { text: "};", indent: 1 },
    { text: "}", indent: 0 },
];

function CodeBlock() {
    const [copied, setCopied] = useState(false);

    async function copy() {
        const code = codeLines
            .map((line) => "  ".repeat(line.indent) + line.text)
            .join("\n");
        const ok = await copyWithToast(code, {
            success: "Code copied to clipboard",
            error: "Couldn't copy code",
        });
        if (ok) {
            setCopied(true);
            setTimeout(() => setCopied(false), 1600);
        }
    }

    return (
        <div className="overflow-hidden rounded-xl border bg-background/70">
            <div className="flex items-center justify-between border-b bg-muted/40 px-3.5 py-2">
                <span className="font-mono text-[11px] text-muted-foreground">
                    rate-limiter.ts
                </span>
                <button
                    type="button"
                    onClick={copy}
                    aria-label="Copy code"
                    className="flex cursor-pointer items-center gap-1.5 text-[11px] text-muted-foreground transition-colors hover:text-foreground"
                >
                    {copied ? (
                        <CheckIcon className="size-3 text-success" />
                    ) : (
                        <CopyIcon className="size-3" />
                    )}
                    {copied ? "Copied" : "Copy"}
                </button>
            </div>
            <pre className="overflow-x-auto p-3.5 font-mono text-xs leading-relaxed">
                <code>
                    {codeLines.map((line, i) => (
                        <span key={i} className="block whitespace-pre">
                            {"  ".repeat(line.indent)}
                            <span
                                className={cn(
                                    line.text.startsWith("const") ||
                                        line.text.startsWith("export") ||
                                        line.text.startsWith("return")
                                        ? "text-(--primary-bright)"
                                        : "text-foreground/80",
                                    line.text.includes("//") &&
                                        "text-muted-foreground",
                                )}
                            >
                                {line.text}
                            </span>
                        </span>
                    ))}
                </code>
            </pre>
        </div>
    );
}

function RichReply() {
    return (
        <div className="space-y-3 text-sm leading-relaxed">
            <p>
                For burst traffic from webhook retries, a{" "}
                <strong className="font-semibold">
                    sliding-window limiter
                </strong>{" "}
                is the sweet spot — smoother than a fixed window, far cheaper
                than a full request log. Minimal in-memory version:
            </p>
            <CodeBlock />
            <p>Three things to keep in mind:</p>
            <ul className="ml-4 list-disc space-y-1 marker:text-primary">
                <li>
                    Key by{" "}
                    <code className="rounded-sm bg-muted px-1.5 py-0.5 font-mono text-xs">
                        ip + route
                    </code>{" "}
                    so one noisy endpoint can&apos;t starve the rest.
                </li>
                <li>
                    Return{" "}
                    <code className="rounded-sm bg-muted px-1.5 py-0.5 font-mono text-xs">
                        429
                    </code>{" "}
                    with a{" "}
                    <code className="rounded-sm bg-muted px-1.5 py-0.5 font-mono text-xs">
                        Retry-After
                    </code>{" "}
                    header — webhook senders respect it.
                </li>
                <li>
                    Swap the{" "}
                    <code className="rounded-sm bg-muted px-1.5 py-0.5 font-mono text-xs">
                        Map
                    </code>{" "}
                    for Redis when you scale past one instance.
                </li>
            </ul>
        </div>
    );
}

function StreamingDots() {
    return (
        <div
            className="flex items-center gap-1.5 px-1 py-1.5"
            role="status"
            aria-label="Assistant is typing"
        >
            {[0, 1, 2].map((i) => (
                <span
                    key={i}
                    className="size-1.5 animate-bounce rounded-full bg-muted-foreground/70"
                    style={{ animationDelay: `${i * 0.15}s` }}
                />
            ))}
        </div>
    );
}

function AssistantAvatar() {
    return (
        <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-primary to-secondary shadow-[0_0_16px_-4px_var(--glow-primary)]">
            <SparklesIcon className="size-4 text-white" />
        </div>
    );
}

export function ChatClient() {
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [input, setInput] = useState("");
    const [streaming, setStreaming] = useState(false);
    const [model, setModel] = useState("tapotik-v4");
    const [activeConversation, setActiveConversation] = useState(0);
    const [replyIndex, setReplyIndex] = useState(0);
    const [temperature, setTemperature] = useState([70]);
    const [maxTokens, setMaxTokens] = useState([50]);

    const scrollRef = useScrollToBottom<HTMLDivElement>([messages, streaming]);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    function autosize() {
        const el = textareaRef.current;
        if (!el) return;
        el.style.height = "auto";
        el.style.height = `${Math.min(el.scrollHeight, 160)}px`;
    }

    function send() {
        const text = input.trim();
        if (!text || streaming) return;

        setMessages((prev) => [
            ...prev,
            { id: Date.now(), role: "user", content: text },
        ]);
        setInput("");
        setStreaming(true);
        requestAnimationFrame(autosize);

        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                {
                    id: Date.now() + 1,
                    role: "assistant",
                    content: cannedReplies[replyIndex % cannedReplies.length],
                },
            ]);
            setReplyIndex((i) => i + 1);
            setStreaming(false);
        }, 600);
    }

    return (
        <div className="flex h-[calc(100dvh-4rem)] overflow-hidden">
            <aside className="hidden w-72 shrink-0 flex-col border-r lg:flex xl:w-80">
                <div className="space-y-3 border-b p-4">
                    <Button variant="gradient" className="w-full">
                        <PlusIcon className="size-4" />
                        New chat
                    </Button>
                    <div className="relative">
                        <SearchIcon className="pointer-events-none absolute top-1/2 left-3.5 size-3.5 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Search conversations…"
                            className="h-9 rounded-full pl-9 text-sm"
                            aria-label="Search conversations"
                        />
                    </div>
                </div>
                <div className="flex-1 space-y-1 overflow-y-auto p-2.5">
                    {conversations.map((c, i) => (
                        <button
                            key={c.title}
                            type="button"
                            onClick={() => setActiveConversation(i)}
                            className={cn(
                                "w-full cursor-pointer rounded-xl px-3 py-2.5 text-left transition-colors",
                                i === activeConversation
                                    ? "bg-primary/10"
                                    : "hover:bg-muted/60",
                            )}
                        >
                            <div className="flex items-center justify-between gap-2">
                                <p
                                    className={cn(
                                        "truncate text-sm font-medium",
                                        i === activeConversation &&
                                            "text-primary",
                                    )}
                                >
                                    {c.title}
                                </p>
                                <span className="shrink-0 text-[10px] text-muted-foreground">
                                    {c.time}
                                </span>
                            </div>
                            <div className="mt-0.5 flex items-center gap-2">
                                <p className="truncate text-xs text-muted-foreground">
                                    {c.preview}
                                </p>
                                {c.unread && (
                                    <span
                                        aria-label="Unread"
                                        className="size-1.5 shrink-0 rounded-full bg-primary"
                                    />
                                )}
                            </div>
                        </button>
                    ))}
                </div>
            </aside>

            <section className="flex min-w-0 flex-1 flex-col">
                <div className="flex h-14 shrink-0 items-center justify-between gap-3 border-b px-4 lg:px-6">
                    <div className="flex min-w-0 items-center gap-3">
                        <h2 className="truncate font-heading text-sm font-semibold">
                            {conversations[activeConversation].title}
                        </h2>
                        <Badge
                            variant="glow"
                            className="hidden px-2 py-0 font-mono text-[10px] sm:inline-flex"
                        >
                            {model}
                        </Badge>
                    </div>
                    <div className="flex items-center gap-1">
                        <Button
                            variant="ghost"
                            size="icon-sm"
                            aria-label="Share conversation"
                            onClick={() =>
                                copyWithToast(window.location.href, {
                                    success: "Share link copied",
                                    error: "Couldn't copy share link",
                                })
                            }
                        >
                            <Share2Icon className="size-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="icon-sm"
                            className="xl:hidden"
                            aria-label="Model settings"
                            onClick={() =>
                                toast.info(
                                    "Model settings live in the right panel on wide screens",
                                )
                            }
                        >
                            <SlidersHorizontalIcon className="size-4" />
                        </Button>
                    </div>
                </div>

                <div ref={scrollRef} className="flex-1 overflow-y-auto">
                    <div className="mx-auto w-full max-w-3xl space-y-6 px-4 py-6 lg:px-6">
                        <AnimatePresence initial={false}>
                            {messages.map((m) => (
                                <motion.div
                                    key={m.id}
                                    initial={{ opacity: 0, y: 12 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{
                                        duration: 0.3,
                                        ease: [0.21, 0.47, 0.32, 0.98],
                                    }}
                                    className={cn(
                                        "flex gap-3",
                                        m.role === "user" && "flex-row-reverse",
                                    )}
                                >
                                    {m.role === "assistant" ? (
                                        <AssistantAvatar />
                                    ) : (
                                        <Avatar className="size-8 shrink-0">
                                            <AvatarFallback className="text-[10px]">
                                                AK
                                            </AvatarFallback>
                                        </Avatar>
                                    )}
                                    <div
                                        className={cn(
                                            "max-w-[85%] rounded-2xl px-4 py-3 sm:max-w-[75%]",
                                            m.role === "user"
                                                ? "rounded-tr-sm bg-primary text-primary-foreground shadow-[0_8px_24px_-8px_var(--glow-primary)]"
                                                : "rounded-tl-sm glass",
                                        )}
                                    >
                                        {m.rich ? (
                                            <RichReply />
                                        ) : (
                                            <p className="text-sm leading-relaxed">
                                                {m.content}
                                            </p>
                                        )}
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {streaming && (
                            <motion.div
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex gap-3"
                            >
                                <AssistantAvatar />
                                <div className="rounded-2xl rounded-tl-sm px-4 py-2 glass">
                                    <StreamingDots />
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>

                <div className="shrink-0 border-t bg-background/60 px-4 py-4 backdrop-blur-sm lg:px-6">
                    <form
                        className="mx-auto w-full max-w-3xl"
                        onSubmit={(e) => {
                            e.preventDefault();
                            send();
                        }}
                    >
                        <div className="rounded-2xl border p-2.5 glass-strong transition-colors focus-within:border-primary/50">
                            <Textarea
                                ref={textareaRef}
                                rows={1}
                                value={input}
                                onChange={(e) => {
                                    setInput(e.target.value);
                                    autosize();
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && !e.shiftKey) {
                                        e.preventDefault();
                                        send();
                                    }
                                }}
                                placeholder="Message Tapotik… (Enter to send, Shift+Enter for a new line)"
                                aria-label="Message"
                                className="min-h-0 resize-none border-0 bg-transparent px-2 py-1.5 shadow-none focus-visible:border-transparent focus-visible:ring-0"
                            />
                            <div className="mt-1.5 flex items-center justify-between gap-2">
                                <div className="flex items-center gap-1">
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon-sm"
                                        aria-label="Attach file"
                                        onClick={() =>
                                            toast.info(
                                                "Attachments coming to the demo soon",
                                            )
                                        }
                                    >
                                        <PaperclipIcon className="size-4" />
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon-sm"
                                        aria-label="Voice input"
                                        onClick={() =>
                                            toast.info(
                                                "Voice input available in the Voice studio",
                                            )
                                        }
                                    >
                                        <MicIcon className="size-4" />
                                    </Button>
                                    <Select
                                        value={model}
                                        onValueChange={setModel}
                                    >
                                        <SelectTrigger
                                            size="sm"
                                            aria-label="Model"
                                            className="ml-1 h-8 rounded-full border-border/60 font-mono text-xs"
                                        >
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="tapotik-v4">
                                                tapotik-v4
                                            </SelectItem>
                                            <SelectItem value="tapotik-mini">
                                                tapotik-mini
                                            </SelectItem>
                                            <SelectItem value="gpt-4o">
                                                gpt-4o
                                            </SelectItem>
                                            <SelectItem value="claude">
                                                claude
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Button
                                    type="submit"
                                    variant="gradient"
                                    size="icon-sm"
                                    aria-label="Send message"
                                    disabled={!input.trim() || streaming}
                                >
                                    <SendIcon className="size-4" />
                                </Button>
                            </div>
                        </div>
                        <p className="mt-2 text-center text-[10px] text-muted-foreground">
                            Tapotik can make mistakes. Verify important
                            information.
                        </p>
                    </form>
                </div>
            </section>

            <aside className="hidden w-72 shrink-0 flex-col gap-6 overflow-y-auto border-l p-5 xl:flex">
                <div>
                    <h3 className="font-heading text-sm font-semibold">
                        Model settings
                    </h3>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                        Applied to this conversation
                    </p>
                </div>

                <div className="space-y-2">
                    <Label className="text-xs">Model</Label>
                    <Select value={model} onValueChange={setModel}>
                        <SelectTrigger
                            className="w-full font-mono text-xs"
                            aria-label="Model"
                        >
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="tapotik-v4">
                                tapotik-v4
                            </SelectItem>
                            <SelectItem value="tapotik-mini">
                                tapotik-mini
                            </SelectItem>
                            <SelectItem value="gpt-4o">gpt-4o</SelectItem>
                            <SelectItem value="claude">claude</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <Label className="text-xs">Temperature</Label>
                        <span className="font-mono text-xs text-muted-foreground">
                            {(temperature[0] / 100).toFixed(1)}
                        </span>
                    </div>
                    <Slider
                        value={temperature}
                        onValueChange={setTemperature}
                        max={100}
                        step={1}
                        aria-label="Temperature"
                    />
                </div>

                <div className="space-y-3">
                    <div className="flex items-center justify-between">
                        <Label className="text-xs">Max tokens</Label>
                        <span className="font-mono text-xs text-muted-foreground">
                            {Math.round(
                                (maxTokens[0] / 100) * 8192,
                            ).toLocaleString("en-US")}
                        </span>
                    </div>
                    <Slider
                        value={maxTokens}
                        onValueChange={setMaxTokens}
                        max={100}
                        step={1}
                        aria-label="Max tokens"
                    />
                </div>

                <div className="space-y-2">
                    <Label className="text-xs">System prompt</Label>
                    <Textarea
                        defaultValue="You are a senior engineer. Prefer concise answers with runnable code."
                        className="min-h-20 text-xs"
                        aria-label="System prompt"
                    />
                </div>

                <div className="space-y-3 rounded-2xl border bg-card/60 p-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-medium">Web access</p>
                            <p className="text-[10px] text-muted-foreground">
                                Search the live web
                            </p>
                        </div>
                        <Switch defaultChecked aria-label="Toggle web access" />
                    </div>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-medium">Memory</p>
                            <p className="text-[10px] text-muted-foreground">
                                Remember this workspace
                            </p>
                        </div>
                        <Switch aria-label="Toggle memory" />
                    </div>
                </div>

                <div className="rounded-2xl border border-primary/25 bg-primary/5 p-4">
                    <p className="flex items-center gap-1.5 text-xs font-semibold text-primary">
                        <SparklesIcon className="size-3.5" />
                        Pro tip
                    </p>
                    <p className="mt-1.5 text-[11px] leading-relaxed text-muted-foreground">
                        Pin frequently used prompts from any reply —
                        they&apos;ll appear in your command menu (⌘K).
                    </p>
                </div>
            </aside>
        </div>
    );
}
