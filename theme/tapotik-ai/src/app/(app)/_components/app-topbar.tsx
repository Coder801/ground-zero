"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    BellIcon,
    BotIcon,
    ChevronRightIcon,
    MenuIcon,
    PanelLeftIcon,
    SearchIcon,
    SparklesIcon,
    ZapIcon,
} from "lucide-react";

import { CommandMenu } from "@/components/site/command-menu";
import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { getPageTitle } from "./nav-config";

const notifications = [
    {
        icon: BotIcon,
        tint: "text-primary bg-primary/10 border-primary/20",
        title: "Agent “Support triage” finished",
        description: "142 tickets processed, 3 escalated to humans.",
        time: "2m ago",
    },
    {
        icon: ZapIcon,
        tint: "text-warning bg-warning/10 border-warning/20",
        title: "Usage alert: 68% of credits",
        description: "You are on pace to hit your limit by Jul 24.",
        time: "1h ago",
    },
    {
        icon: SparklesIcon,
        tint: "text-accent-foreground dark:text-accent bg-accent/10 border-accent/20",
        title: "tapotik-v4.2 is live",
        description: "24% faster reasoning, same price per token.",
        time: "Yesterday",
    },
];

export function AppTopbar({
    onToggleSidebar,
    onOpenMobileNav,
}: {
    onToggleSidebar: () => void;
    onOpenMobileNav: () => void;
}) {
    const pathname = usePathname();
    const [searchOpen, setSearchOpen] = useState(false);
    const { section, title } = getPageTitle(pathname);

    return (
        <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-2 border-b bg-background/70 px-4 backdrop-blur-xl lg:px-6">
            <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                aria-label="Open navigation"
                onClick={onOpenMobileNav}
            >
                <MenuIcon className="size-5" />
            </Button>

            <Button
                variant="ghost"
                size="icon"
                className="hidden lg:inline-flex"
                aria-label="Toggle sidebar"
                onClick={onToggleSidebar}
            >
                <PanelLeftIcon className="size-4.5" />
            </Button>

            <div className="flex min-w-0 items-center gap-1.5">
                {section && (
                    <>
                        <span className="hidden text-sm text-muted-foreground sm:block">
                            {section}
                        </span>
                        <ChevronRightIcon
                            aria-hidden
                            className="hidden size-3.5 text-muted-foreground/60 sm:block"
                        />
                    </>
                )}
                <h1 className="truncate font-heading text-[15px] font-semibold tracking-tight">
                    {title}
                </h1>
            </div>

            <div className="ml-auto flex items-center gap-1.5 sm:gap-2">
                <button
                    type="button"
                    onClick={() => setSearchOpen(true)}
                    className={cn(
                        "hidden h-9 w-52 cursor-pointer items-center justify-between rounded-full border bg-muted/40 px-3.5 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground md:flex lg:w-64",
                    )}
                >
                    <span className="flex items-center gap-2">
                        <SearchIcon className="size-3.5" />
                        Search…
                    </span>
                    <kbd className="rounded-md border bg-background px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
                        ⌘K
                    </kbd>
                </button>
                <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden"
                    aria-label="Search"
                    onClick={() => setSearchOpen(true)}
                >
                    <SearchIcon className="size-4.5" />
                </Button>
                <CommandMenu open={searchOpen} onOpenChange={setSearchOpen} />

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            aria-label="Notifications (3 unread)"
                            className="relative"
                        >
                            <BellIcon className="size-4.5" />
                            <span
                                aria-hidden
                                className="absolute top-2 right-2.5 size-2 rounded-full bg-primary shadow-[0_0_8px_var(--glow-primary)]"
                            />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-80">
                        <DropdownMenuLabel className="flex items-center justify-between">
                            <span className="text-sm text-foreground">
                                Notifications
                            </span>
                            <Badge
                                variant="glow"
                                className="px-2 py-0 text-[10px]"
                            >
                                3 new
                            </Badge>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {notifications.map((n) => (
                            <DropdownMenuItem
                                key={n.title}
                                className="items-start gap-3 py-2.5"
                            >
                                <span
                                    className={cn(
                                        "mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg border",
                                        n.tint,
                                    )}
                                >
                                    <n.icon className="size-4 text-current" />
                                </span>
                                <span className="min-w-0 flex-1">
                                    <span className="block truncate text-sm font-medium text-foreground">
                                        {n.title}
                                    </span>
                                    <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">
                                        {n.description}
                                    </span>
                                    <span className="mt-1 block text-[10px] text-muted-foreground/70">
                                        {n.time}
                                    </span>
                                </span>
                            </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="justify-center text-xs text-primary focus:text-primary">
                            View all notifications
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <ThemeToggle />

                <Button
                    asChild
                    variant="gradient"
                    size="sm"
                    className="hidden sm:inline-flex"
                >
                    <Link href="/dashboard/billing">
                        <SparklesIcon className="size-3.5" />
                        Upgrade
                    </Link>
                </Button>
            </div>
        </header>
    );
}
