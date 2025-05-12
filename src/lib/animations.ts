export const fadeIn = (duration = 0.6) => ({
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration, ease: 'easeInOut' },
  },
  exit: {
    opacity: 0,
    transition: { duration, ease: 'easeInOut' },
  },
})
