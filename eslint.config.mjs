import { dirname } from "path"
import { fileURLToPath } from "url"
import { FlatCompat } from "@eslint/eslintrc"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "coverage/**",
      "playwright-report/**",
      "test-results/**",
      "supabase/.branches/**",
      "supabase/.temp/**",
      "next.config.ts",
      "next-env.d.ts",
      "postcss.config.mjs",
      "tailwind.config.ts",
      "vitest.config.ts",
      "playwright.config.ts",
      "eslint.config.mjs",
    ],
  },
  ...compat.extends("next/core-web-vitals"),
  {
    plugins: {
      "unused-imports": (await import("eslint-plugin-unused-imports")).default,
    },
    rules: {
      "unused-imports/no-unused-imports": "error",
    },
  },
]

export default eslintConfig
