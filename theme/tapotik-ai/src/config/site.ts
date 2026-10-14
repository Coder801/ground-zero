import {
    BlocksIcon,
    BookOpenIcon,
    BotIcon,
    BriefcaseIcon,
    HistoryIcon,
    ImageIcon,
    MailIcon,
    MessageSquareIcon,
    MicIcon,
    NewspaperIcon,
    VideoIcon,
    type LucideIcon,
} from "lucide-react";

export const siteConfig = {
    name: "Tapotik AI",
    tagline: "The Ultimate AI SaaS & Startup Template for Modern Businesses",
    description:
        "Premium futuristic AI SaaS & startup template built with Next.js, Tailwind CSS and Framer Motion.",
    url: "https://tapotik-ai.vercel.app",
    year: new Date().getFullYear(),
    links: {
        twitter: "https://twitter.com",
        github: "https://github.com",
        linkedin: "https://linkedin.com",
        discord: "https://discord.com",
        youtube: "https://youtube.com",
    },
};

export type NavItem = {
    title: string;
    href: string;
    description?: string;
    icon?: LucideIcon;
};

export type NavGroup = {
    title: string;
    href?: string;
    items?: NavItem[];
};

export const mainNav: NavGroup[] = [
    {
        title: "Products",
        items: [
            {
                title: "AI Chat",
                href: "/ai-chat",
                description:
                    "Conversational AI assistant with multi-model support.",
                icon: MessageSquareIcon,
            },
            {
                title: "AI Image",
                href: "/ai-image",
                description: "Generate stunning visuals from text prompts.",
                icon: ImageIcon,
            },
            {
                title: "AI Video",
                href: "/ai-video",
                description: "Text-to-video generation with cinematic quality.",
                icon: VideoIcon,
            },
            {
                title: "AI Voice",
                href: "/ai-voice",
                description: "Lifelike speech synthesis in 40+ languages.",
                icon: MicIcon,
            },
            {
                title: "AI Agents",
                href: "/ai-agents",
                description:
                    "Autonomous agents that execute complex workflows.",
                icon: BotIcon,
            },
        ],
    },
    {
        title: "Features",
        href: "/features",
    },
    {
        title: "Pricing",
        href: "/pricing",
    },
    {
        title: "Resources",
        items: [
            {
                title: "Blog",
                href: "/blog",
                description: "Insights on AI, product and engineering.",
                icon: NewspaperIcon,
            },
            {
                title: "Documentation",
                href: "/docs",
                description: "Guides and API references to get started.",
                icon: BookOpenIcon,
            },
            {
                title: "Changelog",
                href: "/changelog",
                description: "Latest product updates and improvements.",
                icon: HistoryIcon,
            },
            {
                title: "Integrations",
                href: "/integrations",
                description: "Connect Tapotik with your favorite tools.",
                icon: BlocksIcon,
            },
            {
                title: "Careers",
                href: "/careers",
                description: "Join our mission to democratize AI.",
                icon: BriefcaseIcon,
            },
            {
                title: "Contact",
                href: "/contact",
                description: "Talk to our sales or support team.",
                icon: MailIcon,
            },
        ],
    },
    {
        title: "About",
        href: "/about",
    },
];

export const footerNav = {
    product: [
        { title: "AI Chat", href: "/ai-chat" },
        { title: "AI Image", href: "/ai-image" },
        { title: "AI Video", href: "/ai-video" },
        { title: "AI Voice", href: "/ai-voice" },
        { title: "AI Agents", href: "/ai-agents" },
        { title: "Pricing", href: "/pricing" },
        { title: "Changelog", href: "/changelog" },
    ],
    company: [
        { title: "About", href: "/about" },
        { title: "Careers", href: "/careers" },
        { title: "Blog", href: "/blog" },
        { title: "Contact", href: "/contact" },
    ],
    resources: [
        { title: "Documentation", href: "/docs" },
        { title: "Integrations", href: "/integrations" },
        { title: "Features", href: "/features" },
        { title: "Dashboard", href: "/dashboard" },
    ],
    legal: [
        { title: "Privacy Policy", href: "/privacy" },
        { title: "Terms of Service", href: "/terms" },
    ],
};
