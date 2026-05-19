/**
 * Design tokens as JS constants.
 * Use these in dynamic styles or when CSS variables aren't accessible.
 * For static Tailwind classes, use the brand.* color palette directly.
 */

export const colors = {
  bg: "#f6f1e8",
  paper: "#fffdf7",
  ink: "#061f17",
  green: "#06281c",
  orange: "#ff5f1f",
  lilac: "#ddb4f2",
  lilacSoft: "#ead4f7",
  mustard: "#d9ae3f",
  muted: "#9c9a90",
  line: "#d8d1c5",
  success: "#2e8b57",
  warning: "#d9ae3f",
  danger: "#d94a38",
} as const

export const radii = {
  sm: "14px",
  md: "22px",
  lg: "32px",
  xl: "40px",
  pill: "999px",
} as const

export const spacing = {
  pageXDesktop: "48px",
  pageXTablet: "28px",
  pageXMobile: "16px",
  sectionYDesktop: "96px",
  sectionYMobile: "56px",
} as const

export const shadows = {
  soft: "0 12px 40px rgba(6, 31, 23, 0.08)",
  card: "0 18px 60px rgba(6, 31, 23, 0.12)",
  hover: "0 24px 80px rgba(6, 31, 23, 0.16)",
} as const
