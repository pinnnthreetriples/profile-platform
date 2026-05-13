import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Payment Success</CardTitle>
          <CardDescription>Payment success placeholder</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">Your payment was successful.</p>
          <Button asChild className="w-full">
            <Link href="/profile">Go to Profile</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
