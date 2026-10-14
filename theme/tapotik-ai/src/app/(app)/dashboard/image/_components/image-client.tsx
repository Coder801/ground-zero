"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    DicesIcon,
    DownloadIcon,
    HeartIcon,
    HistoryIcon,
    Maximize2Icon,
    SparklesIcon,
    WandSparklesIcon,
} from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type Pattern =
    | "orbits"
    | "beams"
    | "blob"
    | "mesh"
    | "crystal"
    | "halo"
    | "dunes"
    | "spark";

type Tile = {
    id: number;
    prompt: string;
    gradient: string;
    pattern: Pattern;
    seed: string;
};

const paletteCombos: { gradient: string; pattern: Pattern }[] = [
    {
        gradient: "from-primary via-secondary to-[#0A0F2E]",
        pattern: "orbits",
    },
    { gradient: "from-accent via-primary to-[#050816]", pattern: "beams" },
    { gradient: "from-pink via-secondary to-[#1B0B2E]", pattern: "blob" },
    { gradient: "from-warning via-pink to-[#2E0B1E]", pattern: "mesh" },
    {
        gradient: "from-secondary via-primary to-[#02131F]",
        pattern: "crystal",
    },
    { gradient: "from-primary via-accent to-[#041A18]", pattern: "halo" },
    { gradient: "from-pink via-warning to-[#2E1604]", pattern: "dunes" },
    { gradient: "from-accent via-secondary to-[#10052E]", pattern: "spark" },
];

const initialTiles: Tile[] = [
    {
        prompt: "Chrome sphere orbiting a violet planet, cinematic rim light",
        seed: "482916",
    },
    {
        prompt: "Aurora light beams cutting through obsidian glass towers",
        seed: "771204",
    },
    {
        prompt: "Liquid neon blob morphing over silk, macro photography",
        seed: "129057",
    },
    {
        prompt: "Perspective wireframe canyon at golden hour, retro-future",
        seed: "903341",
    },
    {
        prompt: "Amethyst crystal shards levitating in zero gravity",
        seed: "556780",
    },
    {
        prompt: "Teal halo portal above a mirrored ocean, long exposure",
        seed: "204488",
    },
    {
        prompt: "Dunes of pink sand under twin suns, minimal composition",
        seed: "667129",
    },
    {
        prompt: "Starburst of cyan fiber optics, depth of field, 8k",
        seed: "830254",
    },
].map((t, i) => ({ id: i + 1, ...t, ...paletteCombos[i] }));

function TilePattern({ pattern }: { pattern: Pattern }) {
    switch (pattern) {
        case "orbits":
            return (
                <svg
                    className="absolute inset-0 h-full w-full"
                    viewBox="0 0 200 200"
                    aria-hidden
                >
                    {[70, 52, 34].map((r, i) => (
                        <circle
                            key={r}
                            cx="100"
                            cy="100"
                            r={r}
                            fill="none"
                            stroke="white"
                            strokeOpacity={0.22 + i * 0.12}
                            strokeWidth="1.5"
                        />
                    ))}
                    <circle
                        cx="100"
                        cy="100"
                        r="12"
                        fill="white"
                        fillOpacity="0.7"
                    />
                    <circle
                        cx="152"
                        cy="100"
                        r="5"
                        fill="white"
                        fillOpacity="0.9"
                    />
                </svg>
            );
        case "beams":
            return (
                <svg
                    className="absolute inset-0 h-full w-full"
                    viewBox="0 0 200 200"
                    aria-hidden
                >
                    {[0, 1, 2, 3, 4].map((i) => (
                        <rect
                            key={i}
                            x={18 + i * 38}
                            y="-30"
                            width="10"
                            height="260"
                            transform={`rotate(${18 + i * 2} 100 100)`}
                            fill="white"
                            fillOpacity={0.28 - i * 0.045}
                        />
                    ))}
                </svg>
            );
        case "blob":
            return (
                <>
                    <div className="absolute top-[26%] left-[22%] size-24 rounded-[60%_40%_55%_45%/55%_60%_40%_45%] bg-white/30 blur-md" />
                    <div className="absolute right-[20%] bottom-[24%] size-16 rounded-[45%_55%_40%_60%/60%_45%_55%_40%] bg-white/45 blur-sm" />
                    <div className="absolute top-[52%] left-[46%] size-6 rounded-full bg-white/80 blur-[2px]" />
                </>
            );
        case "mesh":
            return (
                <svg
                    className="absolute inset-0 h-full w-full opacity-70"
                    viewBox="0 0 200 200"
                    aria-hidden
                >
                    {[0, 1, 2, 3, 4, 5].map((i) => (
                        <line
                            key={`h${i}`}
                            x1="0"
                            y1={100 + i * 16}
                            x2="200"
                            y2={92 + i * 22}
                            stroke="white"
                            strokeOpacity={0.4 - i * 0.05}
                            strokeWidth="1.4"
                        />
                    ))}
                    {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                        <line
                            key={`v${i}`}
                            x1={i * 33}
                            y1="96"
                            x2={100 + (i - 3) * 60}
                            y2="200"
                            stroke="white"
                            strokeOpacity="0.25"
                            strokeWidth="1.2"
                        />
                    ))}
                </svg>
            );
        case "crystal":
            return (
                <svg
                    className="absolute inset-0 h-full w-full"
                    viewBox="0 0 200 200"
                    aria-hidden
                >
                    <polygon
                        points="100,36 130,96 100,150 70,96"
                        fill="white"
                        fillOpacity="0.3"
                    />
                    <polygon
                        points="100,36 130,96 100,110 70,96"
                        fill="white"
                        fillOpacity="0.45"
                    />
                    <polygon
                        points="52,110 70,140 52,168 36,140"
                        fill="white"
                        fillOpacity="0.28"
                    />
                    <polygon
                        points="150,86 164,110 150,132 138,110"
                        fill="white"
                        fillOpacity="0.32"
                    />
                </svg>
            );
        case "halo":
            return (
                <>
                    <div className="absolute top-[42%] left-1/2 size-28 -translate-x-1/2 -translate-y-1/2 rounded-full border-5 border-white/50 blur-[1px]" />
                    <div className="absolute top-[42%] left-1/2 size-36 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/30" />
                    <div className="absolute inset-x-6 bottom-8 h-px bg-white/60 blur-[1px]" />
                    <div className="absolute inset-x-12 bottom-11 h-px bg-white/30" />
                </>
            );
        case "dunes":
            return (
                <svg
                    className="absolute inset-0 h-full w-full"
                    viewBox="0 0 200 200"
                    aria-hidden
                >
                    {[0, 1, 2, 3].map((i) => (
                        <path
                            key={i}
                            d={`M 0 ${112 + i * 24} C 50 ${86 + i * 24}, 90 ${138 + i * 20}, 200 ${104 + i * 26} L 200 200 L 0 200 Z`}
                            fill="white"
                            fillOpacity={0.16 - i * 0.03}
                        />
                    ))}
                </svg>
            );
        case "spark":
            return (
                <svg
                    className="absolute inset-0 h-full w-full"
                    viewBox="0 0 200 200"
                    aria-hidden
                >
                    {Array.from({ length: 12 }).map((_, i) => {
                        const angle = (i / 12) * Math.PI * 2;
                        const len = 34 + (i % 3) * 18;
                        return (
                            <line
                                key={i}
                                x1={100 + Math.cos(angle) * 10}
                                y1={100 + Math.sin(angle) * 10}
                                x2={100 + Math.cos(angle) * len}
                                y2={100 + Math.sin(angle) * len}
                                stroke="white"
                                strokeOpacity={0.55 - (i % 3) * 0.12}
                                strokeWidth="1.6"
                                strokeLinecap="round"
                            />
                        );
                    })}
                    <circle
                        cx="100"
                        cy="100"
                        r="7"
                        fill="white"
                        fillOpacity="0.85"
                    />
                </svg>
            );
    }
}

function ArtTile({
    tile,
    liked,
    onLike,
    onExpand,
    index,
}: {
    tile: Tile;
    liked: boolean;
    onLike: () => void;
    onExpand: () => void;
    index: number;
}) {
    return (
        <motion.figure
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.45,
                delay: index * 0.05,
                ease: [0.21, 0.47, 0.32, 0.98],
            }}
            className="group relative aspect-square overflow-hidden rounded-2xl border"
        >
            <div
                className={cn(
                    "absolute inset-0 bg-linear-to-br",
                    tile.gradient,
                )}
            />
            <TilePattern pattern={tile.pattern} />
            <div
                aria-hidden
                className="absolute inset-0 bg-[radial-gradient(circle_at_28%_18%,rgba(255,255,255,0.2),transparent_52%)]"
            />

            <div className="absolute inset-0 flex flex-col justify-between bg-black/45 p-3 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-focus-within:opacity-100 group-hover:opacity-100">
                <div className="flex items-center justify-end gap-1.5">
                    <button
                        type="button"
                        aria-label="Download image"
                        onClick={() =>
                            toast.success("Download started", {
                                description: tile.prompt,
                            })
                        }
                        className="flex size-8 cursor-pointer items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition-colors hover:bg-white/30"
                    >
                        <DownloadIcon className="size-4" />
                    </button>
                    <button
                        type="button"
                        aria-label={
                            liked ? "Remove from favorites" : "Add to favorites"
                        }
                        aria-pressed={liked}
                        onClick={onLike}
                        className={cn(
                            "flex size-8 cursor-pointer items-center justify-center rounded-full backdrop-blur transition-colors",
                            liked
                                ? "bg-pink/80 text-white"
                                : "bg-white/15 text-white hover:bg-white/30",
                        )}
                    >
                        <HeartIcon
                            className={cn("size-4", liked && "fill-current")}
                        />
                    </button>
                    <button
                        type="button"
                        aria-label="Expand image"
                        onClick={onExpand}
                        className="flex size-8 cursor-pointer items-center justify-center rounded-full bg-white/15 text-white backdrop-blur transition-colors hover:bg-white/30"
                    >
                        <Maximize2Icon className="size-4" />
                    </button>
                </div>
                <figcaption className="line-clamp-2 text-[11px] leading-snug text-white/90">
                    {tile.prompt}
                </figcaption>
            </div>
        </motion.figure>
    );
}

function ShimmerTile() {
    return (
        <div className="relative aspect-square overflow-hidden rounded-2xl border bg-muted">
            <div
                aria-hidden
                className="absolute inset-0 animate-shimmer bg-[linear-gradient(110deg,transparent_30%,rgba(255,255,255,0.09)_50%,transparent_70%)] bg-[length:200%_100%]"
            />
            <div className="absolute bottom-3 left-3 flex items-center gap-2 text-xs text-muted-foreground">
                <SparklesIcon className="size-3.5 animate-pulse text-primary" />
                Rendering…
            </div>
        </div>
    );
}

const aspectRatios = [
    { value: "1:1", w: "w-5", h: "h-5" },
    { value: "3:2", w: "w-6", h: "h-4" },
    { value: "16:9", w: "w-7", h: "h-4" },
    { value: "9:16", w: "w-3.5", h: "h-6" },
];

export function ImageClient() {
    const [prompt, setPrompt] = useState(
        "Holographic glass interface floating over a midnight city, volumetric light, ultra detailed",
    );
    const [negative, setNegative] = useState("text, watermark, low contrast");
    const [style, setStyle] = useState("3d-glass");
    const [ratio, setRatio] = useState("1:1");
    const [steps, setSteps] = useState([30]);
    const [guidance, setGuidance] = useState([7.5]);
    const [seed, setSeed] = useState("482916");

    const [tiles, setTiles] = useState<Tile[]>(initialTiles);
    const [liked, setLiked] = useState<number[]>([2]);
    const [generating, setGenerating] = useState(false);
    const [batch, setBatch] = useState(0);
    const [expanded, setExpanded] = useState<Tile | null>(null);

    function rollSeed() {
        setSeed(String(Math.floor(Math.random() * 900000) + 100000));
    }

    function generate() {
        if (generating) return;
        if (!prompt.trim()) {
            toast.error("Describe what you want to see first");
            return;
        }
        setGenerating(true);

        const startId = Date.now();
        const newTiles: Tile[] = Array.from({ length: 4 }, (_, i) => {
            const combo = paletteCombos[(batch * 4 + i) % paletteCombos.length];
            return {
                id: startId + i,
                prompt: prompt.trim(),
                gradient: combo.gradient,
                pattern: combo.pattern,
                seed,
            };
        });

        setTimeout(() => {
            setTiles((prev) => [...newTiles, ...prev].slice(0, 12));
            setBatch((b) => b + 1);
            setGenerating(false);
            toast.success("4 images generated", {
                description: `Seed ${seed} · ${steps[0]} steps · ${ratio}`,
            });
        }, 1200);
    }

    return (
        <div className="mx-auto w-full max-w-350 p-4 sm:p-6 lg:p-8">
            <div className="flex flex-col gap-6 xl:flex-row">
                <aside className="w-full shrink-0 xl:w-80">
                    <div className="space-y-5 rounded-2xl border bg-card p-5">
                        <div>
                            <h2 className="flex items-center gap-2 font-heading text-base font-semibold">
                                <WandSparklesIcon className="size-4 text-primary" />
                                Image studio
                            </h2>
                            <p className="mt-0.5 text-xs text-muted-foreground">
                                tapotik-image v3 · photoreal engine
                            </p>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="img-prompt" className="text-xs">
                                Prompt
                            </Label>
                            <Textarea
                                id="img-prompt"
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                className="min-h-24 text-sm"
                                placeholder="Describe the image…"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="img-negative" className="text-xs">
                                Negative prompt
                            </Label>
                            <Textarea
                                id="img-negative"
                                value={negative}
                                onChange={(e) => setNegative(e.target.value)}
                                className="min-h-14 text-sm"
                                placeholder="What to avoid…"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label className="text-xs">Style</Label>
                            <Select value={style} onValueChange={setStyle}>
                                <SelectTrigger
                                    className="w-full"
                                    aria-label="Style"
                                >
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="photoreal">
                                        Photoreal
                                    </SelectItem>
                                    <SelectItem value="3d-glass">
                                        3D Glass
                                    </SelectItem>
                                    <SelectItem value="anime">Anime</SelectItem>
                                    <SelectItem value="cinematic">
                                        Cinematic
                                    </SelectItem>
                                    <SelectItem value="vector">
                                        Vector
                                    </SelectItem>
                                    <SelectItem value="isometric">
                                        Isometric
                                    </SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label className="text-xs">Aspect ratio</Label>
                            <div
                                className="grid grid-cols-4 gap-2"
                                role="radiogroup"
                                aria-label="Aspect ratio"
                            >
                                {aspectRatios.map((ar) => (
                                    <button
                                        key={ar.value}
                                        type="button"
                                        role="radio"
                                        aria-checked={ratio === ar.value}
                                        onClick={() => setRatio(ar.value)}
                                        className={cn(
                                            "flex h-16 cursor-pointer flex-col items-center justify-center gap-1.5 rounded-xl border text-[11px] font-medium transition-colors",
                                            ratio === ar.value
                                                ? "border-primary/60 bg-primary/10 text-primary"
                                                : "border-border text-muted-foreground hover:border-primary/30 hover:text-foreground",
                                        )}
                                    >
                                        <span
                                            aria-hidden
                                            className={cn(
                                                "rounded-[4px] border-2 border-current",
                                                ar.w,
                                                ar.h,
                                            )}
                                        />
                                        {ar.value}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <Label className="text-xs">Steps</Label>
                                <span className="font-mono text-xs text-muted-foreground">
                                    {steps[0]}
                                </span>
                            </div>
                            <Slider
                                value={steps}
                                onValueChange={setSteps}
                                min={10}
                                max={60}
                                step={1}
                                aria-label="Steps"
                            />
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <Label className="text-xs">Guidance</Label>
                                <span className="font-mono text-xs text-muted-foreground">
                                    {guidance[0].toFixed(1)}
                                </span>
                            </div>
                            <Slider
                                value={guidance}
                                onValueChange={setGuidance}
                                min={1}
                                max={20}
                                step={0.5}
                                aria-label="Guidance scale"
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="img-seed" className="text-xs">
                                Seed
                            </Label>
                            <div className="flex gap-2">
                                <Input
                                    id="img-seed"
                                    value={seed}
                                    onChange={(e) =>
                                        setSeed(
                                            e.target.value.replace(/\D/g, ""),
                                        )
                                    }
                                    className="font-mono text-sm"
                                    inputMode="numeric"
                                />
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="icon"
                                    aria-label="Randomize seed"
                                    onClick={rollSeed}
                                >
                                    <DicesIcon className="size-4" />
                                </Button>
                            </div>
                        </div>

                        <Button
                            variant="gradient"
                            size="lg"
                            className="w-full"
                            onClick={generate}
                            disabled={generating}
                        >
                            <SparklesIcon
                                className={cn(
                                    "size-4",
                                    generating && "animate-spin",
                                )}
                            />
                            {generating ? "Generating…" : "Generate 4 images"}
                        </Button>
                        <p className="text-center text-[10px] text-muted-foreground">
                            ~12 credits per batch · outputs are yours to use
                            commercially
                        </p>
                    </div>
                </aside>

                <section className="min-w-0 flex-1 space-y-6">
                    <div className="rounded-2xl border bg-card p-5">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="font-heading text-base font-semibold">
                                    Results
                                </h3>
                                <p className="text-xs text-muted-foreground">
                                    {tiles.length} images this session
                                </p>
                            </div>
                            <Badge
                                variant="glow"
                                className="font-mono text-[10px]"
                            >
                                {style} · {ratio}
                            </Badge>
                        </div>
                        <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-3 2xl:grid-cols-4">
                            {generating &&
                                Array.from({ length: 4 }).map((_, i) => (
                                    <ShimmerTile key={i} />
                                ))}
                            {tiles.map((tile, i) => (
                                <ArtTile
                                    key={tile.id}
                                    tile={tile}
                                    index={i}
                                    liked={liked.includes(tile.id)}
                                    onLike={() =>
                                        setLiked((prev) =>
                                            prev.includes(tile.id)
                                                ? prev.filter(
                                                      (id) => id !== tile.id,
                                                  )
                                                : [...prev, tile.id],
                                        )
                                    }
                                    onExpand={() => setExpanded(tile)}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="rounded-2xl border bg-card p-5">
                        <h3 className="flex items-center gap-2 font-heading text-sm font-semibold">
                            <HistoryIcon className="size-4 text-muted-foreground" />
                            Earlier today
                        </h3>
                        <div className="mt-3 no-scrollbar flex gap-3 overflow-x-auto pb-1">
                            {[...initialTiles].reverse().map((tile) => (
                                <button
                                    key={`h-${tile.id}`}
                                    type="button"
                                    onClick={() => setExpanded(tile)}
                                    aria-label={`Open ${tile.prompt}`}
                                    className="relative size-16 shrink-0 cursor-pointer overflow-hidden rounded-xl border transition-transform hover:-translate-y-0.5"
                                >
                                    <div
                                        className={cn(
                                            "absolute inset-0 bg-linear-to-br",
                                            tile.gradient,
                                        )}
                                    />
                                    <TilePattern pattern={tile.pattern} />
                                </button>
                            ))}
                        </div>
                    </div>
                </section>
            </div>

            <Dialog
                open={expanded !== null}
                onOpenChange={(o) => !o && setExpanded(null)}
            >
                <DialogContent className="max-w-xl">
                    {expanded && (
                        <>
                            <DialogTitle className="pr-8 text-base">
                                {expanded.prompt}
                            </DialogTitle>
                            <DialogDescription className="font-mono text-xs">
                                seed {expanded.seed} · {style} · {ratio} ·{" "}
                                {steps[0]} steps
                            </DialogDescription>
                            <div className="relative aspect-square w-full overflow-hidden rounded-2xl border">
                                <div
                                    className={cn(
                                        "absolute inset-0 bg-linear-to-br",
                                        expanded.gradient,
                                    )}
                                />
                                <TilePattern pattern={expanded.pattern} />
                                <div
                                    aria-hidden
                                    className="absolute inset-0 bg-[radial-gradient(circle_at_28%_18%,rgba(255,255,255,0.2),transparent_52%)]"
                                />
                            </div>
                            <div className="flex justify-end gap-2">
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() =>
                                        toast.success("Download started", {
                                            description: expanded.prompt,
                                        })
                                    }
                                >
                                    <DownloadIcon className="size-4" />
                                    Download 4K
                                </Button>
                                <Button
                                    variant="gradient"
                                    size="sm"
                                    onClick={() => {
                                        setPrompt(expanded.prompt);
                                        setExpanded(null);
                                        toast.info(
                                            "Prompt loaded into the editor",
                                        );
                                    }}
                                >
                                    <WandSparklesIcon className="size-4" />
                                    Remix
                                </Button>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
