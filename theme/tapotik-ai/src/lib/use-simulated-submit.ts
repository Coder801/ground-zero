"use client";

import { useState } from "react";

/**
 * Fake "pending → delay → done" round-trip for the template's mock forms.
 * The `setTimeout` is the single seam to replace when wiring a real backend.
 */
export function useSimulatedSubmit(delayMs = 800) {
    const [submitting, setSubmitting] = useState(false);

    function run(onComplete: () => void) {
        if (submitting) return;
        setSubmitting(true);
        setTimeout(() => {
            setSubmitting(false);
            onComplete();
        }, delayMs);
    }

    return { submitting, run };
}
