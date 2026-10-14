import { cn } from "@/lib/utils";

/** Page section; anchors land below the sticky header via scroll-margin-top. */
export function Section({
    id,
    className,
    children,
    ...props
}: React.ComponentProps<"section">) {
    return (
        <section
            id={id}
            className={cn(
                "relative scroll-mt-(--header-height) py-16 lg:py-24",
                className,
            )}
            {...props}
        >
            <div className="container-wide">{children}</div>
        </section>
    );
}
