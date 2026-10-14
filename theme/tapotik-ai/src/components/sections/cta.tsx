import Link from "next/link";
import { ArrowRightIcon } from "lucide-react";

import { Reveal } from "@/components/effects/reveal";
import { Magnetic } from "@/components/effects/magnetic";
import { Button } from "@/components/ui/button";
import { AuroraBackground } from "@/components/effects/aurora-background";

export function CTA() {
    return (
        <section className="relative py-16 lg:py-24">
            <div className="container-wide">
                <Reveal>
                    <div className="relative overflow-hidden rounded-[2.5rem] border px-6 py-20 text-center lg:py-28">
                        <AuroraBackground intensity="strong" />
                        <div
                            aria-hidden
                            className="absolute inset-0 bg-grid mask-[radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]"
                        />
                        <div
                            aria-hidden
                            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/60 to-transparent"
                        />

                        <div className="relative mx-auto max-w-3xl">
                            <h2 className="font-heading text-3xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
                                Ready to build the{" "}
                                <span className="text-gradient">
                                    future of work
                                </span>
                                ?
                            </h2>
                            <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
                                Join 12,000+ teams shipping AI products with
                                Tapotik. Start free — your first thousand
                                credits are on us.
                            </p>
                            <div className="mt-9 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
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
                                    <Link href="/contact">Talk to sales</Link>
                                </Button>
                            </div>
                            <p className="mt-6 text-xs text-muted-foreground">
                                No credit card required · Cancel anytime · SOC 2
                                Type II
                            </p>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
