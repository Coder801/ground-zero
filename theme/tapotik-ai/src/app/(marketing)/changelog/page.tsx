import type { Metadata } from "next";
import {
    HistoryIcon,
    SparklesIcon,
    TrendingUpIcon,
    WrenchIcon,
    type LucideIcon,
} from "lucide-react";

import { Reveal } from "@/components/effects/reveal";
import {
    AuroraBackground,
    GlowSpot,
} from "@/components/effects/aurora-background";
import { Badge } from "@/components/ui/badge";
import { changelog } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { NewsletterForm } from "@/components/site/newsletter-form";

export const metadata: Metadata = {
    title: "Changelog",
    description:
        "Every release, improvement and fix that ships to the Tapotik AI platform — documented in the open, roughly twice a month.",
};

const typeBadge: Record<
    "New" | "Improved" | "Fixed",
    { variant: "accent" | "glow" | "warning"; icon: LucideIcon }
> = {
    New: { variant: "accent", icon: SparklesIcon },
    Improved: { variant: "glow", icon: TrendingUpIcon },
    Fixed: { variant: "warning", icon: WrenchIcon },
};

export default function ChangelogPage() {
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
                                <HistoryIcon className="size-3" />
                                Changelog
                            </Badge>
                        </Reveal>
                        <Reveal delay={0.08}>
                            <h1 className="mt-5 text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
                                Shipping in{" "}
                                <span className="text-gradient">public</span>
                            </h1>
                        </Reveal>
                        <Reveal delay={0.16}>
                            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                                Every release, improvement and fix — documented
                                the day it ships. New entries roughly twice a
                                month.
                            </p>
                        </Reveal>
                        <Reveal delay={0.24}>
                            <div className="mt-7 flex flex-wrap items-center justify-center gap-2.5">
                                <Badge variant="accent">
                                    <SparklesIcon className="size-3" />
                                    New
                                </Badge>
                                <Badge variant="glow">
                                    <TrendingUpIcon className="size-3" />
                                    Improved
                                </Badge>
                                <Badge variant="warning">
                                    <WrenchIcon className="size-3" />
                                    Fixed
                                </Badge>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            <section className="relative overflow-hidden py-12 lg:py-16">
                <GlowSpot color="secondary" className="top-1/4 -left-52" />
                <GlowSpot color="pink" className="-right-52 bottom-1/4" />
                <div className="relative container-wide">
                    <div className="relative mx-auto max-w-3xl">
                        <div
                            aria-hidden
                            className="absolute top-2 bottom-4 left-1.75 w-px bg-linear-to-b from-primary via-secondary to-accent opacity-60 sm:left-2.25"
                        />

                        <ol className="space-y-14 lg:space-y-16">
                            {changelog.map((entry, i) => (
                                <li
                                    key={entry.version}
                                    className="relative pl-10 sm:pl-14"
                                >
                                    <span
                                        aria-hidden
                                        className="absolute top-1.5 left-0 flex size-3.75 items-center justify-center sm:size-4.75"
                                    >
                                        <span className="absolute inset-0 rounded-full bg-primary/25 blur-[3px]" />
                                        <span className="relative size-2.5 rounded-full bg-linear-to-br from-primary to-secondary ring-4 ring-background sm:size-3" />
                                    </span>

                                    <Reveal delay={Math.min(i * 0.05, 0.2)}>
                                        <div className="flex flex-wrap items-center gap-3">
                                            <Badge
                                                variant="outline"
                                                className="font-mono text-[11px] font-semibold"
                                            >
                                                v{entry.version}
                                            </Badge>
                                            <time
                                                dateTime={entry.date}
                                                className="text-xs font-medium tracking-wider text-muted-foreground uppercase"
                                            >
                                                {formatDate(entry.date)}
                                            </time>
                                            <span className="flex gap-1.5">
                                                {entry.tags.map((tag) => {
                                                    const config =
                                                        typeBadge[tag];
                                                    return (
                                                        <Badge
                                                            key={tag}
                                                            variant={
                                                                config.variant
                                                            }
                                                            className="text-[10px]"
                                                        >
                                                            {tag}
                                                        </Badge>
                                                    );
                                                })}
                                            </span>
                                        </div>

                                        <h2 className="mt-4 font-heading text-xl font-bold tracking-tight sm:text-2xl">
                                            {entry.title}
                                        </h2>
                                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                                            {entry.description}
                                        </p>

                                        <ul className="mt-6 space-y-3 rounded-2xl border bg-card/60 p-5 sm:p-6">
                                            {entry.items.map((item) => {
                                                const config =
                                                    typeBadge[item.type];
                                                return (
                                                    <li
                                                        key={item.text}
                                                        className="flex flex-col gap-1.5 sm:flex-row sm:items-start sm:gap-3"
                                                    >
                                                        <Badge
                                                            variant={
                                                                config.variant
                                                            }
                                                            className="w-16 shrink-0 justify-center text-[10px] sm:mt-0.5"
                                                        >
                                                            {item.type}
                                                        </Badge>
                                                        <span className="text-sm leading-relaxed text-foreground/85">
                                                            {item.text}
                                                        </span>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </Reveal>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </section>

            <section className="relative py-16 lg:py-24">
                <div className="container-wide">
                    <Reveal>
                        <div className="relative overflow-hidden rounded-3xl border px-6 py-14 text-center lg:py-16">
                            <AuroraBackground intensity="subtle" />
                            <div
                                aria-hidden
                                className="absolute inset-0 bg-dots mask-[radial-gradient(ellipse_60%_80%_at_50%_50%,black,transparent)]"
                            />
                            <div
                                aria-hidden
                                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/60 to-transparent"
                            />
                            <div className="relative mx-auto max-w-xl">
                                <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
                                    Never miss a{" "}
                                    <span className="text-gradient">
                                        release
                                    </span>
                                </h2>
                                <p className="mt-3 text-sm text-muted-foreground sm:text-base">
                                    Get release notes in your inbox the moment
                                    they ship. No marketing, no digests — just
                                    the changelog.
                                </p>
                                <div className="mt-7">
                                    <NewsletterForm
                                        variant="centered"
                                        successDescription="Release notes will land at {email} — roughly twice a month, never more."
                                    />
                                </div>
                                <p className="mt-4 text-xs text-muted-foreground">
                                    Unsubscribe anytime with one click.
                                </p>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>
        </>
    );
}
