import { cn } from "@/lib/utils"

interface PageShellProps {
  children: React.ReactNode
  className?: string
  /** Remove horizontal padding (for full-bleed sections) */
  flush?: boolean
}

export function PageShell({ children, className, flush }: PageShellProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[1440px]",
        !flush && "px-4 md:px-7 2xl:px-12",
        className
      )}
    >
      {children}
    </div>
  )
}
