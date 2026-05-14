"use client"

import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { updateProfileAction } from "../actions"
import type { Profile, ProfileActionResult } from "../types"

interface ProfileFormProps {
  profile: Profile
}

export function ProfileForm({ profile }: ProfileFormProps) {
  const [state, formAction, isPending] = useActionState<
    ProfileActionResult | null,
    FormData
  >(updateProfileAction, null)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Profile</CardTitle>
        <CardDescription>Update your display name, bio, and avatar URL.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="displayName">Display Name</Label>
            <Input
              id="displayName"
              name="displayName"
              type="text"
              placeholder="Your display name"
              defaultValue={profile.displayName ?? ""}
              maxLength={80}
              disabled={isPending}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Input
              id="bio"
              name="bio"
              type="text"
              placeholder="A short bio about yourself"
              defaultValue={profile.bio ?? ""}
              maxLength={500}
              disabled={isPending}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="avatarUrl">Avatar URL</Label>
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
            <div role="alert" className="rounded-md bg-red-50 p-3 text-sm text-red-800">
              {state.message}
            </div>
          )}

          {state?.ok && (
            <div
              role="status"
              className="rounded-md bg-green-50 p-3 text-sm text-green-800"
            >
              Profile updated successfully.
            </div>
          )}

          <Button type="submit" disabled={isPending}>
            {isPending ? "Saving..." : "Save Changes"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
