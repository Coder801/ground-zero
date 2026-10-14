import Link from "next/link";
import { ArrowUpRightIcon, BoxesIcon, CheckIcon } from "lucide-react";

import { SectionHeading } from "@/components/site/section-heading";
import { RevealStagger, StaggerItem } from "@/components/effects/reveal";
import { SpotlightCard } from "@/components/effects/spotlight-card";
import { IconTile } from "@/components/effects/icon-tile";
import { products } from "@/lib/data";

export function Products() {
    return (
        <section className="relative py-16 lg:py-24">
            <div
                aria-hidden
                className="pointer-events-none absolute top-0 left-1/2 h-px w-2/3 -translate-x-1/2 bg-linear-to-r from-transparent via-border to-transparent"
            />
            <div className="container-wide">
                <SectionHeading
                    eyebrow="Products"
                    eyebrowIcon={BoxesIcon}
                    title={
                        <>
                            One platform,{" "}
                            <span className="text-gradient">five products</span>
                        </>
                    }
                    description="Every modality, unified. Share context, credits and workflows across chat, image, video, voice and agents."
                />

                <RevealStagger className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {products.map((product) => (
                        <StaggerItem key={product.name} className="h-full">
                            <Link
                                href={product.href}
                                className="group block h-full"
                            >
                                <SpotlightCard className="flex h-full flex-col p-7">
                                    <div className="flex items-start justify-between">
                                        <IconTile
                                            icon={product.icon}
                                            className={`size-12 rounded-xl bg-linear-to-br ${product.gradient} shadow-lg`}
                                            iconClassName="size-5.5 text-white"
                                        />
                                        <ArrowUpRightIcon className="size-5 text-muted-foreground transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
                                    </div>
                                    <h3 className="mt-5 font-heading text-lg font-semibold transition-colors group-hover:text-primary">
                                        {product.name}
                                    </h3>
                                    <p className="text-xs font-medium tracking-wider text-muted-foreground uppercase">
                                        {product.tagline}
                                    </p>
                                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                                        {product.description}
                                    </p>
                                    <ul className="mt-5 grid grid-cols-2 gap-x-3 gap-y-2">
                                        {product.features.map((f) => (
                                            <li
                                                key={f}
                                                className="flex items-center gap-1.5 text-xs text-muted-foreground"
                                            >
                                                <CheckIcon className="size-3 shrink-0 text-accent" />
                                                {f}
                                            </li>
                                        ))}
                                    </ul>
                                </SpotlightCard>
                            </Link>
                        </StaggerItem>
                    ))}

                    <StaggerItem className="h-full">
                        <Link href="/features" className="group block h-full">
                            <div className="border-gradient relative flex h-full min-h-64 flex-col items-center justify-center gap-3 overflow-hidden rounded-2xl bg-card p-7 text-center">
                                <div
                                    aria-hidden
                                    className="absolute inset-0 bg-linear-to-br from-primary/10 via-secondary/5 to-accent/10 opacity-60 transition-opacity duration-500 group-hover:opacity-100"
                                />
                                <p className="relative font-heading text-2xl font-bold">
                                    Explore all{" "}
                                    <span className="text-gradient">
                                        150+ features
                                    </span>
                                </p>
                                <p className="relative text-sm text-muted-foreground">
                                    See the full capability map across every
                                    product.
                                </p>
                                <span className="relative mt-2 inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                                    View features
                                    <ArrowUpRightIcon className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </span>
                            </div>
                        </Link>
                    </StaggerItem>
                </RevealStagger>
            </div>
        </section>
    );
}
