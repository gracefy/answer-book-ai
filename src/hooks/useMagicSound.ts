import { useRef } from 'react'

/**
 * Custom hook to play a sound effect.
 * Prevents overlapping by ensuring only one instance plays at a time.
 *
 * -path: Path to the audio file (default: /sounds/magic.mp3)
 */
export function useMagicSound(path: string = '/sounds/magic.mp3') {
  const isPlayingRef = useRef(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const play = () => {
    // If a sound is already playing, do nothing
    if (isPlayingRef.current) return

    // Create a new Audio instance
    const audio = new Audio(path)
    audioRef.current = audio
    isPlayingRef.current = true

    // Play the sound
    audio.play().catch((err) => {
      console.warn('Unable to play sound:', err)
      isPlayingRef.current = false
    })

    // Reset play lock when the sound ends
    audio.addEventListener('ended', () => {
      isPlayingRef.current = false
    })
  }

  return { play }
}
