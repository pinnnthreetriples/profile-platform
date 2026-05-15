import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Payment } from "../types"
import type { PaymentStatus } from "@/types/database"

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

interface PaymentHistoryProps {
  payments: Payment[]
}

export function PaymentHistory({ payments }: PaymentHistoryProps) {
  if (payments.length === 0) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Payment History</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {payments.map((payment) => (
            <li
              key={payment.id}
              className="flex items-center justify-between text-sm border-b pb-2 last:border-0 last:pb-0"
            >
              <div className="space-y-0.5">
                <p className="font-medium">
                  {payment.amount} {payment.currency}
                </p>
                <p className="text-xs text-muted-foreground">
                  {new Date(payment.createdAt).toLocaleDateString()}
                </p>
              </div>
              <Badge variant={STATUS_VARIANTS[payment.status]}>{payment.status}</Badge>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
