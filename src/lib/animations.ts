/**
 * Motion.dev animation presets — single source of truth.
 *
 * All animation values live here. Components import from this file.
 * Never hardcode animation values in components.
 *
 * Reduced motion: Motion.dev respects prefers-reduced-motion automatically
 * when using the `motion` component. Additional overrides via useReducedMotion.
 */

import type { Variants, Transition } from "motion/react"

/* ============================================================
   EASING
   ============================================================ */

/** Smooth deceleration — feels premium, not mechanical */
export const defaultEase = [0.22, 1, 0.36, 1] as const

export const easeOut: Transition = {
  ease: defaultEase,
  duration: 0.38,
}

export const easeOutFast: Transition = {
  ease: defaultEase,
  duration: 0.22,
}

export const easeOutSlow: Transition = {
  ease: defaultEase,
  duration: 0.55,
}

/* ============================================================
   PAGE TRANSITION
   ============================================================ */

export const pageTransition: Variants = {
  initial: { opacity: 0, y: 12, filter: "blur(2px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -8, filter: "blur(1px)" },
}

export const pageTransitionConfig: Transition = {
  duration: 0.42,
  ease: defaultEase,
}

/* ============================================================
   FADE VARIANTS
   ============================================================ */

export const fadeUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

export const fadeUpConfig: Transition = {
  duration: 0.45,
  ease: defaultEase,
}

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
}

export const fadeInConfig: Transition = {
  duration: 0.32,
  ease: defaultEase,
}

/* ============================================================
   STAGGER
   ============================================================ */

export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
}

/** Use as child of staggerContainer */
export const staggerItem: Variants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
}

export const staggerItemConfig: Transition = {
  duration: 0.4,
  ease: defaultEase,
}

/* ============================================================
   CARD HOVER
   ============================================================ */

export const cardHover = {
  rest: {
    y: 0,
    rotate: 0,
    transition: { duration: 0.35, ease: defaultEase },
  },
  hover: {
    y: -6,
    rotate: 0.3,
    transition: { duration: 0.35, ease: defaultEase },
  },
}

/* ============================================================
   BUTTON MOTION
   ============================================================ */

export const buttonHover = {
  rest: { scale: 1 },
  hover: { scale: 1.02, transition: { duration: 0.18, ease: defaultEase } },
  tap: { scale: 0.97, transition: { duration: 0.1 } },
}

/** Arrow inside button shifts right on hover */
export const arrowHover = {
  rest: { x: 0 },
  hover: { x: 4, transition: { duration: 0.18, ease: defaultEase } },
}

/* ============================================================
   TICKER
   ============================================================ */

export const tickerAnimation = {
  animate: {
    x: ["0%", "-50%"],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: "loop" as const,
        duration: 32,
        ease: "linear",
      },
    },
  },
}

/* ============================================================
   DECORATIVE
   ============================================================ */

export const floatingAnimation = {
  animate: {
    y: [0, -8, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
}

/* ============================================================
   FORM FEEDBACK
   ============================================================ */

export const formErrorMotion: Variants = {
  initial: { opacity: 0, y: -4 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -4 },
}

export const formErrorConfig: Transition = {
  duration: 0.22,
  ease: defaultEase,
}

/* ============================================================
   DIALOG / MODAL
   ============================================================ */

export const dialogOverlay: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
}

export const dialogContent: Variants = {
  initial: { opacity: 0, scale: 0.96, y: 12 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.96, y: 8 },
}

export const dialogConfig: Transition = {
  duration: 0.3,
  ease: defaultEase,
}
