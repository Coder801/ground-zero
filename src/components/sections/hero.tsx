import { MapPinIcon } from "lucide-react";

import { hero, site } from "@/data/site";
import { Badge } from "@/components/ui/badge";

export function Hero() {
    return (
        <section
            id="top"
            className="relative scroll-mt-(--header-height) overflow-hidden"
        >
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-grid mask-[radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]"
            />
            <div
                aria-hidden
                className="pointer-events-none absolute -top-40 left-1/2 size-[36rem] max-w-full -translate-x-1/2 rounded-full bg-primary/15 blur-3xl"
            />
            <div className="relative container-wide flex flex-col items-center py-20 text-center lg:py-32">
                {/* Mobile: a column with hairline dividers, like a drawing's spec list.
                    From md: one glowing pill, items separated by dots. */}
                <ul className="flex w-full max-w-xs flex-col divide-y divide-primary/20 border-y border-primary/20 text-xs font-medium tracking-widest text-(--primary-bright) uppercase md:w-auto md:max-w-none md:flex-row md:items-center md:gap-x-3 md:divide-y-0 md:rounded-full md:border md:border-primary/30 md:bg-primary/10 md:px-6 md:py-2 md:text-sm md:tracking-wider md:shadow-[0_0_20px_-4px_var(--glow-primary)]">
                    {hero.eyebrow.map((item) => (
                        <li
                            key={item}
                            className="py-1.5 md:py-0 md:before:mr-3 md:before:opacity-60 md:before:content-['·'] md:first:before:content-none"
                        >
                            {item}
                        </li>
                    ))}
                </ul>
                <h1 className="mt-8 text-4xl leading-[1.08] font-bold tracking-tight text-balance sm:mt-10 sm:text-6xl lg:text-7xl">
                    {hero.title}
                </h1>
                <p className="mt-6 max-w-2xl text-base leading-relaxed text-balance text-muted-foreground sm:text-lg lg:text-xl">
                    {hero.text}
                </p>
                {/* Mobile: equal-width column; from md: a single row. */}
                <ul className="mt-9 flex w-full max-w-xs flex-col gap-2.5 md:w-auto md:max-w-none md:flex-row md:justify-center">
                    {hero.badges.map((badge) => (
                        <li key={badge.label} className="flex">
                            <Badge
                                variant={
                                    badge.highlighted ? "default" : "outline"
                                }
                                className="w-full px-3.5 py-2 text-sm md:w-fit md:py-1.5"
                            >
                                {badge.label}
                            </Badge>
                        </li>
                    ))}
                </ul>
                <p className="mt-6 flex items-center gap-2 text-sm text-muted-foreground sm:text-base">
                    <MapPinIcon
                        aria-hidden
                        className="size-4 shrink-0 text-(--primary-bright)"
                    />
                    {site.serviceArea}
                </p>
            </div>
        </section>
    );
}
