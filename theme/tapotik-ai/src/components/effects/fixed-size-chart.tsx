"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

// Measures its box ONCE on mount (no ResizeObserver, unlike Recharts
// ResponsiveContainer) to avoid resize-time SVG re-render freezes.
export function FixedSizeChart({
    className,
    children,
}: {
    className?: string;
    children: (size: { width: number; height: number }) => React.ReactNode;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const [size, setSize] = useState<{ width: number; height: number } | null>(
        null,
    );

    const measure = useCallback(() => {
        const el = ref.current;
        if (!el) return;
        const width = el.clientWidth;
        const height = el.clientHeight;
        if (width > 0 && height > 0) setSize({ width, height });
    }, []);

    useEffect(() => {
        const raf = requestAnimationFrame(measure);
        return () => cancelAnimationFrame(raf);
    }, [measure]);

    return (
        <div ref={ref} className={cn("h-full w-full", className)}>
            {size ? children(size) : null}
        </div>
    );
}
