import Link from "next/link";
import { LifeBuoyIcon } from "lucide-react";

import { GlowSpot } from "@/components/effects/aurora-background";
import { Button } from "@/components/ui/button";
import { DocsMobileNav, DocsSidebar } from "./_components/docs-sidebar";

export default function DocsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative overflow-hidden">
            <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-105 bg-grid mask-[linear-gradient(to_bottom,black,transparent)] opacity-60"
            />
            <GlowSpot color="primary" className="-top-40 left-1/4 opacity-50" />

            <div className="relative container-wide pt-32 pb-16 lg:pt-36 lg:pb-24">
                <div className="mb-10 lg:hidden">
                    <DocsMobileNav />
                </div>

                <div className="flex items-start gap-10 xl:gap-16">
                    <aside
                        data-lenis-prevent
                        className="sticky top-28 no-scrollbar hidden max-h-[calc(100vh-9rem)] w-56 shrink-0 overflow-y-auto pb-8 lg:block xl:w-60"
                    >
                        <DocsSidebar />
                        <div className="mt-8 rounded-2xl p-4 glass">
                            <div className="flex items-center gap-2">
                                <LifeBuoyIcon
                                    aria-hidden
                                    className="size-4 text-(--primary-bright)"
                                />
                                <p className="text-sm font-semibold">
                                    Need help?
                                </p>
                            </div>
                            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                                Can&apos;t find what you&apos;re looking for?
                                Our engineers answer API questions daily.
                            </p>
                            <Button
                                asChild
                                variant="outline"
                                size="sm"
                                className="mt-3 w-full"
                            >
                                <Link href="/contact">Contact support</Link>
                            </Button>
                        </div>
                    </aside>

                    <div className="min-w-0 flex-1">{children}</div>
                </div>
            </div>
        </div>
    );
}
