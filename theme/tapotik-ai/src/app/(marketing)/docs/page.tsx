import type { Metadata } from "next";
import Link from "next/link";
import {
    ArrowRightIcon,
    BotIcon,
    ImageIcon,
    KeyRoundIcon,
    MessageSquareIcon,
    MicIcon,
    RocketIcon,
    GaugeIcon,
} from "lucide-react";

import {
    DocCallout,
    DocCode,
    DocH2,
    DocInlineCode,
    DocP,
    DocPage,
} from "@/components/docs/doc-blocks";
import { IconTile } from "@/components/effects/icon-tile";

export const metadata: Metadata = {
    title: "Documentation",
    description:
        "Learn how to integrate Tapotik AI — chat, image, voice and agent APIs with typed SDKs, webhooks and enterprise-grade security.",
};

const productLinks = [
    {
        title: "Chat API",
        href: "/docs/chat",
        description:
            "Multi-model completions with streaming, tools and memory.",
        icon: MessageSquareIcon,
        gradient: "from-primary to-secondary",
    },
    {
        title: "Image API",
        href: "/docs/images",
        description: "Production-grade image generation, styles and upscaling.",
        icon: ImageIcon,
        gradient: "from-secondary to-pink",
    },
    {
        title: "Voice API",
        href: "/docs/voice",
        description:
            "Lifelike text-to-speech and voice cloning in 40+ languages.",
        icon: MicIcon,
        gradient: "from-accent to-primary",
    },
    {
        title: "Agents",
        href: "/docs/agents",
        description:
            "Autonomous multi-step agents with tools and approval gates.",
        icon: BotIcon,
        gradient: "from-primary to-accent",
    },
];

const nextSteps = [
    {
        title: "Quickstart",
        href: "/docs/quickstart",
        description: "Make your first API call in under five minutes.",
        icon: RocketIcon,
    },
    {
        title: "Authentication",
        href: "/docs/authentication",
        description: "Create API keys and authenticate requests securely.",
        icon: KeyRoundIcon,
    },
    {
        title: "Rate limits",
        href: "/docs/rate-limits",
        description: "Understand throughput tiers and 429 handling.",
        icon: GaugeIcon,
    },
];

const docCardClass =
    "group rounded-2xl border bg-card p-5 transition-all duration-300 hover:border-primary/30 hover:shadow-[0_12px_40px_-16px_var(--glow-primary)]";

export default function DocsIntroductionPage() {
    return (
        <DocPage
            title="Introduction"
            description="Tapotik AI is one platform for chat, image, voice and autonomous agents — exposed through a single, consistent REST API with typed SDKs for TypeScript, Python and Go."
        >
            <DocP>
                Every product shares the same primitives: one API key, one
                billing meter (credits), one webhook system and one permissions
                model. You can prototype with the{" "}
                <DocInlineCode>curl</DocInlineCode> examples in these docs, then
                graduate to an SDK without changing any concepts.
            </DocP>

            <DocH2>Base URL</DocH2>
            <DocP>
                All API requests are made over HTTPS to the same origin.
                Requests over plain HTTP are rejected, as are requests without
                authentication.
            </DocP>
            <DocCode language="text" code="https://api.tapotik.ai/v1" />
            <DocCallout type="info">
                The API is versioned in the URL path. Breaking changes only ever
                ship in a new version — <code>v1</code> is stable and covered by
                our deprecation policy of 12 months notice.
            </DocCallout>

            <DocH2>Explore the products</DocH2>
            <div className="my-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {productLinks.map((product) => (
                    <Link
                        key={product.href}
                        href={product.href}
                        className={`${docCardClass} relative overflow-hidden`}
                    >
                        <IconTile
                            icon={product.icon}
                            className={`size-10 rounded-xl bg-linear-to-br ${product.gradient} text-white shadow-lg`}
                            iconClassName="size-5"
                        />
                        <h3 className="mt-4 flex items-center gap-1.5 font-heading text-base font-semibold">
                            {product.title}
                            <ArrowRightIcon
                                aria-hidden
                                className="size-4 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary"
                            />
                        </h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                            {product.description}
                        </p>
                    </Link>
                ))}
            </div>

            <DocH2>How the platform fits together</DocH2>
            <DocP>
                Requests are routed through our global edge network (32 regions)
                to the nearest inference cluster. You choose a model per request
                — our in-house <DocInlineCode>tapotik-2</DocInlineCode> family
                or frontier models from OpenAI, Anthropic and Google — or let{" "}
                <DocInlineCode>router/auto</DocInlineCode> pick the best model
                for cost and quality automatically.
            </DocP>
            <DocP>
                Usage is metered in credits: roughly 1,000 text tokens, one
                standard image, or one second of generated media per credit.
                Every response includes a <DocInlineCode>usage</DocInlineCode>{" "}
                object so you can reconcile spend in real time, and the
                dashboard breaks usage down per project, model and API key.
            </DocP>

            <DocH2>Next steps</DocH2>
            <div className="my-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {nextSteps.map((step) => (
                    <Link
                        key={step.href}
                        href={step.href}
                        className={docCardClass}
                    >
                        <step.icon
                            aria-hidden
                            className="size-5 text-(--primary-bright)"
                        />
                        <h3 className="mt-3 font-heading text-sm font-semibold">
                            {step.title}
                        </h3>
                        <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
                            {step.description}
                        </p>
                    </Link>
                ))}
            </div>
        </DocPage>
    );
}
