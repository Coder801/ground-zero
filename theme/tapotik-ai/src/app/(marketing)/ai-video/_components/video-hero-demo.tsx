"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
    CameraIcon,
    ClapperboardIcon,
    PauseIcon,
    PlayIcon,
    Volume2Icon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const scenes = [
    {
        label: "Scene 1 · Dawn skyline",
        art: "bg-[radial-gradient(ellipse_80%_90%_at_20%_100%,#FFB020_0%,transparent_55%),radial-gradient(ellipse_90%_80%_at_80%_0%,#FF4ECD_0%,transparent_60%),linear-gradient(180deg,#1a0b2e_0%,#0b1030_100%)]",
    },
    {
        label: "Scene 2 · Neon canyon",
        art: "bg-[radial-gradient(ellipse_70%_80%_at_70%_90%,#5B5BF7_0%,transparent_55%),radial-gradient(ellipse_60%_60%_at_20%_20%,#8B5CF6_0%,transparent_60%),linear-gradient(180deg,#0b1030_0%,#050816_100%)]",
    },
    {
        label: "Scene 3 · Glass ocean",
        art: "bg-[radial-gradient(ellipse_80%_70%_at_50%_100%,#00F5D4_0%,transparent_55%),radial-gradient(ellipse_60%_70%_at_80%_10%,#5B5BF7_0%,transparent_60%),linear-gradient(180deg,#021a1a_0%,#0b1030_100%)]",
    },
    {
        label: "Scene 4 · Star ascent",
        art: "bg-[radial-gradient(ellipse_60%_60%_at_50%_30%,#8B5CF6_0%,transparent_55%),radial-gradient(ellipse_80%_50%_at_50%_100%,#FF4ECD_0%,transparent_60%),linear-gradient(180deg,#050816_0%,#1a0b2e_100%)]",
    },
];

const presets = ["Dolly-in", "Orbit", "Crane", "Handheld"];

const DURATION_S = 12;
const TOTAL_LABEL = "0:12";

function formatTime(progress: number) {
    const seconds = Math.floor((progress / 100) * DURATION_S);
    return `0:${seconds.toString().padStart(2, "0")}`;
}

export function VideoHeroDemo() {
    const [progress, setProgress] = useState(0);
    const [playing, setPlaying] = useState(true);
    const rafRef = useRef<number | null>(null);
    const progressRef = useRef(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const inView = useInView(containerRef, { amount: 0.3 });

    useEffect(() => {
        // Only animate while playing and actually on-screen.
        if (!playing || !inView) return;

        let start: number | null = null;
        const initial = progressRef.current;
        function tick(ts: number) {
            if (start === null) start = ts;
            const elapsed = (ts - start) / 1000;
            const next = (initial + (elapsed / DURATION_S) * 100) % 100;
            progressRef.current = next;
            setProgress(next);
            rafRef.current = requestAnimationFrame(tick);
        }
        rafRef.current = requestAnimationFrame(tick);
        return () => {
            if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
        };
    }, [playing, inView]);

    const activeScene = Math.min(
        scenes.length - 1,
        Math.floor((progress / 100) * scenes.length),
    );

    return (
        <div
            ref={containerRef}
            className="relative mx-auto w-full max-w-3xl overflow-hidden rounded-3xl border p-4 shadow-2xl glass-strong sm:p-5"
        >
            <div className="relative aspect-video overflow-hidden rounded-2xl border">
                {scenes.map((scene, i) => (
                    <div
                        key={scene.label}
                        aria-hidden={i !== activeScene}
                        className={cn(
                            "absolute inset-0 transition-opacity duration-700",
                            scene.art,
                            i === activeScene ? "opacity-100" : "opacity-0",
                        )}
                    />
                ))}
                <div
                    aria-hidden
                    className="absolute top-1/3 left-1/4 size-24 animate-float rounded-full bg-white/10 blur-2xl"
                />
                <div
                    aria-hidden
                    className="absolute right-1/4 bottom-1/4 size-16 animate-float-slow rounded-full bg-white/10 blur-xl"
                />

                <div className="absolute inset-x-0 top-0 flex items-center justify-between bg-linear-to-b from-black/50 to-transparent px-4 pt-3 pb-8">
                    <span className="font-mono text-[10px] text-white/90">
                        {scenes[activeScene].label}
                    </span>
                    <Badge
                        variant="glass"
                        className="border-white/20 text-[9px] text-white"
                    >
                        60fps · 4K
                    </Badge>
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                    <button
                        type="button"
                        onClick={() => setPlaying((p) => !p)}
                        aria-label={playing ? "Pause" : "Play"}
                        aria-pressed={playing}
                        className="flex size-14 cursor-pointer items-center justify-center rounded-full border border-white/30 bg-white/15 shadow-2xl backdrop-blur-md transition-colors hover:bg-white/25"
                    >
                        {playing ? (
                            <PauseIcon
                                className="size-5 text-white"
                                fill="currentColor"
                            />
                        ) : (
                            <PlayIcon
                                className="size-5 text-white"
                                fill="currentColor"
                            />
                        )}
                    </button>
                </div>

                <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/60 to-transparent px-4 pt-8 pb-3">
                    <div className="relative h-1 overflow-hidden rounded-full bg-white/20">
                        <motion.div
                            className="absolute inset-y-0 left-0 rounded-full bg-linear-to-r from-pink to-warning"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <div className="mt-2 flex items-center justify-between">
                        <span className="font-mono text-[10px] text-white/90">
                            {formatTime(progress)} / {TOTAL_LABEL}
                        </span>
                        <span className="flex items-center gap-2 text-white/90">
                            <Volume2Icon className="size-3.5" />
                            <span className="font-mono text-[10px]">
                                storyboard-v2.mp4
                            </span>
                        </span>
                    </div>
                </div>
            </div>

            <div className="mt-4 grid grid-cols-4 gap-2.5">
                {scenes.map((scene, i) => (
                    <div
                        key={scene.label}
                        className={cn(
                            "relative h-12 overflow-hidden rounded-lg border transition-all duration-300 sm:h-14",
                            scene.art,
                            i === activeScene
                                ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                                : "opacity-60",
                        )}
                    >
                        <span className="absolute bottom-1 left-1.5 font-mono text-[8px] text-white/90">
                            S{i + 1}
                        </span>
                    </div>
                ))}
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="flex items-center gap-1.5 font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
                    <CameraIcon className="size-3" />
                    Camera
                </span>
                {presets.map((preset, i) => (
                    <span
                        key={preset}
                        className={cn(
                            "rounded-full border px-3 py-1 text-[10px] font-medium",
                            i === activeScene % presets.length
                                ? "border-pink/40 bg-pink/10 text-pink"
                                : "border-border bg-card/60 text-muted-foreground",
                        )}
                    >
                        {preset}
                    </span>
                ))}
                <span className="ml-auto flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground">
                    <ClapperboardIcon className="size-3" />4 scenes stitched
                </span>
            </div>
        </div>
    );
}
