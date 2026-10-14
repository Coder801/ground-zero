"use client";

import { useState } from "react";
import { ChevronDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Mobile-only "show more" for a server-rendered list. Items to collapse carry
 * `max-md:hidden max-md:group-data-expanded/more:block`; this wrapper only
 * flips `data-expanded`, so all items stay in the HTML for SEO and screen readers.
 */
export function ShowMore({
    controls,
    hiddenCount,
    labels,
    scrollTarget,
    children,
}: {
    controls: string;
    hiddenCount: number;
    labels: { show: string; hide: string };
    /** Section id to return to when collapsing, so the reader isn't left far below. */
    scrollTarget: string;
    children: React.ReactNode;
}) {
    const [expanded, setExpanded] = useState(false);

    return (
        <div data-expanded={expanded || undefined} className="group/more">
            {children}
            {hiddenCount > 0 ? (
                <div className="mt-8 flex justify-center md:hidden">
                    <Button
                        type="button"
                        variant="outline"
                        size="lg"
                        aria-expanded={expanded}
                        aria-controls={controls}
                        onClick={() => {
                            if (expanded) {
                                document
                                    .getElementById(scrollTarget)
                                    ?.scrollIntoView();
                            }
                            setExpanded(!expanded);
                        }}
                    >
                        {expanded
                            ? labels.hide
                            : `${labels.show} (${hiddenCount})`}
                        <ChevronDownIcon
                            aria-hidden
                            className={cn(
                                "transition-transform duration-300",
                                expanded && "rotate-180",
                            )}
                        />
                    </Button>
                </div>
            ) : null}
        </div>
    );
}
