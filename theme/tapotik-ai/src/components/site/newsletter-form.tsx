"use client";

import { useId } from "react";
import { ArrowRightIcon, BellIcon, MailIcon } from "lucide-react";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { SubmitButton } from "@/components/ui/submit-button";
import { useSimulatedSubmit } from "@/lib/use-simulated-submit";

// Client component so submit is handled in-page (no native full-page reload).
// No backend: simulates the request via useSimulatedSubmit — swap that to ship.
export function NewsletterForm({
    variant = "compact",
    successDescription = "Product updates will land at {email}. Unsubscribe anytime.",
}: {
    variant?: "compact" | "inline" | "centered";
    /** Success-toast body. `{email}` is replaced with the submitted address. */
    successDescription?: string;
}) {
    const id = useId();
    const { submitting, run } = useSimulatedSubmit();

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        const email = String(new FormData(form).get("email") ?? "");
        run(() => {
            toast.success("You're subscribed!", {
                description: successDescription.replace("{email}", email),
            });
            form.reset();
        });
    }

    if (variant === "inline") {
        return (
            <form
                onSubmit={handleSubmit}
                aria-label="Subscribe to the newsletter"
                className="flex w-full flex-col gap-3 sm:flex-row lg:justify-end"
            >
                <div className="relative w-full sm:max-w-sm">
                    <MailIcon
                        aria-hidden
                        className="absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground"
                    />
                    <Input
                        type="email"
                        name="email"
                        required
                        placeholder="you@company.com"
                        aria-label="Email address"
                        className="h-12 rounded-full pl-10"
                    />
                </div>
                <SubmitButton
                    pending={submitting}
                    pendingLabel="Subscribing…"
                    variant="gradient"
                    size="lg"
                    className="shrink-0"
                >
                    Subscribe
                    <ArrowRightIcon aria-hidden />
                </SubmitButton>
            </form>
        );
    }

    if (variant === "centered") {
        return (
            <form
                onSubmit={handleSubmit}
                className="mx-auto flex w-full max-w-md flex-col gap-3 sm:flex-row"
            >
                <label htmlFor={id} className="sr-only">
                    Email address
                </label>
                <Input
                    id={id}
                    name="email"
                    type="email"
                    required
                    placeholder="you@company.com"
                    autoComplete="email"
                    className="h-12 flex-1 bg-card/60"
                />
                <SubmitButton
                    pending={submitting}
                    pendingLabel="Subscribing…"
                    size="lg"
                    variant="gradient"
                >
                    <BellIcon />
                    Subscribe
                </SubmitButton>
            </form>
        );
    }

    return (
        <form
            onSubmit={handleSubmit}
            aria-label="Subscribe to newsletter"
            className="flex w-full max-w-sm items-center gap-2"
        >
            <Input
                type="email"
                name="email"
                required
                placeholder="Enter your email"
                aria-label="Email address"
                className="h-11 rounded-full bg-card"
            />
            <SubmitButton
                pending={submitting}
                pendingLabel="Subscribing…"
                variant="gradient"
                className="h-11 shrink-0"
            >
                Subscribe
            </SubmitButton>
        </form>
    );
}
