"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { docsNav } from "@/lib/data";

export function DocsSidebar() {
    const pathname = usePathname();

    return (
        <nav aria-label="Documentation" className="space-y-8">
            {docsNav.map((group) => (
                <div key={group.title}>
                    <p className="mb-2.5 px-3 text-[11px] font-semibold tracking-widest text-muted-foreground uppercase">
                        {group.title}
                    </p>
                    <ul className="space-y-0.5">
                        {group.items.map((item) => {
                            const active = pathname === item.href;
                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        aria-current={
                                            active ? "page" : undefined
                                        }
                                        className={cn(
                                            "relative flex items-center rounded-lg px-3 py-1.5 text-sm transition-colors",
                                            active
                                                ? "bg-primary/10 font-medium text-(--primary-bright)"
                                                : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                                        )}
                                    >
                                        {active ? (
                                            <span
                                                aria-hidden
                                                className="absolute left-0 h-4 w-0.5 rounded-full bg-primary"
                                            />
                                        ) : null}
                                        {item.title}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            ))}
        </nav>
    );
}

export function DocsMobileNav() {
    const pathname = usePathname();
    const items = docsNav.flatMap((group) => group.items);

    return (
        <nav
            aria-label="Documentation"
            className="-mx-6 no-scrollbar flex gap-2 overflow-x-auto px-6 lg:hidden"
        >
            {items.map((item) => {
                const active = pathname === item.href;
                return (
                    <Link
                        key={item.href}
                        href={item.href}
                        aria-current={active ? "page" : undefined}
                        className={cn(
                            "shrink-0 rounded-full border px-4 py-1.5 text-sm whitespace-nowrap transition-colors",
                            active
                                ? "border-primary/40 bg-primary/10 font-medium text-(--primary-bright)"
                                : "border-border text-muted-foreground hover:border-primary/30 hover:text-foreground",
                        )}
                    >
                        {item.title}
                    </Link>
                );
            })}
        </nav>
    );
}
