import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider, DensityProvider } from '@/lib/theme-provider'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'Bestiary',
  description: 'Service registry and homelab monitoring',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.variable}>
        <ThemeProvider>
          <DensityProvider>
            {children}
          </DensityProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
