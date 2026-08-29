import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { tools } from '../data/tools'
import { ArrowUpRight } from 'lucide-react'
import { Helmet } from 'react-helmet-async'

export default function AllTools() {
  const sorted = useMemo(() => [...tools].sort((a, b) => a.name.localeCompare(b.name)), [])
  const grouped = useMemo(() => {
    const map = new Map<string, typeof tools>()
    for (const tool of sorted) {
      if (!map.has(tool.category)) map.set(tool.category, [])
      map.get(tool.category)!.push(tool)
    }
    return map
  }, [sorted])

  return (
    <div className="max-w-6xl mx-auto px-4 py-24">
      <Helmet>
        <title>All Tools - AnyTool.site</title>
        <meta name="description" content="Browse all 73+ free online tools for developers, writers, and everyone." />
      </Helmet>

      <div className="text-center mb-16">
        <span className="text-sm font-semibold text-violet-600 dark:text-violet-400 tracking-wider uppercase">Browse everything</span>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mt-3 mb-4 tracking-tight">All Tools</h1>
        <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto text-lg">{tools.length} tools, alphabetically organized by category.</p>
      </div>

      {Array.from(grouped.entries()).map(([category, catTools]) => (
        <div key={category} className="mb-12">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            {category}
            <span className="text-sm font-normal text-gray-400 dark:text-gray-500">({catTools.length})</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {catTools.map(tool => {
              const Icon = tool.icon
              return (
                <Link key={tool.slug} to={`/tools/${tool.slug}`} className="group flex items-center gap-3 p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-violet-300 dark:hover:border-violet-500/50 transition-all no-underline">
                  <div className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center group-hover:bg-violet-100 dark:group-hover:bg-violet-500/10 transition-colors shrink-0">
                    <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-gray-900 dark:text-white text-sm group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">{tool.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 truncate">{tool.description}</div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-gray-300 dark:text-gray-600 group-hover:text-violet-500 shrink-0 transition-colors" />
                </Link>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
