"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { logoutAction } from "../actions"

export function LogoutButton() {
  const [isPending, setIsPending] = useState(false)

  const handleLogout = async () => {
    setIsPending(true)
    await logoutAction()
  }

  return (
    <Button onClick={handleLogout} variant="outline" disabled={isPending}>
      {isPending ? "Logging out..." : "Logout"}
    </Button>
  )
}
