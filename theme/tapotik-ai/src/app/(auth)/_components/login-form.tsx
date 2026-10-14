"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { EyeIcon, EyeOffIcon, LoaderCircleIcon, LockIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldError } from "@/components/ui/field-error";
import { EMAIL_REGEX } from "@/lib/validation";
import { AuthDivider, SocialAuthButtons } from "./social-auth-buttons";

type LoginValues = {
    email: string;
    password: string;
    remember: boolean;
};

export function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm<LoginValues>({
        defaultValues: { email: "", password: "", remember: true },
    });

    async function onSubmit(values: LoginValues) {
        // Simulate a round-trip to the auth API
        await new Promise((r) => setTimeout(r, 900));
        toast.success("Welcome back!", {
            description: `Signed in as ${values.email}`,
        });
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
            <div className="rounded-3xl border p-8 shadow-2xl glass-strong sm:p-10">
                <div className="mb-8">
                    <div className="mb-5 inline-flex size-11 items-center justify-center rounded-2xl border border-primary/30 bg-primary/10 shadow-[0_0_24px_-6px_var(--glow-primary)]">
                        <LockIcon className="size-5 text-primary" />
                    </div>
                    <h1 className="font-heading text-2xl font-bold tracking-tight">
                        Welcome back
                    </h1>
                    <p className="mt-1.5 text-sm text-muted-foreground">
                        Sign in to your workspace to continue creating.
                    </p>
                </div>

                <SocialAuthButtons />

                <div className="my-6">
                    <AuthDivider />
                </div>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                    noValidate
                >
                    <div className="space-y-2">
                        <Label htmlFor="login-email">Email</Label>
                        <Input
                            id="login-email"
                            type="email"
                            placeholder="you@company.com"
                            autoComplete="email"
                            aria-invalid={!!errors.email}
                            {...register("email", {
                                required: "Enter a valid email address",
                                pattern: {
                                    value: EMAIL_REGEX,
                                    message: "Enter a valid email address",
                                },
                            })}
                        />
                        <FieldError message={errors.email?.message} />
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="login-password">Password</Label>
                            <Link
                                href="/forgot-password"
                                className="text-xs font-medium text-primary hover:underline"
                            >
                                Forgot password?
                            </Link>
                        </div>
                        <div className="relative">
                            <Input
                                id="login-password"
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                autoComplete="current-password"
                                className="pr-11"
                                aria-invalid={!!errors.password}
                                {...register("password", {
                                    required:
                                        "Password must be at least 8 characters",
                                    minLength: {
                                        value: 8,
                                        message:
                                            "Password must be at least 8 characters",
                                    },
                                })}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((v) => !v)}
                                aria-label={
                                    showPassword
                                        ? "Hide password"
                                        : "Show password"
                                }
                                className="absolute top-1/2 right-3.5 -translate-y-1/2 cursor-pointer text-muted-foreground transition-colors hover:text-foreground"
                            >
                                {showPassword ? (
                                    <EyeOffIcon className="size-4" />
                                ) : (
                                    <EyeIcon className="size-4" />
                                )}
                            </button>
                        </div>
                        <FieldError message={errors.password?.message} />
                    </div>

                    <Controller
                        control={control}
                        name="remember"
                        render={({ field }) => (
                            <div className="flex items-center gap-2.5">
                                <Checkbox
                                    id="login-remember"
                                    checked={field.value}
                                    onCheckedChange={(v) =>
                                        field.onChange(v === true)
                                    }
                                />
                                <Label
                                    htmlFor="login-remember"
                                    className="cursor-pointer text-sm font-normal text-muted-foreground"
                                >
                                    Remember me for 30 days
                                </Label>
                            </div>
                        )}
                    />

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
                        {isSubmitting ? "Signing in…" : "Sign in"}
                    </Button>
                </form>
            </div>

            <p className="mt-6 text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link
                    href="/signup"
                    className="font-medium text-primary hover:underline"
                >
                    Create one for free
                </Link>
            </p>
        </motion.div>
    );
}
