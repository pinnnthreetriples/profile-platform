export default function AuthLoading() {
  return (
    <div className="w-full max-w-md space-y-4 px-4">
      <div className="rounded-lg bg-brand-paper p-6 shadow-card">
        <div className="space-y-4">
          <div className="h-6 w-24 animate-pulse rounded bg-brand-line" />
          <div className="h-4 w-48 animate-pulse rounded bg-brand-line" />
          <div className="h-10 animate-pulse rounded-md bg-brand-line" />
          <div className="h-10 animate-pulse rounded-md bg-brand-line" />
          <div className="h-10 animate-pulse rounded-pill bg-brand-line" />
        </div>
      </div>
    </div>
  )
}
