import type { ServiceStatus } from '@/lib/api/services'

interface StatusConfig {
  label: string
  className: string
}

const STATUS_CONFIG: Record<ServiceStatus, StatusConfig> = {
  UP: {
    label: 'UP',
    className: 'bg-success text-white',
  },
  DOWN: {
    label: 'DOWN',
    className: 'bg-error text-white',
  },
  UNKNOWN: {
    label: 'UNKNOWN',
    className: 'bg-gray-400 text-white',
  },
}

interface ServiceStatusBadgeProps {
  status: ServiceStatus
}

export function ServiceStatusBadge({ status }: ServiceStatusBadgeProps) {
  const { label, className } = STATUS_CONFIG[status]
  return (
    <span
      className={`inline-flex items-center px-1.5 py-0.5 rounded-sm text-xs font-medium font-mono leading-none ${className}`}
    >
      {label}
    </span>
  )
}
