import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function ProfilePage() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Profile placeholder</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">User profile placeholder</p>
            <div className="flex items-center gap-2">
              <span className="text-sm">Payment status:</span>
              <Badge variant="secondary">Pending</Badge>
            </div>
          </div>
          <Button asChild>
            <Link href="/payment">Pay with USDT</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
