'use client'
import clsx from 'clsx'
import { useMagicSound } from '@/hooks/useMagicSound'
import CrystalBall, { CrystalBallProps } from '../ui/CrystalBall'

type AskButtonProps = {
  onClick: () => void
} & CrystalBallProps

export default function AskButton({
  onClick,
  label = 'Ask',
  size = 96,
  gradientColor = 'bg-gradient-to-br from-purple-300 via-indigo-500 to-purple-800',
}: AskButtonProps) {
  return (
    <div
      onClick={onClick}
      className={clsx(
        'relative mt-10 flex cursor-pointer items-center justify-center',
        'transition-transform duration-300 hover:scale-105',
        'text-indigo-100/40 hover:text-white/80'
      )}
      style={{ width: size, height: size }}
    >
      <CrystalBall label={label} size={size} gradientColor={gradientColor} />
    </div>
  )
}
