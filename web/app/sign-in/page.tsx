'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { signIn } from '@/lib/auth/jwt-cookie'

interface FormValues {
  email: string
  password: string
}

export default function SignInPage() {
  const router = useRouter()
  const [serverError, setServerError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm<FormValues>()

  const onSubmit = async (data: FormValues) => {
    setSubmitting(true)
    setServerError(null)

    const result = await signIn(data.email, data.password)

    if (result.error) {
      setServerError(result.error)
      resetField('password')
      setSubmitting(false)
      return
    }

    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-bg-page flex items-center justify-center p-page-pad">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-content-primary tracking-tight">Bestiary</h1>
          <p className="mt-1 text-sm text-content-secondary">Sign in to your account</p>
        </div>

        {/* Card */}
        <div className="card">
          <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-form-gap">
            {/* Email */}
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-xs font-medium text-content-secondary uppercase tracking-wide">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                autoFocus
                className="input-field"
                placeholder="you@example.com"
                aria-invalid={!!errors.email}
                {...register('email', {
                  required: 'Email required',
                  pattern: { value: /\S+@\S+\.\S+/, message: 'Valid email required' },
                })}
              />
              {errors.email && (
                <p role="alert" className="text-xs text-error">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="text-xs font-medium text-content-secondary uppercase tracking-wide">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                className="input-field"
                placeholder="••••••••"
                aria-invalid={!!errors.password}
                {...register('password', { required: 'Password required' })}
              />
              {errors.password && (
                <p role="alert" className="text-xs text-error">{errors.password.message}</p>
              )}
            </div>

            {/* Server error */}
            {serverError && (
              <p role="alert" className="text-sm text-error bg-error/10 rounded-input px-3 py-2">
                {serverError}
              </p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="btn-primary w-full mt-2 text-sm"
            >
              {submitting ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
