import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title?: string
  description?: string
  url?: string
  type?: string
}

const siteName = 'AnyTool.site'
const defaultDescription = 'Free online tools for developers, writers, and everyone. Word counter, JSON formatter, color picker, and more.'
const baseUrl = 'https://anytool.site'

export default function SEO({ title, description, url, type = 'website' }: SEOProps) {
  const fullTitle = title ? `${title} | ${siteName}` : `${siteName} - Free Online Tools`
  const desc = description || defaultDescription
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
    </Helmet>
  )
}
