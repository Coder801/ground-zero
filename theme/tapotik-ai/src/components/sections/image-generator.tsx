"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ImageIcon, SparklesIcon, WandSparklesIcon } from "lucide-react";

import { SectionHeading } from "@/components/site/section-heading";
import { Reveal } from "@/components/effects/reveal";
import { Parallax } from "@/components/effects/parallax";
import { Badge } from "@/components/ui/badge";

type Art = {
    prompt: string;
    gradient: string;
    pattern: "orb" | "waves" | "prism" | "ring";
};

const gallery: Art[] = [
    {
        prompt: "Holographic glass orb floating in indigo nebula",
        gradient: "from-primary via-secondary to-[#050816]",
        pattern: "orb",
    },
    {
        prompt: "Neon aurora waves over a dark horizon",
        gradient: "from-accent via-primary to-[#050816]",
        pattern: "waves",
    },
    {
        prompt: "Crystalline prism refracting cyan light",
        gradient: "from-pink via-secondary to-[#050816]",
        pattern: "prism",
    },
    {
        prompt: "Golden ring portal in violet space",
        gradient: "from-warning via-pink to-[#050816]",
        pattern: "ring",
    },
];

function ArtPattern({ pattern }: { pattern: Art["pattern"] }) {
    switch (pattern) {
        case "orb":
            return (
                <>
                    <div className="absolute top-1/2 left-1/2 size-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/25 blur-md" />
                    <div className="absolute top-1/2 left-1/2 size-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/40 backdrop-blur" />
                    <div className="absolute top-[38%] left-[38%] size-4 rounded-full bg-white/80 blur-[2px]" />
                </>
            );
        case "waves":
            return (
                <svg
                    className="absolute inset-0 h-full w-full opacity-60"
                    viewBox="0 0 200 200"
                    aria-hidden
                >
                    {[0, 1, 2, 3].map((i) => (
                        <path
                            key={i}
                            d={`M 0 ${120 + i * 18} Q 50 ${95 + i * 18}, 100 ${120 + i * 18} T 200 ${120 + i * 18}`}
                            fill="none"
                            stroke="white"
                            strokeOpacity={0.5 - i * 0.1}
                            strokeWidth="2"
                        />
                    ))}
                </svg>
            );
        case "prism":
            return (
                <svg
                    className="absolute inset-0 h-full w-full"
                    viewBox="0 0 200 200"
                    aria-hidden
                >
                    <polygon
                        points="100,45 150,140 50,140"
                        fill="white"
                        fillOpacity="0.25"
                    />
                    <polygon
                        points="100,60 138,132 62,132"
                        fill="white"
                        fillOpacity="0.35"
                    />
                    <line
                        x1="100"
                        y1="45"
                        x2="100"
                        y2="140"
                        stroke="white"
                        strokeOpacity="0.5"
                    />
                </svg>
            );
        case "ring":
            return (
                <>
                    <div className="absolute top-1/2 left-1/2 size-28 -translate-x-1/2 -translate-y-1/2 rounded-full border-6 border-white/40 blur-[1px]" />
                    <div className="absolute top-1/2 left-1/2 size-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/70" />
                </>
            );
    }
}

export function ImageGenerator() {
    const [active, setActive] = useState(0);

    return (
        <section className="relative py-16 lg:py-24">
            <div className="container-wide">
                <SectionHeading
                    eyebrow="AI Image Studio"
                    eyebrowIcon={ImageIcon}
                    title={
                        <>
                            From prompt to{" "}
                            <span className="text-gradient-pink">
                                masterpiece
                            </span>
                        </>
                    }
                    description="Type an idea, pick a style, get gallery-grade output. Photorealism, 3D glass, illustration and 40 more presets."
                />

                <Parallax speed={22}>
                    <Reveal>
                        <div className="mx-auto max-w-4xl rounded-3xl border p-6 shadow-2xl glass-strong lg:p-8">
                            <div className="flex items-center gap-3 rounded-2xl border bg-card/60 px-5 py-4">
                                <WandSparklesIcon className="size-5 shrink-0 text-primary" />
                                <motion.p
                                    key={active}
                                    initial={{ opacity: 0, y: 6 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex-1 truncate font-mono text-sm text-foreground/90"
                                >
                                    {gallery[active].prompt}
                                </motion.p>
                                <span className="hidden shrink-0 items-center gap-2 rounded-full bg-linear-to-r from-primary to-secondary px-4 py-2 text-xs font-semibold text-white sm:flex">
                                    <SparklesIcon className="size-3.5" />
                                    Generate
                                </span>
                            </div>

                            <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
                                {gallery.map((art, i) => (
                                    <motion.button
                                        key={art.prompt}
                                        onClick={() => setActive(i)}
                                        initial={{ opacity: 0, scale: 0.94 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{
                                            delay: i * 0.08,
                                            duration: 0.5,
                                        }}
                                        whileHover={{ y: -6 }}
                                        className={`group relative aspect-square cursor-pointer overflow-hidden rounded-2xl border-2 transition-colors ${
                                            active === i
                                                ? "border-primary"
                                                : "border-transparent"
                                        }`}
                                        aria-label={`View: ${art.prompt}`}
                                    >
                                        <div
                                            className={`absolute inset-0 bg-linear-to-br ${art.gradient}`}
                                        />
                                        <ArtPattern pattern={art.pattern} />
                                        <div
                                            aria-hidden
                                            className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.18),transparent_50%)]"
                                        />
                                        <div className="absolute inset-x-0 bottom-0 translate-y-full bg-black/50 p-2.5 text-left backdrop-blur-sm transition-transform duration-300 group-hover:translate-y-0">
                                            <p className="line-clamp-2 text-[10px] leading-tight text-white/90">
                                                {art.prompt}
                                            </p>
                                        </div>
                                    </motion.button>
                                ))}
                            </div>

                            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
                                {[
                                    "Photoreal",
                                    "3D Glass",
                                    "Anime",
                                    "Isometric",
                                    "Cinematic",
                                    "Vector",
                                    "+38 styles",
                                ].map((style) => (
                                    <Badge
                                        key={style}
                                        variant="secondary"
                                        className="text-[11px]"
                                    >
                                        {style}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </Reveal>
                </Parallax>
            </div>
        </section>
    );
}
