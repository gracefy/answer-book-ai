'use client'
import { motion } from 'framer-motion'
import clsx from 'clsx'

// Define the type for the props
export type CrystalBallProps = {
  label?: string
  size?: number
  gradientColor?: string
}

// Define the CrystalBall component
export default function CrystalBall({ label, size, gradientColor }: CrystalBallProps) {
  return (
    <>
      {/* Rotating sphere shell */}
      <motion.div
        className={clsx(
          'absolute inset-0 rounded-full border-4 border-white/20',
          'shadow-[inset_4px_4px_10px_rgba(255,255,255,0.2),0_8px_20px_rgba(0,0,0,0.4)]',
          gradientColor
        )}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 20, ease: 'linear' }}
        style={{ width: size, height: size }}
      >
        <div className="absolute -inset-2 animate-pulse rounded-full bg-white/50 blur-2xl" />
      </motion.div>

      {/* Static center label */}
      <div className="text-md z-10 text-center font-mono font-bold tracking-wide uppercase select-none">
        {label}
      </div>
    </>
  )
}
