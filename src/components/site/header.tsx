import { nav } from "@/data/site";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";

const linkClass =
    "rounded-full px-3 py-2 text-sm font-medium whitespace-nowrap text-muted-foreground transition-colors hover:text-foreground";

export function Header() {
    return (
        <header className="sticky top-0 z-50 border-b bg-background/85 backdrop-blur-lg">
            <div className="container-wide">
                <div className="flex h-14 items-center justify-between gap-3 md:h-(--header-height)">
                    <Logo />
                    <div className="flex items-center gap-1">
                        <nav
                            aria-label="Розділи сторінки"
                            className="hidden md:block"
                        >
                            <ul className="flex items-center">
                                {nav.map((item) => (
                                    <li key={item.href}>
                                        <a
                                            href={item.href}
                                            className={linkClass}
                                        >
                                            {item.title}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                        <ThemeToggle />
                    </div>
                </div>
                {/* Mobile: anchors in a second row instead of a menu drawer. */}
                <nav
                    aria-label="Розділи сторінки"
                    className="-mx-3 pb-2 md:hidden"
                >
                    <ul className="flex items-center justify-between">
                        {nav.map((item) => (
                            <li key={item.href}>
                                <a href={item.href} className={linkClass}>
                                    {item.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    );
}
