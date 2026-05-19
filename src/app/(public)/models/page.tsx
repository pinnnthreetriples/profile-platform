import { Suspense } from "react"
import { ModelsCatalogClient } from "@/features/catalog/components/ModelsCatalogClient"

export const metadata = {
  title: "Каталог моделей — Models Platform",
  description:
    "Подборка проверенных моделей. Фильтрация по категориям, локациям и доступности.",
}

export default function ModelsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center text-brand-muted">
          Загрузка каталога...
        </div>
      }
    >
      <ModelsCatalogClient />
    </Suspense>
  )
}
