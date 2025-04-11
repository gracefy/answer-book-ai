import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import VideoBackground from '@/components/layout/VideoBackground'
import AskSection from '@/components/AskSection/AskSection'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[url('/stars.jpg')] bg-cover bg-center">
      {/* <div className="absolute inset-0 bg-black/60 z-0" /> */}\
      <div className="absolute inset-0 z-0">
        <VideoBackground />
      </div>
      <div className="relative z-10">
        <Header />
        <AskSection />
      </div>
      <Footer />
    </main>
  )
}
