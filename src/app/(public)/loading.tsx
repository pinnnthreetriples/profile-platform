import { PageShell } from "@/components/layout/PageShell"

export default function PublicLoading() {
  return (
    <main className="bg-brand-bg">
      <section className="py-20 md:py-32">
        <PageShell>
          <div className="mx-auto max-w-3xl space-y-6 text-center">
            <div className="mx-auto h-6 w-32 animate-pulse rounded-pill bg-brand-line" />
            <div className="mx-auto h-12 w-3/4 animate-pulse rounded-md bg-brand-line" />
            <div className="mx-auto h-6 w-2/3 animate-pulse rounded bg-brand-line" />
          </div>
        </PageShell>
      </section>
      <section className="border-y border-brand-line bg-brand-paper py-12">
        <PageShell>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-lg bg-brand-bg p-5">
                <div className="h-4 w-16 animate-pulse rounded bg-brand-line" />
                <div className="mt-2 h-8 w-20 animate-pulse rounded bg-brand-line" />
              </div>
            ))}
          </div>
        </PageShell>
      </section>
    </main>
  )
}
