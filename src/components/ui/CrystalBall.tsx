'use client'
import { motion } from 'framer-motion'
import clsx from 'clsx'

// Props for the CrystalBall component
type CrystalBallProps = {
  label?: string
  gradientColor?: string
  loadingAnswer?: boolean
}

// A rotating animated Crystal Ball used as a visual button
export default function CrystalBall({ label, gradientColor, loadingAnswer }: CrystalBallProps) {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      {/* Rotating glowing Ball */}
      <motion.div
        layout
        key={loadingAnswer ? 'fast' : 'slow'}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: loadingAnswer ? 1 : 15, ease: 'easeInOut' }}
        className={clsx(
          'absolute inset-0 rounded-full border-4 border-white/20 bg-gradient-to-br',
          'shadow-[inset_4px_4px_10px_rgba(255,255,255,0.2),0_8px_20px_rgba(0,0,0,0.4)]',
          'animate-pulse hover:animate-none',
          gradientColor
        )}
      >
        <div
          className={clsx(
            'absolute -inset-2 rounded-full bg-white/50 blur-2xl',
            'animate-pulse hover:animate-none'
          )}
        />
      </motion.div>

      {/* Perfectly centered label */}
      <div className="text-md z-10 text-center font-mono font-bold tracking-wide uppercase select-none">
        {label}
      </div>
    </div>
  )
}
