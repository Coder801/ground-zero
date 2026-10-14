import type { Metadata, Viewport } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { site } from "@/data/site";
import "./globals.css";

const roboto = Roboto({
    variable: "--font-roboto",
    subsets: ["latin", "cyrillic"],
    display: "swap",
});

const robotoMono = Roboto_Mono({
    variable: "--font-roboto-mono",
    subsets: ["latin", "cyrillic"],
    display: "swap",
});

export const metadata: Metadata = {
    metadataBase: new URL(site.url),
    title: site.title,
    description: site.description,
    alternates: { canonical: "/" },
    openGraph: {
        type: "website",
        locale: "uk_UA",
        url: "/",
        siteName: site.name,
        title: site.title,
        description: site.description,
        images: [
            {
                url: site.ogImage,
                width: 1200,
                height: 630,
                alt: `${site.name} — ${site.role}, ${site.city}`,
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: site.title,
        description: site.description,
        images: [site.ogImage],
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
            lang="uk"
            suppressHydrationWarning
            data-scroll-behavior="smooth"
            className={`${roboto.variable} ${robotoMono.variable} h-full antialiased`}
        >
            <body className="flex min-h-full flex-col font-sans">
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                </ThemeProvider>
            </body>
        </html>
    );
}
