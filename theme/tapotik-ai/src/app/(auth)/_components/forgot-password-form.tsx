"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import {
    ArrowLeftIcon,
    KeyRoundIcon,
    LoaderCircleIcon,
    MailCheckIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldError } from "@/components/ui/field-error";
import { EMAIL_REGEX } from "@/lib/validation";

type ForgotValues = {
    email: string;
};

const RESEND_SECONDS = 30;

export function ForgotPasswordForm() {
    const [sentTo, setSentTo] = useState<string | null>(null);
    const [countdown, setCountdown] = useState(RESEND_SECONDS);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ForgotValues>({
        defaultValues: { email: "" },
    });

    // Resend cooldown timer, active only on the success screen
    useEffect(() => {
        if (!sentTo || countdown <= 0) return;
        const id = setInterval(() => setCountdown((c) => c - 1), 1000);
        return () => clearInterval(id);
    }, [sentTo, countdown]);

    async function onSubmit(values: ForgotValues) {
        await new Promise((r) => setTimeout(r, 800));
        setSentTo(values.email);
        setCountdown(RESEND_SECONDS);
    }

    function resend() {
        toast.success("Reset link sent again", {
            description: `Check ${sentTo} — it can take a minute to arrive.`,
        });
        setCountdown(RESEND_SECONDS);
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
            <div className="overflow-hidden rounded-3xl border p-8 shadow-2xl glass-strong sm:p-10">
                <AnimatePresence mode="wait" initial={false}>
                    {sentTo === null ? (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0, x: -16 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -16 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="mb-8">
                                <div className="mb-5 inline-flex size-11 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 shadow-[0_0_24px_-6px_var(--glow-primary)]">
                                    <KeyRoundIcon className="size-5 text-primary" />
                                </div>
                                <h1 className="font-heading text-2xl font-bold tracking-tight">
                                    Reset your password
                                </h1>
                                <p className="mt-1.5 text-sm text-muted-foreground">
                                    Enter the email you signed up with and
                                    we&apos;ll send you a secure reset link.
                                </p>
                            </div>

                            <form
                                onSubmit={handleSubmit(onSubmit)}
                                className="space-y-5"
                                noValidate
                            >
                                <div className="space-y-2">
                                    <Label htmlFor="forgot-email">Email</Label>
                                    <Input
                                        id="forgot-email"
                                        type="email"
                                        placeholder="you@company.com"
                                        autoComplete="email"
                                        aria-invalid={!!errors.email}
                                        {...register("email", {
                                            required:
                                                "Enter a valid email address",
                                            pattern: {
                                                value: EMAIL_REGEX,
                                                message:
                                                    "Enter a valid email address",
                                            },
                                        })}
                                    />
                                    <FieldError
                                        message={errors.email?.message}
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    variant="gradient"
                                    size="lg"
                                    className="w-full"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting && (
                                        <LoaderCircleIcon className="size-4 animate-spin" />
                                    )}
                                    {isSubmitting
                                        ? "Sending link…"
                                        : "Send reset link"}
                                </Button>
                            </form>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, x: 16 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 16 }}
                            transition={{ duration: 0.3 }}
                            className="text-center"
                        >
                            <motion.div
                                initial={{ scale: 0.6, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{
                                    type: "spring",
                                    stiffness: 220,
                                    damping: 16,
                                    delay: 0.1,
                                }}
                                className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full border border-success/30 bg-success/10"
                            >
                                <MailCheckIcon className="size-7 text-success" />
                            </motion.div>

                            <h1 className="font-heading text-2xl font-bold tracking-tight">
                                Check your inbox
                            </h1>
                            <p className="mx-auto mt-2 max-w-xs text-sm text-muted-foreground">
                                We sent a password reset link to{" "}
                                <span className="font-medium text-foreground">
                                    {sentTo}
                                </span>
                                . The link expires in 15 minutes.
                            </p>

                            <div className="mt-8 space-y-3">
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    disabled={countdown > 0}
                                    onClick={resend}
                                >
                                    {countdown > 0 ? (
                                        <>
                                            Resend link in{" "}
                                            <span className="font-mono text-primary tabular-nums">
                                                0:
                                                {String(countdown).padStart(
                                                    2,
                                                    "0",
                                                )}
                                            </span>
                                        </>
                                    ) : (
                                        "Resend link"
                                    )}
                                </Button>
                                <Button
                                    variant="ghost"
                                    className="w-full text-muted-foreground"
                                    onClick={() => setSentTo(null)}
                                >
                                    Use a different email
                                </Button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <p className="mt-6 text-center text-sm">
                <Link
                    href="/login"
                    className="group inline-flex items-center gap-1.5 font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                    <ArrowLeftIcon className="size-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" />
                    Back to sign in
                </Link>
            </p>
        </motion.div>
    );
}
