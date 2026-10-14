import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
    ...nextVitals,
    ...nextTs,
    // `theme/` is the untouched original purchase, kept for reference only.
    globalIgnores([
        ".next/**",
        "out/**",
        "next-env.d.ts",
        "theme/**",
        "docs/**",
    ]),
]);

export default eslintConfig;
