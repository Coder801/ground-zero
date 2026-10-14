import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRightIcon, MailIcon } from "lucide-react";

import {
    AuroraBackground,
    GlowSpot,
} from "@/components/effects/aurora-background";
import {
    Reveal,
    RevealStagger,
    StaggerItem,
} from "@/components/effects/reveal";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { NewsletterForm } from "@/components/site/newsletter-form";
import { BlogCard, BlogCover } from "@/components/blog-card";
import { blogPosts } from "@/lib/data";
import { cn, formatDate } from "@/lib/utils";

export const metadata: Metadata = {
    title: "Blog",
    description:
        "Insights from the frontier — product announcements, engineering deep dives, design patterns and customer stories from the Tapotik AI team.",
};

const categories = [
    "All",
    ...Array.from(new Set(blogPosts.map((post) => post.category))),
];

export default async function BlogPage({
    searchParams,
}: {
    searchParams: Promise<{ category?: string }>;
}) {
    const { category } = await searchParams;
    const activeCategory =
        categories.find(
            (c) => c.toLowerCase() === (category ?? "all").toLowerCase(),
        ) ?? "All";

    const filtered =
        activeCategory === "All"
            ? blogPosts
            : blogPosts.filter(
                  (post) =>
                      post.category.toLowerCase() ===
                      activeCategory.toLowerCase(),
              );

    const [featured, ...rest] = filtered;

    return (
        <>
            <section className="relative overflow-hidden pt-32 pb-16 lg:pt-44 lg:pb-24">
                <AuroraBackground intensity="strong" />
                <div
                    aria-hidden
                    className="absolute inset-0 bg-grid mask-[radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]"
                />
                <div className="relative container-wide">
                    <div className="mx-auto max-w-3xl text-center">
                        <Reveal>
                            <Badge
                                variant="glow"
                                className="tracking-widest uppercase"
                            >
                                <MailIcon className="size-3" />
                                Blog
                            </Badge>
                        </Reveal>
                        <Reveal delay={0.08}>
                            <h1 className="mt-5 text-4xl font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
                                Insights from{" "}
                                <span className="text-gradient">
                                    the frontier
                                </span>
                            </h1>
                        </Reveal>
                        <Reveal delay={0.16}>
                            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                                Product announcements, engineering deep dives
                                and stories from teams building with AI —
                                written by the people shipping it.
                            </p>
                        </Reveal>
                    </div>
                </div>
            </section>

            <section className="relative py-16 lg:py-24">
                <div className="container-wide">
                    <Reveal delay={0.05}>
                        <nav
                            aria-label="Blog categories"
                            className="-mx-6 mb-10 no-scrollbar flex gap-2 overflow-x-auto px-6 sm:justify-center lg:mb-14"
                        >
                            {categories.map((cat) => {
                                const isActive = cat === activeCategory;
                                return (
                                    <Link
                                        key={cat}
                                        href={
                                            cat === "All"
                                                ? "/blog"
                                                : `/blog?category=${encodeURIComponent(cat)}`
                                        }
                                        aria-current={
                                            isActive ? "page" : undefined
                                        }
                                        className={cn(
                                            "shrink-0 rounded-full border px-4 py-1.5 text-sm whitespace-nowrap transition-all duration-300",
                                            isActive
                                                ? "border-primary/40 bg-primary/10 font-medium text-(--primary-bright) shadow-[0_0_20px_-6px_var(--glow-primary)]"
                                                : "border-border text-muted-foreground hover:border-primary/30 hover:text-foreground",
                                        )}
                                    >
                                        {cat}
                                    </Link>
                                );
                            })}
                        </nav>
                    </Reveal>

                    <Reveal delay={0.1}>
                        <Link
                            href={`/blog/${featured.slug}`}
                            className="group block"
                        >
                            <article className="grid grid-cols-1 overflow-hidden rounded-3xl border bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-[0_20px_80px_-24px_var(--glow-primary)] lg:grid-cols-2">
                                <BlogCover
                                    post={featured}
                                    className="aspect-video transition-transform duration-500 group-hover:scale-[1.02] lg:aspect-auto lg:min-h-95"
                                />
                                <div className="flex flex-col justify-center gap-4 p-7 lg:p-12">
                                    <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                                        <Badge variant="glow">Featured</Badge>
                                        <Badge variant="secondary">
                                            {featured.category}
                                        </Badge>
                                        <span>{formatDate(featured.date)}</span>
                                        <span>·</span>
                                        <span>{featured.readingTime}</span>
                                    </div>
                                    <h2 className="font-heading text-2xl leading-tight font-bold tracking-tight transition-colors group-hover:text-primary sm:text-3xl lg:text-4xl">
                                        {featured.title}
                                    </h2>
                                    <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                                        {featured.excerpt}
                                    </p>
                                    <div className="mt-2 flex items-center gap-3">
                                        <Avatar className="size-9">
                                            <AvatarFallback className="text-[11px]">
                                                {featured.author.initials}
                                            </AvatarFallback>
                                        </Avatar>
                                        <div className="text-xs">
                                            <p className="font-medium text-foreground">
                                                {featured.author.name}
                                            </p>
                                            <p className="text-muted-foreground">
                                                {featured.author.role}
                                            </p>
                                        </div>
                                        <span className="ml-auto inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                                            Read article
                                            <ArrowRightIcon
                                                aria-hidden
                                                className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                                            />
                                        </span>
                                    </div>
                                </div>
                            </article>
                        </Link>
                    </Reveal>

                    <RevealStagger
                        className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-8 lg:grid-cols-3"
                        delay={0.1}
                    >
                        {rest.map((post) => (
                            <StaggerItem key={post.slug} className="h-full">
                                <BlogCard post={post} />
                            </StaggerItem>
                        ))}
                    </RevealStagger>
                </div>
            </section>

            <section className="relative py-16 lg:py-24">
                <div className="container-wide">
                    <Reveal>
                        <div className="relative overflow-hidden rounded-[2.5rem] border px-6 py-14 glass-strong lg:px-16 lg:py-16">
                            <GlowSpot
                                color="primary"
                                className="-top-40 -left-24"
                            />
                            <GlowSpot
                                color="accent"
                                className="-right-24 -bottom-48 opacity-70"
                            />
                            <div
                                aria-hidden
                                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/60 to-transparent"
                            />
                            <div className="relative grid grid-cols-1 items-center gap-8 lg:grid-cols-2">
                                <div>
                                    <Badge
                                        variant="glow"
                                        className="tracking-widest uppercase"
                                    >
                                        Newsletter
                                    </Badge>
                                    <h2 className="mt-4 font-heading text-2xl font-bold tracking-tight sm:text-3xl">
                                        The frontier, in your inbox
                                    </h2>
                                    <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
                                        One email a month with product updates,
                                        benchmarks and practical AI engineering
                                        notes. No fluff, unsubscribe anytime.
                                    </p>
                                </div>
                                <NewsletterForm variant="inline" />
                            </div>
                            <p className="relative mt-6 text-xs text-muted-foreground lg:text-right">
                                Joined by 28,000+ builders · We never share your
                                email
                            </p>
                        </div>
                    </Reveal>
                </div>
            </section>
        </>
    );
}
