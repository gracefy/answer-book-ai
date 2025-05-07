'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import clsx from 'clsx'
import { useAuth } from '@/hooks/useAuth'

import FormRow from '../ui/FormRow'
import GradientButton from '../ui/GradientButton'

type AuthFormProps = {
  mode: 'login' | 'register'
  onClose?: () => void
}

export default function AuthForm({ mode, onClose }: AuthFormProps) {
  const router = useRouter()
  const { login } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [username, setUsername] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage('')
    setLoading(true)

    const formData = mode === 'login' ? { email, password } : { email, password, username }

    try {
      const res = await fetch(`/api/auth/${mode}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!res.ok) {
        const data = await res.json()
        setErrorMessage(data.message || 'Something went wrong')
        setLoading(false)
        return
      }

      const result = await res.json()
      login(result.data)

      onClose?.()

      router.push('/')
    } catch (error) {
      console.error('Error:', error)
      setErrorMessage('Failed to connect to server.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full max-w-sm flex-col gap-4 rounded-lg bg-white p-6 shadow-md"
    >
      {mode === 'register' && (
        <FormRow
          type="text"
          label="Username"
          placeholder="Uaername"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={errorMessage !== ''}
          required
        />
      )}

      <FormRow
        type="email"
        label="Email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errorMessage !== ''}
        required
      />

      <FormRow
        type="password"
        label="Password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errorMessage !== ''}
        required
      />

      {mode === 'register' && (
        <FormRow
          type="password"
          label="Confirm Password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={errorMessage !== ''}
          required
        />
      )}

      {/* Error message */}
      <p
        className={clsx(
          'absolute top-full right-4 mt-1 text-sm transition-opacity duration-300',
          'text-amber-300/80',
          errorMessage ? 'opacity-100' : 'invisible opacity-0'
        )}
        id="input-error"
        role="alert"
      >
        {errorMessage}
      </p>

      <GradientButton type="submit" className="w-full" disabled={loading}>
        {loading ? 'Processing...' : mode === 'login' ? 'Login' : 'Register'}
      </GradientButton>
    </form>
  )
}
