// // Renders a muted, looping fullscreen background video for visual effect.
export default function VideoBackground() {
  return (
    <video
      autoPlay
      loop
      muted
      playsInline
      poster="/images/stars.jpg"
      className="h-full w-full object-cover"
    >
      <source
        src="https://pub-37569688d2b847a099570c398d010b97.r2.dev/star.mp4"
        type="video/webm"
      />
      <source
        src="https://pub-37569688d2b847a099570c398d010b97.r2.dev/star.webm"
        type="video/mp4"
      />
      Your browser does not support the video tag.
    </video>
  )
}
