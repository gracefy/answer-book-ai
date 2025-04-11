type Direction = 'up' | 'down' | 'left' | 'right'

export const fadeIn = (direction: Direction, delay = 0) => {
  const x = direction === 'left' ? 40 : direction === 'right' ? -40 : 0
  const y = direction === 'up' ? 40 : direction === 'down' ? -40 : 0

  return {
    hidden: { opacity: 0, x, y },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: 'tween',
        duration: 1.2,
        delay,
        ease: [0.25, 0.25, 0.25, 0.75],
      },
    },
    exit: {
      opacity: 0,
      x,
      y,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.25, 0.25, 0.75],
      },
    },
  }
}

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
