import Header from "@/components/Header";
import AskSection from "@/components/AskSection/AskSection";


export default function Home() {
  return (

    <main className="flex flex-col items-center justify-center min-h-screen bg-[url('/stars.jpg')] bg-cover bg-center text-white">
      {/* <div className="absolute inset-0 bg-black/60 z-0" /> */}\

      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="https://aflive.qiniu.huangmeimi.com/upic_1744224867255" type="video/webm" />
        <source src="https://aflive.qiniu.huangmeimi.com/upic_1744226850256" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="relative z-10">
        <Header />
        <AskSection />
      </div>


    </main>

  )
}