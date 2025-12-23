import type { Variants } from 'framer-motion'

const EASE_IN_OUT: [number, number, number, number] = [0.42, 0, 0.58, 1]

export const fadeIn = (duration = 0.6): Variants => ({
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration, ease: EASE_IN_OUT },
  },
  exit: {
    opacity: 0,
    transition: { duration, ease: EASE_IN_OUT },
  },
})
