'use client'

import { useState } from 'react'

interface HostPickerProps {
  existingHosts: string[]
  value: string
  onChange: (host: string) => void
  error?: string
}

const NEW_HOST_SENTINEL = '__new__'

export function HostPicker({ existingHosts, value, onChange, error }: HostPickerProps) {
  const [isNew, setIsNew] = useState(
    value !== '' && !existingHosts.includes(value),
  )

  const uniqueHosts = Array.from(new Set(existingHosts)).sort()

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (e.target.value === NEW_HOST_SENTINEL) {
      setIsNew(true)
      onChange('')
    } else {
      setIsNew(false)
      onChange(e.target.value)
    }
  }

  const selectValue = isNew ? NEW_HOST_SENTINEL : (value || '')

  return (
    <div className="flex flex-col gap-1.5">
      <select
        className="input-field"
        value={selectValue}
        onChange={handleSelectChange}
        aria-label="Host"
      >
        <option value="" disabled>Select host...</option>
        {uniqueHosts.map((h) => (
          <option key={h} value={h}>{h}</option>
        ))}
        <option value={NEW_HOST_SENTINEL}>New host...</option>
      </select>

      {isNew && (
        <input
          type="text"
          className="input-field"
          placeholder="192.168.1.10 or hostname"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          autoFocus
          aria-label="New host address"
        />
      )}

      {error && (
        <p role="alert" className="text-xs text-error">{error}</p>
      )}
    </div>
  )
}
