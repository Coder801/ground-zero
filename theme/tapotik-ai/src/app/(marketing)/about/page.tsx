import type { Metadata } from "next";
import {
    BookOpenIcon,
    CompassIcon,
    EyeIcon,
    FlagIcon,
    GlobeIcon,
    HeartIcon,
    MapPinIcon,
    RocketIcon,
    SparklesIcon,
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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { StatsBand } from "@/components/pages/product-sections";
import { CTA } from "@/components/sections/cta";

export const metadata: Metadata = {
    title: "About",
    description:
        "We're building the AI workspace where every team ships faster. Meet the people, values and milestones behind Tapotik AI.",
};

const milestones = [
    {
        year: "2021",
        title: "Founded in a San Francisco garage",
        description:
            "Three researchers leave their labs with one conviction: frontier AI should feel like a tool, not a thesis. The first prototype answers its first prompt in November.",
        icon: FlagIcon,
    },
    {
        year: "2022",
        title: "AI Chat launches to the public",
        description:
            "Our first product ships with multi-model routing built in from day one. 10,000 teams sign up in the first ninety days — the servers barely survive.",
        icon: RocketIcon,
    },
    {
        year: "2023",
        title: "One platform, every modality",
        description:
            "Image, video and voice generation join the platform. The workflow builder arrives, and Tapotik becomes the first suite where modalities share context and credits.",
        icon: SparklesIcon,
    },
    {
        year: "2024",
        title: "Agents & enterprise scale",
        description:
            "Autonomous agents ship with human approval gates. SOC 2 Type II, region pinning and zero-retention inference unlock our first Fortune 500 deployments.",
        icon: TrendingUpIcon,
    },
    {
        year: "Today",
        title: "12,000+ teams and counting",
        description:
            "48 million AI requests a day across 32 regions, a team of 140 across 14 countries — and the roadmap has never been longer. We're just getting started.",
        icon: GlobeIcon,
    },
];

const values = [
    {
        title: "Ship with care",
        description:
            "Speed matters, but craft compounds. We sweat latency budgets, empty states and error copy the same way we sweat model quality.",
        icon: RocketIcon,
    },
    {
        title: "Default to transparency",
        description:
            "Public changelogs, honest pricing, visible status pages. Internally, every metric and every roadmap doc is open to the whole team.",
        icon: EyeIcon,
    },
    {
        title: "Humans hold the keys",
        description:
            "Autonomy with approval gates, AI with audit trails. We build systems where people stay in control of what matters.",
        icon: HeartIcon,
    },
    {
        title: "Compound learning",
        description:
            "Models improve weekly and so do we. Post-mortems without blame, experiments without ego, and a bias for writing things down.",
        icon: CompassIcon,
    },
];

const team = [
    {
        name: "Amara Osei",
        role: "Co-founder & CEO",
        bio: "Former inference-infra lead; obsessed with making frontier AI boringly reliable.",
        initials: "AO",
        gradient: "from-primary to-secondary",
    },
    {
        name: "Jonas Weber",
        role: "Co-founder & CTO",
        bio: "Built three ML platforms before this one. Believes latency is a feature.",
        initials: "JW",
        gradient: "from-secondary to-pink",
    },
    {
        name: "Priya Raghavan",
        role: "Chief Scientist",
        bio: "Leads model research and evals. Publishes more than she sleeps.",
        initials: "PR",
        gradient: "from-accent to-primary",
    },
    {
        name: "Diego Martins",
        role: "VP of Design",
        bio: "Designs the interfaces that make streaming tokens feel calm.",
        initials: "DM",
        gradient: "from-pink to-warning",
    },
    {
        name: "Hana Sato",
        role: "VP of Engineering",
        bio: "Runs the edge network spanning 32 regions — and the on-call rota culture.",
        initials: "HS",
        gradient: "from-primary to-accent",
    },
    {
        name: "Liam O'Connor",
        role: "Chief Revenue Officer",
        bio: "Took us from zero to 12,000 teams without a single cold deck.",
        initials: "LO",
        gradient: "from-warning to-pink",
    },
];

const offices = [
    {
        city: "San Francisco",
        region: "Headquarters",
        detail: "Mission District, CA",
    },
    { city: "London", region: "EMEA Hub", detail: "Shoreditch, UK" },
    { city: "Singapore", region: "APAC Hub", detail: "Tanjong Pagar, SG" },
];

export default function AboutPage() {
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
                                <UsersIcon className="size-3" />
                                About us
                            </Badge>
                        </Reveal>
                        <Reveal delay={0.08}>
                            <h1 className="mt-5 text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
                                Building the future of{" "}
                                <span className="text-gradient">
                                    intelligent work
                                </span>
                            </h1>
                        </Reveal>
                        <Reveal delay={0.16}>
                            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                                Our mission is simple to say and hard to do:
                                make frontier AI as dependable as electricity.
                                One platform for chat, image, video, voice and
                                agents — fast enough to trust, safe enough to
                                ship, and priced so any team can start today.
                            </p>
                        </Reveal>
                    </div>
                </div>
            </section>

            <section className="relative overflow-hidden py-16 lg:py-24">
                <GlowSpot color="secondary" className="top-1/4 -left-40" />
                <div className="relative container-wide">
                    <SectionHeading
                        eyebrow="Our story"
                        eyebrowIcon={BookOpenIcon}
                        title={
                            <>
                                From garage prototype to{" "}
                                <span className="text-gradient">
                                    global platform
                                </span>
                            </>
                        }
                        description="Five years, five turning points. The milestones that shaped how we build."
                    />

                    <div className="relative mx-auto max-w-3xl">
                        <div
                            aria-hidden
                            className="absolute top-2 bottom-6 left-5.75 w-px bg-linear-to-b from-primary via-secondary to-accent opacity-50 sm:left-6.75"
                        />
                        <ol className="space-y-12">
                            {milestones.map((m, i) => (
                                <li key={m.year}>
                                    <Reveal delay={i * 0.05}>
                                        <div className="relative flex gap-6 sm:gap-8">
                                            <div className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-2xl border bg-card shadow-lg sm:size-14">
                                                <m.icon className="size-5 text-primary sm:size-6" />
                                                <span
                                                    aria-hidden
                                                    className="absolute inset-0 rounded-2xl bg-primary/10 blur-md"
                                                />
                                            </div>
                                            <div className="pt-1">
                                                <Badge
                                                    variant="glow"
                                                    className="font-mono text-[11px]"
                                                >
                                                    {m.year}
                                                </Badge>
                                                <h3 className="mt-3 font-heading text-lg font-semibold sm:text-xl">
                                                    {m.title}
                                                </h3>
                                                <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                                                    {m.description}
                                                </p>
                                            </div>
                                        </div>
                                    </Reveal>
                                </li>
                            ))}
                        </ol>
                    </div>
                </div>
            </section>

            <section className="relative overflow-hidden py-16 lg:py-24">
                <div
                    aria-hidden
                    className="absolute inset-0 bg-dots mask-[radial-gradient(ellipse_60%_60%_at_50%_40%,black,transparent)]"
                />
                <div className="relative container-wide">
                    <SectionHeading
                        eyebrow="Values"
                        eyebrowIcon={HeartIcon}
                        title={
                            <>
                                What we{" "}
                                <span className="text-gradient">
                                    optimize for
                                </span>
                            </>
                        }
                        description="Four principles that survive every reorg, roadmap and model release."
                    />
                    <RevealStagger className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {values.map((value) => (
                            <StaggerItem key={value.title} className="h-full">
                                <SpotlightCard className="group h-full p-7">
                                    <IconTile
                                        icon={value.icon}
                                        className="size-11 rounded-xl bg-linear-to-br from-primary to-secondary shadow-lg"
                                        iconClassName="size-5 text-white"
                                    />
                                    <h3 className="mt-5 font-heading text-base font-semibold">
                                        {value.title}
                                    </h3>
                                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                        {value.description}
                                    </p>
                                </SpotlightCard>
                            </StaggerItem>
                        ))}
                    </RevealStagger>
                </div>
            </section>

            <section className="relative overflow-hidden py-16 lg:py-24">
                <GlowSpot color="pink" className="top-10 -right-40" />
                <div className="relative container-wide">
                    <SectionHeading
                        eyebrow="Leadership"
                        eyebrowIcon={UsersIcon}
                        title={
                            <>
                                The people behind{" "}
                                <span className="text-gradient">
                                    the platform
                                </span>
                            </>
                        }
                        description="A team of researchers, builders and operators from the labs and companies that defined modern AI."
                    />
                    <RevealStagger className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {team.map((person) => (
                            <StaggerItem key={person.name} className="h-full">
                                <SpotlightCard className="h-full p-7">
                                    <div className="flex items-center gap-4">
                                        <Avatar className="size-14">
                                            <AvatarFallback
                                                className={`bg-linear-to-br ${person.gradient} text-sm`}
                                            >
                                                {person.initials}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <h3 className="font-heading text-base font-semibold">
                                                {person.name}
                                            </h3>
                                            <p className="text-xs font-medium tracking-wider text-primary uppercase">
                                                {person.role}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                                        {person.bio}
                                    </p>
                                </SpotlightCard>
                            </StaggerItem>
                        ))}
                    </RevealStagger>
                </div>
            </section>

            <StatsBand />

            <section className="relative py-16 lg:py-24">
                <div className="container-wide">
                    <SectionHeading
                        eyebrow="Global presence"
                        eyebrowIcon={GlobeIcon}
                        title={
                            <>
                                Three hubs,{" "}
                                <span className="text-gradient">
                                    fourteen countries
                                </span>
                            </>
                        }
                        description="Remote-first by design. Our hubs anchor time zones — not attendance."
                    />
                    <RevealStagger className="grid grid-cols-1 gap-5 md:grid-cols-3">
                        {offices.map((office) => (
                            <StaggerItem key={office.city} className="h-full">
                                <div className="relative h-full overflow-hidden rounded-2xl p-7 glass">
                                    <div
                                        aria-hidden
                                        className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent"
                                    />
                                    <div className="flex items-center gap-3">
                                        <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10">
                                            <MapPinIcon className="size-4.5 text-primary" />
                                        </span>
                                        <div>
                                            <h3 className="font-heading text-base font-semibold">
                                                {office.city}
                                            </h3>
                                            <p className="text-xs tracking-wider text-muted-foreground uppercase">
                                                {office.region}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="mt-4 text-sm text-muted-foreground">
                                        {office.detail}
                                    </p>
                                </div>
                            </StaggerItem>
                        ))}
                    </RevealStagger>
                    <Reveal delay={0.15}>
                        <p className="mt-8 text-center text-sm text-muted-foreground">
                            Plus teammates working remotely from Berlin,
                            Toronto, Bengaluru, São Paulo, Sydney and nine more
                            time zones.
                        </p>
                    </Reveal>
                </div>
            </section>

            <CTA />
        </>
    );
}
