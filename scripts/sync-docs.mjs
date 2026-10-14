// Publishes standalone pages from docs/ as static files in public/.
// docs/ stays the single source; the copies in public/ are generated (gitignored).
// Cloudflare Pages serves `public/<name>.html` at the clean URL `/<name>`.
import { copyFileSync, mkdirSync } from "node:fs";

const pages = [
    { from: "docs/elektryk-plan.html", to: "public/3-month-plan.html" },
];

mkdirSync("public", { recursive: true });
for (const { from, to } of pages) {
    copyFileSync(from, to);
    console.log(`sync-docs: ${from} → ${to}`);
}
