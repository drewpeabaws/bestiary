import { NextRequest, NextResponse } from 'next/server'

const AUTH_COOKIE = 'bestiary_token'

export function middleware(request: NextRequest) {
  const token = request.cookies.get(AUTH_COOKIE)?.value
  const { pathname } = request.nextUrl

  // Guard /dashboard — redirect to /sign-in if unauthenticated
  if (pathname.startsWith('/dashboard') && !token) {
    const signIn = new URL('/sign-in', request.url)
    return NextResponse.redirect(signIn)
  }

  // Already authenticated — skip /sign-in
  if (pathname === '/sign-in' && token) {
    const dashboard = new URL('/dashboard', request.url)
    return NextResponse.redirect(dashboard)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/sign-in'],
}
