"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    ChevronsUpDownIcon,
    CreditCardIcon,
    LogOutIcon,
    SettingsIcon,
    SparklesIcon,
    UserIcon,
    ZapIcon,
} from "lucide-react";

import { Logo, LogoMark } from "@/components/logo";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import { Progress } from "@/components/ui/progress";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { appNav, isNavItemActive } from "./nav-config";

function NavLink({
    item,
    active,
    collapsed,
    onNavigate,
}: {
    item: (typeof appNav)[number]["items"][number];
    active: boolean;
    collapsed: boolean;
    onNavigate?: () => void;
}) {
    const link = (
        <Link
            href={item.href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
                "group relative flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition-colors duration-200",
                active
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                collapsed && "justify-center px-0",
            )}
        >
            <span
                aria-hidden
                className={cn(
                    "absolute top-1/2 -left-3 h-5 w-0.75 -translate-y-1/2 rounded-r-full bg-primary transition-all duration-300",
                    active ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0",
                )}
            />
            <item.icon
                className={cn(
                    "size-4.5 shrink-0 transition-colors",
                    active
                        ? "text-primary"
                        : "text-muted-foreground group-hover:text-foreground",
                )}
            />
            {!collapsed && (
                <span className="flex-1 truncate">{item.label}</span>
            )}
            {!collapsed && item.badge && (
                <Badge variant="accent" className="px-2 py-0 text-[10px]">
                    {item.badge}
                </Badge>
            )}
        </Link>
    );

    if (!collapsed) return link;

    return (
        <Tooltip>
            <TooltipTrigger asChild>{link}</TooltipTrigger>
            <TooltipContent side="right">{item.label}</TooltipContent>
        </Tooltip>
    );
}

export function AppSidebar({
    collapsed = false,
    onNavigate,
}: {
    collapsed?: boolean;
    onNavigate?: () => void;
}) {
    const pathname = usePathname();

    return (
        <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
            <div
                className={cn(
                    "flex h-16 shrink-0 items-center border-b border-sidebar-border",
                    collapsed ? "justify-center px-2" : "px-5",
                )}
            >
                {collapsed ? (
                    <Link href="/" aria-label="Tapotik AI home">
                        <LogoMark className="size-7" />
                    </Link>
                ) : (
                    <Logo />
                )}
            </div>

            <nav
                className={cn(
                    "no-scrollbar flex-1 space-y-6 overflow-y-auto py-5",
                    collapsed ? "px-3" : "px-3",
                )}
                aria-label="Dashboard"
            >
                {appNav.map((section) => (
                    <div key={section.label}>
                        {!collapsed ? (
                            <p className="mb-2 px-3 text-[11px] font-semibold tracking-wider text-muted-foreground/70 uppercase">
                                {section.label}
                            </p>
                        ) : (
                            <div
                                aria-hidden
                                className="mx-auto mb-2 h-px w-6 bg-sidebar-border"
                            />
                        )}
                        <div className="space-y-1">
                            {section.items.map((item) => (
                                <NavLink
                                    key={item.href}
                                    item={item}
                                    active={isNavItemActive(
                                        pathname,
                                        item.href,
                                    )}
                                    collapsed={collapsed}
                                    onNavigate={onNavigate}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </nav>

            {!collapsed && (
                <div className="px-3 pb-3">
                    <div className="relative overflow-hidden rounded-2xl border bg-card/60 p-4">
                        <div
                            aria-hidden
                            className="pointer-events-none absolute -top-10 -right-10 size-24 rounded-full bg-primary/15 blur-2xl"
                        />
                        <div className="flex items-center justify-between">
                            <p className="flex items-center gap-1.5 text-xs font-semibold">
                                <ZapIcon className="size-3.5 text-primary" />
                                Credits
                            </p>
                            <span className="text-[11px] font-medium text-muted-foreground">
                                68% used
                            </span>
                        </div>
                        <Progress value={68} className="mt-3 h-1.5" />
                        <p className="mt-2 text-[11px] text-muted-foreground">
                            <span className="font-medium text-foreground">
                                17,000
                            </span>{" "}
                            of 25,000 monthly credits
                        </p>
                        <Button
                            asChild
                            variant="outline"
                            size="sm"
                            className="mt-3 w-full text-xs"
                        >
                            <Link href="/dashboard/billing">
                                <SparklesIcon className="size-3.5 text-primary" />
                                Upgrade plan
                            </Link>
                        </Button>
                    </div>
                </div>
            )}

            <div className="border-t border-sidebar-border p-3">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button
                            type="button"
                            aria-label="Account menu"
                            className={cn(
                                "flex w-full cursor-pointer items-center gap-3 rounded-xl p-2 text-left outline-hidden transition-colors hover:bg-muted/60 focus-visible:ring-2 focus-visible:ring-ring/50",
                                collapsed && "justify-center",
                            )}
                        >
                            <Avatar className="size-9">
                                <AvatarFallback>AK</AvatarFallback>
                            </Avatar>
                            {!collapsed && (
                                <>
                                    <span className="min-w-0 flex-1">
                                        <span className="block truncate text-sm font-medium">
                                            Alex Kim
                                        </span>
                                        <span className="block truncate text-[11px] text-muted-foreground">
                                            alex@lumina.dev
                                        </span>
                                    </span>
                                    <ChevronsUpDownIcon className="size-4 shrink-0 text-muted-foreground" />
                                </>
                            )}
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        side={collapsed ? "right" : "top"}
                        align={collapsed ? "end" : "center"}
                        className="w-56"
                    >
                        <DropdownMenuLabel>
                            <span className="block text-sm font-medium text-foreground">
                                Alex Kim
                            </span>
                            <span className="block text-xs font-normal">
                                alex@lumina.dev
                            </span>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                            <Link href="/dashboard/settings">
                                <UserIcon />
                                Profile
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href="/dashboard/settings">
                                <SettingsIcon />
                                Settings
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                            <Link href="/dashboard/billing">
                                <CreditCardIcon />
                                Billing
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem variant="destructive" asChild>
                            <Link href="/login">
                                <LogOutIcon />
                                Log out
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
}
