'use client'

import { useCallback, useEffect } from 'react'
import useSWR from 'swr'
import { fetchServices, type Service } from '@/lib/api/services'
import { ServiceStatusBadge } from './service-status-badge'
import { relativeTime } from '@/lib/utils/relative-time'

interface ServiceListProps {
  onAddService: () => void
}

export function ServiceList({ onAddService }: ServiceListProps) {
  const { data: services, error, isLoading, mutate } = useSWR<Service[]>(
    '/api/services',
    () => fetchServices(),
    { refreshInterval: 30_000 },
  )

  // Keyboard shortcut: R = refresh (Skylar's keyboard-first preference)
  const handleRefresh = useCallback(() => { void mutate() }, [mutate])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (
        e.key === 'r' &&
        !e.metaKey &&
        !e.ctrlKey &&
        !(e.target instanceof HTMLInputElement) &&
        !(e.target instanceof HTMLTextAreaElement)
      ) {
        handleRefresh()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [handleRefresh])

  return (
    <div className="flex flex-col gap-4">
      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-content-secondary uppercase tracking-wide">
          Services
          {services && (
            <span className="ml-2 font-normal text-content-tertiary">({services.length})</span>
          )}
        </h2>
        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className="btn-ghost text-xs"
            aria-label="Refresh service list"
          >
            {isLoading ? 'Checking...' : 'Refresh'}
          </button>
          <button onClick={onAddService} className="btn-primary text-xs">
            + Add service
          </button>
        </div>
      </div>

      {/* Content */}
      {error && (
        <p className="text-sm text-error">
          {error instanceof Error ? error.message : 'Failed to load services.'}
        </p>
      )}

      {isLoading && !services && (
        <div className="flex flex-col gap-2" aria-label="Loading services" aria-busy>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-10 bg-bg-elevated rounded-card animate-pulse" />
          ))}
        </div>
      )}

      {services && services.length === 0 && !error && (
        <div className="py-12 text-center">
          <p className="text-content-secondary text-sm">No services registered.</p>
          <p className="text-content-tertiary text-xs mt-1">
            Add your first to start monitoring.
          </p>
          <button onClick={onAddService} className="btn-primary text-sm mt-4">
            Add service
          </button>
        </div>
      )}

      {services && services.length > 0 && (
        <div className="flex flex-col gap-px border border-border rounded-card overflow-hidden">
          {services.map((service) => (
            <ServiceRow key={service.id} service={service} />
          ))}
        </div>
      )}
    </div>
  )
}

interface ServiceRowProps {
  service: Service
}

function ServiceRow({ service }: ServiceRowProps) {
  const isDown = service.status === 'DOWN'

  return (
    <div
      className={`relative flex items-center gap-3 bg-bg-surface px-3 py-2 hover:bg-bg-elevated transition-colors duration-[var(--motion-fast)] group ${
        isDown ? 'cursor-help' : ''
      }`}
      title={isDown && service.last_error ? service.last_error : undefined}
      tabIndex={0}
      role="row"
      aria-label={`${service.name}: ${service.status}`}
    >
      <ServiceStatusBadge status={service.status} />

      <div className="flex-1 min-w-0">
        <span className="text-sm text-content-primary font-medium truncate block">
          {service.name}
        </span>
        <span className="text-xs text-content-tertiary font-mono truncate block">
          {service.host}
        </span>
      </div>

      <span className="text-xs text-content-tertiary whitespace-nowrap flex-shrink-0">
        {relativeTime(service.last_checked_at)}
      </span>

      {/* DOWN tooltip indicator */}
      {isDown && service.last_error && (
        <div
          role="tooltip"
          className="absolute left-0 top-full z-10 mt-1 ml-3 max-w-xs rounded-md bg-bg-elevated border border-border-strong shadow-overlay text-xs text-content-secondary px-3 py-2 hidden group-hover:block group-focus:block"
        >
          {service.last_error}
        </div>
      )}
    </div>
  )
}
