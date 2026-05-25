export type ServiceStatus = 'UP' | 'DOWN' | 'UNKNOWN'
export type HealthcheckType = 'HTTP' | 'TCP'

export interface Service {
  id: string
  name: string
  host: string
  url: string
  healthcheck_type: HealthcheckType
  path: string | null
  status: ServiceStatus
  last_checked_at: string | null
  last_error: string | null
}

export interface CreateServicePayload {
  name: string
  host: string
  url: string
  healthcheck_type: HealthcheckType
  path?: string
}

export async function fetchServices(): Promise<Service[]> {
  const res = await fetch('/api/services', { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch services')
  return res.json() as Promise<Service[]>
}

export async function createService(payload: CreateServicePayload): Promise<Service> {
  const res = await fetch('/api/services', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) {
    const body = await res.json().catch(() => ({})) as { error?: string }
    throw new Error(body.error ?? 'Failed to create service')
  }
  return res.json() as Promise<Service>
}
