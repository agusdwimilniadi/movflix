export function formatDate(dateStr: string): string {
  if (!dateStr) return 'N/A'
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

export function formatYear(dateStr: string): string {
  if (!dateStr) return 'N/A'
  return new Date(dateStr).getFullYear().toString()
}

export function formatRuntime(minutes: number | null): string {
  if (!minutes) return 'N/A'
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return h > 0 ? `${h}h ${m}m` : `${m}m`
}
