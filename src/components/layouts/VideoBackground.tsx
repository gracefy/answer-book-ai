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
      <source src="https://aflive.qiniu.huangmeimi.com/upic_1744224867255" type="video/webm" />
      <source src="https://aflive.qiniu.huangmeimi.com/upic_1744226850256" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  )
}
