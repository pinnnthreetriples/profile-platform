import type { Config } from "tailwindcss"

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: [
          "var(--font-oswald)",
          "Impact",
          "Arial Narrow",
          "ui-sans-serif",
          "sans-serif",
        ],
        hand: ["var(--font-caveat)", "Brush Script MT", "cursive"],
        script: ["var(--font-caveat)", "Brush Script MT", "cursive"],
      },
      transitionDuration: {
        section: "var(--dur-section)",
        hero: "var(--dur-hero)",
      },
      transitionTimingFunction: {
        editorial: "var(--ease)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        pill: "var(--radius-pill)",
      },
      colors: {
        /* shadcn/ui semantic tokens */
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",

        /* Short aliases — used by editorial components */
        ink: {
          DEFAULT: "#061f17",
          soft: "#4a5a52",
          mute: "#8a9189",
        },
        orange: {
          DEFAULT: "#ff5f1f",
          press: "#e0541a",
        },
        lilac: {
          DEFAULT: "#ddb4f2",
          2: "#c99ce0",
        },
        mustard: {
          DEFAULT: "#d9ae3f",
          2: "#b58e2e",
        },
        paper: "#f6f1e8",

        /* Brand palette — direct access */
        brand: {
          bg: "#f6f1e8",
          paper: "#fffdf7",
          ink: "#061f17",
          green: "#06281c",
          orange: "#ff5f1f",
          lilac: "#ddb4f2",
          "lilac-soft": "#ead4f7",
          mustard: "#d9ae3f",
          muted: "#9c9a90",
          line: "#d8d1c5",
          success: "#2e8b57",
          warning: "#d9ae3f",
          danger: "#d94a38",
        },
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        card: "var(--shadow-card)",
        hover: "var(--shadow-hover)",
      },
      screens: {
        xs: "375px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1440px",
      },
      keyframes: {
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        "spin-slow": "spin-slow 18s linear infinite",
      },
    },
  },
  plugins: [],
} satisfies Config
