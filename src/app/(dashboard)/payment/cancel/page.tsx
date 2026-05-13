import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PaymentCancelPage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Payment Cancelled</CardTitle>
          <CardDescription>Payment cancelled / failed placeholder</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Your payment was cancelled or failed.
          </p>
          <Button asChild className="w-full">
            <Link href="/payment">Try Again</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
