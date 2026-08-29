const FAV_KEY = 'anytool_favorites'
const RECENT_KEY = 'anytool_recent'

export function getFavorites(): string[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem(FAV_KEY) || '[]')
  } catch { return [] }
}

export function toggleFavorite(slug: string): string[] {
  const favs = getFavorites()
  const next = favs.includes(slug) ? favs.filter(s => s !== slug) : [...favs, slug]
  localStorage.setItem(FAV_KEY, JSON.stringify(next))
  return next
}

export function isFavorite(slug: string): boolean {
  return getFavorites().includes(slug)
}

export function getRecent(): string[] {
  if (typeof window === 'undefined') return []
  try {
    return JSON.parse(localStorage.getItem(RECENT_KEY) || '[]')
  } catch { return [] }
}

export function addRecent(slug: string): string[] {
  const recent = getRecent().filter(s => s !== slug)
  const next = [slug, ...recent].slice(0, 5)
  localStorage.setItem(RECENT_KEY, JSON.stringify(next))
  return next
}
