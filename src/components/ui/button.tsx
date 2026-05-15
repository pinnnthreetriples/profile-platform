import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap",
    "rounded-pill text-sm font-semibold uppercase tracking-wide",
    "transition-all duration-150 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-40",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
    "active:scale-[0.98]",
  ].join(" "),
  {
    variants: {
      variant: {
        /* Primary orange — main CTA */
        primaryOrange: [
          "bg-brand-orange text-white shadow-soft",
          "hover:bg-brand-orange/90 hover:shadow-card hover:-translate-y-0.5",
        ].join(" "),

        /* Dark ink — secondary CTA */
        dark: [
          "bg-brand-ink text-brand-paper shadow-soft",
          "hover:bg-brand-green hover:shadow-card hover:-translate-y-0.5",
        ].join(" "),

        /* Outline — tertiary */
        outline: [
          "border border-brand-line bg-transparent text-brand-ink",
          "hover:bg-brand-ink hover:text-brand-paper hover:border-brand-ink",
        ].join(" "),

        /* Lilac — accent */
        lilac: [
          "bg-brand-lilac text-brand-ink shadow-soft",
          "hover:bg-brand-lilac/80 hover:shadow-card hover:-translate-y-0.5",
        ].join(" "),

        /* Ghost — minimal */
        ghost: ["bg-transparent text-brand-ink", "hover:bg-brand-line/40"].join(" "),

        /* Text — link-style */
        text: [
          "bg-transparent text-brand-orange underline-offset-4 p-0 h-auto",
          "hover:underline",
        ].join(" "),

        /* shadcn defaults — kept for compatibility */
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        link: "text-primary underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        default: "h-10 px-5 py-2.5",
        sm: "h-8 px-4 text-xs",
        lg: "h-12 px-8 text-base",
        xl: "h-14 px-10 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  loading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={loading ?? props.disabled}
        {...props}
      >
        {loading ? (
          <>
            <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            {children}
          </>
        ) : (
          children
        )}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
