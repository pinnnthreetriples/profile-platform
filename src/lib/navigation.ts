import type { NavItem } from "@/types/navigation"

export const mainNav: NavItem[] = [
  { label: "Модели", href: "/models" },
  { label: "Как работает", href: "/how-it-works" },
  { label: "Для клиентов", href: "/clients" },
  { label: "Для моделей", href: "/models/apply" },
  { label: "Инвестиции", href: "/invest" },
  { label: "Тарифы", href: "/pricing" },
  { label: "О нас", href: "/about" },
]

export const authNav: NavItem[] = [
  { label: "Войти", href: "/login" },
  { label: "Регистрация", href: "/register" },
]

export const footerNav: NavItem[] = [
  { label: "Модели", href: "/models" },
  { label: "Инвестиции", href: "/invest" },
  { label: "О нас", href: "/about" },
  { label: "Контакты", href: "/contact" },
]

export const footerLegal: NavItem[] = [
  { label: "Политика конфиденциальности", href: "/privacy" },
  { label: "Условия использования", href: "/terms" },
  { label: "Оферта", href: "/offer" },
]
