'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import AuthForm from '@/components/forms/AuthForm'

type Props = {
  isOpen: boolean
  initialMode: 'login' | 'register'
  onClose: () => void
}

export default function AuthModal({ isOpen, initialMode, onClose }: Props) {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode)

  // Close modal on Escape key press
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  // Reset mode when modal opens
  useEffect(() => {
    if (isOpen) setMode(initialMode)
  }, [isOpen, initialMode])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* overlap */}
          <motion.div
            className="fixed inset-0 z-40 bg-black/50"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* modal */}
          <motion.div
            className="fixed top-1/2 left-1/2 z-50 w-[90%] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded bg-white p-6 font-mono shadow-lg md:w-full"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="mb-4 text-center text-xl font-semibold text-gray-700">
              {mode === 'login' ? 'Welcome back' : 'Create an account'}
            </h2>

            <AuthForm mode={mode} onClose={onClose} />

            <p className="mt-4 text-center text-sm text-gray-600">
              {mode === 'login' ? (
                <>
                  Don't have an account?{' '}
                  <button
                    className="text-indigo-600 hover:underline"
                    onClick={() => setMode('register')}
                  >
                    Register
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <button
                    className="text-indigo-600 hover:underline"
                    onClick={() => setMode('login')}
                  >
                    Login
                  </button>
                </>
              )}
            </p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
