// Animates elements with a fade and slight vertical movement
export const fadeIn = (duration = 0.6) => ({
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: duration, ease: 'easeInOut' },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: duration, ease: 'easeInOut' },
  },
})
