"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export function TiltCard({
    children,
    className,
    maxTilt = 8,
}: {
    children: React.ReactNode;
    className?: string;
    maxTilt?: number;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotateX = useSpring(
        useTransform(y, [-0.5, 0.5], [maxTilt, -maxTilt]),
        {
            stiffness: 220,
            damping: 20,
        },
    );
    const rotateY = useSpring(
        useTransform(x, [-0.5, 0.5], [-maxTilt, maxTilt]),
        {
            stiffness: 220,
            damping: 20,
        },
    );

    function onMouseMove(e: React.MouseEvent) {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    }

    function onMouseLeave() {
        x.set(0);
        y.set(0);
    }

    return (
        <motion.div
            ref={ref}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className={cn("[perspective:1000px]", className)}
        >
            {children}
        </motion.div>
    );
}
