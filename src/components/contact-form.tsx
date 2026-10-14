"use client";

import { useState } from "react";
import { CheckCircle2Icon, SendIcon } from "lucide-react";

import { contactForm } from "@/data/contacts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Status = "idle" | "sending" | "sent" | "error";

const { fields, placeholders } = contactForm;

export function ContactForm() {
    const [status, setStatus] = useState<Status>("idle");

    async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const form = event.currentTarget;
        const data = new FormData(form);
        // Honeypot: real visitors never see this field, bots fill it in.
        if (data.get("_honey")) return;

        setStatus("sending");
        try {
            const response = await fetch(contactForm.endpoint, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    [fields.name]: data.get("name"),
                    [fields.contact]: data.get("contact"),
                    [fields.message]: data.get("message"),
                    _subject: contactForm.subject,
                    _template: "table",
                    _captcha: "false",
                }),
            });
            const result: { success?: string | boolean } = await response
                .json()
                .catch(() => ({}));
            if (!response.ok || String(result.success) !== "true") {
                throw new Error("FormSubmit rejected the request");
            }
            form.reset();
            setStatus("sent");
        } catch {
            setStatus("error");
        }
    }

    if (status === "sent") {
        return (
            <div
                role="status"
                className="flex flex-col items-center gap-3 rounded-2xl border bg-background/60 p-8 text-center"
            >
                <CheckCircle2Icon
                    aria-hidden
                    className="size-8 text-(--primary-bright)"
                />
                <p className="text-base">{contactForm.success}</p>
            </div>
        );
    }

    return (
        <form
            onSubmit={onSubmit}
            className="grid gap-5 text-left sm:grid-cols-2"
            aria-busy={status === "sending"}
        >
            <div className="grid gap-2">
                <Label htmlFor="cf-name">{fields.name}</Label>
                <Input
                    id="cf-name"
                    name="name"
                    autoComplete="name"
                    required
                    className="h-12 text-base"
                />
            </div>
            <div className="grid gap-2">
                <Label htmlFor="cf-contact">{fields.contact}</Label>
                <Input
                    id="cf-contact"
                    name="contact"
                    autoComplete="tel"
                    placeholder={placeholders.contact}
                    required
                    className="h-12 text-base"
                />
            </div>
            <div className="grid gap-2 sm:col-span-2">
                <Label htmlFor="cf-message">{fields.message}</Label>
                <Textarea
                    id="cf-message"
                    name="message"
                    rows={4}
                    placeholder={placeholders.message}
                    required
                    className="text-base"
                />
            </div>
            <input
                type="text"
                name="_honey"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden
                className="hidden"
            />
            <div className="flex flex-col items-center gap-3 sm:col-span-2">
                <Button
                    type="submit"
                    size="lg"
                    disabled={status === "sending"}
                    className="w-full sm:w-auto"
                >
                    <SendIcon aria-hidden />
                    {status === "sending"
                        ? contactForm.sending
                        : contactForm.submit}
                </Button>
                <p
                    role="alert"
                    className="min-h-5 text-center text-sm text-destructive"
                >
                    {status === "error" ? contactForm.error : ""}
                </p>
            </div>
        </form>
    );
}
