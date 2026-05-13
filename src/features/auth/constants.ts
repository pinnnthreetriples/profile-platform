// Auth feature constants
export const AUTH_ROUTES = {
  LOGIN: "/login",
  REGISTER: "/register",
  LOGOUT: "/logout",
} as const

export const PROTECTED_ROUTES = ["/profile", "/payment"] as const
