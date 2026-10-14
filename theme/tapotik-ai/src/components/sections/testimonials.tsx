import { QuoteIcon, StarIcon } from "lucide-react";

import { SectionHeading } from "@/components/site/section-heading";
import { Marquee } from "@/components/effects/marquee";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { testimonials, type Testimonial } from "@/lib/data";

function TestimonialCard({ t }: { t: Testimonial }) {
    return (
        <figure className="flex w-85 shrink-0 flex-col gap-4 rounded-2xl p-6 glass transition-colors hover:border-primary/25 sm:w-95">
            <div
                className="flex items-center gap-1"
                role="img"
                aria-label="5 out of 5 stars"
            >
                {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon
                        key={i}
                        aria-hidden
                        className="size-3.5 fill-warning text-warning"
                    />
                ))}
            </div>
            <blockquote className="flex-1 text-sm leading-relaxed text-foreground/90">
                &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption className="flex items-center gap-3">
                <Avatar className="size-9">
                    <AvatarFallback>{t.initials}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="text-sm leading-none font-semibold">
                        {t.name}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                        {t.role}, {t.company}
                    </p>
                </div>
            </figcaption>
        </figure>
    );
}

export function Testimonials() {
    const half = Math.ceil(testimonials.length / 2);
    const row1 = testimonials.slice(0, half);
    const row2 = testimonials.slice(half);

    return (
        <section className="relative overflow-hidden py-16 lg:py-24">
            <div className="container-wide">
                <SectionHeading
                    eyebrow="Testimonials"
                    eyebrowIcon={QuoteIcon}
                    title={
                        <>
                            Loved by{" "}
                            <span className="text-gradient">12,000+ teams</span>
                        </>
                    }
                    description="From two-person startups to Fortune 500s — here's what builders say about shipping with Tapotik."
                />
            </div>

            <div className="flex flex-col gap-5">
                <Marquee speed="slow">
                    {row1.map((t) => (
                        <TestimonialCard key={t.name} t={t} />
                    ))}
                </Marquee>
                <Marquee speed="slow" reverse>
                    {row2.map((t) => (
                        <TestimonialCard key={t.name} t={t} />
                    ))}
                </Marquee>
            </div>
        </section>
    );
}
