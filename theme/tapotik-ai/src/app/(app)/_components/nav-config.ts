import {
    BotIcon,
    CreditCardIcon,
    ImageIcon,
    LayoutDashboardIcon,
    MessageSquareIcon,
    MicIcon,
    SettingsIcon,
    type LucideIcon,
} from "lucide-react";

export type AppNavItem = {
    label: string;
    href: string;
    icon: LucideIcon;
    badge?: string;
};

export type AppNavSection = {
    label: string;
    items: AppNavItem[];
};

export const appNav: AppNavSection[] = [
    {
        label: "Overview",
        items: [
            {
                label: "Overview",
                href: "/dashboard",
                icon: LayoutDashboardIcon,
            },
        ],
    },
    {
        label: "AI Studio",
        items: [
            { label: "Chat", href: "/dashboard/chat", icon: MessageSquareIcon },
            { label: "Image", href: "/dashboard/image", icon: ImageIcon },
            {
                label: "Voice",
                href: "/dashboard/voice",
                icon: MicIcon,
                badge: "Beta",
            },
            { label: "Agents", href: "/dashboard/agents", icon: BotIcon },
        ],
    },
    {
        label: "Workspace",
        items: [
            {
                label: "Settings",
                href: "/dashboard/settings",
                icon: SettingsIcon,
            },
            {
                label: "Billing",
                href: "/dashboard/billing",
                icon: CreditCardIcon,
            },
        ],
    },
];

export function isNavItemActive(pathname: string, href: string) {
    if (href === "/dashboard") return pathname === "/dashboard";
    return pathname === href || pathname.startsWith(`${href}/`);
}

/** Breadcrumb-ish title for the topbar, derived from the pathname. */
export function getPageTitle(pathname: string): {
    section: string | null;
    title: string;
} {
    for (const section of appNav) {
        for (const item of section.items) {
            if (isNavItemActive(pathname, item.href)) {
                return {
                    section: item.href === "/dashboard" ? null : "Dashboard",
                    title: item.label,
                };
            }
        }
    }
    return { section: null, title: "Dashboard" };
}
