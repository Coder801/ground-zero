import type { MetadataRoute } from "next";
import { blogPosts, docsNav, jobOpenings } from "@/lib/data";
import { siteConfig } from "@/config/site";

export default function sitemap(): MetadataRoute.Sitemap {
    const base = siteConfig.url;

    const staticRoutes = [
        "",
        "/about",
        "/features",
        "/pricing",
        "/blog",
        "/careers",
        "/contact",
        "/changelog",
        "/integrations",
        "/ai-chat",
        "/ai-image",
        "/ai-video",
        "/ai-voice",
        "/ai-agents",
        "/privacy",
        "/terms",
    ].map((route) => ({
        url: `${base}${route}`,
        lastModified: new Date("2025-06-20"),
        changeFrequency: "weekly" as const,
        priority: route === "" ? 1 : 0.7,
    }));

    const docs = docsNav
        .flatMap((group) => group.items)
        .map((item) => ({
            url: `${base}${item.href}`,
            lastModified: new Date("2025-06-20"),
            changeFrequency: "weekly" as const,
            priority: item.href === "/docs" ? 0.7 : 0.6,
        }));

    const posts = blogPosts.map((post) => ({
        url: `${base}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: "monthly" as const,
        priority: 0.5,
    }));

    const jobs = jobOpenings.map((job) => ({
        url: `${base}/careers/${job.slug}`,
        lastModified: new Date("2025-06-20"),
        changeFrequency: "monthly" as const,
        priority: 0.4,
    }));

    return [...staticRoutes, ...docs, ...posts, ...jobs];
}
