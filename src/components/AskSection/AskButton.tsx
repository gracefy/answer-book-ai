'use client'
import clsx from 'clsx'
import CrystalBall, { CrystalBallProps } from '../ui/CrystalBall'

// Props for the AskButton component
// It extends CrystalBallProps and adds an onClick function
type AskButtonProps = {
  onClick: () => void
} & CrystalBallProps

/**
 * AskButton — a button that triggers a question to the AI
 * Props:
 * - onClick: function to call when the button is clicked
 * - label/size/gradientColor/loading: props for the CrystalBall component
 */
export default function AskButton({
  onClick,
  label = 'Ask',
  size = 96,
  gradientColor = 'from-purple-300 via-indigo-500 to-purple-800',
  loading,
}: AskButtonProps) {
  return (
    <div
      onClick={onClick}
      className={clsx(
        'relative mt-10 flex cursor-pointer items-center justify-center',
        'transition-transform duration-300 hover:scale-105',
        'text-[#dcd6ff60] hover:text-[#dcd6ff]'
      )}
      style={{ width: size, height: size }}
    >
      <CrystalBall label={label} size={size} gradientColor={gradientColor} loading={loading} />
    </div>
  )
}
