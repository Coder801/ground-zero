"use client";

import { useState } from "react";
import { Bar, BarChart, Tooltip, XAxis, YAxis } from "recharts";
import {
    ArrowUpRightIcon,
    CalendarIcon,
    CreditCardIcon,
    DownloadIcon,
    SparklesIcon,
    ZapIcon,
} from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FixedSizeChart } from "@/components/effects/fixed-size-chart";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { brandHex } from "@/lib/brand-colors";

const planFeatures = [
    "25,000 AI credits / month",
    "All models, priority routing",
    "5 workspaces · 10 members",
    "Workflow builder + agents",
];

const productUsage = [
    { name: "Chat", value: 42, credits: "7,140", color: brandHex.primary },
    { name: "Image", value: 28, credits: "4,760", color: brandHex.pink },
    { name: "Voice", value: 18, credits: "3,060", color: brandHex.accent },
    { name: "Agents", value: 12, credits: "2,040", color: brandHex.secondary },
];

/** Last 14 days of credit spend — deterministic series (Jun 20 → Jul 3). */
const dailyUsage = Array.from({ length: 14 }, (_, i) => {
    const day = i + 20;
    const label = day <= 30 ? `Jun ${day}` : `Jul ${day - 30}`;
    const chat = Math.round(340 + 130 * Math.sin(i / 1.9) + i * 14);
    const studio = Math.round(220 + 90 * Math.sin(i / 2.4 + 2) + i * 9);
    return { label, chat, studio };
});

type Invoice = {
    id: string;
    date: string;
    amount: string;
    status: "Paid" | "Pending";
};

const invoices: Invoice[] = [
    {
        id: "INV-2026-0107",
        date: "Jul 1, 2026",
        amount: "$29.00",
        status: "Pending",
    },
    {
        id: "INV-2026-0096",
        date: "Jun 1, 2026",
        amount: "$41.50",
        status: "Paid",
    },
    {
        id: "INV-2026-0085",
        date: "May 1, 2026",
        amount: "$29.00",
        status: "Paid",
    },
    {
        id: "INV-2026-0074",
        date: "Apr 1, 2026",
        amount: "$29.00",
        status: "Paid",
    },
    {
        id: "INV-2026-0063",
        date: "Mar 1, 2026",
        amount: "$33.20",
        status: "Paid",
    },
    {
        id: "INV-2026-0052",
        date: "Feb 1, 2026",
        amount: "$29.00",
        status: "Paid",
    },
    {
        id: "INV-2026-0041",
        date: "Jan 1, 2026",
        amount: "$29.00",
        status: "Paid",
    },
    {
        id: "INV-2025-0198",
        date: "Dec 1, 2025",
        amount: "$29.00",
        status: "Paid",
    },
];

const tooltipStyle = {
    background: "var(--popover)",
    border: "1px solid var(--border)",
    borderRadius: "12px",
    fontSize: "12px",
    color: "var(--popover-foreground)",
} as const;

export function BillingClient() {
    const [payOpen, setPayOpen] = useState(false);

    return (
        <div className="mx-auto w-full max-w-350 space-y-6 p-4 sm:p-6 lg:p-8">
            <div>
                <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
                    Billing
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                    Plan, credits, payment method and invoices for Lumina Labs.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="border-gradient relative overflow-hidden rounded-2xl bg-card p-5 lg:p-6">
                    <div
                        aria-hidden
                        className="pointer-events-none absolute -top-14 -right-14 size-36 rounded-full bg-primary/15 blur-3xl"
                    />
                    <div className="flex items-center justify-between">
                        <Badge
                            variant="glow"
                            className="px-2.5 py-0.5 text-[10px]"
                        >
                            Current plan
                        </Badge>
                        <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <CalendarIcon className="size-3.5" />
                            Renews Aug 1, 2026
                        </span>
                    </div>
                    <div className="mt-4 flex items-baseline gap-2">
                        <p className="font-heading text-3xl font-bold">Pro</p>
                        <p className="text-sm text-muted-foreground">
                            <span className="font-heading text-lg font-semibold text-foreground">
                                $29
                            </span>
                            /month
                        </p>
                    </div>
                    <ul className="mt-4 space-y-2">
                        {planFeatures.map((f) => (
                            <li
                                key={f}
                                className="flex items-center gap-2 text-xs text-muted-foreground"
                            >
                                <SparklesIcon className="size-3 shrink-0 text-primary" />
                                {f}
                            </li>
                        ))}
                    </ul>
                    <div className="mt-5 flex gap-2">
                        <Button
                            variant="gradient"
                            size="sm"
                            className="flex-1"
                            onClick={() =>
                                toast.info(
                                    "Scale plan checkout opens in the full product",
                                )
                            }
                        >
                            Upgrade to Scale
                            <ArrowUpRightIcon className="size-3.5" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-muted-foreground"
                            onClick={() =>
                                toast.info(
                                    "We'd hate to see you go — downgrade is disabled in the demo",
                                )
                            }
                        >
                            Downgrade
                        </Button>
                    </div>
                </div>

                <div className="rounded-2xl border bg-card p-5 lg:p-6">
                    <div className="flex items-center justify-between">
                        <h3 className="flex items-center gap-2 font-heading text-base font-semibold">
                            <ZapIcon className="size-4 text-primary" />
                            Credits
                        </h3>
                        <span className="text-xs text-muted-foreground">
                            resets in 29 days
                        </span>
                    </div>
                    <p className="mt-4 font-heading text-2xl font-bold">
                        17,000
                        <span className="text-sm font-normal text-muted-foreground">
                            {" "}
                            / 25,000
                        </span>
                    </p>
                    <Progress value={68} className="mt-3" />
                    <div className="mt-5 space-y-3">
                        {productUsage.map((p) => (
                            <div key={p.name}>
                                <div className="flex items-center justify-between text-xs">
                                    <span className="flex items-center gap-2">
                                        <span
                                            aria-hidden
                                            className="size-2 rounded-full"
                                            style={{ background: p.color }}
                                        />
                                        {p.name}
                                    </span>
                                    <span className="font-mono text-[11px] text-muted-foreground">
                                        {p.credits} · {p.value}%
                                    </span>
                                </div>
                                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-muted">
                                    <div
                                        className="h-full rounded-full transition-all duration-700"
                                        style={{
                                            width: `${p.value}%`,
                                            background: p.color,
                                        }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col rounded-2xl border bg-card p-5 lg:p-6">
                    <h3 className="flex items-center gap-2 font-heading text-base font-semibold">
                        <CreditCardIcon className="size-4 text-primary" />
                        Payment method
                    </h3>

                    <div className="relative mt-4 overflow-hidden rounded-2xl bg-linear-to-br from-[#1A1F71] via-[#2A2F9E] to-[#3B4CCA] p-4 text-white shadow-lg">
                        <div
                            aria-hidden
                            className="pointer-events-none absolute -top-10 -right-6 size-28 rounded-full bg-white/10 blur-2xl"
                        />
                        <div className="flex items-start justify-between">
                            <span
                                aria-hidden
                                className="block h-6 w-8 rounded-md bg-linear-to-br from-[#FFD97A] to-[#D9A93E]"
                            />
                            <span
                                className="font-heading text-lg font-black tracking-tighter italic"
                                aria-label="Visa"
                            >
                                VISA
                            </span>
                        </div>
                        <p className="mt-5 font-mono text-sm tracking-[0.2em]">
                            •••• •••• •••• 4242
                        </p>
                        <div className="mt-3 flex items-center justify-between text-[10px] text-white/70">
                            <span>ALEX KIM</span>
                            <span className="font-mono">09 / 28</span>
                        </div>
                    </div>

                    <p className="mt-3 text-xs text-muted-foreground">
                        Next charge of{" "}
                        <span className="font-medium text-foreground">
                            $29.00
                        </span>{" "}
                        on Aug 1, 2026
                    </p>

                    <Dialog open={payOpen} onOpenChange={setPayOpen}>
                        <DialogTrigger asChild>
                            <Button
                                variant="outline"
                                size="sm"
                                className="mt-auto w-full"
                            >
                                Update payment method
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Update payment method</DialogTitle>
                                <DialogDescription>
                                    Charges appear as “TAPOTIK AI” on your
                                    statement.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="card-number">
                                        Card number
                                    </Label>
                                    <Input
                                        id="card-number"
                                        placeholder="4242 4242 4242 4242"
                                        className="font-mono"
                                        inputMode="numeric"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="card-expiry">
                                            Expiry
                                        </Label>
                                        <Input
                                            id="card-expiry"
                                            placeholder="MM / YY"
                                            className="font-mono"
                                            inputMode="numeric"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="card-cvc">CVC</Label>
                                        <Input
                                            id="card-cvc"
                                            placeholder="123"
                                            className="font-mono"
                                            inputMode="numeric"
                                        />
                                    </div>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button
                                    variant="ghost"
                                    onClick={() => setPayOpen(false)}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="gradient"
                                    onClick={() => {
                                        setPayOpen(false);
                                        toast.success("Payment method updated");
                                    }}
                                >
                                    Save card
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <div className="rounded-2xl border bg-card p-5 lg:p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                        <h3 className="font-heading text-base font-semibold">
                            Credit spend by day
                        </h3>
                        <p className="text-xs text-muted-foreground">
                            Last 14 days
                        </p>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                            <span
                                aria-hidden
                                className="size-2 rounded-full bg-primary"
                            />
                            Chat &amp; agents
                        </span>
                        <span className="flex items-center gap-1.5">
                            <span
                                aria-hidden
                                className="size-2 rounded-full"
                                style={{ background: brandHex.accent }}
                            />
                            Image &amp; voice
                        </span>
                    </div>
                </div>
                <div className="mt-4 h-64 w-full">
                    <FixedSizeChart>
                        {({ width, height }) => (
                            <BarChart
                                width={width}
                                height={height}
                                data={dailyUsage}
                                margin={{
                                    top: 8,
                                    right: 8,
                                    left: -14,
                                    bottom: 0,
                                }}
                                barCategoryGap="28%"
                            >
                                <XAxis
                                    dataKey="label"
                                    axisLine={false}
                                    tickLine={false}
                                    interval={1}
                                    tick={{
                                        fontSize: 11,
                                        fill: "var(--muted-foreground)",
                                    }}
                                    dy={6}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{
                                        fontSize: 11,
                                        fill: "var(--muted-foreground)",
                                    }}
                                />
                                <Tooltip
                                    cursor={{
                                        fill: "var(--muted)",
                                        opacity: 0.4,
                                    }}
                                    contentStyle={tooltipStyle}
                                />
                                <Bar
                                    dataKey="chat"
                                    stackId="spend"
                                    fill={brandHex.primary}
                                />
                                <Bar
                                    dataKey="studio"
                                    stackId="spend"
                                    fill={brandHex.accent}
                                    radius={[4, 4, 0, 0]}
                                />
                            </BarChart>
                        )}
                    </FixedSizeChart>
                </div>
            </div>

            <div className="rounded-2xl border bg-card">
                <div className="p-5 pb-0 lg:p-6 lg:pb-0">
                    <h3 className="font-heading text-base font-semibold">
                        Invoice history
                    </h3>
                    <p className="text-xs text-muted-foreground">
                        Receipts are also emailed to billing@lumina.dev
                    </p>
                </div>
                <div className="mt-4 border-t">
                    <Table>
                        <TableHeader>
                            <TableRow className="hover:bg-transparent">
                                <TableHead className="pl-5 lg:pl-6">
                                    Invoice
                                </TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Amount</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="pr-5 text-right lg:pr-6">
                                    Download
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {invoices.map((inv) => (
                                <TableRow key={inv.id}>
                                    <TableCell className="pl-5 font-mono text-xs font-medium lg:pl-6">
                                        {inv.id}
                                    </TableCell>
                                    <TableCell className="text-xs text-muted-foreground">
                                        {inv.date}
                                    </TableCell>
                                    <TableCell className="font-mono text-xs">
                                        {inv.amount}
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={
                                                inv.status === "Paid"
                                                    ? "success"
                                                    : "warning"
                                            }
                                            className="px-2 py-0.5 text-[10px]"
                                        >
                                            {inv.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="pr-5 text-right lg:pr-6">
                                        <Button
                                            variant="ghost"
                                            size="icon-sm"
                                            aria-label={`Download ${inv.id}`}
                                            onClick={() =>
                                                toast.success(
                                                    "Downloading PDF",
                                                    { description: inv.id },
                                                )
                                            }
                                        >
                                            <DownloadIcon className="size-3.5" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
}
