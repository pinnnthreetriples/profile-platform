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
 * Payment success page — UX only.
 *
 * IMPORTANT: This page does NOT confirm or mark payment as paid.
 * Payment status is updated exclusively by the verified BTCPay webhook.
 * Blockchain confirmation may take a few minutes after this redirect.
 */
export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Payment Submitted</CardTitle>
          <CardDescription>Your payment is being processed.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Your transaction has been submitted to the TRON network. Confirmation
            typically takes a few minutes. Your account status will update automatically
            once the payment is verified.
          </p>
          <p className="text-sm text-muted-foreground">
            You do not need to stay on this page. Check your profile for the updated
            payment status.
          </p>
          <div className="flex flex-col gap-2">
            <Button asChild className="w-full">
              <Link href="/profile">Go to Profile</Link>
            </Button>
            <Button asChild variant="outline" className="w-full">
              <Link href="/payment">Back to Payment</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
