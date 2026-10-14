"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Controller, useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import {
    EyeIcon,
    EyeOffIcon,
    LoaderCircleIcon,
    SparklesIcon,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FieldError } from "@/components/ui/field-error";
import { cn } from "@/lib/utils";
import { EMAIL_REGEX } from "@/lib/validation";
import { AuthDivider, SocialAuthButtons } from "./social-auth-buttons";

type SignupValues = {
    name: string;
    email: string;
    password: string;
    terms: boolean;
};

/** Mirror of the password rules, evaluated live for the strength meter. */
const strengthRules = [
    { label: "8+ characters", test: (v: string) => v.length >= 8 },
    { label: "Uppercase letter", test: (v: string) => /[A-Z]/.test(v) },
    { label: "Number", test: (v: string) => /[0-9]/.test(v) },
    { label: "Symbol", test: (v: string) => /[^A-Za-z0-9]/.test(v) },
];

const strengthMeta = [
    { label: "Too weak", color: "bg-destructive", text: "text-destructive" },
    { label: "Weak", color: "bg-destructive", text: "text-destructive" },
    { label: "Fair", color: "bg-warning", text: "text-warning" },
    { label: "Good", color: "bg-primary", text: "text-primary" },
    { label: "Strong", color: "bg-success", text: "text-success" },
];

function PasswordStrength({ password }: { password: string }) {
    const score = strengthRules.filter((r) => r.test(password)).length;
    const meta = strengthMeta[score];

    return (
        <div aria-live="polite">
            <div className="flex items-center gap-1.5">
                {strengthRules.map((rule, i) => (
                    <motion.span
                        key={rule.label}
                        initial={false}
                        animate={{ scaleY: i < score ? 1 : 0.6, opacity: 1 }}
                        transition={{ duration: 0.25, delay: i * 0.04 }}
                        className={cn(
                            "h-1.5 flex-1 origin-center rounded-full transition-colors duration-300",
                            i < score ? meta.color : "bg-muted",
                        )}
                    />
                ))}
            </div>
            {password.length > 0 && (
                <div className="mt-2 flex items-center justify-between">
                    <p className={cn("text-xs font-medium", meta.text)}>
                        {meta.label}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        {score < 4 &&
                            `Next: ${strengthRules.find((r) => !r.test(password))?.label.toLowerCase()}`}
                    </p>
                </div>
            )}
        </div>
    );
}

export function SignupForm() {
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm<SignupValues>({
        defaultValues: { name: "", email: "", password: "", terms: false },
    });

    const password = useWatch({ control, name: "password" }) ?? "";

    async function onSubmit(values: SignupValues) {
        await new Promise((r) => setTimeout(r, 900));
        toast.success("Account created!", {
            description: `Welcome to Tapotik AI, ${values.name.split(" ")[0]}. 1,000 free credits are waiting.`,
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
                        <SparklesIcon className="size-5 text-primary" />
                    </div>
                    <h1 className="font-heading text-2xl font-bold tracking-tight">
                        Create your account
                    </h1>
                    <p className="mt-1.5 text-sm text-muted-foreground">
                        Start free with 1,000 credits. No credit card required.
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
                        <Label htmlFor="signup-name">Full name</Label>
                        <Input
                            id="signup-name"
                            placeholder="Alex Kim"
                            autoComplete="name"
                            aria-invalid={!!errors.name}
                            {...register("name", {
                                required: "Tell us your name",
                                minLength: {
                                    value: 2,
                                    message: "Tell us your name",
                                },
                            })}
                        />
                        <FieldError message={errors.name?.message} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="signup-email">Work email</Label>
                        <Input
                            id="signup-email"
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
                        <Label htmlFor="signup-password">Password</Label>
                        <div className="relative">
                            <Input
                                id="signup-password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Create a strong password"
                                autoComplete="new-password"
                                className="pr-11"
                                aria-invalid={!!errors.password}
                                {...register("password", {
                                    required: "At least 8 characters",
                                    minLength: {
                                        value: 8,
                                        message: "At least 8 characters",
                                    },
                                    validate: {
                                        uppercase: (v) =>
                                            /[A-Z]/.test(v) ||
                                            "Add an uppercase letter",
                                        number: (v) =>
                                            /[0-9]/.test(v) || "Add a number",
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
                        <PasswordStrength password={password} />
                        <FieldError message={errors.password?.message} />
                    </div>

                    <div className="space-y-2">
                        <Controller
                            control={control}
                            name="terms"
                            rules={{
                                validate: (v) =>
                                    v === true ||
                                    "Please accept the terms to continue",
                            }}
                            render={({ field }) => (
                                <div className="flex items-start gap-2.5">
                                    <Checkbox
                                        id="signup-terms"
                                        checked={field.value === true}
                                        onCheckedChange={(v) =>
                                            field.onChange(v === true)
                                        }
                                        aria-invalid={!!errors.terms}
                                        className="mt-0.5"
                                    />
                                    <Label
                                        htmlFor="signup-terms"
                                        className="cursor-pointer text-sm leading-snug font-normal text-muted-foreground"
                                    >
                                        <span>
                                            I agree to the{" "}
                                            <Link
                                                href="/terms"
                                                className="font-medium text-primary hover:underline"
                                            >
                                                Terms of Service
                                            </Link>{" "}
                                            and{" "}
                                            <Link
                                                href="/privacy"
                                                className="font-medium text-primary hover:underline"
                                            >
                                                Privacy Policy
                                            </Link>
                                        </span>
                                    </Label>
                                </div>
                            )}
                        />
                        <FieldError message={errors.terms?.message} />
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
                        {isSubmitting ? "Creating account…" : "Create account"}
                    </Button>
                </form>
            </div>

            <p className="mt-6 text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                    href="/login"
                    className="font-medium text-primary hover:underline"
                >
                    Sign in
                </Link>
            </p>
        </motion.div>
    );
}
