"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
    DownloadIcon,
    ImageIcon,
    SlidersHorizontalIcon,
    SparklesIcon,
    WandSparklesIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const PROMPT = "bioluminescent koi pond at midnight, glass sculpture style, 8k";

const tiles = [
    {
        name: "koi-01",
        className: "h-44 sm:h-52",
        art: (
            <>
                <div className="absolute inset-0 bg-linear-to-br from-[#0b1030] via-[#26124d] to-primary" />
                <div className="absolute top-4 -left-6 size-24 rounded-full bg-accent/50 blur-2xl" />
                <div className="absolute right-2 bottom-2 size-20 rounded-full bg-secondary/60 blur-xl" />
                <div className="absolute top-1/2 left-1/3 h-10 w-24 -rotate-12 rounded-full bg-pink/40 blur-lg" />
            </>
        ),
    },
    {
        name: "koi-02",
        className: "h-32 sm:h-36",
        art: (
            <>
                <div className="absolute inset-0 bg-linear-to-tr from-[#1a0b2e] via-secondary to-pink" />
                <div className="absolute top-2 right-4 size-16 rounded-full bg-white/25 blur-xl" />
                <div className="absolute bottom-0 left-6 h-14 w-28 rounded-full bg-primary/50 blur-lg" />
            </>
        ),
    },
    {
        name: "koi-03",
        className: "h-32 sm:h-36",
        art: (
            <>
                <div className="absolute inset-0 bg-linear-to-bl from-[#021a1a] via-[#0a4d4d] to-accent" />
                <div className="absolute top-3 left-3 size-16 rounded-full bg-primary/60 blur-xl" />
                <div className="absolute right-8 bottom-2 h-10 w-20 rotate-12 rounded-full bg-white/20 blur-lg" />
            </>
        ),
    },
    {
        name: "koi-04",
        className: "h-44 sm:h-52",
        art: (
            <>
                <div className="absolute inset-0 bg-[conic-gradient(from_220deg_at_60%_40%,#5B5BF7,#FF4ECD,#FFB020,#8B5CF6,#5B5BF7)]" />
                <div className="absolute inset-0 bg-linear-to-t from-[#0b1030]/70 to-transparent" />
                <div className="absolute top-1/4 left-1/4 size-20 rounded-full bg-white/20 blur-2xl" />
            </>
        ),
    },
];

const styleChips = ["Glass sculpture", "Photoreal", "Anime", "Isometric"];

export function ImageHeroDemo() {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });
    const [generated, setGenerated] = useState(0);

    useEffect(() => {
        if (!inView) return;
        if (generated >= tiles.length) return;
        const t = setTimeout(
            () => setGenerated((g) => g + 1),
            generated === 0 ? 900 : 550,
        );
        return () => clearTimeout(t);
    }, [inView, generated]);

    const done = generated >= tiles.length;

    return (
        <div
            ref={ref}
            className="relative mx-auto w-full max-w-2xl overflow-hidden rounded-3xl border p-5 shadow-2xl glass-strong sm:p-6"
        >
            <div className="flex items-center gap-3 rounded-2xl border bg-card/70 px-4 py-3">
                <WandSparklesIcon className="size-4 shrink-0 text-primary" />
                <p className="min-w-0 flex-1 truncate font-mono text-xs text-foreground/85 sm:text-sm">
                    {PROMPT}
                </p>
                <span className="flex h-8 shrink-0 items-center gap-1.5 rounded-lg bg-primary px-3 text-xs font-medium text-white">
                    <SparklesIcon className="size-3.5" />
                    Generate
                </span>
            </div>

            <div className="mt-3.5 flex flex-wrap items-center gap-2">
                {styleChips.map((chip, i) => (
                    <span
                        key={chip}
                        className={cn(
                            "rounded-full border px-3 py-1 text-[10px] font-medium",
                            i === 0
                                ? "border-primary/40 bg-primary/10 text-(--primary-bright)"
                                : "border-border bg-card/60 text-muted-foreground",
                        )}
                    >
                        {chip}
                    </span>
                ))}
                <span className="ml-auto flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground">
                    <SlidersHorizontalIcon className="size-3" />
                    1:1 · 4 outputs · seed 8841
                </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
                {[0, 1].map((col) => (
                    <div key={col} className="flex flex-col gap-3">
                        {tiles
                            .filter((_, i) => i % 2 === col)
                            .map((tile) => {
                                const index = tiles.findIndex(
                                    (t) => t.name === tile.name,
                                );
                                const isReady = index < generated;
                                return (
                                    <div
                                        key={tile.name}
                                        className={cn(
                                            "relative overflow-hidden rounded-2xl border",
                                            tile.className,
                                        )}
                                    >
                                        {isReady ? (
                                            <motion.div
                                                initial={{
                                                    opacity: 0,
                                                    scale: 1.06,
                                                    filter: "blur(12px)",
                                                }}
                                                animate={{
                                                    opacity: 1,
                                                    scale: 1,
                                                    filter: "blur(0px)",
                                                }}
                                                transition={{
                                                    duration: 0.7,
                                                    ease: [
                                                        0.21, 0.47, 0.32, 0.98,
                                                    ],
                                                }}
                                                className="absolute inset-0"
                                            >
                                                {tile.art}
                                                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-linear-to-t from-black/50 to-transparent px-3 pt-6 pb-2">
                                                    <span className="font-mono text-[9px] text-white/85">
                                                        {tile.name}.png
                                                    </span>
                                                    <DownloadIcon className="size-3 text-white/85" />
                                                </div>
                                            </motion.div>
                                        ) : (
                                            <div className="absolute inset-0 animate-pulse bg-muted/60">
                                                <div className="flex h-full items-center justify-center">
                                                    <ImageIcon className="size-5 text-muted-foreground/50" />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                    </div>
                ))}
            </div>

            <div className="mt-4 flex items-center justify-between gap-4">
                <Badge
                    variant={done ? "accent" : "secondary"}
                    className="text-[10px]"
                >
                    {done
                        ? "● 4/4 generated · 3.2s"
                        : `Generating ${Math.min(generated + 1, 4)}/4…`}
                </Badge>
                <span className="font-mono text-[10px] text-muted-foreground">
                    model: pixel-v3 · 4K upscale ready
                </span>
            </div>
        </div>
    );
}
