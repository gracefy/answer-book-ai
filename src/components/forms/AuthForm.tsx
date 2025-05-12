'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import clsx from 'clsx'
import { useAuth } from '@/hooks/useAuth'
import { registerSchema, loginSchema } from '@/lib/validation'
import { zodErrorToDetails } from '@/lib/utils'
import FormRow from '../ui/FormRow'
import GradientButton from '@/components/ui/GradientButton'
import { logError } from '@/lib/utils'

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

  const [errors, setErrors] = useState<{
    email?: string
    password?: string
    confirmPassword?: string
    username?: string
    general?: string
  }>({})
  const [loading, setLoading] = useState(false)

  // Reset form fields when mode changes
  useEffect(() => {
    setUsername('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    setErrors({})
  }, [mode])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    setLoading(true)

    // Set up form data
    const formData =
      mode === 'login' ? { email, password } : { username, email, password, confirmPassword }

    const schema = mode === 'login' ? loginSchema : registerSchema

    const result = schema.safeParse(formData)

    if (!result.success) {
      const errors = result.error.format()
      const details = zodErrorToDetails(errors)
      setErrors(details)

      setLoading(false)
      return
    }

    try {
      // Send request to server
      const res = await fetch(`/api/auth/${mode}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      const result = await res.json()

      // Handle response
      if (!res.ok || !result.success) {
        logError('Error:', result.error)
        // Handle errors
        if (result.details) {
          setErrors((prev) => ({
            ...prev,
            ...result.details,
          }))
        } else {
          setErrors({ general: result.error || 'Something went wrong' })
        }

        setLoading(false)
        return
      }

      login(result.data) // Successful login or registration
      onClose?.() // Close modal if provided
      router.push('/') // Redirect to home page
    } catch (error) {
      logError('Error:', error)
      setErrors({ general: 'Failed to connect to server.' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex w-full flex-col gap-4 rounded-lg bg-white p-6 shadow-md"
    >
      {mode === 'login' && (
        <div className="mb-2 text-right">
          <button
            type="button"
            onClick={() => {
              setEmail('test@example.com')
              setPassword('test1234')
            }}
            className="text-sm text-indigo-400 hover:underline"
          >
            Use test account
          </button>
        </div>
      )}

      {mode === 'register' && (
        <FormRow
          type="text"
          label="Username"
          placeholder="3-10 chars, letters/numbers/_"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          error={!!errors.username}
          errorMessage={errors.username}
          required
        />
      )}

      <FormRow
        type="email"
        label="Email"
        placeholder={mode === 'login' ? 'Email' : 'Valid email required'}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={!!errors.email}
        errorMessage={errors.email}
        required
      />

      <FormRow
        type="password"
        label="Password"
        placeholder={mode === 'login' ? 'Password' : '8-20 chars, letters/numbers'}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={!!errors.password}
        errorMessage={errors.password}
        required
      />

      {mode === 'register' && (
        <FormRow
          type="password"
          label="Confirm Password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={!!errors.confirmPassword}
          errorMessage={errors.confirmPassword}
          required
        />
      )}

      {/* Error message */}
      <p
        className={clsx(
          'mt-1 text-sm transition-opacity duration-300',
          'text-center text-red-400',
          errors.general ? 'opacity-100' : 'invisible opacity-0'
        )}
        id="input-error"
        role="alert"
      >
        {errors.general}
      </p>

      <GradientButton type="submit" className="w-full" disabled={loading}>
        {loading ? 'Processing...' : mode === 'login' ? 'Login' : 'Register'}
      </GradientButton>
    </form>
  )
}
