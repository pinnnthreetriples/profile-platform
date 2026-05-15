"use client"

import { useEffect } from "react"
import { PageShell } from "@/components/layout/PageShell"
import { Button } from "@/components/ui/button"

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function DashboardError({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log to error reporting service in production
    console.error(error)
  }, [error])

  return (
    <PageShell className="flex flex-1 items-center py-12">
      <div className="mx-auto max-w-md space-y-4 text-center">
        <div className="text-4xl">⚠️</div>
        <h2 className="text-xl font-bold text-brand-ink">Что-то пошло не так</h2>
        <p className="text-sm text-brand-muted">
          Произошла ошибка при загрузке страницы. Попробуйте ещё раз.
        </p>
        <Button variant="primaryOrange" onClick={reset}>
          Попробовать снова
        </Button>
      </div>
    </PageShell>
  )
}
