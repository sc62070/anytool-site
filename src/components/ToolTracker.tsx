import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { trackView } from '../data/views'
import { addRecent } from '../data/userPrefs'

export default function ToolTracker({ children }: { children: React.ReactNode }) {
  const { slug } = useParams<{ slug: string }>()

  useEffect(() => {
    if (slug) {
      trackView(slug)
      addRecent(slug)
    }
  }, [slug])

  return <>{children}</>
}
