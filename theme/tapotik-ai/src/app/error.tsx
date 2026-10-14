"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RefreshCwIcon, HomeIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { AuroraBackground } from "@/components/effects/aurora-background";

export default function Error({
    error,
    unstable_retry,
}: {
    error: Error & { digest?: string };
    unstable_retry: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
            <AuroraBackground intensity="subtle" />
            <div className="relative flex flex-col items-center gap-5">
                <p className="text-gradient font-heading text-7xl font-bold">
                    Oops
                </p>
                <h1 className="font-heading text-2xl font-semibold">
                    Something went wrong
                </h1>
                <p className="max-w-md text-sm text-muted-foreground">
                    An unexpected error occurred while rendering this page. Try
                    again, or head back home — the error has been logged.
                </p>
                {error.digest ? (
                    <p className="font-mono text-xs text-muted-foreground">
                        Error ID: {error.digest}
                    </p>
                ) : null}
                <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
                    <Button variant="gradient" onClick={() => unstable_retry()}>
                        <RefreshCwIcon />
                        Try again
                    </Button>
                    <Button variant="outline" asChild>
                        <Link href="/">
                            <HomeIcon />
                            Back to home
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    );
}
