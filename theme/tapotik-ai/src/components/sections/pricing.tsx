"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckIcon, SparklesIcon, TagIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/site/section-heading";
import { RevealStagger, StaggerItem } from "@/components/effects/reveal";
import { AnimatedCounter } from "@/components/effects/animated-counter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { pricingTiers } from "@/lib/data";

export function Pricing({
    heading = true,
    className,
}: {
    heading?: boolean;
    className?: string;
}) {
    const [yearly, setYearly] = useState(true);

    return (
        <section
            className={cn("relative py-16 lg:py-24", className)}
            id="pricing"
        >
            <div className="container-wide">
                {heading && (
                    <SectionHeading
                        eyebrow="Pricing"
                        eyebrowIcon={TagIcon}
                        title={
                            <>
                                Simple pricing that{" "}
                                <span className="text-gradient">
                                    scales with you
                                </span>
                            </>
                        }
                        description="Start free, upgrade when you're ready. Every paid plan includes all five AI products."
                    />
                )}

                <div className="mb-12 flex items-center justify-center gap-4 lg:mb-16">
                    <span
                        className={cn(
                            "text-sm font-medium transition-colors",
                            !yearly
                                ? "text-foreground"
                                : "text-muted-foreground",
                        )}
                    >
                        Monthly
                    </span>
                    <button
                        role="switch"
                        aria-checked={yearly}
                        aria-label="Toggle yearly billing"
                        onClick={() => setYearly(!yearly)}
                        className="relative h-7 w-13 cursor-pointer rounded-full border border-border bg-muted transition-colors"
                    >
                        <motion.span
                            layout
                            transition={{
                                type: "spring",
                                stiffness: 500,
                                damping: 32,
                            }}
                            className={cn(
                                "absolute top-0.5 size-5.5 rounded-full bg-linear-to-br from-primary to-secondary shadow",
                                yearly ? "left-6.5" : "left-0.5",
                            )}
                        />
                    </button>
                    <span
                        className={cn(
                            "flex items-center gap-2 text-sm font-medium transition-colors",
                            yearly
                                ? "text-foreground"
                                : "text-muted-foreground",
                        )}
                    >
                        Yearly
                        <Badge variant="accent" className="text-[10px]">
                            Save 20%
                        </Badge>
                    </span>
                </div>

                <RevealStagger className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:items-stretch">
                    {pricingTiers.map((tier) => {
                        const price = yearly ? tier.yearly : tier.monthly;
                        return (
                            <StaggerItem key={tier.name} className="h-full">
                                <div
                                    className={cn(
                                        "relative flex h-full flex-col rounded-3xl border bg-card p-8 transition-all duration-300",
                                        tier.highlighted
                                            ? "border-primary/50 shadow-[0_0_60px_-16px_var(--glow-primary)] lg:-my-3 lg:py-11"
                                            : "hover:border-primary/25",
                                    )}
                                >
                                    {tier.highlighted && (
                                        <>
                                            <div
                                                aria-hidden
                                                className="absolute inset-x-0 -top-px mx-auto h-px w-2/3 bg-linear-to-r from-transparent via-primary to-transparent"
                                            />
                                            <Badge
                                                variant="glow"
                                                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background"
                                            >
                                                <SparklesIcon className="size-3" />
                                                Most popular
                                            </Badge>
                                        </>
                                    )}

                                    <h3 className="font-heading text-lg font-semibold">
                                        {tier.name}
                                    </h3>
                                    <p className="mt-1.5 text-sm text-muted-foreground">
                                        {tier.description}
                                    </p>

                                    <div className="mt-6 flex items-baseline gap-1.5">
                                        <AnimatedCounter
                                            value={price}
                                            prefix="$"
                                            className="font-heading text-5xl font-bold tracking-tight tabular-nums"
                                        />
                                        <span className="text-sm text-muted-foreground">
                                            / user / month
                                        </span>
                                    </div>
                                    {yearly && tier.monthly > 0 && (
                                        <motion.p
                                            key={tier.yearly}
                                            initial={{ opacity: 0, y: -4 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.4 }}
                                            className="mt-1 text-xs text-accent"
                                        >
                                            Billed annually — $
                                            {tier.yearly * 12}/user/year
                                        </motion.p>
                                    )}

                                    <Button
                                        asChild
                                        variant={
                                            tier.highlighted
                                                ? "gradient"
                                                : "outline"
                                        }
                                        size="lg"
                                        className="mt-7 w-full"
                                    >
                                        <Link href={tier.href}>{tier.cta}</Link>
                                    </Button>

                                    <ul className="mt-8 flex flex-col gap-3">
                                        {tier.features.map((feature) => (
                                            <li
                                                key={feature}
                                                className="flex items-start gap-2.5"
                                            >
                                                <span
                                                    className={cn(
                                                        "mt-0.5 flex size-4.5 shrink-0 items-center justify-center rounded-full",
                                                        tier.highlighted
                                                            ? "bg-primary/15"
                                                            : "bg-muted",
                                                    )}
                                                >
                                                    <CheckIcon
                                                        className={cn(
                                                            "size-3",
                                                            tier.highlighted
                                                                ? "text-primary"
                                                                : "text-muted-foreground",
                                                        )}
                                                    />
                                                </span>
                                                <span className="text-sm text-foreground/85">
                                                    {feature}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </StaggerItem>
                        );
                    })}
                </RevealStagger>

                <p className="mt-10 text-center text-sm text-muted-foreground">
                    All plans include SSL, 99.9% uptime and GDPR compliance.{" "}
                    <Link
                        href="/contact"
                        className="font-medium text-(--primary-bright) underline-offset-4 hover:underline"
                    >
                        Need a custom plan?
                    </Link>
                </p>
            </div>
        </section>
    );
}
