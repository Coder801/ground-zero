import { site } from "@/data/site";

export function Footer() {
    return (
        <footer className="border-t">
            <div className="container-wide flex flex-col gap-2 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
                <p>
                    <span className="font-medium text-foreground">
                        {site.name}
                    </span>{" "}
                    · {site.serviceAreaShort}
                </p>
                <p>© {new Date().getFullYear()}</p>
            </div>
        </footer>
    );
}
