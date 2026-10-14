"use client";

import { useState } from "react";

import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { AppSidebar } from "./app-sidebar";
import { AppTopbar } from "./app-topbar";

export function AppShell({ children }: { children: React.ReactNode }) {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <div className="min-h-dvh bg-background">
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-40 hidden border-r border-sidebar-border transition-[width] duration-300 ease-in-out lg:block",
                    collapsed ? "w-19" : "w-64",
                )}
            >
                <AppSidebar collapsed={collapsed} />
            </aside>

            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetContent
                    side="left"
                    className="w-72 gap-0 border-sidebar-border bg-sidebar p-0"
                >
                    <SheetTitle className="sr-only">Navigation</SheetTitle>
                    <AppSidebar onNavigate={() => setMobileOpen(false)} />
                </SheetContent>
            </Sheet>

            <div
                className={cn(
                    "flex min-h-dvh flex-col transition-[padding-left] duration-300 ease-in-out",
                    collapsed ? "lg:pl-19" : "lg:pl-64",
                )}
            >
                <AppTopbar
                    onToggleSidebar={() => setCollapsed((v) => !v)}
                    onOpenMobileNav={() => setMobileOpen(true)}
                />
                <main className="flex-1">{children}</main>
            </div>
        </div>
    );
}
