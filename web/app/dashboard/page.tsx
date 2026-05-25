'use client'

import { useState } from 'react'
import { signOut } from '@/lib/auth/jwt-cookie'
import { ThemeToggle } from '@/components/theme-toggle'
import { ServiceList } from '@/components/service-list'
import { ServiceForm } from '@/components/service-form'
import { useDensity } from '@/lib/theme-provider'

export default function DashboardPage() {
  const [modalOpen, setModalOpen] = useState(false)
  const { density, toggleDensity } = useDensity()

  return (
    <div className="min-h-screen bg-bg-page flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-bg-surface border-b border-border">
        <div className="max-w-6xl mx-auto px-page-pad flex items-center justify-between h-12">
          <span className="font-semibold text-content-primary tracking-tight select-none">
            Bestiary
          </span>

          <nav className="flex items-center gap-2" aria-label="Header controls">
            {/* Density toggle */}
            <button
              onClick={toggleDensity}
              className="btn-ghost text-xs"
              title={`Switch to ${density === 'dense' ? 'spacious' : 'dense'} mode`}
              aria-label={`Density: ${density}. Click to toggle.`}
            >
              {density === 'dense' ? 'Spacious' : 'Dense'}
            </button>

            {/* Theme toggle */}
            <ThemeToggle />

            {/* Sign out — server action via form so redirect works from client */}
            <form action={signOut}>
              <button type="submit" className="btn-ghost text-xs">
                Sign out
              </button>
            </form>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 max-w-6xl mx-auto w-full px-page-pad py-section-margin">
        <ServiceList onAddService={() => setModalOpen(true)} />
      </main>

      {/* Keyboard hint footer — Skylar's keyboard-first UX */}
      <footer className="border-t border-border">
        <p className="text-xs text-content-tertiary text-center font-mono py-2">
          Tab to nav · R refresh
        </p>
      </footer>

      {/* Service registration modal (BUR-19 mount point) */}
      <ServiceForm open={modalOpen} onOpenChange={setModalOpen} />
    </div>
  )
}
