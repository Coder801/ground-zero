import Image from "next/image";
import { CameraIcon } from "lucide-react";

import { works, type Work } from "@/data/works";
import { sections, worksMore } from "@/data/site";
import { Section } from "@/components/site/section";
import { SectionHeading } from "@/components/site/section-heading";
import { ShowMore } from "@/components/show-more";
import { cn } from "@/lib/utils";

function WorkImage({ work }: { work: Work }) {
    if (work.image) {
        return (
            <Image
                src={work.image}
                alt={work.alt}
                width={1200}
                height={900}
                loading="lazy"
                sizes="(min-width: 1280px) 20rem, (min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
                className="aspect-4/3 w-full object-cover"
            />
        );
    }
    return (
        <div
            role="img"
            aria-label={work.alt}
            className="relative grid aspect-4/3 w-full place-items-center overflow-hidden bg-linear-to-br from-primary/15 via-muted to-card"
        >
            <div
                aria-hidden
                className="absolute inset-0 bg-grid mask-[radial-gradient(ellipse_70%_70%_at_50%_50%,black,transparent)]"
            />
            <span className="relative flex flex-col items-center gap-2 text-sm text-muted-foreground">
                <CameraIcon aria-hidden className="size-6" />
                Фото буде тут
            </span>
        </div>
    );
}

export function Works() {
    return (
        <Section id="works">
            <SectionHeading title={sections.works} />
            <ShowMore
                controls="works-list"
                hiddenCount={Math.max(
                    works.length - worksMore.visibleOnMobile,
                    0,
                )}
                labels={worksMore}
                scrollTarget="works"
            >
                <ul
                    id="works-list"
                    className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                >
                    {works.map((work, i) => (
                        <li
                            key={work.id}
                            className={cn(
                                i >= worksMore.visibleOnMobile &&
                                    "max-md:hidden max-md:group-data-expanded/more:block",
                            )}
                        >
                            <figure className="flex h-full flex-col overflow-hidden rounded-2xl border bg-card">
                                <WorkImage work={work} />
                                {/* Drawing title block: name / description / sheet number. */}
                                <figcaption className="mt-auto grid grid-cols-[1fr_auto] border-t text-sm">
                                    <span className="col-span-2 px-4 py-2.5 font-heading font-semibold">
                                        {work.title}
                                    </span>
                                    <span className="border-t px-4 py-2 text-muted-foreground">
                                        {work.caption}
                                    </span>
                                    <span className="border-t border-l px-4 py-2 font-mono text-muted-foreground">
                                        Арк. {i + 1}
                                    </span>
                                </figcaption>
                            </figure>
                        </li>
                    ))}
                </ul>
            </ShowMore>
        </Section>
    );
}
