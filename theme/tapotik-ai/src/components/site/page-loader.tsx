import { cn } from "@/lib/utils";
import { brandHex } from "@/lib/brand-colors";

// Pure-CSS first-paint splash (keyframes in globals.css) so it's server-rendered
// with no hydration flash; only plays on full load, not client-side navigations.
function LoaderMark({
    outline = false,
    className,
}: {
    outline?: boolean;
    className?: string;
}) {
    const stroke = outline ? "currentColor" : "url(#loader-fill-gradient)";
    return (
        <svg
            viewBox="0 0 32 32"
            fill="none"
            aria-hidden
            className={cn("size-full", className)}
        >
            {!outline && (
                <defs>
                    <linearGradient
                        id="loader-fill-gradient"
                        x1="0"
                        y1="0"
                        x2="32"
                        y2="32"
                    >
                        <stop offset="0%" stopColor={brandHex.primary} />
                        <stop offset="55%" stopColor={brandHex.secondary} />
                        <stop offset="100%" stopColor={brandHex.accent} />
                    </linearGradient>
                </defs>
            )}
            <rect
                x="1.5"
                y="1.5"
                width="29"
                height="29"
                rx="9"
                stroke={stroke}
                strokeWidth="2"
            />
            <path
                d="M9 12h14M16 12v9"
                stroke={stroke}
                strokeWidth="2.6"
                strokeLinecap="round"
            />
            <circle
                cx="16"
                cy="24"
                r="1.6"
                fill={outline ? "currentColor" : brandHex.accent}
            />
        </svg>
    );
}

export function PageLoader() {
    return (
        <div
            aria-hidden
            className="fixed inset-0 z-100 grid animate-loader-dismiss place-items-center bg-background/70 backdrop-blur-2xl"
        >
            <div className="relative size-24 animate-loader-logo-out sm:size-28">
                <LoaderMark
                    outline
                    className="absolute inset-0 text-muted-foreground/20"
                />
                <div className="absolute inset-0 animate-loader-fill">
                    <LoaderMark />
                </div>
            </div>
        </div>
    );
}
