'use client'
import { motion } from 'framer-motion'
import clsx from 'clsx'

// Props used by the CrystalBall component
export type CrystalBallProps = {
  label?: string
  size?: number
  gradientColor?: string
  loading?: boolean
}

/**
 * CrystalBall — a glowing animated crystal ball
 * Props:
 * - label: center text
 * - size: ball size in px
 * - gradientColor: tailwind gradient classes, e.g. 'from-purple-300 via-indigo-500 to-purple-800'
 * - loading: speeds up spin when true
 */

export default function CrystalBall({ label, size, gradientColor, loading }: CrystalBallProps) {
  return (
    <>
      {/* Animated Crystal Ball */}
      <motion.div
        key={loading ? 'fast' : 'slow'}
        className={clsx(
          'absolute inset-0 rounded-full border-4 border-white/20 bg-gradient-to-br',
          'shadow-[inset_4px_4px_10px_rgba(255,255,255,0.2),0_8px_20px_rgba(0,0,0,0.4)]',
          'animate-pulse hover:animate-none',
          gradientColor
        )}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: loading ? 1 : 15, ease: 'linear' }}
        style={{ width: size, height: size }}
      >
        {/* pulse Background */}
        <div
          className={clsx(
            'absolute -inset-2 rounded-full bg-white/50 blur-2xl',
            'animate-pulse hover:animate-none'
          )}
        />
      </motion.div>
      {/* Static Label */}
      <div className="text-md z-10 text-center font-mono font-bold tracking-wide uppercase select-none">
        {label}
      </div>
    </>
  )
}
