'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const AUTH_COOKIE = 'bestiary_token'
const BACKEND_URL = process.env.BACKEND_URL ?? 'http://localhost:8000'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 7 // 7 days

export interface SignInResult {
  error?: string
}

export async function signIn(email: string, password: string): Promise<SignInResult> {
  let token: string

  try {
    const res = await fetch(`${BACKEND_URL}/api/v1/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      cache: 'no-store',
    })

    if (res.status === 401) {
      return { error: 'Invalid email or password.' }
    }

    if (!res.ok) {
      return { error: `Auth service error (${res.status}). Try again.` }
    }

    const data = await res.json() as { access_token: string }
    token = data.access_token
  } catch {
    return { error: 'Cannot reach backend. Check it is running.' }
  }

  cookies().set(AUTH_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: COOKIE_MAX_AGE,
    path: '/',
  })

  return {}
}

export async function signOut(): Promise<void> {
  cookies().delete(AUTH_COOKIE)
  redirect('/sign-in')
}

