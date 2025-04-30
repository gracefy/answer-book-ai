'use client'

import VideoBackground from '@/components/layout/VideoBackground'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import QnASection from '@/components/sections/QnASection'

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col">
      {/* Background video layer */}
      <div className="absolute inset-0 z-0">
        <VideoBackground />
      </div>

      {/* Main content layer */}
      <div className="z-10 flex min-h-screen flex-col items-center justify-center">
        <div className="w-full max-w-2xl p-8">
          <Header />

          <QnASection />
        </div>
      </div>

      {/* Footer always at bottom */}
      <Footer className="z-10 mt-auto" />
    </main>
  )
}
