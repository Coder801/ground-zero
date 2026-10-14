import { InfoIcon, TriangleAlertIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

// Server-compatible doc primitives (no 'use client') for the docs hub.

function slugify(value: React.ReactNode) {
    return String(value)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
}

export function DocPage({
    title,
    description,
    children,
}: {
    title: string;
    description?: string;
    children: React.ReactNode;
}) {
    return (
        <article className="max-w-3xl min-w-0">
            <header className="border-b pb-8">
                <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
                    {title}
                </h1>
                {description ? (
                    <p className="mt-3 text-base leading-relaxed text-muted-foreground">
                        {description}
                    </p>
                ) : null}
            </header>
            <div className="pt-2">{children}</div>
        </article>
    );
}

export function DocH2({
    children,
    id,
}: {
    children: React.ReactNode;
    id?: string;
}) {
    const anchor = id ?? slugify(children);
    return (
        <h2
            id={anchor}
            className="group mt-12 mb-4 scroll-mt-32 font-heading text-xl font-semibold tracking-tight sm:text-2xl"
        >
            <a href={`#${anchor}`} className="inline-flex items-center gap-2">
                {children}
                <span
                    aria-hidden
                    className="text-primary opacity-0 transition-opacity group-hover:opacity-100"
                >
                    #
                </span>
            </a>
        </h2>
    );
}

export function DocH3({
    children,
    id,
}: {
    children: React.ReactNode;
    id?: string;
}) {
    const anchor = id ?? slugify(children);
    return (
        <h3
            id={anchor}
            className="group mt-8 mb-3 scroll-mt-32 font-heading text-base font-semibold tracking-tight sm:text-lg"
        >
            <a href={`#${anchor}`} className="inline-flex items-center gap-2">
                {children}
                <span
                    aria-hidden
                    className="text-primary opacity-0 transition-opacity group-hover:opacity-100"
                >
                    #
                </span>
            </a>
        </h3>
    );
}

export function DocP({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) {
    return (
        <p
            className={cn(
                "my-4 text-[15px] leading-7 text-muted-foreground [&_a]:font-medium [&_a]:text-primary [&_a]:underline-offset-4 hover:[&_a]:underline",
                className,
            )}
        >
            {children}
        </p>
    );
}

export function DocInlineCode({ children }: { children: React.ReactNode }) {
    return (
        <code className="rounded-md border bg-muted px-1.5 py-0.5 font-mono text-[0.8rem] text-foreground">
            {children}
        </code>
    );
}

export function DocList({ items }: { items: React.ReactNode[] }) {
    return (
        <ul className="my-4 space-y-2.5">
            {items.map((item, i) => (
                <li
                    key={i}
                    className="flex items-start gap-3 text-[15px] leading-7 text-muted-foreground"
                >
                    <span
                        aria-hidden
                        className="mt-2.75 size-1.5 shrink-0 rounded-full bg-primary/70"
                    />
                    <span className="min-w-0">{item}</span>
                </li>
            ))}
        </ul>
    );
}

export function DocCode({
    language,
    code,
    filename,
}: {
    language: string;
    code: string;
    filename?: string;
}) {
    return (
        <figure className="my-6 overflow-hidden rounded-xl border border-white/10 bg-[#070b1a] shadow-[0_16px_48px_-24px_rgba(5,8,22,0.9)]">
            <figcaption className="flex items-center justify-between gap-4 border-b border-white/8 px-4 py-2.5">
                <span className="flex min-w-0 items-center gap-2.5">
                    <span aria-hidden className="flex gap-1.5">
                        <span className="size-2.5 rounded-full bg-[#ff5f57]/80" />
                        <span className="size-2.5 rounded-full bg-[#febc2e]/80" />
                        <span className="size-2.5 rounded-full bg-[#28c840]/80" />
                    </span>
                    {filename ? (
                        <span className="truncate font-mono text-xs text-white/60">
                            {filename}
                        </span>
                    ) : null}
                </span>
                <span className="shrink-0 font-mono text-[10px] tracking-widest text-white/40 uppercase">
                    {language}
                </span>
            </figcaption>
            <pre className="overflow-x-auto p-4 text-[13px] leading-6">
                <code className="font-mono text-[#c7d2f0]">{code}</code>
            </pre>
        </figure>
    );
}

export function DocCallout({
    type = "info",
    children,
}: {
    type?: "info" | "warning";
    children: React.ReactNode;
}) {
    const Icon = type === "warning" ? TriangleAlertIcon : InfoIcon;
    return (
        <div
            role="note"
            className={cn(
                "my-6 flex items-start gap-3 rounded-xl border p-4",
                type === "warning"
                    ? "border-warning/30 bg-warning/10"
                    : "border-primary/25 bg-primary/10",
            )}
        >
            <Icon
                aria-hidden
                className={cn(
                    "mt-0.5 size-4.5 shrink-0",
                    type === "warning"
                        ? "text-warning"
                        : "text-(--primary-bright)",
                )}
            />
            <div className="min-w-0 text-sm leading-relaxed text-foreground/85 [&_code]:rounded-md [&_code]:border [&_code]:bg-background/60 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[0.8rem]">
                {children}
            </div>
        </div>
    );
}

export function DocTable({
    headers,
    rows,
}: {
    headers: React.ReactNode[];
    rows: React.ReactNode[][];
}) {
    return (
        <div className="my-6 overflow-hidden rounded-xl border">
            <Table>
                <TableHeader>
                    <TableRow className="bg-muted/50 hover:bg-muted/50">
                        {headers.map((header, i) => (
                            <TableHead key={i}>{header}</TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {rows.map((row, i) => (
                        <TableRow key={i}>
                            {row.map((cell, j) => (
                                <TableCell
                                    key={j}
                                    className={cn(
                                        "align-top text-[13.5px] leading-6 whitespace-normal",
                                        j === 0
                                            ? "text-foreground"
                                            : "text-muted-foreground",
                                    )}
                                >
                                    {cell}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

const methodVariant: Record<
    string,
    React.ComponentProps<typeof Badge>["variant"]
> = {
    GET: "accent",
    POST: "default",
    PUT: "warning",
    PATCH: "warning",
    DELETE: "destructive",
};

export function DocEndpoint({
    method,
    path,
}: {
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    path: string;
}) {
    return (
        <div className="my-6 flex flex-wrap items-center gap-3 overflow-x-auto rounded-xl border bg-muted/40 px-4 py-3">
            <Badge
                variant={methodVariant[method]}
                className="font-mono text-[11px]"
            >
                {method}
            </Badge>
            <code className="font-mono text-[13px] text-foreground">
                {path}
            </code>
        </div>
    );
}

export function DocSteps({
    steps,
}: {
    steps: { title: string; body: React.ReactNode }[];
}) {
    return (
        <ol className="my-6">
            {steps.map((step, i) => (
                <li key={i} className="relative flex gap-4 pb-8 last:pb-0">
                    {i < steps.length - 1 ? (
                        <span
                            aria-hidden
                            className="absolute top-9 bottom-1 left-4 w-px bg-linear-to-b from-primary/40 to-border"
                        />
                    ) : null}
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10 font-mono text-xs font-semibold text-(--primary-bright)">
                        {i + 1}
                    </span>
                    <div className="min-w-0 flex-1 pt-1">
                        <h3 className="font-heading text-base font-semibold tracking-tight">
                            {step.title}
                        </h3>
                        <div className="mt-1.5 [&>*:first-child]:mt-0">
                            {step.body}
                        </div>
                    </div>
                </li>
            ))}
        </ol>
    );
}
