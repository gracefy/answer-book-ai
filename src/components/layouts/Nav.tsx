'use client'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import AuthModal from '@/components/modals/AuthModal'
import GradientButton from '@/components/ui/GradientButton'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/DropdownMenu'
import { Button } from '@/components/ui/Button'

export default function Nav() {
  const { user, logout, isAuthenticated, authLoading } = useAuth()
  const router = useRouter()
  const [modalOpen, setModalOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    router.push('/')
  }
  if (authLoading) return null

  return (
    <>
      <nav className="fixed top-0 left-0 z-20 w-full px-10 py-5">
        <div className="container mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="font-mono text-lg font-bold text-indigo-50 lg:text-xl">
            AnswerBook
          </Link>

          {/* Login/Logout */}
          <div className="relative space-x-4 text-sm text-white md:text-base">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="font-mono text-sm text-white">
                    Hello, {user?.username}
                    <ChevronDown size={18} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40">
                  <DropdownMenuItem onClick={() => router.push('/history')}>
                    History
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <GradientButton
                onClick={() => {
                  setModalOpen(true)
                }}
              >
                Login
              </GradientButton>
            )}
          </div>
        </div>
      </nav>
      <AuthModal isOpen={modalOpen} initialMode="login" onClose={() => setModalOpen(false)} />
    </>
  )
}
