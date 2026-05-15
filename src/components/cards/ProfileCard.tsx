import Image from "next/image"
import { PaymentStatusBadge } from "@/components/badges/PaymentStatusBadge"
import { cn } from "@/lib/utils"
import type { UserProfile } from "@/types/user"

interface ProfileCardProps {
  profile: UserProfile
  email?: string
  className?: string
}

export function ProfileCard({ profile, email, className }: ProfileCardProps) {
  return (
    <div className={cn("rounded-lg bg-brand-paper p-6 shadow-card", className)}>
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="relative size-16 shrink-0 overflow-hidden rounded-full bg-brand-line">
          {profile.avatarUrl ? (
            <Image
              src={profile.avatarUrl}
              alt={profile.displayName ?? "Avatar"}
              fill
              className="object-cover"
              sizes="64px"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-2xl text-brand-muted">
              👤
            </div>
          )}
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1 space-y-1">
          <p className="truncate font-semibold text-brand-ink">
            {profile.displayName ?? "Без имени"}
          </p>
          {email && <p className="truncate text-sm text-brand-muted">{email}</p>}
          {profile.bio && (
            <p className="line-clamp-2 text-sm text-brand-muted">{profile.bio}</p>
          )}
          <div className="pt-1">
            <PaymentStatusBadge status={profile.paymentStatus} />
          </div>
        </div>
      </div>
    </div>
  )
}
