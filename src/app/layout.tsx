import type { Metadata } from "next"
import { Inter, Oswald } from "next/font/google"
import { Providers } from "./providers"
import "./globals.css"

/**
 * Body font — Inter (latin + cyrillic).
 * Loaded via next/font for self-hosting and zero runtime requests.
 */
const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-inter",
})

/**
 * Display font — Oswald condensed (latin + cyrillic).
 * Used for hero, section titles and editorial headings.
 */
const oswald = Oswald({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  variable: "--font-oswald",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Models Platform — профессиональные модели и USDT-платежи",
  description:
    "Платформа проверенных моделей для брендов, фотографов и продакшн-команд. Прозрачные платежи в USDT, прямой контакт через Telegram.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className={`${inter.variable} ${oswald.variable}`}>
      <body className="font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
