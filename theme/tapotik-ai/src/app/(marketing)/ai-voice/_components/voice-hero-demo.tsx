"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { AudioLinesIcon, PauseIcon, PlayIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const voices = [
    {
        name: "Nova",
        style: "Warm · Conversational",
        language: "EN-US",
        gradient: "from-accent to-primary",
        initials: "N",
    },
    {
        name: "Atlas",
        style: "Deep · Documentary",
        language: "EN-GB",
        gradient: "from-primary to-secondary",
        initials: "A",
    },
    {
        name: "Suki",
        style: "Bright · Energetic",
        language: "JA",
        gradient: "from-pink to-warning",
        initials: "S",
    },
    {
        name: "Marco",
        style: "Smooth · Narrative",
        language: "ES",
        gradient: "from-secondary to-pink",
        initials: "M",
    },
];

const languages = [
    "EN",
    "ES",
    "FR",
    "DE",
    "JA",
    "PT",
    "HI",
    "ZH",
    "KO",
    "IT",
    "NL",
    "AR",
];

// Deterministic pseudo-random bar heights so SSR and client render match.
const BAR_COUNT = 36;
const bars = Array.from({ length: BAR_COUNT }, (_, i) => {
    const wave = Math.sin(i * 0.55) * 0.35 + Math.sin(i * 1.7) * 0.2;
    return 0.35 + Math.abs(wave) * 0.65;
});

export function VoiceHeroDemo() {
    const [activeVoice, setActiveVoice] = useState(0);
    const [playing, setPlaying] = useState(true);
    const voice = voices[activeVoice];

    return (
        <div className="relative mx-auto w-full max-w-2xl overflow-hidden rounded-3xl border p-5 shadow-2xl glass-strong sm:p-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                    <div
                        className={cn(
                            "flex size-8 items-center justify-center rounded-lg bg-linear-to-br",
                            voice.gradient,
                        )}
                    >
                        <AudioLinesIcon className="size-4 text-white" />
                    </div>
                    <div>
                        <p className="text-sm leading-none font-semibold">
                            Voice Studio
                        </p>
                        <p className="mt-0.5 font-mono text-[10px] text-muted-foreground">
                            voice: {voice.name.toLowerCase()} · emotion: warm ·
                            speed 1.0×
                        </p>
                    </div>
                </div>
                <Badge variant="accent" className="text-[10px]">
                    ● Streaming
                </Badge>
            </div>

            <div className="mt-5 rounded-2xl border bg-card/60 px-5 py-6">
                <div
                    className="flex h-20 items-center justify-center gap-0.75"
                    aria-hidden
                >
                    {bars.map((height, i) => (
                        <motion.span
                            key={`${activeVoice}-${i}`}
                            className={cn(
                                "w-1 flex-none rounded-full bg-linear-to-t sm:w-1.5",
                                voice.gradient,
                            )}
                            style={{ height: `${height * 100}%` }}
                            animate={
                                playing
                                    ? { scaleY: [0.3, 1, 0.45, 0.9, 0.3] }
                                    : { scaleY: 0.25 }
                            }
                            transition={
                                playing
                                    ? {
                                          duration: 1.1 + (i % 5) * 0.14,
                                          repeat: Infinity,
                                          ease: "easeInOut",
                                          delay: (i % 9) * 0.07,
                                      }
                                    : { duration: 0.3 }
                            }
                        />
                    ))}
                </div>
                <p className="mt-4 text-center text-sm leading-relaxed text-muted-foreground">
                    &quot;Welcome back. Your Tuesday briefing is ready —{" "}
                    <span className="text-foreground">
                        three updates need your attention.
                    </span>
                    &quot;
                </p>
                <div className="mt-3 flex items-center justify-center gap-2">
                    {["Warm", "Neutral", "Energetic", "Calm"].map(
                        (emotion, i) => (
                            <span
                                key={emotion}
                                className={cn(
                                    "rounded-full border px-2.5 py-0.5 text-[9px] font-medium",
                                    i === 0
                                        ? "border-accent/40 bg-accent/10 text-accent-foreground dark:text-accent"
                                        : "border-border bg-card/60 text-muted-foreground",
                                )}
                            >
                                {emotion}
                            </span>
                        ),
                    )}
                </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                {voices.map((v, i) => {
                    const isActive = i === activeVoice;
                    return (
                        <button
                            key={v.name}
                            type="button"
                            aria-label={`${isActive && playing ? "Pause" : "Play"} voice ${v.name}`}
                            aria-pressed={isActive}
                            onClick={() => {
                                if (isActive) {
                                    setPlaying((p) => !p);
                                } else {
                                    setActiveVoice(i);
                                    setPlaying(true);
                                }
                            }}
                            className={cn(
                                "group cursor-pointer rounded-xl border p-3 text-left transition-all duration-300",
                                isActive
                                    ? "border-primary/50 bg-primary/10 shadow-[0_0_24px_-8px_var(--glow-primary)]"
                                    : "border-border bg-card/60 hover:border-primary/30",
                            )}
                        >
                            <div className="flex items-center justify-between">
                                <span
                                    className={cn(
                                        "flex size-7 items-center justify-center rounded-lg bg-linear-to-br font-heading text-[11px] font-bold text-white",
                                        v.gradient,
                                    )}
                                >
                                    {v.initials}
                                </span>
                                <span
                                    className={cn(
                                        "flex size-6 items-center justify-center rounded-full border transition-colors",
                                        isActive
                                            ? "border-primary/50 bg-primary text-white"
                                            : "border-border text-muted-foreground group-hover:text-foreground",
                                    )}
                                >
                                    {isActive && playing ? (
                                        <PauseIcon
                                            className="size-2.5"
                                            fill="currentColor"
                                        />
                                    ) : (
                                        <PlayIcon
                                            className="size-2.5 translate-x-px"
                                            fill="currentColor"
                                        />
                                    )}
                                </span>
                            </div>
                            <p className="mt-2 text-xs font-semibold">
                                {v.name}
                            </p>
                            <p className="truncate text-[9px] text-muted-foreground">
                                {v.style}
                            </p>
                            <Badge
                                variant="secondary"
                                className="mt-1.5 px-1.5 text-[8px]"
                            >
                                {v.language}
                            </Badge>
                        </button>
                    );
                })}
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-1.5">
                {languages.map((lang) => (
                    <span
                        key={lang}
                        className="rounded-md border bg-card/60 px-2 py-0.5 font-mono text-[9px] text-muted-foreground"
                    >
                        {lang}
                    </span>
                ))}
                <span className="px-1 font-mono text-[9px] text-primary">
                    +28 more
                </span>
            </div>
        </div>
    );
}
