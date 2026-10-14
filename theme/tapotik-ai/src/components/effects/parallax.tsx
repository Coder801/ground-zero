"use client";

import { useRef } from "react";
import {
    motion,
    useReducedMotion,
    useScroll,
    useSpring,
    useTransform,
} from "framer-motion";

import { cn } from "@/lib/utils";

// Transform-only, spring-eased scroll parallax; disabled under reduced motion.
// speed > 0 drifts up on scroll-down (foreground); negative drifts down. ~40 = strong.
export function Parallax({
    children,
    className,
    speed = 40,
    axis = "y",
}: {
    children: React.ReactNode;
    className?: string;
    speed?: number;
    axis?: "x" | "y";
}) {
    const ref = useRef<HTMLDivElement>(null);
    const reduced = useReducedMotion();

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });

    const raw = useTransform(scrollYProgress, [0, 1], [speed, -speed]);
    const value = useSpring(raw, {
        stiffness: 120,
        damping: 30,
        mass: 0.3,
    });

    return (
        <div ref={ref} className={cn("relative", className)}>
            <motion.div style={reduced ? undefined : { [axis]: value }}>
                {children}
            </motion.div>
        </div>
    );
}
