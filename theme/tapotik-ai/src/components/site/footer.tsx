import Link from "next/link";

import { footerNav, siteConfig } from "@/config/site";
import { Logo } from "@/components/logo";
import { NewsletterForm } from "@/components/site/newsletter-form";
import { Button } from "@/components/ui/button";
import {
    GitHubIcon,
    LinkedInIcon,
    XIcon,
    YouTubeIcon,
} from "@/components/social-icons";

const socials = [
    { label: "X (Twitter)", href: siteConfig.links.twitter, icon: XIcon },
    { label: "GitHub", href: siteConfig.links.github, icon: GitHubIcon },
    { label: "LinkedIn", href: siteConfig.links.linkedin, icon: LinkedInIcon },
    { label: "YouTube", href: siteConfig.links.youtube, icon: YouTubeIcon },
];

const columns = [
    { title: "Product", items: footerNav.product },
    { title: "Company", items: footerNav.company },
    { title: "Resources", items: footerNav.resources },
    { title: "Legal", items: footerNav.legal },
];

export function Footer() {
    return (
        <footer className="relative border-t">
            <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent"
            />
            <div className="container-wide py-16 lg:py-20">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.4fr_2fr]">
                    <div className="flex max-w-sm flex-col gap-6">
                        <Logo />
                        <p className="text-sm leading-relaxed text-muted-foreground">
                            {siteConfig.tagline}. Build, launch and scale your
                            AI product with a production-ready design system.
                        </p>
                        <NewsletterForm variant="compact" />
                        <div className="flex items-center gap-1">
                            {socials.map((s) => (
                                <Button
                                    key={s.label}
                                    asChild
                                    variant="ghost"
                                    size="icon"
                                    className="text-muted-foreground hover:text-foreground"
                                >
                                    <a
                                        href={s.href}
                                        target="_blank"
                                        rel="noreferrer"
                                        aria-label={s.label}
                                    >
                                        <s.icon className="size-4.5" />
                                    </a>
                                </Button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
                        {columns.map((col) => (
                            <nav
                                key={col.title}
                                aria-label={`${col.title} links`}
                            >
                                <h3 className="mb-4 font-heading text-sm font-semibold">
                                    {col.title}
                                </h3>
                                <ul className="flex flex-col gap-2.5">
                                    {col.items.map((item) => (
                                        <li key={item.href + item.title}>
                                            <Link
                                                href={item.href}
                                                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                                            >
                                                {item.title}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        ))}
                    </div>
                </div>

                <div
                    aria-hidden
                    className="mt-16 overflow-hidden text-foreground select-none"
                >
                    <svg
                        viewBox="0 0 1000 145"
                        className="-mb-4 block h-auto w-full sm:-mb-10"
                        role="presentation"
                    >
                        <defs>
                            <linearGradient
                                id="footer-wordmark"
                                x1="0"
                                y1="0"
                                x2="0"
                                y2="1"
                            >
                                <stop
                                    offset="0"
                                    stopColor="currentColor"
                                    stopOpacity="0.22"
                                />
                                <stop
                                    offset="0.5"
                                    stopColor="currentColor"
                                    stopOpacity="0.06"
                                />
                                <stop
                                    offset="1"
                                    stopColor="currentColor"
                                    stopOpacity="0"
                                />
                            </linearGradient>
                        </defs>
                        <text
                            x="0"
                            y="140"
                            textLength="1000"
                            lengthAdjust="spacingAndGlyphs"
                            className="font-heading"
                            fontSize="190"
                            fontWeight="700"
                            fill="url(#footer-wordmark)"
                        >
                            {siteConfig.name.toUpperCase()}
                        </text>
                    </svg>
                </div>

                <div className="flex flex-col items-center justify-between gap-4 border-t pt-8 sm:flex-row">
                    <p className="text-xs text-muted-foreground">
                        © {siteConfig.year} {siteConfig.name}. All rights
                        reserved.
                    </p>
                    <p className="text-xs text-muted-foreground">
                        Crafted with Next.js, Tailwind CSS & Framer Motion.
                    </p>
                </div>
            </div>
        </footer>
    );
}
