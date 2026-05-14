import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { PAYMENT_STATUS_LABELS, PAYMENT_STATUS_VARIANTS } from "../constants"
import type { Profile } from "../types"

interface ProfileCardProps {
  profile: Profile
  email: string
}

export function ProfileCard({ profile, email }: ProfileCardProps) {
  const statusLabel =
    PAYMENT_STATUS_LABELS[profile.paymentStatus] ?? profile.paymentStatus
  const statusVariant = PAYMENT_STATUS_VARIANTS[profile.paymentStatus] ?? "secondary"

  return (
    <Card>
      <CardHeader>
        <CardTitle>{profile.displayName ?? "No display name set"}</CardTitle>
        <CardDescription>{email}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {profile.bio && <p className="text-sm text-muted-foreground">{profile.bio}</p>}
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Payment status:</span>
          <Badge variant={statusVariant}>{statusLabel}</Badge>
        </div>
      </CardContent>
    </Card>
  )
}
