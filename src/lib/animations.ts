/**
 * Motion.dev animation presets.
 * Import and spread into motion component props.
 *
 * Respects prefers-reduced-motion via CSS — Motion.dev handles this
 * automatically when using the `motion` component.
 */

import type { Variants, Transition } from "motion/react"

/* ---- Transitions ---- */

export const easeOut: Transition = {
  ease: "easeOut",
  duration: 0.22,
}

export const easeOutSlow: Transition = {
  ease: "easeOut",
  duration: 0.35,
}

/* ---- Page transition ---- */

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 8, filter: "blur(2px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -4, filter: "blur(1px)" },
}

export const pageTransitionConfig: Transition = {
  duration: 0.22,
  ease: "easeOut",
}

/* ---- Fade up (section reveal) ---- */

export const fadeUp: Variants = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
}

export const fadeUpConfig: Transition = {
  duration: 0.4,
  ease: "easeOut",
}

/* ---- Fade in ---- */

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
}

export const fadeInConfig: Transition = {
  duration: 0.3,
  ease: "easeOut",
}

/* ---- Stagger container ---- */

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.1,
    },
  },
}

/* ---- Card hover ---- */

export const cardHover = {
  rest: { y: 0, boxShadow: "var(--shadow-card)" },
  hover: {
    y: -4,
    boxShadow: "var(--shadow-hover)",
    transition: { duration: 0.2, ease: "easeOut" },
  },
}

/* ---- Button hover ---- */

export const buttonHover = {
  rest: { scale: 1 },
  hover: { scale: 1.02, transition: { duration: 0.15, ease: "easeOut" } },
  tap: { scale: 0.98 },
}

/* ---- Ticker (horizontal scroll) ---- */

export const tickerAnimation = {
  animate: {
    x: ["0%", "-50%"],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop" as const,
        duration: 30,
        ease: "linear",
      },
    },
  },
}

/* ---- Decorative floating ---- */

export const floatingAnimation = {
  animate: {
    y: [0, -8, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
}
