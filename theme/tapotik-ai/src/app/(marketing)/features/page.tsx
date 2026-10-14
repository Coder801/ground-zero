import type { Metadata } from "next";
import {
    BrainCircuitIcon,
    CheckIcon,
    FingerprintIcon,
    GitBranchIcon,
    GitCompareArrowsIcon,
    LayersIcon,
    MicroscopeIcon,
    ShieldCheckIcon,
    SparklesIcon,
    XIcon,
    ZapIcon,
} from "lucide-react";

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
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { StatsBand } from "@/components/pages/product-sections";
import { CTA } from "@/components/sections/cta";
import { features } from "@/lib/data";

export const metadata: Metadata = {
    title: "Features",
    description:
        "The full capability map: multi-model routing, workflow automation, enterprise security and everything else that powers 48M AI requests a day.",
};

const comparisonRows: {
    feature: string;
    tapotik: boolean | string;
    legacy: boolean | string;
    diy: boolean | string;
}[] = [
    {
        feature: "All five modalities in one place",
        tapotik: true,
        legacy: false,
        diy: "Multiple vendors",
    },
    {
        feature: "Multi-model smart routing",
        tapotik: true,
        legacy: false,
        diy: "Build it yourself",
    },
    {
        feature: "Sub-100ms first-token streaming",
        tapotik: true,
        legacy: "Varies",
        diy: "Varies",
    },
    {
        feature: "Visual workflow builder",
        tapotik: true,
        legacy: "Limited",
        diy: false,
    },
    {
        feature: "Agents with approval gates",
        tapotik: true,
        legacy: false,
        diy: false,
    },
    {
        feature: "SOC 2 Type II & HIPAA ready",
        tapotik: true,
        legacy: true,
        diy: "Your audit burden",
    },
    {
        feature: "Zero-retention inference mode",
        tapotik: true,
        legacy: false,
        diy: true,
    },
    {
        feature: "Predictable per-seat pricing",
        tapotik: true,
        legacy: "Add-on maze",
        diy: "Surprise GPU bills",
    },
    {
        feature: "Time to first integration",
        tapotik: "Minutes",
        legacy: "Days",
        diy: "Weeks",
    },
];

function ComparisonCell({ value }: { value: boolean | string }) {
    if (value === true) {
        return (
            <span className="inline-flex size-6 items-center justify-center rounded-full bg-accent/15">
                <CheckIcon
                    className="size-3.5 text-accent"
                    aria-label="Included"
                />
            </span>
        );
    }
    if (value === false) {
        return (
            <span className="inline-flex size-6 items-center justify-center rounded-full bg-muted">
                <XIcon
                    className="size-3.5 text-muted-foreground"
                    aria-label="Not included"
                />
            </span>
        );
    }
    return <span className="text-xs text-muted-foreground">{value}</span>;
}

function RoutingVisual() {
    const models = [
        { name: "tapotik-v4", latency: "87ms", tag: "Selected", active: true },
        {
            name: "frontier-xl",
            latency: "212ms",
            tag: "Quality",
            active: false,
        },
        { name: "swift-mini", latency: "41ms", tag: "Budget", active: false },
    ];
    return (
        <div className="relative overflow-hidden rounded-3xl border p-6 shadow-2xl glass-strong">
            <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/60 to-transparent"
            />
            <div className="rounded-xl border bg-card/70 px-4 py-3">
                <p className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
                    Incoming request
                </p>
                <p className="mt-1 truncate text-sm">
                    &quot;Summarize this 40-page contract…&quot;
                </p>
            </div>
            <div className="relative mx-auto mt-4 flex w-fit items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5">
                <BrainCircuitIcon className="size-3.5 text-primary" />
                <span className="text-xs font-semibold text-primary">
                    Smart router
                </span>
                <span
                    aria-hidden
                    className="absolute -inset-1 -z-10 rounded-full bg-primary/20 blur-md"
                />
            </div>
            <div
                aria-hidden
                className="mx-auto h-5 w-px bg-linear-to-b from-primary/60 to-transparent"
            />
            <div className="grid gap-2.5">
                {models.map((model) => (
                    <div
                        key={model.name}
                        className={
                            model.active
                                ? "flex items-center justify-between rounded-xl border border-primary/50 bg-primary/10 px-4 py-3 shadow-[0_0_24px_-8px_var(--glow-primary)]"
                                : "flex items-center justify-between rounded-xl border bg-card/60 px-4 py-3 opacity-70"
                        }
                    >
                        <div className="flex items-center gap-2.5">
                            <span
                                className={
                                    model.active
                                        ? "size-1.5 animate-pulse-glow rounded-full bg-accent"
                                        : "size-1.5 rounded-full bg-muted-foreground/50"
                                }
                            />
                            <span className="font-mono text-xs font-medium">
                                {model.name}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="font-mono text-[10px] text-muted-foreground">
                                {model.latency}
                            </span>
                            <Badge
                                variant={model.active ? "accent" : "secondary"}
                                className="text-[9px]"
                            >
                                {model.tag}
                            </Badge>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function WorkflowVisual() {
    return (
        <div className="relative overflow-hidden rounded-3xl border p-6 shadow-2xl glass-strong">
            <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-secondary/60 to-transparent"
            />
            <div className="flex items-center justify-between">
                <p className="font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
                    workflow · support-triage
                </p>
                <Badge variant="accent" className="text-[9px]">
                    ● Live
                </Badge>
            </div>
            <div className="mt-5 space-y-2.5">
                {[
                    {
                        label: "Trigger",
                        detail: "New ticket in Zendesk",
                        color: "from-primary to-secondary",
                        step: "01",
                    },
                    {
                        label: "Classify",
                        detail: "tapotik-v4 · intent + urgency",
                        color: "from-secondary to-pink",
                        step: "02",
                    },
                    {
                        label: "Branch",
                        detail: "urgent? → escalate : auto-draft",
                        color: "from-pink to-warning",
                        step: "03",
                    },
                    {
                        label: "Act",
                        detail: "Draft reply + Slack alert",
                        color: "from-accent to-primary",
                        step: "04",
                    },
                ].map((node, i, arr) => (
                    <div key={node.label}>
                        <div className="flex items-center gap-3 rounded-xl border bg-card/70 px-4 py-3">
                            <span
                                className={`flex size-8 shrink-0 items-center justify-center rounded-lg bg-linear-to-br ${node.color} font-mono text-[10px] font-bold text-white`}
                            >
                                {node.step}
                            </span>
                            <div className="min-w-0">
                                <p className="text-xs font-semibold">
                                    {node.label}
                                </p>
                                <p className="truncate font-mono text-[10px] text-muted-foreground">
                                    {node.detail}
                                </p>
                            </div>
                            <GitBranchIcon className="ml-auto size-3.5 shrink-0 text-muted-foreground" />
                        </div>
                        {i < arr.length - 1 && (
                            <div
                                aria-hidden
                                className="mx-auto h-2.5 w-px bg-linear-to-b from-primary/50 to-secondary/50"
                            />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

function SecurityVisual() {
    return (
        <div className="relative overflow-hidden rounded-3xl border p-6 shadow-2xl glass-strong">
            <div
                aria-hidden
                className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-accent/60 to-transparent"
            />
            <div className="flex items-center gap-3">
                <span className="flex size-10 items-center justify-center rounded-xl bg-linear-to-br from-success to-accent shadow-lg">
                    <ShieldCheckIcon className="size-5 text-white" />
                </span>
                <div>
                    <p className="text-sm font-semibold">Trust center</p>
                    <p className="font-mono text-[10px] text-muted-foreground">
                        region: eu-west · retention: zero
                    </p>
                </div>
                <div className="ml-auto flex gap-1.5">
                    {["SOC 2", "GDPR", "HIPAA"].map((badge) => (
                        <Badge
                            key={badge}
                            variant="success"
                            className="text-[9px]"
                        >
                            {badge}
                        </Badge>
                    ))}
                </div>
            </div>
            <div className="mt-5 space-y-2">
                {[
                    {
                        actor: "j.weber",
                        action: "exported usage report",
                        time: "12:04:31",
                    },
                    {
                        actor: "agent:invoice-bot",
                        action: "requested approval → granted",
                        time: "12:03:58",
                    },
                    {
                        actor: "h.sato",
                        action: "rotated API key tp_live_…9f2",
                        time: "12:01:12",
                    },
                    {
                        actor: "system",
                        action: "SSO session verified (Okta)",
                        time: "11:59:47",
                    },
                ].map((row) => (
                    <div
                        key={row.time}
                        className="flex items-center gap-3 rounded-lg border bg-card/60 px-3.5 py-2.5"
                    >
                        <FingerprintIcon className="size-3.5 shrink-0 text-accent" />
                        <p className="min-w-0 flex-1 truncate font-mono text-[11px]">
                            <span className="text-primary">{row.actor}</span>{" "}
                            <span className="text-muted-foreground">
                                {row.action}
                            </span>
                        </p>
                        <span className="font-mono text-[10px] text-muted-foreground">
                            {row.time}
                        </span>
                    </div>
                ))}
            </div>
            <p className="mt-4 text-center font-mono text-[10px] text-muted-foreground">
                Immutable audit log · AES-256 at rest · TLS 1.3 in transit
            </p>
        </div>
    );
}

const deepDives = [
    {
        eyebrow: "Models & routing",
        icon: BrainCircuitIcon,
        title: (
            <>
                The right model for{" "}
                <span className="text-gradient">every single request</span>
            </>
        ),
        description:
            "Stop choosing between quality and cost. Our router scores every request and dispatches it to the best model — frontier when it matters, fast-and-cheap when it doesn't.",
        bullets: [
            "In-house and frontier models behind one API",
            "Latency, cost and quality budgets per project",
            "Automatic fallbacks when a provider degrades",
        ],
        visual: <RoutingVisual />,
    },
    {
        eyebrow: "Workflows & agents",
        icon: LayersIcon,
        title: (
            <>
                From prompt to{" "}
                <span className="text-gradient">production pipeline</span>
            </>
        ),
        description:
            "Chain models, tools and conditions into workflows your whole team can read. Promote any workflow to an autonomous agent when you're ready to let go of the wheel.",
        bullets: [
            "Drag-and-drop builder with versioned deploys",
            "6,000+ app connections via native integrations",
            "Human approval gates on sensitive steps",
        ],
        visual: <WorkflowVisual />,
    },
    {
        eyebrow: "Security & governance",
        icon: ShieldCheckIcon,
        title: (
            <>
                Enterprise-grade by{" "}
                <span className="text-gradient">default</span>
            </>
        ),
        description:
            "SOC 2 Type II, GDPR and HIPAA readiness on every plan — not just enterprise. Pin inference to a region, switch on zero retention, and audit everything.",
        bullets: [
            "SSO/SAML, SCIM and fine-grained roles",
            "Region pinning across 32 edge locations",
            "Immutable audit logs with export API",
        ],
        visual: <SecurityVisual />,
    },
];

export default function FeaturesPage() {
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
                                <SparklesIcon className="size-3" />
                                Features
                            </Badge>
                        </Reveal>
                        <Reveal delay={0.08}>
                            <h1 className="mt-5 text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
                                Every capability,{" "}
                                <span className="text-gradient">
                                    one platform
                                </span>
                            </h1>
                        </Reveal>
                        <Reveal delay={0.16}>
                            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                                150+ features across chat, image, video, voice
                                and agents — built on one neural engine, one API
                                and one predictable bill. Here&apos;s the map.
                            </p>
                        </Reveal>
                    </div>
                </div>
            </section>

            <section className="relative py-16 lg:py-24">
                <div className="container-wide">
                    <SectionHeading
                        eyebrow="Platform"
                        eyebrowIcon={LayersIcon}
                        title={
                            <>
                                The{" "}
                                <span className="text-gradient">
                                    core eight
                                </span>
                            </>
                        }
                        description="The foundation every Tapotik product is built on."
                    />
                    <RevealStagger className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {features.map((feature) => (
                            <StaggerItem key={feature.title} className="h-full">
                                <SpotlightCard className="group h-full p-7">
                                    <IconTile
                                        icon={feature.icon}
                                        className="size-11 rounded-xl bg-linear-to-br from-primary to-secondary shadow-lg"
                                        iconClassName="size-5 text-white"
                                    />
                                    <h3 className="mt-5 font-heading text-base font-semibold">
                                        {feature.title}
                                    </h3>
                                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                        {feature.description}
                                    </p>
                                </SpotlightCard>
                            </StaggerItem>
                        ))}
                    </RevealStagger>
                </div>
            </section>

            <section className="relative overflow-hidden py-16 lg:py-24">
                <div
                    aria-hidden
                    className="pointer-events-none absolute top-0 left-1/2 h-px w-2/3 -translate-x-1/2 bg-linear-to-r from-transparent via-border to-transparent"
                />
                <GlowSpot color="secondary" className="top-24 -left-52" />
                <GlowSpot color="pink" className="-right-52 bottom-24" />
                <div className="relative container-wide">
                    <SectionHeading
                        eyebrow="Deep dives"
                        eyebrowIcon={MicroscopeIcon}
                        title={
                            <>
                                Three pillars,{" "}
                                <span className="text-gradient">
                                    zero compromises
                                </span>
                            </>
                        }
                    />
                    <div className="space-y-20 lg:space-y-28">
                        {deepDives.map((dive, i) => (
                            <div
                                key={dive.eyebrow}
                                className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16"
                            >
                                <Reveal
                                    direction={i % 2 === 0 ? "right" : "left"}
                                    className={i % 2 === 0 ? "" : "lg:order-2"}
                                >
                                    <div>
                                        <Badge
                                            variant="glow"
                                            className="tracking-widest uppercase"
                                        >
                                            <dive.icon className="size-3" />
                                            {dive.eyebrow}
                                        </Badge>
                                        <h3 className="mt-4 font-heading text-2xl font-bold tracking-tight text-balance sm:text-3xl lg:text-4xl">
                                            {dive.title}
                                        </h3>
                                        <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                                            {dive.description}
                                        </p>
                                        <ul className="mt-6 space-y-3">
                                            {dive.bullets.map((bullet) => (
                                                <li
                                                    key={bullet}
                                                    className="flex items-start gap-2.5"
                                                >
                                                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-accent/15">
                                                        <CheckIcon className="size-3 text-accent" />
                                                    </span>
                                                    <span className="text-sm text-foreground/85">
                                                        {bullet}
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </Reveal>
                                <Reveal
                                    direction={i % 2 === 0 ? "left" : "right"}
                                    delay={0.1}
                                    className={i % 2 === 0 ? "" : "lg:order-1"}
                                >
                                    {dive.visual}
                                </Reveal>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="relative py-16 lg:py-24">
                <div
                    aria-hidden
                    className="absolute inset-0 bg-dots mask-[radial-gradient(ellipse_60%_60%_at_50%_40%,black,transparent)]"
                />
                <div className="relative container-wide">
                    <SectionHeading
                        eyebrow="Comparison"
                        eyebrowIcon={GitCompareArrowsIcon}
                        title={
                            <>
                                Tapotik vs.{" "}
                                <span className="text-gradient">
                                    the alternatives
                                </span>
                            </>
                        }
                        description="One platform against a pile of legacy point tools — or the DIY stack you'd have to babysit."
                    />
                    <Reveal>
                        <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl border glass-strong">
                            <Table>
                                <TableHeader>
                                    <TableRow className="hover:bg-transparent">
                                        <TableHead className="w-2/5 px-6">
                                            Capability
                                        </TableHead>
                                        <TableHead className="px-6 text-center">
                                            <span className="text-gradient font-heading text-sm font-bold tracking-normal normal-case">
                                                Tapotik
                                            </span>
                                        </TableHead>
                                        <TableHead className="px-6 text-center">
                                            Legacy tools
                                        </TableHead>
                                        <TableHead className="px-6 text-center">
                                            DIY stack
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {comparisonRows.map((row) => (
                                        <TableRow key={row.feature}>
                                            <TableCell className="px-6 text-sm font-medium whitespace-normal">
                                                {row.feature}
                                            </TableCell>
                                            <TableCell className="bg-primary/4 px-6 text-center">
                                                <ComparisonCell
                                                    value={row.tapotik}
                                                />
                                            </TableCell>
                                            <TableCell className="px-6 text-center">
                                                <ComparisonCell
                                                    value={row.legacy}
                                                />
                                            </TableCell>
                                            <TableCell className="px-6 text-center">
                                                <ComparisonCell
                                                    value={row.diy}
                                                />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </Reveal>
                    <Reveal delay={0.1}>
                        <p className="mt-8 flex flex-wrap items-center justify-center gap-1.5 text-center text-sm text-muted-foreground">
                            <ZapIcon
                                className="size-4 text-accent"
                                aria-hidden
                            />
                            Teams switching from 3+ point tools save an average
                            of 42% on their AI spend.
                        </p>
                    </Reveal>
                </div>
            </section>

            <StatsBand />

            <CTA />
        </>
    );
}
