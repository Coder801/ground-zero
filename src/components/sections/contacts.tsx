import { contactForm, contactLinks } from "@/data/contacts";
import { sections, site } from "@/data/site";
import { Section } from "@/components/site/section";
import { ContactButton } from "@/components/contact-button";
import { ContactForm } from "@/components/contact-form";

export function Contacts() {
    return (
        <Section id="contacts">
            <div className="relative overflow-hidden rounded-[2.5rem] border bg-card px-6 py-14 text-center sm:px-10 lg:py-20">
                <div
                    aria-hidden
                    className="absolute inset-0 bg-grid mask-[radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]"
                />
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/60 to-transparent"
                />
                <div className="relative mx-auto max-w-2xl">
                    <h2 className="text-3xl font-bold tracking-tight text-balance sm:text-5xl">
                        {sections.contacts}
                    </h2>
                    <p className="mt-4 text-base text-muted-foreground sm:text-lg">
                        {site.serviceArea}
                    </p>
                    <ul className="mt-12 flex flex-col items-center justify-center gap-8 sm:flex-row sm:gap-10">
                        {contactLinks.map((link) => (
                            <li
                                key={link.kind}
                                className="flex flex-col items-center gap-3"
                            >
                                <span className="text-sm text-muted-foreground">
                                    {link.label}
                                </span>
                                <ContactButton link={link} />
                            </li>
                        ))}
                    </ul>
                    <div className="mt-12 border-t pt-10">
                        <p className="mb-8 text-base text-muted-foreground sm:text-lg">
                            {contactForm.intro}
                        </p>
                        <ContactForm />
                    </div>
                </div>
            </div>
        </Section>
    );
}
