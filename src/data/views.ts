const STORAGE_KEY = 'anytool_views'

export function getViews(): Record<string, number> {
  if (typeof window === 'undefined') return {}
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
  } catch {
    return {}
  }
}

export function trackView(slug: string) {
  if (typeof window === 'undefined') return
  const views = getViews()
  views[slug] = (views[slug] || 0) + 1
  localStorage.setItem(STORAGE_KEY, JSON.stringify(views))
}
