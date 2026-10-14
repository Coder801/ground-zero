"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { StarIcon } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { testimonials } from "@/lib/data";

const ROTATE_MS = 6000;

export function AuthShowcase() {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const id = setInterval(
            () => setIndex((i) => (i + 1) % testimonials.length),
            ROTATE_MS,
        );
        return () => clearInterval(id);
    }, []);

    const t = testimonials[index];

    return (
        <div className="w-full max-w-md">
            <div className="relative overflow-hidden rounded-3xl border p-7 shadow-2xl glass-strong">
                <div
                    aria-hidden
                    className="pointer-events-none absolute -top-16 -right-16 size-40 rounded-full bg-primary/20 blur-3xl"
                />
                <div className="flex items-center gap-1" aria-hidden>
                    {Array.from({ length: 5 }).map((_, i) => (
                        <StarIcon
                            key={i}
                            className="size-3.5 fill-warning text-warning"
                        />
                    ))}
                </div>

                <div className="relative mt-4 min-h-28">
                    <AnimatePresence mode="wait">
                        <motion.blockquote
                            key={t.name}
                            initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
                            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                            exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
                            transition={{
                                duration: 0.45,
                                ease: [0.21, 0.47, 0.32, 0.98],
                            }}
                            className="text-[15px] leading-relaxed text-foreground/90"
                        >
                            &ldquo;{t.quote}&rdquo;
                        </motion.blockquote>
                    </AnimatePresence>
                </div>

                <div className="mt-6 flex items-center justify-between gap-4">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={t.name}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -8 }}
                            transition={{ duration: 0.35 }}
                            className="flex items-center gap-3"
                        >
                            <Avatar className="size-10 ring-2 ring-primary/30">
                                <AvatarFallback>{t.initials}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="text-sm font-semibold">
                                    {t.name}
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    {t.role}, {t.company}
                                </p>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    <div
                        className="flex items-center gap-1.5"
                        aria-label="Testimonials"
                    >
                        {testimonials.map((item, i) => (
                            <button
                                key={item.name}
                                type="button"
                                aria-label={`Go to slide ${i + 1}`}
                                aria-current={i === index ? "true" : undefined}
                                onClick={() => setIndex(i)}
                                className={`h-1.5 cursor-pointer rounded-full transition-all duration-300 ${
                                    i === index
                                        ? "w-6 bg-primary"
                                        : "w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/60"
                                }`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
