import { personal } from "@/data/site";
import { Section } from "@/components/site/section";

export function Personal() {
    return (
        <Section className="py-8 lg:py-12">
            <div className="mx-auto max-w-3xl border-l-4 border-primary pl-6 sm:pl-8">
                <h2 className="text-2xl font-bold tracking-tight text-balance sm:text-3xl">
                    {personal.title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                    {personal.text}
                </p>
            </div>
        </Section>
    );
}
