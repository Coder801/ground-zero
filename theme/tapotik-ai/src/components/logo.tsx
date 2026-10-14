"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useId } from "react";
import { cn } from "@/lib/utils";
import { brandHex } from "@/lib/brand-colors";

export function LogoMark({ className }: { className?: string }) {
    const gradientId = useId();

    return (
        <svg
            viewBox="0 0 32 32"
            fill="none"
            aria-hidden
            className={cn("size-8", className)}
        >
            <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="32" y2="32">
                    <stop offset="0%" stopColor={brandHex.primary} />
                    <stop offset="55%" stopColor={brandHex.secondary} />
                    <stop offset="100%" stopColor={brandHex.accent} />
                </linearGradient>
            </defs>
            <rect
                x="1.5"
                y="1.5"
                width="29"
                height="29"
                rx="9"
                stroke={`url(#${gradientId})`}
                strokeWidth="2"
            />
            <path
                d="M9 12h14M16 12v9"
                stroke={`url(#${gradientId})`}
                strokeWidth="2.6"
                strokeLinecap="round"
            />
            <circle cx="16" cy="24" r="1.6" fill={brandHex.accent} />
        </svg>
    );
}

export function Logo({
    className,
    textClassName,
}: {
    className?: string;
    textClassName?: string;
}) {
    const pathname = usePathname();

    return (
        <Link
            href="/"
            onClick={(e) => {
                // Already home — scroll to top instead of a no-op navigation.
                if (pathname === "/") {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                }
            }}
            className={cn("flex shrink-0 items-center gap-2.5", className)}
            aria-label="Tapotik AI home"
        >
            <LogoMark />
            <span
                className={cn(
                    "font-heading text-lg font-bold tracking-tight",
                    textClassName,
                )}
            >
                Tapotik<span className="text-gradient"> AI</span>
            </span>
        </Link>
    );
}
