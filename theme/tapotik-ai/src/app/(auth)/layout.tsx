import Link from "next/link";
import { ArrowLeftIcon } from "lucide-react";

import {
    AuroraBackground,
    GlowSpot,
} from "@/components/effects/aurora-background";
import { Logo, LogoMark } from "@/components/logo";
import { AnimatedCounter } from "@/components/effects/animated-counter";
import { stats } from "@/lib/data";
import { AuthShowcase } from "./_components/auth-showcase";

export default function AuthLayout({
    children,
}: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="grid min-h-dvh grid-cols-1 lg:grid-cols-2">
            <aside className="relative hidden overflow-hidden border-r lg:flex lg:flex-col lg:justify-between lg:p-10 xl:p-14">
                <AuroraBackground intensity="strong" />
                <div
                    aria-hidden
                    className="absolute inset-0 bg-grid mask-[radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]"
                />
                <GlowSpot color="primary" className="-top-32 -left-24" />
                <GlowSpot color="accent" className="-right-24 -bottom-40" />

                <div
                    aria-hidden
                    className="pointer-events-none absolute top-[18%] right-[12%] size-24 animate-float rounded-full bg-linear-to-br from-primary/50 to-secondary/40 blur-xl"
                />
                <div
                    aria-hidden
                    className="pointer-events-none absolute bottom-[26%] left-[8%] size-16 animate-float-slow rounded-full bg-linear-to-br from-accent/40 to-primary/30 blur-lg"
                />
                <div
                    aria-hidden
                    className="pointer-events-none absolute top-[46%] right-[4%] size-10 animate-float-slow rounded-full bg-linear-to-br from-pink/40 to-secondary/40 blur-md"
                />

                <div className="relative">
                    <Logo />
                </div>

                <div className="relative flex flex-col items-start gap-8">
                    <p className="max-w-md font-heading text-3xl font-bold tracking-tight xl:text-4xl">
                        One workspace for{" "}
                        <span className="text-gradient">every AI workflow</span>
                    </p>
                    <AuthShowcase />
                </div>

                <div className="relative grid grid-cols-2 gap-6 xl:grid-cols-4">
                    {stats.map((stat) => (
                        <div key={stat.label}>
                            <p className="text-gradient font-heading text-xl font-bold">
                                <AnimatedCounter
                                    value={stat.value}
                                    suffix={stat.suffix}
                                    decimals={stat.decimals ?? 0}
                                />
                            </p>
                            <p className="mt-1 text-xs text-muted-foreground">
                                {stat.label}
                            </p>
                        </div>
                    ))}
                </div>
            </aside>

            <main className="relative flex flex-col overflow-hidden">
                <div
                    aria-hidden
                    className="absolute inset-0 bg-dots mask-[radial-gradient(ellipse_60%_50%_at_50%_35%,black,transparent)] opacity-60"
                />
                <GlowSpot
                    color="secondary"
                    className="-top-48 right-0 opacity-50"
                />

                <div className="relative flex items-center justify-between p-6 lg:p-8">
                    <Link
                        href="/"
                        className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                        <ArrowLeftIcon className="size-4 transition-transform duration-300 group-hover:-translate-x-0.5" />
                        Back to home
                    </Link>
                    <Link
                        href="/"
                        aria-label="Tapotik AI home"
                        className="lg:hidden"
                    >
                        <LogoMark className="size-7" />
                    </Link>
                </div>

                <div className="relative flex flex-1 items-center justify-center px-6 pt-4 pb-16 lg:px-10">
                    <div className="w-full max-w-md">{children}</div>
                </div>
            </main>
        </div>
    );
}
