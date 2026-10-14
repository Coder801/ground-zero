"use client";

import { useEffect, useRef } from "react";
import {
    motion,
    useInView,
    useMotionValue,
    useSpring,
    useTransform,
} from "framer-motion";

import { useAppReady } from "@/components/app-ready";

export function AnimatedCounter({
    value,
    suffix = "",
    prefix = "",
    decimals = 0,
    className,
}: {
    value: number;
    suffix?: string;
    prefix?: string;
    decimals?: number;
    className?: string;
}) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: "-60px" });
    const ready = useAppReady();
    const motionValue = useMotionValue(0);
    const spring = useSpring(motionValue, { damping: 32, stiffness: 80 });
    const display = useTransform(
        spring,
        (v) => `${prefix}${v.toFixed(decimals)}${suffix}`,
    );

    useEffect(() => {
        if (inView && ready) motionValue.set(value);
    }, [inView, ready, value, motionValue]);

    return (
        <motion.span ref={ref} className={className}>
            {display}
        </motion.span>
    );
}
