import Link from "next/link";
import { ArrowRightIcon, NewspaperIcon } from "lucide-react";

import { SectionHeading } from "@/components/site/section-heading";
import {
    RevealStagger,
    StaggerItem,
    Reveal,
} from "@/components/effects/reveal";
import { Button } from "@/components/ui/button";
import { BlogCard } from "@/components/blog-card";
import { blogPosts } from "@/lib/data";

export function BlogPreview() {
    return (
        <section className="relative py-16 lg:py-24">
            <div className="container-wide">
                <SectionHeading
                    eyebrow="Blog"
                    eyebrowIcon={NewspaperIcon}
                    title={
                        <>
                            Insights from the{" "}
                            <span className="text-gradient">frontier</span>
                        </>
                    }
                    description="Product deep-dives, engineering war stories and the patterns shaping AI-native software."
                />

                <RevealStagger className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {blogPosts.slice(0, 3).map((post) => (
                        <StaggerItem key={post.slug} className="h-full">
                            <BlogCard post={post} />
                        </StaggerItem>
                    ))}
                </RevealStagger>

                <Reveal delay={0.15} className="mt-10 flex justify-center">
                    <Button
                        asChild
                        variant="outline"
                        size="lg"
                        className="group"
                    >
                        <Link href="/blog">
                            View all articles
                            <ArrowRightIcon className="transition-transform duration-300 group-hover:translate-x-1" />
                        </Link>
                    </Button>
                </Reveal>
            </div>
        </section>
    );
}
