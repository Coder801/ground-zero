"use client";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { GitHubIcon } from "@/components/social-icons";
import { cn } from "@/lib/utils";

/** Multicolor Google "G" — lucide has no brand icons, so we draw our own. */
export function GoogleIcon({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            aria-hidden
            className={cn("size-4.5", className)}
        >
            <path
                fill="#4285F4"
                d="M23.52 12.273c0-.851-.076-1.67-.218-2.455H12v4.642h6.458a5.52 5.52 0 0 1-2.394 3.622v3.011h3.878c2.269-2.089 3.578-5.165 3.578-8.82Z"
            />
            <path
                fill="#34A853"
                d="M12 24c3.24 0 5.956-1.075 7.942-2.907l-3.878-3.011c-1.075.72-2.45 1.145-4.064 1.145-3.125 0-5.771-2.111-6.715-4.948H1.276v3.11A11.995 11.995 0 0 0 12 24Z"
            />
            <path
                fill="#FBBC05"
                d="M5.285 14.279A7.213 7.213 0 0 1 4.909 12c0-.79.136-1.56.376-2.279V6.611H1.276A11.995 11.995 0 0 0 0 12c0 1.936.464 3.769 1.276 5.389l4.01-3.11Z"
            />
            <path
                fill="#EA4335"
                d="M12 4.773c1.762 0 3.344.605 4.587 1.794l3.442-3.442C17.951 1.19 15.235 0 12 0 7.31 0 3.253 2.69 1.276 6.611l4.009 3.11C6.229 6.884 8.875 4.773 12 4.773Z"
            />
        </svg>
    );
}

export function SocialAuthButtons() {
    return (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Button
                type="button"
                variant="glass"
                className="w-full"
                onClick={() =>
                    toast.info("Google sign-in is wired up in the full app.")
                }
            >
                <GoogleIcon />
                Google
            </Button>
            <Button
                type="button"
                variant="glass"
                className="w-full"
                onClick={() =>
                    toast.info("GitHub sign-in is wired up in the full app.")
                }
            >
                <GitHubIcon className="size-4.5" />
                GitHub
            </Button>
        </div>
    );
}

export function AuthDivider({
    label = "or continue with email",
}: {
    label?: string;
}) {
    return (
        <div className="flex items-center gap-4">
            <span className="h-px flex-1 bg-border" aria-hidden />
            <span className="text-xs text-muted-foreground">{label}</span>
            <span className="h-px flex-1 bg-border" aria-hidden />
        </div>
    );
}
