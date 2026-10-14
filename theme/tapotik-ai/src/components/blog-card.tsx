import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { BlogPost } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export { formatDate };

/** Decorative gradient cover for a blog post (no image assets needed). */
export function BlogCover({
    post,
    className = "",
}: {
    post: BlogPost;
    className?: string;
}) {
    return (
        <div
            className={`relative overflow-hidden bg-linear-to-br ${post.gradient} ${className}`}
            aria-hidden
        >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(255,255,255,0.35),transparent_45%)] opacity-40" />
            <div className="absolute -right-8 -bottom-8 size-40 rounded-full border-10 border-white/15" />
            <div className="absolute top-6 left-6 size-16 rounded-2xl bg-white/12 backdrop-blur-sm" />
            <div className="absolute right-6 bottom-6 left-6 space-y-1.5">
                <div className="h-1.5 w-2/3 rounded-full bg-white/30" />
                <div className="h-1.5 w-1/3 rounded-full bg-white/20" />
            </div>
        </div>
    );
}

export function BlogCard({ post }: { post: BlogPost }) {
    return (
        <Link href={`/blog/${post.slug}`} className="group block h-full">
            <article className="flex h-full flex-col overflow-hidden rounded-2xl border bg-card transition-all duration-300 hover:border-primary/30 hover:shadow-[0_12px_48px_-16px_var(--glow-primary)]">
                <BlogCover
                    post={post}
                    className="aspect-[16/9] transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <div className="flex flex-1 flex-col gap-3 p-6">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <Badge variant="secondary">{post.category}</Badge>
                        <span>{formatDate(post.date)}</span>
                        <span>·</span>
                        <span>{post.readingTime}</span>
                    </div>
                    <h3 className="font-heading text-lg leading-snug font-semibold transition-colors group-hover:text-primary">
                        {post.title}
                    </h3>
                    <p className="line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                        {post.excerpt}
                    </p>
                    <div className="mt-2 flex items-center gap-2.5">
                        <Avatar className="size-7">
                            <AvatarFallback className="text-[10px]">
                                {post.author.initials}
                            </AvatarFallback>
                        </Avatar>
                        <span className="text-xs font-medium">
                            {post.author.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                            · {post.author.role}
                        </span>
                    </div>
                </div>
            </article>
        </Link>
    );
}
