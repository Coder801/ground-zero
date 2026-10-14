import type { Metadata } from "next";
import Link from "next/link";
import {
    ArrowRightIcon,
    ClockIcon,
    HeadphonesIcon,
    MailIcon,
    MapPinIcon,
    MegaphoneIcon,
    MessageSquareIcon,
    RocketIcon,
} from "lucide-react";

import {
    Reveal,
    RevealStagger,
    StaggerItem,
} from "@/components/effects/reveal";
import { IconTile } from "@/components/effects/icon-tile";
import {
    AuroraBackground,
    GlowSpot,
} from "@/components/effects/aurora-background";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    DiscordIcon,
    GitHubIcon,
    LinkedInIcon,
    XIcon,
    YouTubeIcon,
} from "@/components/social-icons";
import { siteConfig } from "@/config/site";
import { ContactForm } from "./_components/contact-form";

export const metadata: Metadata = {
    title: "Contact",
    description:
        "Talk to sales, reach support or drop the press team a line. Real humans, fast answers — usually within two hours.",
};

const contactOptions = [
    {
        title: "Sales",
        description: "Custom plans, enterprise pilots and pricing questions.",
        email: "sales@tapotik.ai",
        response: "Replies within 4 hours",
        icon: RocketIcon,
    },
    {
        title: "Support",
        description:
            "Product help, API issues and billing for existing customers.",
        email: "support@tapotik.ai",
        response: "Replies within 2 hours, 24/7",
        icon: HeadphonesIcon,
    },
    {
        title: "Press",
        description: "Interviews, brand assets and media inquiries.",
        email: "press@tapotik.ai",
        response: "Replies within 1–2 days",
        icon: MegaphoneIcon,
    },
];

const offices = [
    {
        city: "San Francisco",
        tz: "PT",
        offset: "UTC−8",
        detail: "Mission District, CA",
    },
    {
        city: "London",
        tz: "GMT",
        offset: "UTC+0",
        detail: "Shoreditch, UK",
    },
    {
        city: "Singapore",
        tz: "SGT",
        offset: "UTC+8",
        detail: "Tanjong Pagar, SG",
    },
];

const socials = [
    { label: "X (Twitter)", href: siteConfig.links.twitter, icon: XIcon },
    { label: "GitHub", href: siteConfig.links.github, icon: GitHubIcon },
    { label: "LinkedIn", href: siteConfig.links.linkedin, icon: LinkedInIcon },
    { label: "Discord", href: siteConfig.links.discord, icon: DiscordIcon },
    { label: "YouTube", href: siteConfig.links.youtube, icon: YouTubeIcon },
];

export default function ContactPage() {
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
                                <MessageSquareIcon className="size-3" />
                                Contact
                            </Badge>
                        </Reveal>
                        <Reveal delay={0.08}>
                            <h1 className="mt-5 text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
                                Talk to a{" "}
                                <span className="text-gradient">human</span>
                            </h1>
                        </Reveal>
                        <Reveal delay={0.16}>
                            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                                Questions about pricing, a stuck integration or
                                a story you&apos;re writing — pick a lane below
                                or send the form. No ticket-number purgatory, we
                                promise.
                            </p>
                        </Reveal>
                    </div>
                </div>
            </section>

            <section className="relative overflow-hidden py-12 lg:py-16">
                <GlowSpot color="secondary" className="top-1/3 -left-52" />
                <div className="relative container-wide">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-14">
                        <div className="space-y-10">
                            <RevealStagger className="space-y-4">
                                {contactOptions.map((option) => (
                                    <StaggerItem key={option.title}>
                                        <a
                                            href={`mailto:${option.email}`}
                                            className="group flex items-start gap-4 rounded-2xl border bg-card p-5 transition-all duration-300 hover:border-primary/30 hover:shadow-[0_0_40px_-12px_var(--glow-primary)]"
                                        >
                                            <IconTile
                                                icon={option.icon}
                                                className="size-11 rounded-xl bg-linear-to-br from-primary to-secondary shadow-lg"
                                                iconClassName="size-5 text-white"
                                            />
                                            <span className="min-w-0">
                                                <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
                                                    <span className="font-heading text-base font-semibold">
                                                        {option.title}
                                                    </span>
                                                    <span className="flex items-center gap-1 text-[11px] font-medium text-accent-foreground dark:text-accent">
                                                        <ClockIcon className="size-3" />
                                                        {option.response}
                                                    </span>
                                                </span>
                                                <span className="mt-1 block text-sm text-muted-foreground">
                                                    {option.description}
                                                </span>
                                                <span className="mt-2 flex items-center gap-1.5 text-sm font-medium text-primary">
                                                    <MailIcon className="size-3.5" />
                                                    {option.email}
                                                </span>
                                            </span>
                                        </a>
                                    </StaggerItem>
                                ))}
                            </RevealStagger>

                            <Reveal>
                                <div className="rounded-2xl p-6 glass">
                                    <h2 className="flex items-center gap-2 font-heading text-sm font-semibold tracking-wider uppercase">
                                        <MapPinIcon className="size-4 text-primary" />
                                        Our offices
                                    </h2>
                                    <ul className="mt-5 space-y-4">
                                        {offices.map((office) => (
                                            <li
                                                key={office.city}
                                                className="flex items-center justify-between gap-4 border-b pb-4 last:border-b-0 last:pb-0"
                                            >
                                                <div>
                                                    <p className="text-sm font-medium">
                                                        {office.city}
                                                    </p>
                                                    <p className="text-xs text-muted-foreground">
                                                        {office.detail}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-mono text-sm font-semibold text-foreground/90">
                                                        {office.offset}
                                                    </p>
                                                    <p className="text-[10px] tracking-wider text-muted-foreground uppercase">
                                                        {office.tz}
                                                    </p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </Reveal>

                            <Reveal>
                                <div>
                                    <h2 className="font-heading text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                                        Or find us on
                                    </h2>
                                    <div className="mt-4 flex flex-wrap gap-2.5">
                                        {socials.map((social) => (
                                            <a
                                                key={social.label}
                                                href={social.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={social.label}
                                                className="flex size-10 items-center justify-center rounded-xl border bg-card text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:text-primary"
                                            >
                                                <social.icon />
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </Reveal>
                        </div>

                        <Reveal direction="left" delay={0.1}>
                            <div className="relative overflow-hidden rounded-3xl border p-7 glass-strong lg:p-10">
                                <div
                                    aria-hidden
                                    className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/60 to-transparent"
                                />
                                <GlowSpot
                                    color="primary"
                                    className="-top-56 -right-56 opacity-70"
                                />
                                <div className="relative">
                                    <h2 className="font-heading text-2xl font-bold tracking-tight">
                                        Send us a message
                                    </h2>
                                    <p className="mt-2 text-sm text-muted-foreground">
                                        Tell us what you&apos;re working on and
                                        the right team will pick it up.
                                    </p>
                                    <div className="mt-7">
                                        <ContactForm />
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </section>

            <section className="relative py-16 lg:py-24">
                <div className="container-wide">
                    <Reveal>
                        <div className="relative overflow-hidden rounded-3xl border bg-card px-8 py-10 text-center lg:py-12">
                            <div
                                aria-hidden
                                className="absolute inset-0 bg-dots mask-[radial-gradient(ellipse_60%_80%_at_50%_50%,black,transparent)]"
                            />
                            <div className="relative mx-auto max-w-xl">
                                <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
                                    Looking for a{" "}
                                    <span className="text-gradient">
                                        quick answer
                                    </span>
                                    ?
                                </h2>
                                <p className="mt-3 text-sm text-muted-foreground sm:text-base">
                                    Credits, models, security, billing — the
                                    most common questions are already answered
                                    in our FAQ.
                                </p>
                                <Button
                                    asChild
                                    variant="outline"
                                    size="lg"
                                    className="group mt-6"
                                >
                                    <Link href="/#faq">
                                        Browse the FAQ
                                        <ArrowRightIcon className="transition-transform duration-300 group-hover:translate-x-1" />
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>
        </>
    );
}
