import { Navbar } from "@/components/site/navbar";
import { Footer } from "@/components/site/footer";
import { SmoothScroll } from "@/components/effects/smooth-scroll";

export default function MarketingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative flex min-h-screen flex-col">
            <SmoothScroll />
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    );
}
