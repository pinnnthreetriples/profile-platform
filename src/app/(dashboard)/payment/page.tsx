import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function PaymentPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Payment</CardTitle>
          <CardDescription>Payment placeholder</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Payment skeleton</p>
            <p className="text-sm text-muted-foreground">USDT payment card</p>
            <p className="text-sm text-muted-foreground">BTCPay checkout placeholder</p>
          </div>
          <Button disabled>Create Invoice (disabled)</Button>
        </CardContent>
      </Card>
    </div>
  )
}
