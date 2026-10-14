"use client";

import { useEffect } from "react";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        // global-error must include its own html and body tags — it replaces
        // the root layout, so it has no access to app providers or fonts.
        <html lang="en">
            <body className="flex min-h-screen flex-col items-center justify-center gap-5 px-6 text-center">
                <h1 className="text-2xl font-semibold">Something went wrong</h1>
                <p className="max-w-md text-sm text-gray-500">
                    An unexpected error occurred. Try again, or reload the page
                    — the error has been logged.
                </p>
                {error.digest ? (
                    <p className="font-mono text-xs text-gray-500">
                        Error ID: {error.digest}
                    </p>
                ) : null}
                <button
                    type="button"
                    onClick={() => reset()}
                    className="mt-2 rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white"
                >
                    Try again
                </button>
            </body>
        </html>
    );
}
