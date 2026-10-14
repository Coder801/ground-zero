import { cn } from "@/lib/utils";

function FieldError({
    message,
    className,
}: {
    message?: string;
    className?: string;
}) {
    if (!message) return null;
    return (
        <p
            role="alert"
            className={cn("text-xs font-medium text-destructive", className)}
        >
            {message}
        </p>
    );
}

export { FieldError };
