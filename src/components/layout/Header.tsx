import Link from "next/link"

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="text-lg font-semibold">
            USDT Profile Platform
          </Link>
          <div className="flex gap-4">
            <Link href="/login" className="text-sm hover:underline">
              Login
            </Link>
            <Link href="/register" className="text-sm hover:underline">
              Register
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
