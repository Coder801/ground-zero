"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function Typewriter({
    words,
    className,
    typingSpeed = 70,
    deletingSpeed = 40,
    pause = 1800,
}: {
    words: string[];
    className?: string;
    typingSpeed?: number;
    deletingSpeed?: number;
    pause?: number;
}) {
    const [wordIndex, setWordIndex] = useState(0);
    // Seed the first word so the H1 renders complete at first paint (SSR) —
    // it's the LCP element; an empty start would delay LCP until JS types in.
    const [text, setText] = useState(words[0] ?? "");
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const word = words[wordIndex % words.length];
        let timeout: ReturnType<typeof setTimeout>;

        if (!deleting && text === word) {
            timeout = setTimeout(() => setDeleting(true), pause);
        } else if (deleting && text === "") {
            timeout = setTimeout(() => {
                setDeleting(false);
                setWordIndex((i) => (i + 1) % words.length);
            }, typingSpeed);
        } else {
            timeout = setTimeout(
                () =>
                    setText(
                        deleting
                            ? word.slice(0, text.length - 1)
                            : word.slice(0, text.length + 1),
                    ),
                deleting ? deletingSpeed : typingSpeed,
            );
        }
        return () => clearTimeout(timeout);
    }, [text, deleting, wordIndex, words, typingSpeed, deletingSpeed, pause]);

    return (
        <span className={cn("inline-flex items-baseline", className)}>
            <span>{text}</span>
            <span
                aria-hidden
                className="ml-0.5 inline-block h-[1em] w-0.75 translate-y-[0.1em] animate-caret rounded-full bg-accent"
            />
        </span>
    );
}
