import type { Metadata } from "next";
import Link from "next/link";
import {
    ArrowUpRightIcon,
    BabyIcon,
    BriefcaseIcon,
    ClipboardCheckIcon,
    CompassIcon,
    EyeIcon,
    GiftIcon,
    GlobeIcon,
    GraduationCapIcon,
    HandshakeIcon,
    HeartIcon,
    HeartPulseIcon,
    LaptopIcon,
    MapPinIcon,
    MessageCircleIcon,
    PlaneIcon,
    RocketIcon,
    RouteIcon,
    SunIcon,
    TrendingUpIcon,
    UsersIcon,
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
import { Button } from "@/components/ui/button";
import { CTA } from "@/components/sections/cta";
import { jobOpenings } from "@/lib/data";

export const metadata: Metadata = {
    title: "Careers",
    description:
        "Join the team building the AI workspace for 12,000+ companies. Remote-first, high ownership, and a mission worth losing sleep over.",
};

const perks = [
    {
        title: "Meaningful equity",
        description:
            "Every teammate owns a real slice of the upside — refreshed as we grow.",
        icon: TrendingUpIcon,
    },
    {
        title: "Remote-first, truly",
        description:
            "Work from 14 countries today. Async by default, overlap by design.",
        icon: GlobeIcon,
    },
    {
        title: "Health, covered",
        description:
            "Premium medical, dental and mental-health support for you and your family.",
        icon: HeartPulseIcon,
    },
    {
        title: "Learning budget",
        description:
            "$2,500 a year for courses, books, conferences — and unlimited AI credits, obviously.",
        icon: GraduationCapIcon,
    },
    {
        title: "Home office setup",
        description:
            "$1,800 to build your ideal workspace, plus the laptop of your choice.",
        icon: LaptopIcon,
    },
    {
        title: "Recharge time",
        description:
            "Flexible PTO with a 25-day minimum we actually enforce. Burnout ships bugs.",
        icon: SunIcon,
    },
    {
        title: "Parental leave",
        description:
            "20 weeks fully paid for every new parent, plus a gentle ramp-back month.",
        icon: BabyIcon,
    },
    {
        title: "Team offsites",
        description:
            "Twice a year the whole company meets somewhere worth the jet lag.",
        icon: PlaneIcon,
    },
];

const cultureValues = [
    {
        title: "Ship with care",
        description: "Craft compounds faster than speed alone.",
        icon: RocketIcon,
    },
    {
        title: "Default to transparency",
        description: "Open metrics, open roadmaps, open salary bands.",
        icon: EyeIcon,
    },
    {
        title: "Humans hold the keys",
        description: "We build AI that keeps people in control.",
        icon: HeartIcon,
    },
    {
        title: "Compound learning",
        description: "Blameless post-mortems, relentless iteration.",
        icon: CompassIcon,
    },
];

const hiringSteps = [
    {
        title: "Intro call",
        duration: "30 min",
        description:
            "A conversation, not an interrogation. We cover your story, our roadmap and whether the timing makes sense.",
        icon: MessageCircleIcon,
    },
    {
        title: "Craft deep-dive",
        duration: "60–90 min",
        description:
            "A practical session in your discipline — pairing, portfolio walkthrough or systems design. No gotchas, no whiteboard trivia.",
        icon: ClipboardCheckIcon,
    },
    {
        title: "Team loop",
        duration: "Half day",
        description:
            "Meet the people you'd actually work with. You interview us as much as we interview you.",
        icon: UsersIcon,
    },
    {
        title: "Offer & welcome",
        duration: "48 hours",
        description:
            "Decision within two days, transparent comp breakdown, and a starter pack of credits before day one.",
        icon: HandshakeIcon,
    },
];

const departments = Array.from(
    new Set(jobOpenings.map((job) => job.department)),
);

export default function CareersPage() {
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
                                <BriefcaseIcon className="size-3" />
                                Careers
                            </Badge>
                        </Reveal>
                        <Reveal delay={0.08}>
                            <h1 className="mt-5 text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
                                Join us. Build the tools{" "}
                                <span className="text-gradient">
                                    the future runs on
                                </span>
                            </h1>
                        </Reveal>
                        <Reveal delay={0.16}>
                            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                                We&apos;re 140 people serving 48 million AI
                                requests a day — which means every person here
                                moves numbers you can see. High ownership, small
                                teams, no theater. If that sounds like home,
                                we&apos;d love to meet you.
                            </p>
                        </Reveal>
                        <Reveal delay={0.24}>
                            <div className="mt-8 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
                                <Button
                                    asChild
                                    size="xl"
                                    variant="gradient"
                                    className="group"
                                >
                                    <Link href="#open-roles">
                                        See open roles
                                        <ArrowUpRightIcon className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                    </Link>
                                </Button>
                                <Button asChild size="xl" variant="glass">
                                    <Link href="/about">Meet the team</Link>
                                </Button>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            <section className="relative overflow-hidden py-16 lg:py-24">
                <GlowSpot color="accent" className="top-20 -left-40" />
                <div className="relative container-wide">
                    <SectionHeading
                        eyebrow="Perks & benefits"
                        eyebrowIcon={GiftIcon}
                        title={
                            <>
                                Take care of the work by{" "}
                                <span className="text-gradient">
                                    taking care of people
                                </span>
                            </>
                        }
                        description="The basics done properly, plus a few things we think every company should offer."
                    />
                    <RevealStagger className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {perks.map((perk) => (
                            <StaggerItem key={perk.title} className="h-full">
                                <SpotlightCard className="group h-full p-6">
                                    <IconTile
                                        icon={perk.icon}
                                        className="size-10 rounded-xl bg-linear-to-br from-primary to-secondary shadow-lg"
                                        iconClassName="size-4.5 text-white"
                                    />
                                    <h3 className="mt-4 font-heading text-sm font-semibold">
                                        {perk.title}
                                    </h3>
                                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                                        {perk.description}
                                    </p>
                                </SpotlightCard>
                            </StaggerItem>
                        ))}
                    </RevealStagger>
                </div>
            </section>

            <section className="relative py-8 lg:py-12">
                <div className="container-wide">
                    <Reveal>
                        <div className="relative overflow-hidden rounded-3xl border px-6 py-8 glass-strong lg:px-10">
                            <div
                                aria-hidden
                                className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent"
                            />
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                                {cultureValues.map((value) => (
                                    <div
                                        key={value.title}
                                        className="flex items-start gap-3.5"
                                    >
                                        <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                                            <value.icon className="size-4 text-primary" />
                                        </span>
                                        <div>
                                            <p className="text-sm font-semibold">
                                                {value.title}
                                            </p>
                                            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                                                {value.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            <section
                id="open-roles"
                className="relative scroll-mt-28 py-16 lg:py-24"
            >
                <div
                    aria-hidden
                    className="absolute inset-0 bg-dots mask-[radial-gradient(ellipse_60%_60%_at_50%_40%,black,transparent)]"
                />
                <div className="relative container-wide">
                    <SectionHeading
                        eyebrow="Open roles"
                        eyebrowIcon={BriefcaseIcon}
                        title={
                            <>
                                Find your{" "}
                                <span className="text-gradient">
                                    next chapter
                                </span>
                            </>
                        }
                        description={`${jobOpenings.length} open positions across ${departments.length} teams. All roles are remote-friendly.`}
                    />

                    <div className="mx-auto max-w-4xl space-y-8">
                        {departments.map((department, di) => {
                            const jobs = jobOpenings.filter(
                                (j) => j.department === department,
                            );
                            return (
                                <Reveal key={department} delay={di * 0.04}>
                                    <div className="overflow-hidden rounded-2xl border bg-card">
                                        <div className="flex items-center justify-between border-b bg-muted/40 px-6 py-3.5">
                                            <h3 className="font-heading text-sm font-semibold tracking-wider uppercase">
                                                {department}
                                            </h3>
                                            <Badge
                                                variant="secondary"
                                                className="text-[10px]"
                                            >
                                                {jobs.length}{" "}
                                                {jobs.length === 1
                                                    ? "role"
                                                    : "roles"}
                                            </Badge>
                                        </div>
                                        <ul>
                                            {jobs.map((job) => (
                                                <li
                                                    key={job.slug}
                                                    className="border-b last:border-b-0"
                                                >
                                                    <Link
                                                        href={`/careers/${job.slug}`}
                                                        className="group flex flex-col gap-3 px-6 py-5 transition-colors hover:bg-muted/40 sm:flex-row sm:items-center sm:justify-between"
                                                    >
                                                        <div>
                                                            <p className="font-medium transition-colors group-hover:text-primary">
                                                                {job.title}
                                                            </p>
                                                            <p className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                                                                <MapPinIcon className="size-3" />
                                                                {job.location}
                                                            </p>
                                                        </div>
                                                        <div className="flex items-center gap-3">
                                                            <Badge
                                                                variant="outline"
                                                                className="text-[10px]"
                                                            >
                                                                {job.type}
                                                            </Badge>
                                                            <ArrowUpRightIcon className="size-4 text-muted-foreground transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
                                                        </div>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </Reveal>
                            );
                        })}
                    </div>

                    <Reveal delay={0.2}>
                        <p className="mt-10 text-center text-sm text-muted-foreground">
                            Don&apos;t see your role?{" "}
                            <Link
                                href="/contact"
                                className="font-medium text-primary underline-offset-4 hover:underline"
                            >
                                Send us a speculative application
                            </Link>{" "}
                            — the best people rarely fit a template.
                        </p>
                    </Reveal>
                </div>
            </section>

            <section className="relative overflow-hidden py-16 lg:py-24">
                <GlowSpot color="secondary" className="-right-40 bottom-0" />
                <div className="relative container-wide">
                    <SectionHeading
                        eyebrow="Hiring process"
                        eyebrowIcon={RouteIcon}
                        title={
                            <>
                                Four steps,{" "}
                                <span className="text-gradient">two weeks</span>
                            </>
                        }
                        description="Respecting your time is the first thing we hire for. Here's exactly what to expect."
                    />
                    <div className="relative">
                        <div
                            aria-hidden
                            className="absolute top-7 right-0 left-0 hidden h-px bg-linear-to-r from-transparent via-primary/40 to-transparent lg:block"
                        />
                        <RevealStagger className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                            {hiringSteps.map((step, i) => (
                                <StaggerItem key={step.title}>
                                    <div className="relative flex flex-col items-center text-center">
                                        <div className="relative z-10 flex size-14 items-center justify-center rounded-2xl border bg-card shadow-xl">
                                            <step.icon className="size-5.5 text-primary" />
                                            <span className="absolute -top-2 -right-2 flex size-6 items-center justify-center rounded-full bg-primary font-mono text-[11px] font-bold text-primary-foreground shadow-lg">
                                                {i + 1}
                                            </span>
                                        </div>
                                        <h3 className="mt-5 font-heading text-base font-semibold">
                                            {step.title}
                                        </h3>
                                        <Badge
                                            variant="secondary"
                                            className="mt-2 text-[10px]"
                                        >
                                            {step.duration}
                                        </Badge>
                                        <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted-foreground">
                                            {step.description}
                                        </p>
                                    </div>
                                </StaggerItem>
                            ))}
                        </RevealStagger>
                    </div>
                </div>
            </section>

            <CTA />
        </>
    );
}
