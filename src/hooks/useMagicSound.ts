import { useRef } from 'react'

export function useMagicSound(
  path: string = '/sounds/magic.mp3',
  fadeTime = 1000,
  duration = 3000
) {
  const isPlayingRef = useRef(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const play = () => {
    if (isPlayingRef.current) return

    // Initialize audio if not already done
    audioRef.current = new Audio(path)
    const audio = audioRef.current
    audio.volume = 0
    isPlayingRef.current = true
    audio.play()

    // Fade in
    const fadeIn = setInterval(() => {
      if (audio.volume < 1) {
        audio.volume = Math.min(audio.volume + 0.05, 1) // Raise volume to max by 0.1 each time
      } else {
        clearInterval(fadeIn)
      }
    }, fadeTime / 20) // Raise volume every 100ms

    // Fade out before end
    setTimeout(() => {
      const fadeOut = setInterval(() => {
        if (audio.volume > 0.1) {
          audio.volume = Math.max(audio.volume - 0.05, 0) // Lower volume to 0 by 0.1 each time
        } else {
          clearInterval(fadeOut)
        }
      }, fadeTime / 20) // Lower volume every 100ms
    }, duration - fadeTime) // Start fading out after 2 seconds

    // Reset lock after 3 seconds
    // This is to prevent the sound from playing again before it ends
    // You can adjust this timeout based on the length of your sound
    setTimeout(() => {
      isPlayingRef.current = false
    }, duration)
  }

  return { play }
}
