"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
    AudioLinesIcon,
    CheckIcon,
    DownloadIcon,
    MicIcon,
    PauseIcon,
    PlayIcon,
    Share2Icon,
} from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { copyWithToast } from "@/lib/clipboard";

const voices = [
    {
        name: "Nova",
        language: "English · US",
        gradient: "from-primary to-secondary",
        tags: ["Warm", "Narration"],
    },
    {
        name: "Atlas",
        language: "English · UK",
        gradient: "from-[#0EA5E9] to-primary",
        tags: ["Deep", "Documentary"],
    },
    {
        name: "Lyra",
        language: "Spanish",
        gradient: "from-pink to-secondary",
        tags: ["Bright", "Ads"],
    },
    {
        name: "Kaito",
        language: "Japanese",
        gradient: "from-accent to-[#0EA5E9]",
        tags: ["Calm", "Support"],
    },
    {
        name: "Amara",
        language: "French",
        gradient: "from-warning to-pink",
        tags: ["Elegant", "Luxury"],
    },
    {
        name: "Rex",
        language: "German",
        gradient: "from-secondary to-accent",
        tags: ["Energetic", "Promo"],
    },
];

const emotions = [
    "Neutral",
    "Cheerful",
    "Calm",
    "Excited",
    "Serious",
    "Whisper",
];

const history = [
    {
        script: "Welcome to Tapotik — your AI workspace…",
        voice: "Nova",
        duration: "0:42",
        created: "Today, 09:14",
    },
    {
        script: "Episode 12: Shipping agents to production",
        voice: "Atlas",
        duration: "3:56",
        created: "Today, 08:30",
    },
    {
        script: "Su pedido ha sido enviado. Gracias por…",
        voice: "Lyra",
        duration: "0:19",
        created: "Yesterday",
    },
    {
        script: "新機能のご紹介 — エージェント自動化",
        voice: "Kaito",
        duration: "1:08",
        created: "Yesterday",
    },
    {
        script: "La nouvelle collection arrive ce printemps…",
        voice: "Amara",
        duration: "0:51",
        created: "Jun 30",
    },
];

const MAX_CHARS = 480;

/** Deterministic waveform heights (SSR-safe — no Math.random). */
const waveHeights = Array.from({ length: 44 }, (_, i) => {
    const v =
        0.35 +
        0.3 * Math.abs(Math.sin(i * 0.9)) +
        0.35 * Math.abs(Math.sin(i * 0.37 + 1.4));
    return Math.min(1, v);
});

function Waveform({ playing }: { playing: boolean }) {
    return (
        <div className="flex h-16 items-center gap-0.75" aria-hidden>
            {waveHeights.map((h, i) => (
                <motion.span
                    key={i}
                    className="w-1 flex-1 rounded-full bg-linear-to-t from-primary to-accent"
                    style={{ height: `${h * 100}%` }}
                    animate={
                        playing
                            ? { scaleY: [1, 0.35 + (i % 5) * 0.14, 1] }
                            : { scaleY: 1 }
                    }
                    transition={
                        playing
                            ? {
                                  duration: 0.9,
                                  repeat: Infinity,
                                  delay: (i % 11) * 0.07,
                                  ease: "easeInOut",
                              }
                            : { duration: 0.2 }
                    }
                />
            ))}
        </div>
    );
}

export function VoiceClient() {
    const [script, setScript] = useState(
        "Welcome to Tapotik — the AI workspace where your ideas become chat, images, voice and autonomous agents. Let's build something remarkable today.",
    );
    const [voice, setVoice] = useState(0);
    const [emotion, setEmotion] = useState("Neutral");
    const [speed, setSpeed] = useState([100]);
    const [pitch, setPitch] = useState([0]);
    const [stability, setStability] = useState([55]);

    const [generating, setGenerating] = useState(false);
    const [progress, setProgress] = useState(0);
    const [hasOutput, setHasOutput] = useState(true);
    const [playing, setPlaying] = useState(false);
    const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, []);

    function generate() {
        if (generating) return;
        if (!script.trim()) {
            toast.error("Write a script first");
            return;
        }
        setGenerating(true);
        setPlaying(false);
        setProgress(0);

        // Accumulate progress in the timer callback (not an effect) so completion
        // fires once and avoids the react-hooks/set-state-in-effect rule.
        let current = 0;
        timerRef.current = setInterval(() => {
            current = Math.min(100, current + 6);
            setProgress(current);
            if (current >= 100) {
                if (timerRef.current) {
                    clearInterval(timerRef.current);
                    timerRef.current = null;
                }
                setGenerating(false);
                setHasOutput(true);
                toast.success("Speech generated", {
                    description: `${voices[voice].name} · ${emotion} · 0:42`,
                });
            }
        }, 90);
    }

    const remaining = MAX_CHARS - script.length;

    return (
        <div className="mx-auto w-full max-w-350 space-y-6 p-4 sm:p-6 lg:p-8">
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-5">
                <div className="space-y-6 xl:col-span-3">
                    <div className="rounded-2xl border bg-card p-5 lg:p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="flex items-center gap-2 font-heading text-base font-semibold">
                                    <MicIcon className="size-4 text-primary" />
                                    Script
                                </h2>
                                <p className="mt-0.5 text-xs text-muted-foreground">
                                    tapotik-voice v2 · 40 languages
                                </p>
                            </div>
                            <span
                                className={cn(
                                    "font-mono text-xs",
                                    remaining < 40
                                        ? "text-warning"
                                        : "text-muted-foreground",
                                )}
                                aria-live="polite"
                            >
                                {script.length}/{MAX_CHARS}
                            </span>
                        </div>
                        <Textarea
                            value={script}
                            onChange={(e) =>
                                setScript(e.target.value.slice(0, MAX_CHARS))
                            }
                            className="mt-4 min-h-32 text-sm"
                            placeholder="Type or paste the text to convert to speech…"
                            aria-label="Script"
                        />

                        <div className="mt-4">
                            <Label className="text-xs text-muted-foreground">
                                Emotion preset
                            </Label>
                            <div className="mt-2 flex flex-wrap gap-2">
                                {emotions.map((e) => (
                                    <button
                                        key={e}
                                        type="button"
                                        onClick={() => setEmotion(e)}
                                        aria-pressed={emotion === e}
                                        className={cn(
                                            "cursor-pointer rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
                                            emotion === e
                                                ? "border-primary/50 bg-primary/10 text-primary"
                                                : "border-border text-muted-foreground hover:border-primary/30 hover:text-foreground",
                                        )}
                                    >
                                        {e}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mt-5 space-y-3">
                            <Button
                                variant="gradient"
                                size="lg"
                                className="w-full sm:w-auto"
                                onClick={generate}
                                disabled={generating}
                            >
                                <AudioLinesIcon className="size-4" />
                                {generating
                                    ? "Synthesizing…"
                                    : "Generate speech"}
                            </Button>
                            {generating && (
                                <div className="space-y-1.5">
                                    <Progress
                                        value={progress}
                                        className="h-1.5"
                                    />
                                    <p className="text-[11px] text-muted-foreground">
                                        Rendering with {voices[voice].name} ·{" "}
                                        {progress}%
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="rounded-2xl border bg-card p-5 lg:p-6">
                        <h3 className="font-heading text-base font-semibold">
                            Voice
                        </h3>
                        <p className="text-xs text-muted-foreground">
                            Pick a voice, or clone your own on the Scale plan
                        </p>
                        <div
                            className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
                            role="radiogroup"
                            aria-label="Voice"
                        >
                            {voices.map((v, i) => (
                                <button
                                    key={v.name}
                                    type="button"
                                    role="radio"
                                    aria-checked={voice === i}
                                    onClick={() => setVoice(i)}
                                    className={cn(
                                        "relative cursor-pointer rounded-2xl border p-4 text-left transition-all duration-200",
                                        voice === i
                                            ? "border-primary/60 bg-primary/5 ring-2 ring-primary/40"
                                            : "border-border hover:border-primary/30 hover:bg-muted/40",
                                    )}
                                >
                                    {voice === i && (
                                        <span className="absolute top-3 right-3 flex size-5 items-center justify-center rounded-full bg-primary text-white">
                                            <CheckIcon className="size-3" />
                                        </span>
                                    )}
                                    <span
                                        aria-hidden
                                        className={cn(
                                            "flex size-10 items-center justify-center rounded-full bg-linear-to-br text-sm font-bold text-white",
                                            v.gradient,
                                        )}
                                    >
                                        {v.name[0]}
                                    </span>
                                    <p className="mt-3 text-sm font-semibold">
                                        {v.name}
                                    </p>
                                    <Badge
                                        variant="secondary"
                                        className="mt-1 px-2 py-0 text-[10px]"
                                    >
                                        {v.language}
                                    </Badge>
                                    <div className="mt-2 flex flex-wrap gap-1">
                                        {v.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground"
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-6 xl:col-span-2">
                    <div className="space-y-5 rounded-2xl border bg-card p-5 lg:p-6">
                        <h3 className="font-heading text-base font-semibold">
                            Delivery
                        </h3>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <Label className="text-xs">Speed</Label>
                                <span className="font-mono text-xs text-muted-foreground">
                                    {(speed[0] / 100).toFixed(2)}×
                                </span>
                            </div>
                            <Slider
                                value={speed}
                                onValueChange={setSpeed}
                                min={50}
                                max={200}
                                step={5}
                                aria-label="Speed"
                            />
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <Label className="text-xs">Pitch</Label>
                                <span className="font-mono text-xs text-muted-foreground">
                                    {pitch[0] > 0 ? `+${pitch[0]}` : pitch[0]}{" "}
                                    st
                                </span>
                            </div>
                            <Slider
                                value={pitch}
                                onValueChange={setPitch}
                                min={-12}
                                max={12}
                                step={1}
                                aria-label="Pitch"
                            />
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <Label className="text-xs">Stability</Label>
                                <span className="font-mono text-xs text-muted-foreground">
                                    {stability[0]}%
                                </span>
                            </div>
                            <Slider
                                value={stability}
                                onValueChange={setStability}
                                min={0}
                                max={100}
                                step={1}
                                aria-label="Stability"
                            />
                            <p className="text-[11px] leading-snug text-muted-foreground">
                                Lower = more expressive variation between takes.
                                Higher = consistent, broadcast-safe delivery.
                            </p>
                        </div>
                    </div>

                    <div className="relative overflow-hidden rounded-2xl border bg-card p-5 lg:p-6">
                        <div
                            aria-hidden
                            className="pointer-events-none absolute -top-16 -right-16 size-44 rounded-full bg-primary/15 blur-3xl"
                        />
                        <div className="flex items-center justify-between">
                            <h3 className="font-heading text-base font-semibold">
                                Output
                            </h3>
                            {hasOutput && (
                                <Badge
                                    variant="success"
                                    className="px-2 py-0 text-[10px]"
                                >
                                    Ready
                                </Badge>
                            )}
                        </div>

                        {hasOutput ? (
                            <div className="mt-4 space-y-4">
                                <div className="rounded-xl border bg-background/50 p-4">
                                    <Waveform playing={playing} />
                                    <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground">
                                        <span className="font-mono">
                                            {playing ? "0:07" : "0:00"}
                                        </span>
                                        <span className="truncate px-3">
                                            {voices[voice].name} · {emotion} ·{" "}
                                            {(speed[0] / 100).toFixed(2)}×
                                        </span>
                                        <span className="font-mono">0:42</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between gap-2">
                                    <Button
                                        variant="gradient"
                                        size="icon"
                                        className="size-12 rounded-full"
                                        aria-label={playing ? "Pause" : "Play"}
                                        onClick={() => setPlaying((p) => !p)}
                                    >
                                        {playing ? (
                                            <PauseIcon className="size-5" />
                                        ) : (
                                            <PlayIcon className="size-5 translate-x-px" />
                                        )}
                                    </Button>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                toast.success(
                                                    "Downloading voiceover.mp3",
                                                )
                                            }
                                        >
                                            <DownloadIcon className="size-4" />
                                            MP3
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() =>
                                                copyWithToast(
                                                    window.location.href,
                                                    {
                                                        success:
                                                            "Share link copied",
                                                        error: "Couldn't copy share link",
                                                    },
                                                )
                                            }
                                        >
                                            <Share2Icon className="size-4" />
                                            Share
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="mt-4 flex flex-col items-center gap-2 rounded-xl border border-dashed py-10 text-center">
                                <AudioLinesIcon className="size-6 text-muted-foreground" />
                                <p className="text-xs text-muted-foreground">
                                    Generate speech to preview it here
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="rounded-2xl border bg-card">
                <div className="p-5 pb-0 lg:p-6 lg:pb-0">
                    <h3 className="font-heading text-base font-semibold">
                        Generation history
                    </h3>
                    <p className="text-xs text-muted-foreground">
                        Your last renders — stored for 30 days
                    </p>
                </div>
                <div className="mt-4 border-t">
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent">
                                <TableHead className="pl-5 lg:pl-6">
                                    Script
                                </TableHead>
                                <TableHead>Voice</TableHead>
                                <TableHead>Duration</TableHead>
                                <TableHead>Created</TableHead>
                                <TableHead className="pr-5 text-right lg:pr-6">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {history.map((h) => (
                                <TableRow key={h.script}>
                                    <TableCell className="max-w-64 pl-5 lg:pl-6">
                                        <p className="truncate text-sm">
                                            {h.script}
                                        </p>
                                    </TableCell>
                                    <TableCell>
                                        <span className="font-mono text-xs">
                                            {h.voice}
                                        </span>
                                    </TableCell>
                                    <TableCell className="font-mono text-xs text-muted-foreground">
                                        {h.duration}
                                    </TableCell>
                                    <TableCell className="text-xs text-muted-foreground">
                                        {h.created}
                                    </TableCell>
                                    <TableCell className="pr-5 text-right lg:pr-6">
                                        <div className="flex justify-end gap-1">
                                            <Button
                                                variant="ghost"
                                                size="icon-sm"
                                                aria-label={`Play ${h.script}`}
                                                onClick={() => {
                                                    setHasOutput(true);
                                                    setPlaying(true);
                                                    toast.info(
                                                        `Playing “${h.voice}” render`,
                                                    );
                                                }}
                                            >
                                                <PlayIcon className="size-3.5" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon-sm"
                                                aria-label={`Download ${h.script}`}
                                                onClick={() =>
                                                    toast.success(
                                                        "Download started",
                                                    )
                                                }
                                            >
                                                <DownloadIcon className="size-3.5" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}
