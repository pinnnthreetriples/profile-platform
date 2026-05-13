# Coding Rules

## General Rules

1. **TypeScript Only**
   - All code must be written in TypeScript
   - Use strict type checking
   - Avoid `any` type

2. **Separation of Concerns**
   - Do not mix UI and business logic
   - Keep components small and focused
   - Use features/ for business logic

3. **Security**
   - Never store secrets in client components
   - Use `NEXT_PUBLIC_*` prefix only for public env vars
   - Keep `SUPABASE_SERVICE_ROLE_KEY` and `BTCPAY_API_KEY` server-side only

4. **Payment Logic**
   - Do not implement payment confirmation on frontend
   - All payment status updates must come from backend/webhook
   - Never trust client-side payment status

5. **Component Guidelines**
   - Components should be small and reusable
   - Use shadcn/ui for UI components
   - Use Motion.dev only for UI animations
   - Avoid complex animations

6. **Import Aliases**
   - Always use `@/*` alias for imports
   - Example: `import { Button } from "@/components/ui/button"`

7. **Styling**
   - Use Tailwind CSS for styling
   - Use shadcn/ui components when possible
   - Follow Tailwind best practices

8. **File Organization**
   - Group related files by feature
   - Keep types close to their usage
   - Use index files sparingly

## Technology Restrictions

### ❌ Do Not Use

- WordPress
- PHP
- WooCommerce
- jQuery
- Class components (use functional components)

### ✅ Use

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui
- Motion.dev
- Supabase
- BTCPay Server

## Code Style

### Naming Conventions

- Components: PascalCase (`UserProfile.tsx`)
- Functions: camelCase (`createPayment()`)
- Constants: UPPER_SNAKE_CASE (`PAYMENT_ROUTES`)
- Types: PascalCase (`PaymentStatus`)

### File Structure

```typescript
// 1. Imports
import { useState } from "react"
import { Button } from "@/components/ui/button"

// 2. Types
type Props = {
  userId: string
}

// 3. Component
export function MyComponent({ userId }: Props) {
  // Component logic
}
```

### TypeScript Best Practices

- Use `type` for object shapes
- Use `interface` for extendable contracts
- Export types that are used in multiple files
- Use `const` assertions for literal types

## Environment Variables

### Public (Frontend Safe)

```
NEXT_PUBLIC_APP_URL
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
NEXT_PUBLIC_PAYMENT_CURRENCY
NEXT_PUBLIC_PAYMENT_NETWORK
```

### Private (Server-Side Only)

```
SUPABASE_SERVICE_ROLE_KEY
BTCPAY_SERVER_URL
BTCPAY_API_KEY
BTCPAY_STORE_ID
BTCPAY_WEBHOOK_SECRET
```

## Git Workflow

1. Create feature branch from `main`
2. Make small, focused commits
3. Write descriptive commit messages
4. Test before pushing
5. Create pull request for review

## Testing (Future Stages)

- Write tests for business logic
- Test payment flows thoroughly
- Test webhook handlers
- Use TypeScript for type safety
