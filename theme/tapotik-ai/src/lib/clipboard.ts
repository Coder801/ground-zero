import { toast } from "sonner";

import { copyToClipboard } from "@/lib/utils";

/**
 * Kept out of `utils.ts` so `sonner` never reaches server components importing
 * only `cn`/`formatDate`. Returns whether the copy succeeded.
 */
export async function copyWithToast(
    text: string,
    messages: { success: string; error: string },
): Promise<boolean> {
    const ok = await copyToClipboard(text);
    toast[ok ? "success" : "error"](ok ? messages.success : messages.error);
    return ok;
}
