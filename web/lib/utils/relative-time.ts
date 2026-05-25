import { formatDistanceToNowStrict } from 'date-fns'

export function relativeTime(isoString: string | null): string {
  if (!isoString) return 'Never checked'
  try {
    return formatDistanceToNowStrict(new Date(isoString), { addSuffix: true })
  } catch {
    return 'Unknown'
  }
}
