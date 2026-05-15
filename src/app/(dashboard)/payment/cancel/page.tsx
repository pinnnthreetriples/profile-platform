import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

/**
 * Payment cancel page — UX only.
 *
 * IMPORTANT: This page does NOT mark the payment as cancelled.
 * Payment status is updated exclusively by the verified BTCPay webhook.
 * The invoice may still be valid if the user navigates back to /payment.
 */
export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Payment Cancelled</CardTitle>
          <CardDescription>You left the checkout page.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Your payment was not completed. Your invoice may still be active — you can
            return to the payment page to try again.
          </p>
          <div className="flex flex-col gap-2">
            <Button asChild className="w-full">
              <Link href="/payment">Try Again</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/profile">Go to Profile</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
