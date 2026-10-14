import Link from "next/link";
import { CircleQuestionMarkIcon } from "lucide-react";

import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/effects/reveal";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { faqs } from "@/lib/data";

export function FAQ() {
    return (
        <section className="relative py-16 lg:py-24" id="faq">
            <div className="container-wide">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
                    <div>
                        <SectionHeading
                            align="left"
                            eyebrow="FAQ"
                            eyebrowIcon={CircleQuestionMarkIcon}
                            title={
                                <>
                                    Questions,{" "}
                                    <span className="text-gradient">
                                        answered
                                    </span>
                                </>
                            }
                            description="Everything you need to know about credits, models, security and billing."
                            className="mb-8.5!"
                        />
                        <Reveal delay={0.1}>
                            <div className="rounded-2xl p-6 glass">
                                <p className="text-sm font-semibold">
                                    Still have questions?
                                </p>
                                <p className="mt-1.5 text-sm text-muted-foreground">
                                    Our team typically replies within 2 hours.
                                </p>
                                <Button
                                    asChild
                                    variant="outline"
                                    size="sm"
                                    className="mt-4"
                                >
                                    <Link href="/contact">Contact support</Link>
                                </Button>
                            </div>
                        </Reveal>
                    </div>

                    <Reveal delay={0.05}>
                        <Accordion
                            type="single"
                            collapsible
                            className="rounded-3xl border px-6 glass-strong lg:px-8"
                        >
                            {faqs.map((faq, i) => (
                                <AccordionItem key={i} value={`faq-${i}`}>
                                    <AccordionTrigger>
                                        {faq.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="leading-relaxed">
                                        {faq.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </Reveal>
                </div>
            </div>
        </section>
    );
}
