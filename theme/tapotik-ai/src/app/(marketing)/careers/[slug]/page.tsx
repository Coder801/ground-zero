import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
    ArrowLeftIcon,
    BabyIcon,
    BriefcaseIcon,
    CheckIcon,
    ClockIcon,
    GlobeIcon,
    GraduationCapIcon,
    HeartPulseIcon,
    MapPinIcon,
    PlaneIcon,
    PlusIcon,
    SendIcon,
    SparklesIcon,
    TrendingUpIcon,
} from "lucide-react";

import { Reveal } from "@/components/effects/reveal";
import {
    AuroraBackground,
    GlowSpot,
} from "@/components/effects/aurora-background";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { jobOpenings } from "@/lib/data";
import { ApplyForm } from "./_components/apply-form";
import { fallbackDetail, jobDetails } from "./_components/job-details";

export function generateStaticParams() {
    return jobOpenings.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const job = jobOpenings.find((j) => j.slug === slug);
    if (!job) return { title: "Role not found" };
    return {
        title: job.title,
        description: `${job.title} — ${job.department} · ${job.location} · ${job.type}. Join the team building the AI workspace for 12,000+ companies.`,
    };
}

const benefitsRecap = [
    { label: "Meaningful equity", icon: TrendingUpIcon },
    { label: "Remote-first team", icon: GlobeIcon },
    { label: "Full health cover", icon: HeartPulseIcon },
    { label: "$2,500 learning budget", icon: GraduationCapIcon },
    { label: "20 weeks parental leave", icon: BabyIcon },
    { label: "Two offsites a year", icon: PlaneIcon },
];

export default async function JobPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const job = jobOpenings.find((j) => j.slug === slug);
    if (!job) notFound();

    const detail = jobDetails[slug] ?? fallbackDetail;

    return (
        <>
            <section className="relative overflow-hidden pt-32 pb-16 lg:pt-44 lg:pb-24">
                <AuroraBackground intensity="subtle" />
                <div
                    aria-hidden
                    className="absolute inset-0 bg-grid mask-[radial-gradient(ellipse_70%_50%_at_50%_0%,black,transparent)]"
                />
                <div className="relative container-wide">
                    <div className="mx-auto max-w-4xl">
                        <Reveal>
                            <Link
                                href="/careers"
                                className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-primary"
                            >
                                <ArrowLeftIcon className="size-4" />
                                All open roles
                            </Link>
                        </Reveal>
                        <Reveal delay={0.08}>
                            <div className="mt-6 flex flex-wrap items-center gap-2.5">
                                <Badge variant="glow">
                                    <BriefcaseIcon className="size-3" />
                                    {job.department}
                                </Badge>
                                <Badge variant="outline">
                                    <MapPinIcon className="size-3" />
                                    {job.location}
                                </Badge>
                                <Badge variant="secondary">
                                    <ClockIcon className="size-3" />
                                    {job.type}
                                </Badge>
                            </div>
                        </Reveal>
                        <Reveal delay={0.14}>
                            <h1 className="mt-5 text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl">
                                {job.title}
                            </h1>
                        </Reveal>
                        <Reveal delay={0.2}>
                            <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                                {detail.intro}
                            </p>
                        </Reveal>
                        <Reveal delay={0.26}>
                            <div className="mt-7">
                                <Button asChild size="lg" variant="gradient">
                                    <Link href="#apply">
                                        Apply for this role
                                    </Link>
                                </Button>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            <section className="relative overflow-hidden py-12 lg:py-16">
                <GlowSpot color="secondary" className="top-1/4 -right-52" />
                <div className="relative container-wide">
                    <div className="mx-auto grid max-w-4xl grid-cols-1 gap-12 lg:grid-cols-[1.7fr_1fr] lg:gap-14">
                        <div className="space-y-12">
                            <Reveal>
                                <div>
                                    <h2 className="font-heading text-xl font-semibold sm:text-2xl">
                                        What you&apos;ll do
                                    </h2>
                                    <ul className="mt-5 space-y-3.5">
                                        {detail.responsibilities.map((item) => (
                                            <li
                                                key={item}
                                                className="flex items-start gap-3"
                                            >
                                                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary/10">
                                                    <CheckIcon className="size-3 text-primary" />
                                                </span>
                                                <span className="text-sm leading-relaxed text-foreground/85 sm:text-base">
                                                    {item}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </Reveal>

                            <Reveal>
                                <div>
                                    <h2 className="font-heading text-xl font-semibold sm:text-2xl">
                                        What we&apos;re looking for
                                    </h2>
                                    <ul className="mt-5 space-y-3.5">
                                        {detail.requirements.map((item) => (
                                            <li
                                                key={item}
                                                className="flex items-start gap-3"
                                            >
                                                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-accent/10">
                                                    <CheckIcon className="size-3 text-accent" />
                                                </span>
                                                <span className="text-sm leading-relaxed text-foreground/85 sm:text-base">
                                                    {item}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </Reveal>

                            <Reveal>
                                <div>
                                    <h2 className="font-heading text-xl font-semibold sm:text-2xl">
                                        Nice to have
                                    </h2>
                                    <ul className="mt-5 space-y-3.5">
                                        {detail.niceToHave.map((item) => (
                                            <li
                                                key={item}
                                                className="flex items-start gap-3"
                                            >
                                                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-muted">
                                                    <PlusIcon className="size-3 text-muted-foreground" />
                                                </span>
                                                <span className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                                                    {item}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </Reveal>
                        </div>

                        <aside className="lg:sticky lg:top-28 lg:self-start">
                            <Reveal direction="left">
                                <div className="overflow-hidden rounded-2xl border glass-strong">
                                    <div className="border-b px-6 py-4">
                                        <h2 className="font-heading text-sm font-semibold tracking-wider uppercase">
                                            Role at a glance
                                        </h2>
                                    </div>
                                    <dl className="space-y-3.5 px-6 py-5 text-sm">
                                        <div className="flex items-center justify-between gap-4">
                                            <dt className="text-muted-foreground">
                                                Department
                                            </dt>
                                            <dd className="font-medium">
                                                {job.department}
                                            </dd>
                                        </div>
                                        <div className="flex items-center justify-between gap-4">
                                            <dt className="text-muted-foreground">
                                                Location
                                            </dt>
                                            <dd className="text-right font-medium">
                                                {job.location}
                                            </dd>
                                        </div>
                                        <div className="flex items-center justify-between gap-4">
                                            <dt className="text-muted-foreground">
                                                Type
                                            </dt>
                                            <dd className="font-medium">
                                                {job.type}
                                            </dd>
                                        </div>
                                    </dl>
                                    <Separator />
                                    <div className="px-6 py-5">
                                        <h3 className="flex items-center gap-2 text-sm font-semibold">
                                            <SparklesIcon className="size-4 text-primary" />
                                            Benefits recap
                                        </h3>
                                        <ul className="mt-4 space-y-2.5">
                                            {benefitsRecap.map((benefit) => (
                                                <li
                                                    key={benefit.label}
                                                    className="flex items-center gap-2.5 text-sm text-muted-foreground"
                                                >
                                                    <benefit.icon className="size-4 shrink-0 text-accent" />
                                                    {benefit.label}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </Reveal>
                        </aside>
                    </div>
                </div>
            </section>

            <section
                id="apply"
                className="relative scroll-mt-28 py-12 pb-20 lg:py-16 lg:pb-28"
            >
                <div className="container-wide">
                    <div className="mx-auto max-w-4xl">
                        <Reveal>
                            <div className="relative overflow-hidden rounded-3xl border p-8 glass-strong lg:p-12">
                                <div
                                    aria-hidden
                                    className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/60 to-transparent"
                                />
                                <GlowSpot
                                    color="primary"
                                    className="-top-56 -right-56"
                                />
                                <div className="relative">
                                    <Badge
                                        variant="glow"
                                        className="tracking-widest uppercase"
                                    >
                                        <SendIcon className="size-3" />
                                        Apply
                                    </Badge>
                                    <h2 className="mt-4 font-heading text-2xl font-bold tracking-tight sm:text-3xl">
                                        Apply for{" "}
                                        <span className="text-gradient">
                                            {job.title}
                                        </span>
                                    </h2>
                                    <p className="mt-2.5 max-w-xl text-sm text-muted-foreground sm:text-base">
                                        Five fields, five minutes. We review
                                        every application by hand and reply
                                        within a week — usually faster.
                                    </p>
                                    <div className="mt-8">
                                        <ApplyForm jobTitle={job.title} />
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>
        </>
    );
}
