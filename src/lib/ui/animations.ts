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

export const fadeOutCollapse = (duration = 0.6) => ({
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    height: 'auto',
    transition: { duration: duration, ease: 'easeInOut' },
  },
  exit: {
    opacity: 0,
    y: -10,
    height: 0,
    marginTop: 0,
    paddingTop: 0,
    paddingBottom: 0,
    overflow: 'hidden',
    transition: {
      opacity: { duration: duration, ease: 'easeInOut' },
      height: { duration: duration, ease: 'easeInOut' },
      y: { duration: duration, ease: 'easeInOut' },
    },
  },
})
