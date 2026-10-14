import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { AppReadyProvider } from "@/components/app-ready";
import { PageLoader } from "@/components/site/page-loader";
import { Toaster } from "@/components/ui/sonner";
import { siteConfig } from "@/config/site";
import "./globals.css";

const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    display: "swap",
});

const spaceGrotesk = Space_Grotesk({
    variable: "--font-space-grotesk",
    subsets: ["latin"],
    display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
    variable: "--font-jetbrains-mono",
    subsets: ["latin"],
    display: "swap",
});

export const metadata: Metadata = {
    metadataBase: new URL(siteConfig.url),
    title: {
        default: "Tapotik AI — The Ultimate AI SaaS & Startup Template",
        template: "%s — Tapotik AI",
    },
    description:
        "Premium futuristic AI SaaS & startup template built with Next.js, Tailwind CSS and Framer Motion. 40+ pages, 150+ components, dark & light mode.",
    keywords: [
        "AI SaaS template",
        "Next.js template",
        "startup template",
        "Tailwind CSS",
        "AI startup",
    ],
    openGraph: {
        title: "Tapotik AI — The Ultimate AI SaaS & Startup Template",
        description:
            "Premium futuristic AI SaaS & startup template for modern businesses.",
        type: "website",
        siteName: "Tapotik AI",
    },
    twitter: {
        card: "summary_large_image",
        title: "Tapotik AI — The Ultimate AI SaaS & Startup Template",
        description:
            "Premium futuristic AI SaaS & startup template for modern businesses.",
    },
};

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    themeColor: [
        { media: "(prefers-color-scheme: dark)", color: "#050816" },
        { media: "(prefers-color-scheme: light)", color: "#f7f8fc" },
    ],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html
            lang="en"
            suppressHydrationWarning
            data-scroll-behavior="smooth"
            className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} h-full antialiased`}
        >
            <body className="flex min-h-full flex-col font-sans">
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    <AppReadyProvider>{children}</AppReadyProvider>
                    <Toaster />
                </ThemeProvider>
                <PageLoader />
            </body>
        </html>
    );
}
