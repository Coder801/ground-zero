import { process, sections } from "@/data/site";
import { Section } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";

// Timeline: vertical on mobile, horizontal and centred from lg. The connector is
// each step's ::after, running from its node to the next node (hidden on the last).
export function Process() {
    return (
        <Section id="process">
            <SectionHeading title={sections.process} />
            <ol className="grid grid-cols-1 lg:grid-cols-4 lg:gap-x-6">
                {process.map((step, i) => (
                    <li
                        key={step.title}
                        className="relative grid grid-cols-[3rem_1fr] gap-x-5 pb-10 after:absolute after:top-14 after:bottom-2 after:left-6 after:w-px after:-translate-x-1/2 after:bg-primary/40 last:pb-0 last:after:hidden lg:flex lg:flex-col lg:items-center lg:pb-0 lg:text-center lg:after:top-6 lg:after:right-[calc(-50%+0.75rem)] lg:after:bottom-auto lg:after:left-[calc(50%+2.25rem)] lg:after:h-px lg:after:w-auto lg:after:translate-x-0"
                    >
                        <span
                            aria-hidden
                            className="relative z-10 grid size-12 place-items-center rounded-full border-2 border-primary bg-card font-mono text-base font-semibold text-(--primary-bright) shadow-[0_0_24px_-6px_var(--glow-primary)]"
                        >
                            {String(i + 1).padStart(2, "0")}
                        </span>
                        <div className="pt-2.5 lg:mt-6 lg:px-2 lg:pt-0">
                            <h3 className="font-heading text-lg font-semibold">
                                {step.title}
                            </h3>
                            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                                {step.text}
                            </p>
                        </div>
                    </li>
                ))}
            </ol>
        </Section>
    );
}
