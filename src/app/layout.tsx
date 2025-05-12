import type { Metadata } from 'next'
import { Geist, Geist_Mono, Cormorant_Garamond } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/contexts/AuthContext'
import Nav from '@/components/layouts/Nav'
import Footer from '@/components/layouts/Footer'
import VideoBackground from '@/components/layouts/VideoBackground'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const garamond = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-garamond',
})

export const metadata: Metadata = {
  title: 'AnswerBook',
  description: 'Ask a question, get an answer.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${garamond.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <main className="relative flex min-h-screen flex-col">
          {/* Background video layer */}
          <div className="absolute inset-0 z-0">
            <VideoBackground />
          </div>

          {/* Main content layer */}
          <div className="relative z-10 flex flex-1 flex-col">
            {/* AuthProvider wraps the entire app to provide authentication context */}
            <AuthProvider>
              <Nav />
              {children}
            </AuthProvider>
          </div>

          {/* Footer always at the bottom */}
          <Footer className="z-20 mt-auto" />
        </main>
      </body>
    </html>
  )
}
