import { Marquee } from "@/components/effects/marquee";
import { Reveal } from "@/components/effects/reveal";
import { trustedCompanies } from "@/lib/data";
import { cn } from "@/lib/utils";

export function TrustedCompanies() {
    return (
        <section
            className="relative py-14 lg:py-16"
            aria-label="Trusted by leading teams"
        >
            <div className="container-wide">
                <Reveal>
                    <p className="mb-8 text-center text-sm font-medium tracking-[0.2em] text-muted-foreground uppercase">
                        Trusted by 12,000+ teams at
                    </p>
                </Reveal>
                <Reveal delay={0.1}>
                    <Marquee durationSeconds={46}>
                        {trustedCompanies.map(({ name, gradient }) => (
                            <div
                                key={name}
                                className="flex items-center gap-3 rounded-2xl border bg-card/70 px-5 py-3.5 shadow-[0_8px_30px_-14px_rgba(0,0,0,0.5)] transition-colors hover:border-primary/40"
                            >
                                <span
                                    aria-hidden
                                    className={cn(
                                        "flex size-9 items-center justify-center rounded-xl bg-linear-to-br text-sm font-bold text-white shadow-sm",
                                        gradient,
                                    )}
                                >
                                    {name.charAt(0)}
                                </span>
                                <span className="font-heading text-base font-semibold whitespace-nowrap">
                                    {name}
                                </span>
                            </div>
                        ))}
                    </Marquee>
                </Reveal>
            </div>
        </section>
    );
}
