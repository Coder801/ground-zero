"use client";

import { useEffect, useState } from "react";
import { CheckIcon, CopyIcon, PhoneIcon, SendIcon } from "lucide-react";

import type { ContactLink } from "@/data/contacts";
import { cn, copyToClipboard } from "@/lib/utils";

type Status = "idle" | "copied" | "failed";

const icons = { phone: PhoneIcon, telegram: SendIcon };

const statusText: Record<Exclude<Status, "idle">, string> = {
    copied: "Скопійовано",
    failed: "Не вдалося скопіювати",
};

/**
 * Contact link styled as one pill; the copy icon slides out of it on hover or
 * keyboard focus. Devices without hover (touch) show the icon all the time.
 */
export function ContactButton({ link }: { link: ContactLink }) {
    const [status, setStatus] = useState<Status>("idle");
    const Icon = icons[link.kind];

    useEffect(() => {
        if (status === "idle") return;
        const id = window.setTimeout(() => setStatus("idle"), 2000);
        return () => window.clearTimeout(id);
    }, [status]);

    return (
        <div className="group/contact relative inline-flex h-12 items-center rounded-full bg-primary text-primary-foreground shadow-[0_8px_24px_-8px_var(--glow-primary)] transition-shadow duration-300 hover:shadow-[0_12px_32px_-8px_var(--glow-primary)]">
            <a
                href={link.href}
                className="inline-flex h-full items-center gap-2 rounded-full pr-3 pl-6 text-base font-medium whitespace-nowrap transition-[padding] duration-300 [@media(hover:hover)]:pr-6 [@media(hover:hover)]:group-focus-within/contact:pr-3 [@media(hover:hover)]:group-hover/contact:pr-3"
            >
                <Icon aria-hidden className="size-4" />
                {link.display}
            </a>
            <button
                type="button"
                aria-label={`Копіювати: ${link.label}`}
                onClick={async () =>
                    setStatus(
                        (await copyToClipboard(link.copy))
                            ? "copied"
                            : "failed",
                    )
                }
                className="mr-1.5 grid size-9 shrink-0 cursor-pointer place-items-center overflow-hidden rounded-full bg-primary-foreground/15 transition-all duration-300 hover:bg-primary-foreground/25 focus-visible:ring-2 focus-visible:ring-primary-foreground focus-visible:outline-hidden [@media(hover:hover)]:mr-0 [@media(hover:hover)]:w-0 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-focus-within/contact:mr-1.5 [@media(hover:hover)]:group-focus-within/contact:w-9 [@media(hover:hover)]:group-focus-within/contact:opacity-100 [@media(hover:hover)]:group-hover/contact:mr-1.5 [@media(hover:hover)]:group-hover/contact:w-9 [@media(hover:hover)]:group-hover/contact:opacity-100"
            >
                {status === "copied" ? (
                    <CheckIcon aria-hidden className="size-4" />
                ) : (
                    <CopyIcon aria-hidden className="size-4" />
                )}
            </button>
            <span
                role="status"
                className={cn(
                    "pointer-events-none absolute -top-10 right-0 rounded-lg bg-foreground px-3 py-1.5 text-xs font-medium whitespace-nowrap text-background transition-opacity duration-200",
                    status === "idle" ? "opacity-0" : "opacity-100",
                )}
            >
                {status === "idle" ? "" : statusText[status]}
            </span>
        </div>
    );
}
