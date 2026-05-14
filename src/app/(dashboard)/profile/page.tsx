import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { LogoutButton } from "@/features/auth/components/LogoutButton"

export default function ProfilePage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-8">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Your account information</CardDescription>
            </div>
            <LogoutButton />
          </div>
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
  )
}
