"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

/** Lenis smooth scrolling — mount once in the marketing layout. */
export function SmoothScroll() {
    const lenisRef = useRef<Lenis | null>(null);
    const isFirstRender = useRef(true);
    const pathname = usePathname();

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
            return;

        // Skip Lenis on touch/small screens: its rAF loop + touch virtualization
        // fights native scroll and the URL-bar resize, causing jank/hangs on phones.
        if (
            window.matchMedia("(pointer: coarse)").matches ||
            window.matchMedia("(max-width: 1023px)").matches
        )
            return;

        const lenis = new Lenis({
            lerp: 0.12,
            wheelMultiplier: 0.9,
            // Don't hijack wheel/touch inside floating overlays (menus, dialogs,
            // palettes, dropdowns) — let them scroll natively.
            prevent: (node) =>
                !!(node as Element | null)?.closest?.(
                    '[role="dialog"],[data-radix-popper-content-wrapper],[data-lenis-prevent]',
                ),
        });

        // Radix (react-remove-scroll) sets data-scroll-locked on <body> for open
        // overlays; pause Lenis so it can't scroll the page behind them.
        const observer = new MutationObserver(() => {
            if (document.body.hasAttribute("data-scroll-locked")) {
                lenis.stop();
            } else {
                lenis.start();
            }
        });
        observer.observe(document.body, {
            attributes: true,
            attributeFilter: ["data-scroll-locked"],
        });
        lenisRef.current = lenis;

        let frame: number;
        function raf(time: number) {
            lenis.raf(time);
            frame = requestAnimationFrame(raf);
        }
        frame = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(frame);
            observer.disconnect();
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []);

    // Scroll to top on route change: Lenis keeps its own virtual position, so
    // Next's default scroll restoration gets overridden without this.
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        // Anchor navigation (e.g. /#features): scroll to the target instead of
        // the top; the offset clears the fixed navbar.
        const hash = window.location.hash;
        if (hash) {
            lenisRef.current?.scrollTo(hash, { offset: -80 });
            return;
        }
        if (lenisRef.current) {
            lenisRef.current.scrollTo(0, { immediate: true });
        } else {
            window.scrollTo({ top: 0, behavior: "instant" });
        }
    }, [pathname]);

    return null;
}
