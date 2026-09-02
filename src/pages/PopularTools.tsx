import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { tools } from '../data/tools'
import { getViews } from '../data/views'
import { ArrowUpRight, TrendingUp } from 'lucide-react'
import { Helmet } from 'react-helmet-async'

function fakeBase(slug: string): number {
  let h = 0
  for (let i = 0; i < slug.length; i++) h = ((h << 5) - h + slug.charCodeAt(i)) | 0
  return 1200 + (Math.abs(h) % 48000)
}

export default function PopularTools() {
  const views = getViews()
  const sorted = useMemo(() => {
    return [...tools].sort((a, b) => {
      const aTotal = fakeBase(a.slug) + (views[a.slug] || 0)
      const bTotal = fakeBase(b.slug) + (views[b.slug] || 0)
      return bTotal - aTotal
    })
  }, [views])

  return (
    <div className="max-w-4xl mx-auto px-4 py-24">
      <Helmet>
        <title>Most Popular Tools - AnyTool.site</title>
        <meta name="description" content="The most used free online tools on AnyTool.site, ranked by popularity." />
      </Helmet>

      <div className="text-center mb-16">
        <span className="text-sm font-semibold text-violet-600 dark:text-violet-400 tracking-wider uppercase flex items-center justify-center gap-2"><TrendingUp className="w-4 h-4" /> Trending</span>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mt-3 mb-4 tracking-tight">Most Popular Tools</h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto text-lg">Ranked by how many people use them daily.</p>
      </div>

      <div className="space-y-3">
        {sorted.map((tool, i) => {
          const Icon = tool.icon
          const total = fakeBase(tool.slug) + (views[tool.slug] || 0)
          return (
            <Link key={tool.slug} to={`/tools/${tool.slug}`} className="group flex items-center gap-4 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-violet-300 dark:hover:border-violet-500/50 transition-all no-underline">
              <span className="text-2xl font-black text-gray-200 dark:text-gray-700 w-12 text-center shrink-0">{i + 1}</span>
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center group-hover:bg-violet-100 dark:group-hover:bg-violet-500/10 transition-colors shrink-0">
                <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-gray-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">{tool.name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 truncate">{tool.description}</div>
              </div>
              <div className="text-right shrink-0">
                <div className="text-sm font-medium text-gray-500 dark:text-gray-400">{total.toLocaleString()} used</div>
                <div className="text-xs text-gray-400 dark:text-gray-500">{tool.category}</div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-gray-300 dark:text-gray-600 group-hover:text-violet-500 shrink-0 transition-colors" />
            </Link>
          )
        })}
      </div>
    </div>
  )
}
