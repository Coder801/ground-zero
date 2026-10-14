import type { Metadata } from "next";
import Link from "next/link";
import {
    ArrowRightIcon,
    BlocksIcon,
    CodeIcon,
    WebhookIcon,
    WrenchIcon,
} from "lucide-react";

import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/effects/reveal";
import {
    AuroraBackground,
    GlowSpot,
} from "@/components/effects/aurora-background";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CTA } from "@/components/sections/cta";
import { IntegrationsExplorer } from "./_components/integrations-explorer";

export const metadata: Metadata = {
    title: "Integrations",
    description:
        "Connect Tapotik AI to Slack, Notion, GitHub, Salesforce and 6,000+ more apps — or build your own integration with webhooks and a typed API.",
};

function CodeSnippet() {
    return (
        <div className="overflow-hidden rounded-2xl border shadow-2xl glass-strong">
            <div className="flex items-center gap-2 border-b bg-card/50 px-4 py-3">
                <span aria-hidden className="flex gap-1.5">
                    <span className="size-2.5 rounded-full bg-destructive/70" />
                    <span className="size-2.5 rounded-full bg-warning/70" />
                    <span className="size-2.5 rounded-full bg-success/70" />
                </span>
                <span className="ml-2 font-mono text-[11px] text-muted-foreground">
                    webhooks.ts
                </span>
                <Badge variant="secondary" className="ml-auto text-[9px]">
                    TypeScript
                </Badge>
            </div>
            <pre className="overflow-x-auto p-5 font-mono text-[12.5px] leading-relaxed lg:text-[13px]">
                <code>
                    <span className="text-secondary">import</span>
                    <span className="text-foreground/85">
                        {" "}
                        {"{ Tapotik }"}{" "}
                    </span>
                    <span className="text-secondary">from</span>
                    <span className="text-accent-foreground dark:text-accent">
                        {" "}
                        &quot;@tapotik/sdk&quot;
                    </span>
                    <span className="text-muted-foreground">;</span>
                    {"\n\n"}
                    <span className="text-secondary">const</span>
                    <span className="text-foreground/85"> tapotik </span>
                    <span className="text-pink">=</span>
                    <span className="text-secondary"> new</span>
                    <span className="text-(--primary-bright)"> Tapotik</span>
                    <span className="text-foreground/85">({"{ "}</span>
                    <span className="text-foreground/85">
                        apiKey: process.env.
                    </span>
                    <span className="text-warning">TAPOTIK_KEY</span>
                    <span className="text-foreground/85">{" }"});</span>
                    {"\n\n"}
                    <span className="text-muted-foreground">
                        {"// Get notified when any workflow finishes"}
                    </span>
                    {"\n"}
                    <span className="text-secondary">await</span>
                    <span className="text-foreground/85">
                        {" "}
                        tapotik.webhooks.
                    </span>
                    <span className="text-(--primary-bright)">create</span>
                    <span className="text-foreground/85">({"{"}</span>
                    {"\n  "}
                    <span className="text-foreground/85">url: </span>
                    <span className="text-accent-foreground dark:text-accent">
                        &quot;https://api.acme.com/hooks/tapotik&quot;
                    </span>
                    <span className="text-muted-foreground">,</span>
                    {"\n  "}
                    <span className="text-foreground/85">events: [</span>
                    <span className="text-accent-foreground dark:text-accent">
                        &quot;agent.completed&quot;
                    </span>
                    <span className="text-muted-foreground">, </span>
                    <span className="text-accent-foreground dark:text-accent">
                        &quot;image.generated&quot;
                    </span>
                    <span className="text-foreground/85">]</span>
                    <span className="text-muted-foreground">,</span>
                    {"\n  "}
                    <span className="text-foreground/85">
                        secret: process.env.
                    </span>
                    <span className="text-warning">WEBHOOK_SECRET</span>
                    <span className="text-muted-foreground">,</span>
                    {"\n"}
                    <span className="text-foreground/85">{"}"});</span>
                    {"\n\n"}
                    <span className="text-muted-foreground">
                        {"// → 201 Created · signed with HMAC-SHA256"}
                    </span>
                </code>
            </pre>
        </div>
    );
}

export default function IntegrationsPage() {
    return (
        <>
            <section className="relative overflow-hidden pt-32 pb-16 lg:pt-44 lg:pb-24">
                <AuroraBackground intensity="strong" />
                <div
                    aria-hidden
                    className="absolute inset-0 bg-grid mask-[radial-gradient(ellipse_70%_50%_at_50%_0%,black,transparent)]"
                />
                <div className="relative container-wide">
                    <div className="mx-auto max-w-3xl text-center">
                        <Reveal>
                            <Badge
                                variant="glow"
                                className="tracking-widest uppercase"
                            >
                                <BlocksIcon className="size-3" />
                                Integrations
                            </Badge>
                        </Reveal>
                        <Reveal delay={0.08}>
                            <h1 className="mt-5 text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
                                Plays nicely with{" "}
                                <span className="text-gradient">
                                    your whole stack
                                </span>
                            </h1>
                        </Reveal>
                        <Reveal delay={0.16}>
                            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                                Native connectors for the tools your team
                                already lives in — plus Zapier for 6,000+ more.
                                Every integration works across chat, workflows
                                and agents.
                            </p>
                        </Reveal>
                    </div>
                </div>
            </section>

            <section className="relative overflow-hidden py-12 lg:py-16">
                <GlowSpot color="secondary" className="top-1/4 -left-52" />
                <div className="relative container-wide">
                    <Reveal delay={0.1}>
                        <IntegrationsExplorer />
                    </Reveal>
                </div>
            </section>

            <section className="relative overflow-hidden py-16 lg:py-24">
                <div
                    aria-hidden
                    className="absolute inset-0 bg-dots mask-[radial-gradient(ellipse_60%_60%_at_50%_40%,black,transparent)]"
                />
                <GlowSpot color="pink" className="top-10 -right-52" />
                <div className="relative container-wide">
                    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
                        <div>
                            <SectionHeading
                                align="left"
                                eyebrow="Build your own"
                                eyebrowIcon={WrenchIcon}
                                title={
                                    <>
                                        An API for everything{" "}
                                        <span className="text-gradient">
                                            we haven&apos;t built yet
                                        </span>
                                    </>
                                }
                                description="Anything you can do in the dashboard, you can do over REST. Typed SDKs for TypeScript, Python and Go, signed webhooks for every event, and OpenAPI specs to generate the rest."
                                className="mb-8"
                            />
                            <ul className="space-y-4">
                                {[
                                    {
                                        icon: CodeIcon,
                                        title: "Typed SDKs",
                                        description:
                                            "First-class TypeScript, Python and Go clients with streaming built in.",
                                    },
                                    {
                                        icon: WebhookIcon,
                                        title: "Signed webhooks",
                                        description:
                                            "HMAC-SHA256 signatures, automatic retries and a replay console for debugging.",
                                    },
                                    {
                                        icon: BlocksIcon,
                                        title: "OpenAPI everything",
                                        description:
                                            "Generate clients in any language from our always-current spec.",
                                    },
                                ].map((item) => (
                                    <li
                                        key={item.title}
                                        className="flex gap-3.5"
                                    >
                                        <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                                            <item.icon className="size-4 text-primary" />
                                        </span>
                                        <div>
                                            <p className="text-sm font-semibold">
                                                {item.title}
                                            </p>
                                            <p className="text-sm text-muted-foreground">
                                                {item.description}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                <Button
                                    asChild
                                    variant="gradient"
                                    size="lg"
                                    className="group"
                                >
                                    <Link href="/docs">
                                        Read the docs
                                        <ArrowRightIcon className="transition-transform duration-300 group-hover:translate-x-1" />
                                    </Link>
                                </Button>
                                <Button asChild variant="glass" size="lg">
                                    <Link href="/docs/webhooks">
                                        Webhook reference
                                    </Link>
                                </Button>
                            </div>
                        </div>
                        <Reveal direction="left" delay={0.1}>
                            <CodeSnippet />
                        </Reveal>
                    </div>
                </div>
            </section>

            <CTA />
        </>
    );
}
