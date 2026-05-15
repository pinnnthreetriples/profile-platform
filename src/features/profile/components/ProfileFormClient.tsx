"use client"

import { useRef } from "react"
import { useQueryClient } from "@tanstack/react-query"
import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { updateProfileAction } from "../actions"
import { queryKeys } from "@/lib/query/keys"
import type { Profile, ProfileActionResult } from "../types"

interface ProfileFormClientProps {
  profile: Profile
}

/**
 * Profile edit form with TanStack Query cache invalidation.
 *
 * Uses useActionState for form handling (server action).
 * On success, invalidates the profile query so any component
 * using useQuery(currentProfileQueryOptions) gets fresh data.
 */
export function ProfileFormClient({ profile }: ProfileFormClientProps) {
  const queryClient = useQueryClient()
  const formRef = useRef<HTMLFormElement>(null)

  async function wrappedAction(
    prevState: ProfileActionResult | null,
    formData: FormData
  ): Promise<ProfileActionResult> {
    const result = await updateProfileAction(prevState, formData)

    if (result.ok) {
      // Invalidate profile cache — triggers refetch in any useQuery subscriber
      await queryClient.invalidateQueries({ queryKey: queryKeys.profile.current })
    }

    return result
  }

  const [state, formAction, isPending] = useActionState<
    ProfileActionResult | null,
    FormData
  >(wrappedAction, null)

  return (
    <div className="rounded-lg bg-brand-paper p-6 shadow-card">
      <div className="mb-4">
        <h2 className="font-semibold text-brand-ink">Редактировать профиль</h2>
        <p className="text-sm text-brand-muted">Обновите имя, биографию и аватар.</p>
      </div>

      <form ref={formRef} action={formAction} className="space-y-4">
        <div className="space-y-1.5">
          <Label htmlFor="displayName">Имя</Label>
          <Input
            id="displayName"
            name="displayName"
            type="text"
            placeholder="Ваше имя"
            defaultValue={profile.displayName ?? ""}
            maxLength={80}
            disabled={isPending}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="bio">Биография</Label>
          <Input
            id="bio"
            name="bio"
            type="text"
            placeholder="Коротко о себе"
            defaultValue={profile.bio ?? ""}
            maxLength={500}
            disabled={isPending}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="avatarUrl">URL аватара</Label>
          <Input
            id="avatarUrl"
            name="avatarUrl"
            type="url"
            placeholder="https://example.com/avatar.png"
            defaultValue={profile.avatarUrl ?? ""}
            disabled={isPending}
          />
        </div>

        {state && !state.ok && (
          <div
            role="alert"
            className="rounded-md bg-brand-danger/10 p-3 text-sm text-brand-danger"
          >
            {state.message}
          </div>
        )}

        {state?.ok && (
          <div
            role="status"
            className="rounded-md bg-brand-success/10 p-3 text-sm text-brand-success"
          >
            Профиль обновлён.
          </div>
        )}

        <Button variant="dark" type="submit" loading={isPending}>
          {isPending ? "Сохранение..." : "Сохранить"}
        </Button>
      </form>
    </div>
  )
}
