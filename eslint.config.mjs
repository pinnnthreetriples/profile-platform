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
      "*.config.ts",
      "*.config.mjs",
      "*.config.js",
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
