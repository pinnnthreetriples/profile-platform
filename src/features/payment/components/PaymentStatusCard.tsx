import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { PaymentStatus } from "@/types/database"

const STATUS_LABELS: Record<PaymentStatus, string> = {
  pending: "Pending",
  processing: "Processing",
  paid: "Paid",
  failed: "Failed",
  expired: "Expired",
  cancelled: "Cancelled",
}

const STATUS_VARIANTS: Record<
  PaymentStatus,
  "default" | "secondary" | "destructive" | "outline"
> = {
  pending: "secondary",
  processing: "secondary",
  paid: "default",
  failed: "destructive",
  expired: "outline",
  cancelled: "outline",
}

interface PaymentStatusCardProps {
  paymentStatus: PaymentStatus
}

export function PaymentStatusCard({ paymentStatus }: PaymentStatusCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Account Payment Status</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Status:</span>
          <Badge variant={STATUS_VARIANTS[paymentStatus]}>
            {STATUS_LABELS[paymentStatus]}
          </Badge>
        </div>
        {paymentStatus === "paid" && (
          <p className="mt-2 text-sm text-green-700">
            Your payment has been confirmed. Thank you.
          </p>
        )}
      </CardContent>
    </Card>
  )
}
