"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
    BotIcon,
    CreditCardIcon,
    FileTextIcon,
    HomeIcon,
    ImageIcon,
    LayoutDashboardIcon,
    MessageSquareIcon,
    MicIcon,
    NewspaperIcon,
    SettingsIcon,
    SparklesIcon,
    VideoIcon,
} from "lucide-react";

import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
} from "@/components/ui/command";

const pages = [
    { label: "Home", href: "/", icon: HomeIcon },
    { label: "Features", href: "/features", icon: SparklesIcon },
    { label: "Pricing", href: "/pricing", icon: CreditCardIcon },
    { label: "Blog", href: "/blog", icon: NewspaperIcon },
    { label: "Documentation", href: "/docs", icon: FileTextIcon },
];

const products = [
    { label: "AI Chat", href: "/ai-chat", icon: MessageSquareIcon },
    { label: "AI Image", href: "/ai-image", icon: ImageIcon },
    { label: "AI Video", href: "/ai-video", icon: VideoIcon },
    { label: "AI Voice", href: "/ai-voice", icon: MicIcon },
    { label: "AI Agents", href: "/ai-agents", icon: BotIcon },
];

const app = [
    { label: "Dashboard", href: "/dashboard", icon: LayoutDashboardIcon },
    { label: "Settings", href: "/dashboard/settings", icon: SettingsIcon },
];

export function CommandMenu({
    open,
    onOpenChange,
}: {
    open: boolean;
    onOpenChange: (open: boolean) => void;
}) {
    const router = useRouter();

    useEffect(() => {
        function onKeyDown(e: KeyboardEvent) {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                onOpenChange(!open);
            }
        }
        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [open, onOpenChange]);

    function go(href: string) {
        onOpenChange(false);
        router.push(href);
    }

    return (
        <CommandDialog open={open} onOpenChange={onOpenChange}>
            <CommandInput placeholder="Search pages, products, docs..." />
            <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Pages">
                    {pages.map((p) => (
                        <CommandItem key={p.href} onSelect={() => go(p.href)}>
                            <p.icon />
                            {p.label}
                        </CommandItem>
                    ))}
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="AI Products">
                    {products.map((p) => (
                        <CommandItem key={p.href} onSelect={() => go(p.href)}>
                            <p.icon />
                            {p.label}
                        </CommandItem>
                    ))}
                </CommandGroup>
                <CommandSeparator />
                <CommandGroup heading="App">
                    {app.map((p) => (
                        <CommandItem key={p.href} onSelect={() => go(p.href)}>
                            <p.icon />
                            {p.label}
                            <CommandShortcut>↵</CommandShortcut>
                        </CommandItem>
                    ))}
                </CommandGroup>
            </CommandList>
        </CommandDialog>
    );
}
