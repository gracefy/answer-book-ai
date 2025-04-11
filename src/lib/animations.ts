// Creates a blur-to-clear fade animation variant for Framer Motion
export const fadeIn = (delay = 0) => ({
  hidden: {
    opacity: 0,
    filter: 'blur(4px)',
  },
  show: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 1.6,
      delay,
      ease: [0.33, 1, 0.68, 1],
    },
  },
  exit: {
    opacity: 0,
    filter: 'blur(6px)',
    transition: {
      duration: 0.8,
      ease: [0.33, 1, 0.68, 1],
    },
  },
})

// Creates a smooth zoom-in animation variant for Framer Motion
export const zoomIn = (delay = 0) => ({
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 120,
      damping: 10,
      delay,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.6 },
  },
})
