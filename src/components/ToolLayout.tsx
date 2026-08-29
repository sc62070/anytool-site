import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Helmet } from 'react-helmet-async'

interface ToolLayoutProps {
  title: string
  description: string
  icon: LucideIcon
  children: React.ReactNode
}

export default function ToolLayout({ title, description, icon: Icon, children }: ToolLayoutProps) {
  const canonical = `https://anytool.site/tools/${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '')}`

  return (
    <div>
      <Helmet>
        <title>{title} - AnyTool.site</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={`${title} - AnyTool.site`} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={`${title} - AnyTool.site`} />
        <meta name="twitter:description" content={description} />
      </Helmet>

      {/* Tool header */}
      <section className="bg-gray-950 py-12 px-4 border-b border-gray-800/50">
        <div className="max-w-4xl mx-auto">
          <Link to="/" className="inline-flex items-center text-sm text-gray-400 hover:text-white mb-6 transition-colors no-underline">
            <ArrowLeft className="w-4 h-4 mr-1" /> All Tools
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-violet-500/10 rounded-xl flex items-center justify-center border border-violet-500/20">
              <Icon className="w-6 h-6 text-violet-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">{title}</h1>
              <p className="text-gray-400 text-sm mt-0.5">{description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tool content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {children}
      </div>
    </div>
  )
}
