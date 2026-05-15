import Link from "next/link"

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-brand-bg">
      {/* Minimal auth header */}
      <header className="flex h-14 items-center border-b border-brand-line bg-brand-paper px-4 md:px-7">
        <Link href="/" className="text-base font-bold tracking-tight text-brand-ink">
          Models<span className="text-brand-orange">.</span>
        </Link>
      </header>
      <main className="flex flex-1 items-center justify-center py-12">{children}</main>
    </div>
  )
}
