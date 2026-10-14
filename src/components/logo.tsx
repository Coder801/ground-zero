import { site } from "@/data/site";
import { cn } from "@/lib/utils";

/** Breaker symbol: contact line with an open switch, as on a single-line diagram. */
export function LogoMark({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 32 32"
            fill="none"
            aria-hidden
            className={cn("size-8 text-primary", className)}
        >
            <rect
                x="1.5"
                y="1.5"
                width="29"
                height="29"
                rx="9"
                stroke="currentColor"
                strokeWidth="2"
            />
            <path
                d="M16 6v6M16 20v6M16 20l-5-8"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
            />
            <path
                d="M13.5 12h5"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
            />
        </svg>
    );
}

export function Logo({ className }: { className?: string }) {
    return (
        <a
            href="#top"
            className={cn(
                "flex min-w-0 items-center gap-2.5 rounded-lg",
                className,
            )}
        >
            <LogoMark className="shrink-0" />
            <span className="flex min-w-0 flex-col text-sm leading-tight sm:flex-row sm:items-baseline sm:gap-1.5">
                <span className="font-heading font-bold tracking-tight">
                    {site.name}
                </span>
                <span className="text-muted-foreground">
                    <span aria-hidden className="hidden sm:inline">
                        ·{" "}
                    </span>
                    {site.role}, {site.city}
                </span>
            </span>
        </a>
    );
}
