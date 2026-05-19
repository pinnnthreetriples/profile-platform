"use client"

import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { useTransition } from "react"
import { Button } from "@/components/ui/button"
import {
  modelCategoryOptions,
  modelLocationOptions,
  modelStatusOptions,
} from "@/lib/mock-data"

interface FilterSelectProps {
  label: string
  paramKey: string
  options: ReadonlyArray<{ value: string; label: string }>
}

/** Filter bar with three select dropdowns + reset/apply.
 *  All filtering is client-side over mock data; URL params persist state. */
export function ModelsFilters() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [pending, startTransition] = useTransition()

  function buildHref(updates: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams.toString())
    for (const [k, v] of Object.entries(updates)) {
      if (v == null || v === "all" || v === "") {
        params.delete(k)
      } else {
        params.set(k, v)
      }
    }
    const qs = params.toString()
    return qs ? `${pathname}?${qs}` : pathname
  }

  function handleChange(key: string, value: string) {
    startTransition(() => {
      router.replace(buildHref({ [key]: value }), { scroll: false })
    })
  }

  function handleReset() {
    startTransition(() => {
      router.replace(pathname, { scroll: false })
    })
  }

  return (
    <div className="grid gap-3 rounded-md border border-brand-line bg-brand-paper p-4 shadow-soft md:grid-cols-[auto_repeat(3,minmax(0,1fr))_auto_auto] md:items-center md:gap-4 md:p-5">
      <div
        className="hidden size-10 items-center justify-center rounded-full bg-brand-ink text-brand-paper md:flex"
        aria-hidden="true"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <line x1="4" y1="6" x2="20" y2="6" />
          <line x1="4" y1="12" x2="14" y2="12" />
          <line x1="4" y1="18" x2="10" y2="18" />
        </svg>
      </div>

      <FilterSelect
        label="Категория"
        paramKey="category"
        options={modelCategoryOptions}
        value={searchParams.get("category") ?? "all"}
        onChange={handleChange}
      />
      <FilterSelect
        label="Локация"
        paramKey="location"
        options={modelLocationOptions}
        value={searchParams.get("location") ?? "all"}
        onChange={handleChange}
      />
      <FilterSelect
        label="Статус"
        paramKey="status"
        options={modelStatusOptions}
        value={searchParams.get("status") ?? "all"}
        onChange={handleChange}
      />

      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={handleReset}
        disabled={pending}
        className="md:justify-self-end"
      >
        Сбросить
      </Button>
      <Button type="button" variant="lilac" size="sm">
        Применить →
      </Button>
    </div>
  )
}

function FilterSelect({
  label,
  paramKey,
  options,
  value,
  onChange,
}: FilterSelectProps & {
  value: string
  onChange: (key: string, value: string) => void
}) {
  return (
    <label className="block">
      <span className="block text-[10px] font-semibold uppercase tracking-widest text-brand-muted">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(paramKey, e.target.value)}
        className="mt-1 h-9 w-full rounded-md border border-brand-line bg-brand-bg px-2 text-sm text-brand-ink shadow-inner focus:border-brand-ink focus:outline-none"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </label>
  )
}
