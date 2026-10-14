"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
    ArrowRightIcon,
    ChevronDownIcon,
    MenuIcon,
    SearchIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { mainNav, type NavGroup } from "@/config/site";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { CommandMenu } from "@/components/site/command-menu";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

function DesktopDropdown({ group }: { group: NavGroup }) {
    const [open, setOpen] = useState(false);

    return (
        <div
            className="relative"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
            onBlur={(e) => {
                // Close when focus leaves the trigger + panel entirely
                // (tabbing between the trigger and its links keeps it open).
                if (!e.currentTarget.contains(e.relatedTarget as Node | null)) {
                    setOpen(false);
                }
            }}
            onKeyDown={(e) => {
                if (e.key === "Escape") setOpen(false);
            }}
        >
            <button
                type="button"
                className={cn(
                    "flex cursor-pointer items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                    open && "text-foreground",
                )}
                aria-expanded={open}
                aria-haspopup="menu"
                onClick={() => setOpen((prev) => !prev)}
            >
                {group.title}
                <ChevronDownIcon
                    className={cn(
                        "size-3.5 transition-transform duration-200",
                        open && "rotate-180",
                    )}
                />
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.98 }}
                        transition={{ duration: 0.18, ease: "easeOut" }}
                        className="absolute top-full left-1/2 z-50 -translate-x-1/2 pt-3"
                    >
                        <div className="w-sm rounded-2xl p-2.5 shadow-2xl glass-strong">
                            <div className="grid grid-cols-1 gap-0.5">
                                {group.items?.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className="group flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-muted/60"
                                    >
                                        {item.icon && (
                                            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-muted/50 text-muted-foreground transition-colors duration-200 group-hover:border-primary/30 group-hover:bg-primary/10 group-hover:text-primary">
                                                <item.icon className="size-4.5" />
                                            </span>
                                        )}
                                        <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                                            <span className="text-sm font-medium transition-colors group-hover:text-primary">
                                                {item.title}
                                            </span>
                                            <span className="text-xs text-muted-foreground">
                                                {item.description}
                                            </span>
                                        </span>
                                        <ArrowRightIcon
                                            aria-hidden
                                            className="size-4 shrink-0 -translate-x-1 text-primary opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100"
                                        />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [commandOpen, setCommandOpen] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        function onScroll() {
            setScrolled(window.scrollY > 12);
        }
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <>
            <header
                className={cn(
                    "fixed inset-x-0 top-0 z-50 transition-all duration-300",
                    scrolled ? "py-2.5" : "py-4",
                )}
            >
                <div className="container-wide">
                    <div className="relative isolate flex h-14 items-center justify-between gap-4 rounded-2xl px-4 lg:px-5">
                        {/* Glass layer kept separate: backdrop-filter on the container
                            would form a backdrop root and break blur inside the dropdowns. */}
                        <div
                            aria-hidden
                            className={cn(
                                "absolute inset-0 -z-10 rounded-2xl transition-all duration-300",
                                scrolled
                                    ? "shadow-[0_8px_32px_-12px_rgba(0,0,0,0.4)] glass-strong"
                                    : "glass",
                            )}
                        />
                        <Logo />

                        <nav
                            className="hidden items-center lg:flex"
                            aria-label="Main navigation"
                        >
                            {mainNav.map((group) =>
                                group.items ? (
                                    <DesktopDropdown
                                        key={group.title}
                                        group={group}
                                    />
                                ) : (
                                    <Link
                                        key={group.title}
                                        href={group.href!}
                                        className={cn(
                                            "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                                            pathname === group.href
                                                ? "text-foreground"
                                                : "text-muted-foreground hover:text-foreground",
                                        )}
                                    >
                                        {group.title}
                                    </Link>
                                ),
                            )}
                        </nav>

                        <div className="flex items-center gap-1.5">
                            <Button
                                variant="ghost"
                                size="icon"
                                aria-label="Search"
                                className="hidden sm:inline-flex"
                                onClick={() => setCommandOpen(true)}
                            >
                                <SearchIcon className="size-4.5" />
                            </Button>
                            <ThemeToggle />
                            <Button
                                asChild
                                variant="ghost"
                                className="hidden md:inline-flex"
                            >
                                {/* prefetch={false} on auth links: the (auth) route group
                                    bundles its own framer-motion copy — keep it off marketing pages. */}
                                <Link href="/login" prefetch={false}>
                                    Log in
                                </Link>
                            </Button>
                            <Button
                                asChild
                                variant="gradient"
                                className="hidden sm:inline-flex"
                            >
                                <Link href="/signup" prefetch={false}>
                                    Get Started
                                </Link>
                            </Button>

                            <Sheet
                                open={mobileMenuOpen}
                                onOpenChange={setMobileMenuOpen}
                            >
                                <SheetTrigger asChild>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="lg:hidden"
                                        aria-label="Open menu"
                                    >
                                        <MenuIcon className="size-5" />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent
                                    side="right"
                                    className="w-full max-w-sm overflow-y-auto bg-popover/90 backdrop-blur-xl"
                                >
                                    <SheetHeader className="pb-0">
                                        <SheetTitle>
                                            <Logo />
                                        </SheetTitle>
                                    </SheetHeader>
                                    <nav
                                        className="flex flex-col px-6 pb-6"
                                        aria-label="Mobile navigation"
                                    >
                                        <Accordion
                                            type="multiple"
                                            className="w-full"
                                        >
                                            {mainNav.map((group) =>
                                                group.items ? (
                                                    <AccordionItem
                                                        key={group.title}
                                                        value={group.title}
                                                    >
                                                        <AccordionTrigger className="py-4 text-sm">
                                                            {group.title}
                                                        </AccordionTrigger>
                                                        <AccordionContent>
                                                            <div className="flex flex-col gap-1">
                                                                {group.items.map(
                                                                    (item) => (
                                                                        <Link
                                                                            key={
                                                                                item.href
                                                                            }
                                                                            href={
                                                                                item.href
                                                                            }
                                                                            onClick={() =>
                                                                                setMobileMenuOpen(
                                                                                    false,
                                                                                )
                                                                            }
                                                                            className="group flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
                                                                        >
                                                                            {item.icon && (
                                                                                <item.icon className="size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
                                                                            )}
                                                                            {
                                                                                item.title
                                                                            }
                                                                        </Link>
                                                                    ),
                                                                )}
                                                            </div>
                                                        </AccordionContent>
                                                    </AccordionItem>
                                                ) : (
                                                    <div
                                                        key={group.title}
                                                        className="border-b last:border-b-0"
                                                    >
                                                        <Link
                                                            href={group.href!}
                                                            onClick={() =>
                                                                setMobileMenuOpen(
                                                                    false,
                                                                )
                                                            }
                                                            className="flex py-4 text-sm font-medium transition-colors hover:text-primary"
                                                        >
                                                            {group.title}
                                                        </Link>
                                                    </div>
                                                ),
                                            )}
                                        </Accordion>
                                        <div className="mt-6 flex flex-col gap-2.5">
                                            <Button asChild variant="outline">
                                                <Link
                                                    href="/login"
                                                    prefetch={false}
                                                    onClick={() =>
                                                        setMobileMenuOpen(false)
                                                    }
                                                >
                                                    Log in
                                                </Link>
                                            </Button>
                                            <Button asChild variant="gradient">
                                                <Link
                                                    href="/signup"
                                                    prefetch={false}
                                                    onClick={() =>
                                                        setMobileMenuOpen(false)
                                                    }
                                                >
                                                    Get Started
                                                </Link>
                                            </Button>
                                        </div>
                                    </nav>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </div>
            </header>
            <CommandMenu open={commandOpen} onOpenChange={setCommandOpen} />
        </>
    );
}
