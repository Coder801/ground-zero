import Link from "next/link";
import { GhostIcon, HomeIcon, LifeBuoyIcon } from "lucide-react";

import {
    AuroraBackground,
    GlowSpot,
} from "@/components/effects/aurora-background";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function NotFound() {
    return (
        <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-24 text-center">
            <AuroraBackground intensity="strong" />
            <div
                aria-hidden
                className="absolute inset-0 bg-grid mask-[radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]"
            />
            <GlowSpot color="primary" className="-top-40 left-1/4" />
            <GlowSpot color="pink" className="-right-40 bottom-0 opacity-60" />

            <div className="relative flex flex-col items-center">
                <Badge variant="glow" className="tracking-widest uppercase">
                    <GhostIcon className="size-3" />
                    Error 404
                </Badge>

                <div
                    className="relative mt-6 animate-float select-none"
                    aria-hidden
                >
                    <span className="absolute inset-0 text-gradient font-heading text-[8rem] leading-none font-bold tracking-tight opacity-50 blur-2xl sm:text-[12rem]">
                        404
                    </span>
                    <span className="relative text-gradient font-heading text-[8rem] leading-none font-bold tracking-tight sm:text-[12rem]">
                        404
                    </span>
                </div>

                <h1 className="mt-8 font-heading text-2xl font-bold tracking-tight text-balance sm:text-3xl">
                    This page drifted into deep space
                </h1>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
                    The page you&apos;re looking for doesn&apos;t exist, was
                    moved, or never made it out of the lab. Let&apos;s get you
                    back to familiar coordinates.
                </p>

                <div className="mt-9 flex flex-col items-center gap-3.5 sm:flex-row">
                    <Button asChild size="lg" variant="gradient">
                        <Link href="/">
                            <HomeIcon aria-hidden />
                            Back to home
                        </Link>
                    </Button>
                    <Button asChild size="lg" variant="glass">
                        <Link href="/contact">
                            <LifeBuoyIcon aria-hidden />
                            Contact support
                        </Link>
                    </Button>
                </div>

                <p className="mt-10 text-xs text-muted-foreground">
                    Lost in the docs instead?{" "}
                    <Link
                        href="/docs"
                        className="font-medium text-primary underline-offset-4 hover:underline"
                    >
                        Browse the documentation
                    </Link>
                </p>
            </div>
        </main>
    );
}
