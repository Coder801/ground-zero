import Link from "next/link";
import {
    ArrowRightIcon,
    CheckIcon,
    CircleQuestionMarkIcon,
    SparklesIcon,
    TagIcon,
    TargetIcon,
    WorkflowIcon,
    type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/site/section-heading";
import {
    Reveal,
    RevealStagger,
    StaggerItem,
} from "@/components/effects/reveal";
import { SpotlightCard } from "@/components/effects/spotlight-card";
import { IconTile } from "@/components/effects/icon-tile";
import {
    AuroraBackground,
    GlowSpot,
} from "@/components/effects/aurora-background";
import { AnimatedCounter } from "@/components/effects/animated-counter";
import { Magnetic } from "@/components/effects/magnetic";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { stats as defaultStats } from "@/lib/data";

export function ProductHero({
    badge,
    icon: Icon,
    gradient,
    title,
    description,
    highlights,
    demo,
    layout = "stacked",
}: {
    badge: string;
    icon: LucideIcon;
    gradient: string;
    title: React.ReactNode;
    description: string;
    highlights?: string[];
    demo: React.ReactNode;
    layout?: "stacked" | "split";
}) {
    const heading = (
        <>
            <Reveal>
                <Badge variant="glow" className="tracking-widest uppercase">
                    <Icon className="size-3" />
                    {badge}
                </Badge>
            </Reveal>
            <Reveal delay={0.08}>
                <h1 className="mt-5 text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
                    {title}
                </h1>
            </Reveal>
            <Reveal delay={0.16}>
                <p
                    className={cn(
                        "mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg",
                        layout === "stacked" && "mx-auto",
                    )}
                >
                    {description}
                </p>
            </Reveal>
            <Reveal delay={0.24}>
                <div
                    className={cn(
                        "mt-8 flex flex-col gap-3.5 sm:flex-row",
                        layout === "stacked"
                            ? "items-center justify-center"
                            : "items-start sm:items-center",
                    )}
                >
                    <Magnetic>
                        <Button
                            asChild
                            size="xl"
                            variant="gradient"
                            className="group"
                        >
                            <Link href="/signup" prefetch={false}>
                                Start building free
                                <ArrowRightIcon className="transition-transform duration-300 group-hover:translate-x-1" />
                            </Link>
                        </Button>
                    </Magnetic>
                    <Button asChild size="xl" variant="glass">
                        <Link href="/pricing">View pricing</Link>
                    </Button>
                </div>
            </Reveal>
            {highlights && highlights.length > 0 && (
                <Reveal delay={0.32}>
                    <ul
                        className={cn(
                            "mt-8 flex flex-wrap gap-x-5 gap-y-2.5",
                            layout === "stacked" && "justify-center",
                        )}
                    >
                        {highlights.map((h) => (
                            <li
                                key={h}
                                className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground"
                            >
                                <CheckIcon className="size-3.5 text-accent" />
                                {h}
                            </li>
                        ))}
                    </ul>
                </Reveal>
            )}
        </>
    );

    return (
        <section className="relative overflow-hidden pt-32 pb-16 lg:pt-44 lg:pb-24">
            <AuroraBackground intensity="strong" />
            <div
                aria-hidden
                className="absolute inset-0 bg-grid mask-[radial-gradient(ellipse_70%_50%_at_50%_0%,black,transparent)]"
            />

            {layout === "stacked" ? (
                <div className="relative container-wide">
                    <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
                        {heading}
                    </div>
                    <Reveal delay={0.35} className="relative mt-14 lg:mt-20">
                        <div
                            aria-hidden
                            className={cn(
                                "absolute -inset-x-8 -top-10 bottom-0 -z-10 bg-linear-to-br opacity-20 blur-3xl",
                                gradient,
                            )}
                        />
                        {demo}
                    </Reveal>
                </div>
            ) : (
                <div className="relative container-wide">
                    <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-16">
                        <div>{heading}</div>
                        <Reveal
                            delay={0.3}
                            direction="left"
                            className="relative"
                        >
                            <div
                                aria-hidden
                                className={cn(
                                    "absolute -inset-10 -z-10 bg-linear-to-br opacity-20 blur-3xl",
                                    gradient,
                                )}
                            />
                            {demo}
                        </Reveal>
                    </div>
                </div>
            )}
        </section>
    );
}

export type ProductFeatureItem = {
    title: string;
    description: string;
    icon: LucideIcon;
};

export function ProductFeatureGrid({
    eyebrow = "Capabilities",
    eyebrowIcon = SparklesIcon,
    title,
    description,
    items,
    gradient,
}: {
    eyebrow?: string;
    eyebrowIcon?: LucideIcon;
    title: React.ReactNode;
    description?: string;
    items: ProductFeatureItem[];
    gradient: string;
}) {
    return (
        <section className="relative py-16 lg:py-24">
            <div
                aria-hidden
                className="pointer-events-none absolute top-0 left-1/2 h-px w-2/3 -translate-x-1/2 bg-linear-to-r from-transparent via-border to-transparent"
            />
            <div className="container-wide">
                <SectionHeading
                    eyebrow={eyebrow}
                    eyebrowIcon={eyebrowIcon}
                    title={title}
                    description={description}
                />
                <RevealStagger className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((item) => (
                        <StaggerItem key={item.title} className="h-full">
                            <SpotlightCard className="group h-full p-7">
                                <IconTile
                                    icon={item.icon}
                                    className={cn(
                                        "size-11 rounded-xl bg-linear-to-br shadow-lg",
                                        gradient,
                                    )}
                                    iconClassName="size-5 text-white"
                                />
                                <h3 className="mt-5 font-heading text-base font-semibold">
                                    {item.title}
                                </h3>
                                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                    {item.description}
                                </p>
                            </SpotlightCard>
                        </StaggerItem>
                    ))}
                </RevealStagger>
            </div>
        </section>
    );
}

export function HowItWorks({
    eyebrow = "How it works",
    eyebrowIcon = WorkflowIcon,
    title,
    description,
    steps,
    gradient,
}: {
    eyebrow?: string;
    eyebrowIcon?: LucideIcon;
    title: React.ReactNode;
    description?: string;
    steps: { title: string; description: string; icon: LucideIcon }[];
    gradient: string;
}) {
    return (
        <section className="relative overflow-hidden py-16 lg:py-24">
            <div
                aria-hidden
                className="absolute inset-0 bg-dots mask-[radial-gradient(ellipse_60%_60%_at_50%_40%,black,transparent)]"
            />
            <GlowSpot color="secondary" className="top-10 -right-40" />
            <div className="relative container-wide">
                <SectionHeading
                    eyebrow={eyebrow}
                    eyebrowIcon={eyebrowIcon}
                    title={title}
                    description={description}
                />
                <div className="relative">
                    <div
                        aria-hidden
                        className="absolute top-9 right-0 left-0 hidden h-px bg-linear-to-r from-transparent via-primary/40 to-transparent lg:block"
                    />
                    <RevealStagger className="grid grid-cols-1 gap-10 lg:grid-cols-3 lg:gap-8">
                        {steps.map((step, i) => (
                            <StaggerItem key={step.title}>
                                <div className="relative flex flex-col items-center text-center lg:px-6">
                                    <div
                                        className={cn(
                                            "relative z-10 flex size-18 items-center justify-center rounded-2xl border bg-card shadow-xl",
                                        )}
                                    >
                                        <div
                                            className={cn(
                                                "flex size-12 items-center justify-center rounded-xl bg-linear-to-br",
                                                gradient,
                                            )}
                                        >
                                            <step.icon className="size-5.5 text-white" />
                                        </div>
                                        <span className="absolute -top-2 -right-2 flex size-6 items-center justify-center rounded-full bg-primary font-mono text-[11px] font-bold text-primary-foreground shadow-lg">
                                            {i + 1}
                                        </span>
                                    </div>
                                    <h3 className="mt-6 font-heading text-lg font-semibold">
                                        {step.title}
                                    </h3>
                                    <p className="mt-2.5 max-w-xs text-sm leading-relaxed text-muted-foreground">
                                        {step.description}
                                    </p>
                                </div>
                            </StaggerItem>
                        ))}
                    </RevealStagger>
                </div>
            </div>
        </section>
    );
}

export function UseCases({
    eyebrow = "Use cases",
    eyebrowIcon = TargetIcon,
    title,
    description,
    items,
}: {
    eyebrow?: string;
    eyebrowIcon?: LucideIcon;
    title: React.ReactNode;
    description?: string;
    items: { title: string; description: string; icon: LucideIcon }[];
}) {
    return (
        <section className="relative py-16 lg:py-24">
            <div className="container-wide">
                <SectionHeading
                    eyebrow={eyebrow}
                    eyebrowIcon={eyebrowIcon}
                    title={title}
                    description={description}
                />
                <RevealStagger className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {items.map((item) => (
                        <StaggerItem key={item.title} className="h-full">
                            <div className="group relative h-full overflow-hidden rounded-2xl border bg-card p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_40px_-12px_var(--glow-primary)]">
                                <div
                                    aria-hidden
                                    className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                                />
                                <item.icon className="size-6 text-primary" />
                                <h3 className="mt-4 font-heading text-base font-semibold">
                                    {item.title}
                                </h3>
                                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                    {item.description}
                                </p>
                            </div>
                        </StaggerItem>
                    ))}
                </RevealStagger>
            </div>
        </section>
    );
}

export function ProductFAQ({
    title,
    description,
    items,
}: {
    title?: React.ReactNode;
    description?: string;
    items: { question: string; answer: string }[];
}) {
    return (
        <section className="relative py-16 lg:py-24">
            <div className="container-wide">
                <div className="mx-auto max-w-3xl">
                    <SectionHeading
                        eyebrow="FAQ"
                        eyebrowIcon={CircleQuestionMarkIcon}
                        title={
                            title ?? (
                                <>
                                    Common{" "}
                                    <span className="text-gradient">
                                        questions
                                    </span>
                                </>
                            )
                        }
                        description={description}
                    />
                    <Reveal>
                        <Accordion
                            type="single"
                            collapsible
                            className="rounded-3xl border px-6 glass-strong lg:px-8"
                        >
                            {items.map((faq, i) => (
                                <AccordionItem key={i} value={`item-${i}`}>
                                    <AccordionTrigger>
                                        {faq.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="leading-relaxed">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}

export function PricingBanner({
    productName,
    bullets = [
        "Free tier included",
        "No credit card required",
        "Cancel anytime",
    ],
}: {
    productName: string;
    bullets?: string[];
}) {
    return (
        <section className="relative py-16 lg:py-24">
            <div className="container-wide">
                <Reveal>
                    <div className="border-gradient relative overflow-hidden rounded-3xl bg-card px-8 py-10 lg:px-14 lg:py-14">
                        <div
                            aria-hidden
                            className="absolute inset-0 bg-linear-to-br from-primary/10 via-transparent to-accent/10"
                        />
                        <GlowSpot
                            color="primary"
                            className="-top-40 -left-40"
                        />
                        <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
                            <div>
                                <Badge
                                    variant="glow"
                                    className="tracking-widest uppercase"
                                >
                                    <TagIcon className="size-3" />
                                    Pricing
                                </Badge>
                                <h2 className="mt-4 font-heading text-2xl font-bold tracking-tight sm:text-3xl">
                                    {productName} is included in{" "}
                                    <span className="text-gradient">
                                        every plan
                                    </span>
                                </h2>
                                <p className="mt-2.5 max-w-lg text-sm text-muted-foreground sm:text-base">
                                    Start free with 1,000 credits a month.
                                    Upgrade to Pro for priority routing, higher
                                    limits and every product on the platform.
                                </p>
                                <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                                    {bullets.map((b) => (
                                        <li
                                            key={b}
                                            className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground"
                                        >
                                            <CheckIcon className="size-3.5 text-accent" />
                                            {b}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
                                <Button
                                    asChild
                                    size="lg"
                                    variant="gradient"
                                    className="group"
                                >
                                    <Link href="/pricing">
                                        See pricing
                                        <ArrowRightIcon className="transition-transform duration-300 group-hover:translate-x-1" />
                                    </Link>
                                </Button>
                                <Button asChild size="lg" variant="outline">
                                    <Link href="/signup" prefetch={false}>
                                        Start free
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}

// Stats band — shared with about/features pages.
export function StatsBand({
    items = defaultStats,
    className,
}: {
    items?: {
        label: string;
        value: number;
        suffix: string;
        decimals?: number;
    }[];
    className?: string;
}) {
    return (
        <section className={cn("relative py-16 lg:py-24", className)}>
            <div className="container-wide">
                <Reveal>
                    <div className="relative overflow-hidden rounded-3xl border px-6 py-12 glass-strong lg:px-12">
                        <div
                            aria-hidden
                            className="absolute inset-0 bg-grid mask-[radial-gradient(ellipse_70%_100%_at_50%_0%,black,transparent)]"
                        />
                        <div
                            aria-hidden
                            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent"
                        />
                        <dl className="relative grid grid-cols-2 gap-10 lg:grid-cols-4">
                            {items.map((stat) => (
                                <div
                                    key={stat.label}
                                    className="flex flex-col text-center"
                                >
                                    <dt className="order-2 mt-2 text-xs font-medium tracking-wider text-muted-foreground uppercase">
                                        {stat.label}
                                    </dt>
                                    <dd className="order-1">
                                        <AnimatedCounter
                                            value={stat.value}
                                            suffix={stat.suffix}
                                            decimals={stat.decimals ?? 0}
                                            className="text-gradient font-heading text-4xl font-bold tracking-tight sm:text-5xl"
                                        />
                                    </dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
