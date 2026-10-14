import { LoaderCircleIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

export function SubmitButton({
    pending,
    pendingLabel,
    children,
    ...props
}: React.ComponentProps<typeof Button> & {
    pending: boolean;
    pendingLabel: string;
}) {
    return (
        <Button type="submit" disabled={pending} {...props}>
            {pending ? (
                <>
                    <LoaderCircleIcon className="animate-spin" aria-hidden />
                    {pendingLabel}
                </>
            ) : (
                children
            )}
        </Button>
    );
}
