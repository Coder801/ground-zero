import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BookOpenIcon, ChevronRightIcon, MailIcon } from "lucide-react";

import { AuroraBackground } from "@/components/effects/aurora-background";
import { Reveal } from "@/components/effects/reveal";
import { SectionHeading } from "@/components/site/section-heading";
import { CTA } from "@/components/sections/cta";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { BlogCard, BlogCover, formatDate } from "@/components/blog-card";
import { LinkedInIcon, XIcon } from "@/components/social-icons";
import { blogPosts } from "@/lib/data";
import { siteConfig } from "@/config/site";
import { postContent } from "./_components/post-content";

export function generateStaticParams() {
    return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const post = blogPosts.find((p) => p.slug === slug);
    if (!post) {
        return { title: "Post not found" };
    }
    return { title: post.title, description: post.excerpt };
}

export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const post = blogPosts.find((p) => p.slug === slug);
    const content = post ? postContent[post.slug] : undefined;

    if (!post || !content) {
        notFound();
    }

    const related = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 3);
    const shareUrl = `${siteConfig.url}/blog/${post.slug}`;
    const shareLinks = [
        {
            label: "Share on X",
            href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(shareUrl)}`,
            icon: XIcon,
        },
        {
            label: "Share on LinkedIn",
            href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
            icon: LinkedInIcon,
        },
        {
            label: "Share via email",
            href: `mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(shareUrl)}`,
            icon: MailIcon,
        },
    ];

    return (
        <>
            <section className="relative overflow-hidden pt-32 pb-16 lg:pt-44 lg:pb-24">
                <AuroraBackground intensity="subtle" />
                <div className="relative container-wide">
                    <Reveal>
                        <nav
                            aria-label="Breadcrumb"
                            className="flex items-center gap-2 text-sm text-muted-foreground"
                        >
                            <Link
                                href="/blog"
                                className="transition-colors hover:text-foreground"
                            >
                                Blog
                            </Link>
                            <ChevronRightIcon
                                aria-hidden
                                className="size-3.5"
                            />
                            <Badge variant="secondary">{post.category}</Badge>
                        </nav>
                        <h1 className="mt-6 max-w-4xl font-heading text-3xl font-bold tracking-tight text-balance sm:text-4xl lg:text-5xl">
                            {post.title}
                        </h1>
                        <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-3">
                            <div className="flex items-center gap-3">
                                <Avatar className="size-10">
                                    <AvatarFallback>
                                        {post.author.initials}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="text-sm">
                                    <p className="font-medium">
                                        {post.author.name}
                                    </p>
                                    <p className="text-muted-foreground">
                                        {post.author.role}
                                    </p>
                                </div>
                            </div>
                            <Separator
                                orientation="vertical"
                                className="hidden h-8! sm:block"
                            />
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span>{formatDate(post.date)}</span>
                                <span aria-hidden>·</span>
                                <span>{post.readingTime}</span>
                            </div>
                        </div>
                    </Reveal>
                </div>
            </section>

            <section className="relative">
                <div className="container-wide">
                    <Reveal delay={0.1}>
                        <BlogCover
                            post={post}
                            className="aspect-[21/9] rounded-3xl border shadow-[0_24px_80px_-32px_var(--glow-primary)]"
                        />
                    </Reveal>
                </div>
            </section>

            <section className="relative py-12 lg:py-16">
                <div className="container-wide">
                    <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_300px] xl:gap-16">
                        <article className="max-w-3xl min-w-0">
                            {content.body}
                        </article>

                        <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
                            <div className="rounded-2xl p-6 glass">
                                <p className="text-sm font-semibold">
                                    Share this post
                                </p>
                                <div className="mt-4 flex gap-2.5">
                                    {shareLinks.map((share) => (
                                        <Button
                                            key={share.label}
                                            asChild
                                            variant="outline"
                                            size="icon"
                                            className="rounded-xl"
                                        >
                                            <a
                                                href={share.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={share.label}
                                            >
                                                <share.icon className="size-4" />
                                            </a>
                                        </Button>
                                    ))}
                                </div>
                            </div>

                            <div className="rounded-2xl p-6 glass">
                                <p className="text-sm font-semibold">Tags</p>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {content.tags.map((tag) => (
                                        <Badge key={tag} variant="outline">
                                            {tag}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            <div className="relative overflow-hidden rounded-2xl border bg-card p-6">
                                <div
                                    aria-hidden
                                    className={`absolute inset-x-0 top-0 h-1 bg-linear-to-r ${post.gradient}`}
                                />
                                <div className="flex items-center gap-3">
                                    <Avatar className="size-12">
                                        <AvatarFallback className="text-sm">
                                            {post.author.initials}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-heading text-sm font-semibold">
                                            {post.author.name}
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            {post.author.role} · Tapotik AI
                                        </p>
                                    </div>
                                </div>
                                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                                    {content.authorBio}
                                </p>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            <section className="relative py-8 lg:py-12">
                <div className="container-wide">
                    <SectionHeading
                        align="left"
                        eyebrow="Keep reading"
                        eyebrowIcon={BookOpenIcon}
                        title={
                            <>
                                More from{" "}
                                <span className="text-gradient">the blog</span>
                            </>
                        }
                        className="mb-10"
                    />
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {related.map((relatedPost, i) => (
                            <Reveal
                                key={relatedPost.slug}
                                delay={i * 0.08}
                                className="h-full"
                            >
                                <BlogCard post={relatedPost} />
                            </Reveal>
                        ))}
                    </div>
                </div>
            </section>

            <CTA />
        </>
    );
}
