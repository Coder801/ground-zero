import Link from "next/link";
import { ArrowRightIcon, BlocksIcon } from "lucide-react";

import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/effects/reveal";
import { Marquee } from "@/components/effects/marquee";
import { Button } from "@/components/ui/button";
import { LogoMark } from "@/components/logo";
import { integrations } from "@/lib/data";

function IntegrationChip({
    name,
    initial,
    color,
}: {
    name: string;
    initial: string;
    color: string;
}) {
    return (
        <div className="flex items-center gap-3 rounded-xl px-4 py-3 glass transition-colors hover:border-primary/30">
            <span
                className="flex size-8 items-center justify-center rounded-lg text-sm font-bold text-white"
                style={{ backgroundColor: color }}
                aria-hidden
            >
                {initial}
            </span>
            <span className="text-sm font-medium whitespace-nowrap">
                {name}
            </span>
        </div>
    );
}

export function Integrations() {
    const half = Math.ceil(integrations.length / 2);
    const row1 = integrations.slice(0, half);
    const row2 = integrations.slice(half);

    return (
        <section className="relative overflow-hidden py-16 lg:py-24">
            <div className="container-wide">
                <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
                    <div>
                        <SectionHeading
                            align="left"
                            eyebrow="Integrations"
                            eyebrowIcon={BlocksIcon}
                            title={
                                <>
                                    Plays nicely with{" "}
                                    <span className="text-gradient">
                                        your stack
                                    </span>
                                </>
                            }
                            description="Connect Tapotik to the tools your team already lives in. Native integrations, webhooks and a Zapier bridge to 6,000+ apps."
                            className="mb-8"
                        />
                        <Reveal delay={0.1}>
                            <div className="flex flex-wrap gap-3">
                                <Button asChild variant="gradient">
                                    <Link href="/integrations">
                                        Browse integrations
                                        <ArrowRightIcon />
                                    </Link>
                                </Button>
                                <Button asChild variant="outline">
                                    <Link href="/docs">API docs</Link>
                                </Button>
                            </div>
                        </Reveal>
                    </div>

                    <Reveal direction="left">
                        <div className="relative">
                            <div
                                aria-hidden
                                className="pointer-events-none absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
                            >
                                <div className="flex size-20 items-center justify-center rounded-2xl shadow-[0_0_60px_-8px_var(--glow-primary)] glass-strong">
                                    <LogoMark className="size-10" />
                                </div>
                            </div>
                            <div
                                aria-hidden
                                className="pointer-events-none absolute top-1/2 left-1/2 -z-0 size-48 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-3xl"
                            />

                            <div className="flex flex-col gap-4 py-6">
                                <Marquee speed="slow">
                                    {row1.map((i) => (
                                        <IntegrationChip key={i.name} {...i} />
                                    ))}
                                </Marquee>
                                <Marquee speed="slow" reverse>
                                    {row2.map((i) => (
                                        <IntegrationChip key={i.name} {...i} />
                                    ))}
                                </Marquee>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
