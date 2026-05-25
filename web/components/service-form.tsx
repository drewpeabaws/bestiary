'use client'

import { useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { mutate } from 'swr'
import useSWR from 'swr'
import { createService, fetchServices, type Service } from '@/lib/api/services'
import { HostPicker } from './host-picker'

const urlSchema = z.string().url()

interface ServiceFormValues {
  name: string
  url: string
  healthcheck_type: 'HTTP' | 'TCP'
  path: string
}

interface ServiceFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ServiceForm({ open, onOpenChange }: ServiceFormProps) {
  const { data: services } = useSWR<Service[]>('/api/services', () => fetchServices())
  const existingHosts = Array.from(new Set(services?.map((s) => s.host) ?? []))

  const [host, setHost] = useState('')
  const [hostError, setHostError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setError,
    reset,
    formState: { errors },
  } = useForm<ServiceFormValues>({
    defaultValues: { healthcheck_type: 'HTTP', path: '' },
  })

  const healthcheckType = watch('healthcheck_type')

  const resetForm = () => {
    reset()
    setHost('')
    setHostError(null)
  }

  const handleOpenChange = (next: boolean) => {
    if (!next) resetForm()
    onOpenChange(next)
  }

  const onSubmit = handleSubmit(async (data) => {
    // Validate host (managed outside RHF because HostPicker is a custom control)
    if (!host.trim()) {
      setHostError('Host required')
      return
    }
    setHostError(null)

    // Validate URL via zod
    const urlResult = urlSchema.safeParse(data.url)
    if (!urlResult.success) {
      setError('url', { message: 'Valid URL required (include http:// or https://)' })
      return
    }

    // Path required for HTTP
    if (data.healthcheck_type === 'HTTP' && !data.path.trim()) {
      setError('path', { message: 'Path required for HTTP checks' })
      return
    }

    setSubmitting(true)

    try {
      await createService({
        name: data.name,
        host: host.trim(),
        url: data.url,
        healthcheck_type: data.healthcheck_type,
        ...(data.healthcheck_type === 'HTTP' ? { path: data.path.trim() } : {}),
      })
      void mutate('/api/services')
      resetForm()
      onOpenChange(false)
    } catch (e) {
      setError('root', {
        message: e instanceof Error ? e.message : 'Failed to create service.',
      })
    } finally {
      setSubmitting(false)
    }
  })

  return (
    <Dialog.Root open={open} onOpenChange={handleOpenChange}>
      <Dialog.Portal>
        {/* Overlay */}
        <Dialog.Overlay className="fixed inset-0 bg-bg-overlay z-40" />

        {/* Content — max-w-lg, modal radius from tokens */}
        <Dialog.Content
          className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-bg-surface border border-border rounded-modal shadow-modal focus:outline-none p-6"
          aria-describedby="svc-form-desc"
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-5">
            <Dialog.Title className="text-base font-semibold text-content-primary">
              Register service
            </Dialog.Title>
            <Dialog.Close
              className="text-content-tertiary hover:text-content-primary transition-colors text-lg leading-none"
              aria-label="Close"
            >
              ×
            </Dialog.Close>
          </div>

          <p id="svc-form-desc" className="sr-only">
            Register a new service for monitoring.
          </p>

          {/* Form — tab order: name → host → url → type → path → submit */}
          <form onSubmit={onSubmit} noValidate className="flex flex-col gap-form-gap">
            {/* Name */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="svc-name"
                className="text-xs font-medium text-content-secondary uppercase tracking-wide"
              >
                Name
              </label>
              <input
                id="svc-name"
                type="text"
                className="input-field"
                placeholder="plex"
                autoFocus
                aria-invalid={!!errors.name}
                {...register('name', { required: 'Name required' })}
              />
              {errors.name && (
                <p role="alert" className="text-xs text-error">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Host — tabIndex 1 per Skylar's modal tab order */}
            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-content-secondary uppercase tracking-wide">
                Host
              </label>
              <HostPicker
                existingHosts={existingHosts}
                value={host}
                onChange={(h) => {
                  setHost(h)
                  setHostError(null)
                }}
                error={hostError ?? undefined}
              />
            </div>

            {/* URL — tabIndex 2 */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="svc-url"
                className="text-xs font-medium text-content-secondary uppercase tracking-wide"
              >
                Service URL
              </label>
              <input
                id="svc-url"
                type="url"
                className="input-field font-mono text-sm"
                placeholder="http://192.168.1.10:32400"
                aria-invalid={!!errors.url}
                {...register('url', { required: 'URL required' })}
              />
              {errors.url && (
                <p role="alert" className="text-xs text-error">
                  {errors.url.message}
                </p>
              )}
            </div>

            {/* Healthcheck type — tabIndex 3 */}
            <fieldset>
              <legend className="text-xs font-medium text-content-secondary uppercase tracking-wide mb-2">
                Healthcheck type
              </legend>
              <div className="flex gap-6">
                {(['HTTP', 'TCP'] as const).map((type) => (
                  <label
                    key={type}
                    className="flex items-center gap-2 cursor-pointer select-none"
                  >
                    <input
                      type="radio"
                      value={type}
                      className="accent-brand-secondary"
                      {...register('healthcheck_type')}
                    />
                    <span className="text-sm text-content-primary font-mono">{type}</span>
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Path — tabIndex 4, HTTP only */}
            {healthcheckType === 'HTTP' && (
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="svc-path"
                  className="text-xs font-medium text-content-secondary uppercase tracking-wide"
                >
                  Path
                </label>
                <input
                  id="svc-path"
                  type="text"
                  className="input-field font-mono text-sm"
                  placeholder="/health"
                  aria-invalid={!!errors.path}
                  {...register('path')}
                />
                {errors.path && (
                  <p role="alert" className="text-xs text-error">
                    {errors.path.message}
                  </p>
                )}
              </div>
            )}

            {/* Root error */}
            {errors.root && (
              <p role="alert" className="text-sm text-error bg-error/10 rounded-input px-3 py-2">
                {errors.root.message}
              </p>
            )}

            {/* Actions — tabIndex 5 */}
            <div className="flex justify-end gap-2 mt-3">
              <Dialog.Close asChild>
                <button type="button" className="btn-ghost text-sm">
                  Cancel
                </button>
              </Dialog.Close>
              <button
                type="submit"
                disabled={submitting}
                className="btn-primary text-sm"
              >
                {submitting ? 'Saving...' : 'Save service'}
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
