"use client";

import { SendIcon } from "lucide-react";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SubmitButton } from "@/components/ui/submit-button";
import { useSimulatedSubmit } from "@/lib/use-simulated-submit";

export function ApplyForm({ jobTitle }: { jobTitle: string }) {
    const { submitting, run } = useSimulatedSubmit(900);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const form = e.currentTarget;
        run(() => {
            toast.success("Application submitted!", {
                description: `Thanks for applying to ${jobTitle}. We'll get back to you within 5 business days.`,
            });
            form.reset();
        });
    }

    return (
        <form onSubmit={handleSubmit} className="grid gap-5">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="grid gap-2">
                    <Label htmlFor="apply-name">Full name</Label>
                    <Input
                        id="apply-name"
                        name="name"
                        placeholder="Ada Lovelace"
                        autoComplete="name"
                        required
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="apply-email">Email</Label>
                    <Input
                        id="apply-email"
                        name="email"
                        type="email"
                        placeholder="ada@example.com"
                        autoComplete="email"
                        required
                    />
                </div>
            </div>

            <div className="grid gap-2">
                <Label htmlFor="apply-portfolio">
                    Portfolio / LinkedIn / GitHub URL
                </Label>
                <Input
                    id="apply-portfolio"
                    name="portfolio"
                    type="url"
                    placeholder="https://your-best-work.com"
                    required
                />
            </div>

            <div className="grid gap-2">
                <Label htmlFor="apply-message">Why Tapotik, why now?</Label>
                <Textarea
                    id="apply-message"
                    name="message"
                    placeholder="A few lines about what you'd bring to this role — no cover-letter formalities needed."
                    className="min-h-32"
                    required
                />
            </div>

            <SubmitButton
                pending={submitting}
                pendingLabel="Submitting…"
                size="lg"
                variant="gradient"
                className="w-full sm:w-auto sm:justify-self-start"
            >
                Submit application
                <SendIcon />
            </SubmitButton>
            <p className="text-xs text-muted-foreground">
                By applying you agree to our candidate privacy policy.
                We&apos;ll only use your details for this application.
            </p>
        </form>
    );
}
