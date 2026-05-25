'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

// ─── Next-themes wrapper ─────────────────────────────────────────────────────

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  )
}

// ─── Density (dense / spacious) ──────────────────────────────────────────────

type Density = 'dense' | 'spacious'

interface DensityContextValue {
  density: Density
  toggleDensity: () => void
}

const DensityContext = createContext<DensityContextValue>({
  density: 'dense',
  toggleDensity: () => undefined,
})

export function DensityProvider({ children }: { children: ReactNode }) {
  const [density, setDensity] = useState<Density>('dense')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem('bestiary_density') as Density | null
    if (stored === 'dense' || stored === 'spacious') {
      setDensity(stored)
    } else {
      // Mobile-first default: spacious on narrow viewports
      setDensity(window.innerWidth < 768 ? 'spacious' : 'dense')
    }
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    const html = document.documentElement
    if (density === 'spacious') {
      html.classList.add('density-spacious')
    } else {
      html.classList.remove('density-spacious')
    }
    localStorage.setItem('bestiary_density', density)
  }, [density, mounted])

  const toggleDensity = useCallback(() => {
    setDensity((d) => (d === 'dense' ? 'spacious' : 'dense'))
  }, [])

  return (
    <DensityContext.Provider value={{ density, toggleDensity }}>
      {children}
    </DensityContext.Provider>
  )
}

export function useDensity() {
  return useContext(DensityContext)
}
