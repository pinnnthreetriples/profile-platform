import { PageShell } from "@/components/layout/PageShell"

export default function DashboardLoading() {
  return (
    <PageShell className="py-12">
      <div className="mx-auto max-w-2xl space-y-6">
        {/* Header skeleton */}
        <div className="h-8 w-32 animate-pulse rounded-md bg-brand-line" />
        {/* Card skeleton */}
        <div className="rounded-lg bg-brand-paper p-6 shadow-card">
          <div className="space-y-3">
            <div className="h-5 w-48 animate-pulse rounded bg-brand-line" />
            <div className="h-4 w-32 animate-pulse rounded bg-brand-line" />
          </div>
        </div>
        {/* Form skeleton */}
        <div className="rounded-lg bg-brand-paper p-6 shadow-card">
          <div className="space-y-4">
            <div className="h-4 w-24 animate-pulse rounded bg-brand-line" />
            <div className="h-10 animate-pulse rounded-md bg-brand-line" />
            <div className="h-4 w-16 animate-pulse rounded bg-brand-line" />
            <div className="h-10 animate-pulse rounded-md bg-brand-line" />
            <div className="h-10 w-32 animate-pulse rounded-pill bg-brand-line" />
          </div>
        </div>
      </div>
    </PageShell>
  )
}
