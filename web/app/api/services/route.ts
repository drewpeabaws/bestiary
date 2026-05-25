import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

const BACKEND_URL = process.env.BACKEND_URL ?? 'http://localhost:8000'

function authHeaders(): HeadersInit {
  const token = cookies().get('bestiary_token')?.value
  return token ? { Authorization: `Bearer ${token}` } : {}
}

export async function GET() {
  try {
    const res = await fetch(`${BACKEND_URL}/api/v1/services`, {
      headers: authHeaders(),
      cache: 'no-store',
    })

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch services' },
        { status: res.status },
      )
    }

    return NextResponse.json(await res.json())
  } catch {
    return NextResponse.json({ error: 'Backend unavailable' }, { status: 503 })
  }
}

export async function POST(request: NextRequest) {
  const body: unknown = await request.json()

  try {
    const res = await fetch(`${BACKEND_URL}/api/v1/services`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...authHeaders(),
      },
      body: JSON.stringify(body),
    })

    if (!res.ok) {
      return NextResponse.json(
        { error: 'Failed to create service' },
        { status: res.status },
      )
    }

    return NextResponse.json(await res.json(), { status: 201 })
  } catch {
    return NextResponse.json({ error: 'Backend unavailable' }, { status: 503 })
  }
}
