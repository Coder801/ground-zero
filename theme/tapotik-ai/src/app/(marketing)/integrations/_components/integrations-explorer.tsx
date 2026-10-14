"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PlusIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { integrations } from "@/lib/data";

export function IntegrationsExplorer() {
    const categories = useMemo(
        () => [
            "All",
            ...Array.from(new Set(integrations.map((i) => i.category))),
        ],
        [],
    );
    const [active, setActive] = useState("All");

    const visible =
        active === "All"
            ? integrations
            : integrations.filter((i) => i.category === active);

    return (
        <div>
            <div
                role="group"
                aria-label="Filter integrations by category"
                className="mb-10 flex flex-wrap justify-center gap-2"
            >
                {categories.map((category) => {
                    const isActive = category === active;
                    return (
                        <button
                            key={category}
                            type="button"
                            aria-pressed={isActive}
                            aria-label={`Filter by ${category}`}
                            onClick={() => setActive(category)}
                            className={cn(
                                "relative cursor-pointer rounded-full border px-4 py-1.5 text-xs font-medium transition-colors duration-300",
                                isActive
                                    ? "border-primary/50 text-primary-foreground"
                                    : "border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground",
                            )}
                        >
                            {isActive && (
                                <motion.span
                                    layoutId="integration-filter-pill"
                                    transition={{
                                        type: "spring",
                                        stiffness: 500,
                                        damping: 35,
                                    }}
                                    className="absolute inset-0 rounded-full bg-primary shadow-[0_0_20px_-4px_var(--glow-primary)]"
                                />
                            )}
                            <span
                                className={cn(
                                    "relative",
                                    isActive && "text-white",
                                )}
                            >
                                {category}
                            </span>
                        </button>
                    );
                })}
            </div>

            <motion.ul
                layout
                className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
            >
                <AnimatePresence mode="popLayout">
                    {visible.map((integration) => (
                        <motion.li
                            layout
                            key={integration.name}
                            initial={{ opacity: 0, scale: 0.94 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.94 }}
                            transition={{
                                duration: 0.3,
                                ease: [0.21, 0.47, 0.32, 0.98],
                            }}
                            className="group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-card p-6 transition-colors duration-300 hover:border-primary/30"
                        >
                            <div
                                aria-hidden
                                className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                            />
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3.5">
                                    <span
                                        aria-hidden
                                        className="flex size-11 items-center justify-center rounded-xl font-heading text-base font-bold text-white shadow-lg"
                                        style={{
                                            backgroundColor: integration.color,
                                        }}
                                    >
                                        {integration.initial}
                                    </span>
                                    <div>
                                        <h3 className="font-heading text-base font-semibold">
                                            {integration.name}
                                        </h3>
                                        <Badge
                                            variant="secondary"
                                            className="mt-1 text-[10px]"
                                        >
                                            {integration.category}
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                            <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">
                                {integration.description}
                            </p>
                            <div className="mt-5">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="-ml-2 text-primary hover:text-primary"
                                    aria-label={`Connect ${integration.name}`}
                                >
                                    <PlusIcon className="size-3.5" />
                                    Connect
                                </Button>
                            </div>
                        </motion.li>
                    ))}
                </AnimatePresence>
            </motion.ul>

            <p className="mt-8 text-center text-sm text-muted-foreground">
                Showing {visible.length} of {integrations.length} integrations
                {active !== "All" && (
                    <>
                        {" "}
                        in{" "}
                        <span className="font-medium text-foreground">
                            {active}
                        </span>
                    </>
                )}
                . New connectors ship every month.
            </p>
        </div>
    );
}
