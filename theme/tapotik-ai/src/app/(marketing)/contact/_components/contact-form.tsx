"use client";

import { Controller, useForm } from "react-hook-form";
import { SendIcon } from "lucide-react";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SubmitButton } from "@/components/ui/submit-button";
import { FieldError } from "@/components/ui/field-error";
import { useSimulatedSubmit } from "@/lib/use-simulated-submit";
import { EMAIL_REGEX } from "@/lib/validation";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const topics = [
    "Sales & pricing",
    "Technical support",
    "Partnerships",
    "Press & media",
    "Security & compliance",
    "Something else",
] as const;

type ContactFormValues = {
    name: string;
    email: string;
    company: string;
    topic: string;
    message: string;
};

export function ContactForm() {
    const { submitting, run } = useSimulatedSubmit(900);
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm<ContactFormValues>({
        defaultValues: {
            name: "",
            email: "",
            company: "",
            topic: "",
            message: "",
        },
    });

    function onSubmit(values: ContactFormValues) {
        run(() => {
            toast.success("Message sent!", {
                description: `Thanks ${values.name.split(" ")[0]} — our team will reply to ${values.email} shortly.`,
            });
            reset();
        });
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="grid gap-5"
        >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="grid gap-2">
                    <Label htmlFor="contact-name">Full name</Label>
                    <Input
                        id="contact-name"
                        placeholder="Ada Lovelace"
                        autoComplete="name"
                        aria-invalid={!!errors.name}
                        {...register("name", {
                            required: "Please enter your full name.",
                            minLength: {
                                value: 2,
                                message: "Please enter your full name.",
                            },
                        })}
                    />
                    <FieldError message={errors.name?.message} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="contact-email">Work email</Label>
                    <Input
                        id="contact-email"
                        type="email"
                        placeholder="ada@company.com"
                        autoComplete="email"
                        aria-invalid={!!errors.email}
                        {...register("email", {
                            required: "Please enter a valid work email.",
                            pattern: {
                                value: EMAIL_REGEX,
                                message: "Please enter a valid work email.",
                            },
                        })}
                    />
                    <FieldError message={errors.email?.message} />
                </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="grid gap-2">
                    <Label htmlFor="contact-company">Company</Label>
                    <Input
                        id="contact-company"
                        placeholder="Acme Inc."
                        autoComplete="organization"
                        aria-invalid={!!errors.company}
                        {...register("company", {
                            required: "Please enter your company name.",
                            minLength: {
                                value: 2,
                                message: "Please enter your company name.",
                            },
                        })}
                    />
                    <FieldError message={errors.company?.message} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="contact-topic">Topic</Label>
                    <Controller
                        control={control}
                        name="topic"
                        rules={{ required: "Please choose a topic." }}
                        render={({ field }) => (
                            <Select
                                value={field.value}
                                onValueChange={field.onChange}
                            >
                                <SelectTrigger
                                    id="contact-topic"
                                    className="w-full"
                                    aria-invalid={!!errors.topic}
                                    onBlur={field.onBlur}
                                >
                                    <SelectValue placeholder="Choose a topic" />
                                </SelectTrigger>
                                <SelectContent>
                                    {topics.map((topic) => (
                                        <SelectItem key={topic} value={topic}>
                                            {topic}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        )}
                    />
                    <FieldError message={errors.topic?.message} />
                </div>
            </div>

            <div className="grid gap-2">
                <Label htmlFor="contact-message">Message</Label>
                <Textarea
                    id="contact-message"
                    placeholder="What are you building, and how can we help?"
                    className="min-h-36"
                    aria-invalid={!!errors.message}
                    {...register("message", {
                        required:
                            "Tell us a little more — at least 20 characters.",
                        minLength: {
                            value: 20,
                            message:
                                "Tell us a little more — at least 20 characters.",
                        },
                    })}
                />
                <FieldError message={errors.message?.message} />
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <SubmitButton
                    pending={submitting}
                    pendingLabel="Sending…"
                    size="lg"
                    variant="gradient"
                >
                    Send message
                    <SendIcon />
                </SubmitButton>
                <p className="text-xs text-muted-foreground">
                    We typically reply within 2 hours on business days.
                </p>
            </div>
        </form>
    );
}
