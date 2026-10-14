import { Fragment } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
    Building2Icon,
    CheckIcon,
    CoinsIcon,
    GitCompareArrowsIcon,
    GlobeIcon,
    HistoryIcon,
    ImageIcon,
    KeyRoundIcon,
    LockIcon,
    MessageSquareIcon,
    MinusIcon,
    ServerIcon,
    ShieldCheckIcon,
    SparklesIcon,
    VideoIcon,
} from "lucide-react";

import {
    AuroraBackground,
    GlowSpot,
} from "@/components/effects/aurora-background";
import {
    Reveal,
    RevealStagger,
    StaggerItem,
} from "@/components/effects/reveal";
import { IconTile } from "@/components/effects/icon-tile";
import { SpotlightCard } from "@/components/effects/spotlight-card";
import { SectionHeading } from "@/components/site/section-heading";
import { Pricing } from "@/components/sections/pricing";
import { FAQ } from "@/components/sections/faq";
import { CTA } from "@/components/sections/cta";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
    title: "Pricing",
    description:
        "Simple pricing that scales with you. Start free with 1,000 credits — every paid plan includes all five AI products, typed APIs and enterprise-grade security.",
};

type PlanValue = string | boolean;

type ComparisonGroup = {
    group: string;
    rows: { feature: string; values: [PlanValue, PlanValue, PlanValue] }[];
};

const comparison: ComparisonGroup[] = [
    {
        group: "Usage",
        rows: [
            {
                feature: "Monthly AI credits",
                values: ["1,000", "25,000", "Unlimited"],
            },
            { feature: "Workspaces", values: ["1", "5", "Unlimited"] },
            { feature: "Team members", values: ["1", "10", "Custom"] },
        ],
    },
    {
        group: "AI products",
        rows: [
            {
                feature: "AI Chat models",
                values: ["GPT models", "All models", "All + fine-tuned"],
            },
            { feature: "Smart model routing", values: [false, true, true] },
            {
                feature: "Image generations",
                values: ["50 / month", "Unlimited", "Unlimited"],
            },
            { feature: "AI Video generation", values: [false, true, true] },
            { feature: "AI Voice & cloning", values: [false, true, true] },
        ],
    },
    {
        group: "Platform",
        rows: [
            { feature: "Workflow builder", values: [false, true, true] },
            { feature: "API access", values: [true, true, true] },
            { feature: "Rate limits", values: ["60 RPM", "600 RPM", "Custom"] },
            { feature: "Webhooks", values: [false, true, true] },
            {
                feature: "Usage analytics",
                values: ["Basic", "Advanced", "Advanced + export"],
            },
        ],
    },
    {
        group: "Security & support",
        rows: [
            { feature: "SSO / SAML & SCIM", values: [false, false, true] },
            { feature: "Zero-retention mode", values: [false, false, true] },
            { feature: "Uptime SLA", values: [false, "99.9%", "99.99%"] },
            {
                feature: "Support",
                values: ["Community", "Priority", "Dedicated CSM"],
            },
        ],
    },
];

function PlanCell({ value }: { value: PlanValue }) {
    if (value === true) {
        return (
            <span className="inline-flex size-5.5 items-center justify-center rounded-full bg-primary/15">
                <CheckIcon
                    aria-hidden
                    className="size-3.5 text-(--primary-bright)"
                />
                <span className="sr-only">Included</span>
            </span>
        );
    }
    if (value === false) {
        return (
            <span className="inline-flex items-center justify-center">
                <MinusIcon
                    aria-hidden
                    className="size-4 text-muted-foreground/40"
                />
                <span className="sr-only">Not included</span>
            </span>
        );
    }
    return <span className="text-sm text-foreground/85">{value}</span>;
}

const creditCards = [
    {
        icon: MessageSquareIcon,
        title: "1 credit ≈ 1,000 tokens",
        description:
            "Roughly 750 words of chat input and output, on any text model.",
        gradient: "from-primary to-secondary",
    },
    {
        icon: ImageIcon,
        title: "1 credit = 1 image",
        description:
            "A standard 1024×1024 generation. 4K upscales and XL sizes cost 3.",
        gradient: "from-secondary to-pink",
    },
    {
        icon: VideoIcon,
        title: "1 credit = 1 second of video",
        description: "Cinematic 1080p output — a 30-second clip is 30 credits.",
        gradient: "from-pink to-warning",
    },
    {
        icon: HistoryIcon,
        title: "Credits roll over 90 days",
        description:
            "Unused credits on paid plans stay yours for three full months.",
        gradient: "from-accent to-primary",
    },
];

const enterpriseChips = [
    { icon: KeyRoundIcon, label: "SSO / SAML & SCIM" },
    { icon: ShieldCheckIcon, label: "SOC 2 Type II & HIPAA" },
    { icon: LockIcon, label: "BYOK encryption" },
    { icon: GlobeIcon, label: "Region pinning" },
    { icon: ServerIcon, label: "Dedicated clusters" },
    { icon: SparklesIcon, label: "99.99% uptime SLA" },
];

export default function PricingPage() {
    return (
        <>
            <section className="relative overflow-hidden pt-32 pb-16 lg:pt-44 lg:pb-24">
                <AuroraBackground intensity="strong" />
                <div
                    aria-hidden
                    className="absolute inset-0 bg-grid mask-[radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]"
                />
                <div className="relative container-wide">
                    <div className="mx-auto max-w-3xl text-center">
                        <Reveal>
                            <Badge
                                variant="glow"
                                className="tracking-widest uppercase"
                            >
                                <SparklesIcon className="size-3" />
                                Pricing
                            </Badge>
                        </Reveal>
                        <Reveal delay={0.08}>
                            <h1 className="mt-5 text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
                                One subscription,{" "}
                                <span className="text-gradient">
                                    five AI products
                                </span>
                            </h1>
                        </Reveal>
                        <Reveal delay={0.16}>
                            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                                Start free with 1,000 credits — no card
                                required. Upgrade when you&apos;re ready and
                                keep every product, model and API under one
                                predictable bill.
                            </p>
                        </Reveal>
                    </div>
                </div>
            </section>

            {/* heading={false}: hero renders the heading instead */}
            <Pricing heading={false} />

            <section className="relative py-16 lg:py-24">
                <div className="container-wide">
                    <SectionHeading
                        eyebrow="Compare"
                        eyebrowIcon={GitCompareArrowsIcon}
                        title={
                            <>
                                Every feature,{" "}
                                <span className="text-gradient">
                                    side by side
                                </span>
                            </>
                        }
                        description="The full breakdown across Starter, Pro and Enterprise — no fine print hiding anywhere."
                    />
                    <Reveal>
                        <div className="overflow-hidden rounded-3xl border bg-card shadow-[0_24px_80px_-40px_var(--glow-primary)]">
                            <Table>
                                <TableHeader>
                                    <TableRow className="border-b hover:bg-transparent">
                                        <TableHead className="h-14 w-[34%] min-w-44 bg-card px-6">
                                            Features
                                        </TableHead>
                                        <TableHead className="h-14 w-[22%] min-w-32 bg-card text-center">
                                            <span className="text-sm font-semibold tracking-normal text-foreground normal-case">
                                                Starter
                                            </span>
                                        </TableHead>
                                        <TableHead className="h-14 w-[22%] min-w-36 bg-primary/5 text-center">
                                            <span className="inline-flex items-center gap-2">
                                                <span className="text-sm font-semibold tracking-normal text-(--primary-bright) normal-case">
                                                    Pro
                                                </span>
                                                <Badge
                                                    variant="glow"
                                                    className="px-2 py-0.5 text-[10px]"
                                                >
                                                    Popular
                                                </Badge>
                                            </span>
                                        </TableHead>
                                        <TableHead className="h-14 w-[22%] min-w-36 bg-card text-center">
                                            <span className="text-sm font-semibold tracking-normal text-foreground normal-case">
                                                Enterprise
                                            </span>
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {comparison.map((section) => (
                                        <Fragment key={section.group}>
                                            <TableRow className="bg-muted/40 hover:bg-muted/40">
                                                <TableCell
                                                    colSpan={4}
                                                    className="px-6 py-2.5 text-[11px] font-semibold tracking-widest text-muted-foreground uppercase"
                                                >
                                                    {section.group}
                                                </TableCell>
                                            </TableRow>
                                            {section.rows.map((row) => (
                                                <TableRow key={row.feature}>
                                                    <TableCell className="px-6 text-sm font-medium whitespace-normal">
                                                        {row.feature}
                                                    </TableCell>
                                                    {row.values.map(
                                                        (value, i) => (
                                                            <TableCell
                                                                key={i}
                                                                className={cn(
                                                                    "text-center",
                                                                    i === 1 &&
                                                                        "bg-primary/5",
                                                                )}
                                                            >
                                                                <PlanCell
                                                                    value={
                                                                        value
                                                                    }
                                                                />
                                                            </TableCell>
                                                        ),
                                                    )}
                                                </TableRow>
                                            ))}
                                        </Fragment>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </Reveal>
                    <p className="mt-6 text-center text-sm text-muted-foreground">
                        Prices exclude applicable taxes. Yearly billing saves
                        20% on Pro and Enterprise.
                    </p>
                </div>
            </section>

            <section className="relative py-16 lg:py-24">
                <div
                    aria-hidden
                    className="absolute inset-0 bg-dots mask-[radial-gradient(ellipse_70%_70%_at_50%_50%,black,transparent)]"
                />
                <div className="relative container-wide">
                    <SectionHeading
                        eyebrow="Credits"
                        eyebrowIcon={CoinsIcon}
                        title={
                            <>
                                How credits{" "}
                                <span className="text-gradient">
                                    actually work
                                </span>
                            </>
                        }
                        description="One meter across every product — no per-seat surprises, no separate bills for chat, images, video and voice."
                    />
                    <RevealStagger className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {creditCards.map((card) => (
                            <StaggerItem key={card.title} className="h-full">
                                <SpotlightCard className="group h-full p-6">
                                    <IconTile
                                        icon={card.icon}
                                        className={`size-11 rounded-xl bg-linear-to-br ${card.gradient} text-white shadow-lg`}
                                        iconClassName="size-5"
                                    />
                                    <h3 className="mt-4 font-heading text-base font-semibold">
                                        {card.title}
                                    </h3>
                                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                        {card.description}
                                    </p>
                                </SpotlightCard>
                            </StaggerItem>
                        ))}
                    </RevealStagger>
                    <Reveal delay={0.15}>
                        <p className="mt-8 text-center text-sm text-muted-foreground">
                            Live usage breakdowns per product, project and API
                            key are in the dashboard —{" "}
                            <Link
                                href="/docs"
                                className="font-medium text-primary underline-offset-4 hover:underline"
                            >
                                see the docs
                            </Link>{" "}
                            for metering details.
                        </p>
                    </Reveal>
                </div>
            </section>

            <section className="relative py-8 lg:py-12">
                <div className="container-wide">
                    <Reveal>
                        <div className="relative overflow-hidden rounded-[2.5rem] border px-6 py-12 glass-strong lg:px-16 lg:py-16">
                            <GlowSpot
                                color="primary"
                                className="-top-48 -right-24"
                            />
                            <GlowSpot
                                color="accent"
                                className="-bottom-56 -left-24 opacity-60"
                            />
                            <div
                                aria-hidden
                                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/60 to-transparent"
                            />
                            <div className="relative grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
                                <div>
                                    <Badge
                                        variant="glow"
                                        className="tracking-widest uppercase"
                                    >
                                        <Building2Icon className="size-3" />
                                        Enterprise
                                    </Badge>
                                    <h2 className="mt-4 font-heading text-2xl font-bold tracking-tight text-balance sm:text-3xl lg:text-4xl">
                                        Compliance-grade AI,{" "}
                                        <span className="text-gradient">
                                            without the wait
                                        </span>
                                    </h2>
                                    <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                                        Dedicated inference clusters, custom
                                        fine-tuning and the security posture
                                        your review board expects — most
                                        enterprise pilots go live in under two
                                        weeks.
                                    </p>
                                    <div className="mt-7 flex flex-wrap gap-2.5">
                                        {enterpriseChips.map((chip) => (
                                            <Badge
                                                key={chip.label}
                                                variant="glass"
                                                className="px-3.5 py-1.5"
                                            >
                                                <chip.icon
                                                    aria-hidden
                                                    className="size-3.5 text-(--primary-bright)"
                                                />
                                                {chip.label}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex flex-col items-start gap-4 lg:items-end">
                                    <Button
                                        asChild
                                        size="xl"
                                        variant="gradient"
                                        className="w-full sm:w-auto"
                                    >
                                        <Link href="/contact">
                                            Talk to sales
                                        </Link>
                                    </Button>
                                    <p className="text-xs text-muted-foreground lg:text-right">
                                        Response within one business day ·
                                        <br className="hidden lg:block" />{" "}
                                        Security questionnaires welcome
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            <FAQ />
            <CTA />
        </>
    );
}
