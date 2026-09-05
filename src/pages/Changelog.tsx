import { Link } from 'react-router-dom'
import { Sparkles, Search, Moon, Puzzle, Rocket } from 'lucide-react'

const entries = [
  {
    date: 'Aug 2026',
    title: '40+ New Tools Added',
    description: 'Expanded with formatters, generators, calculators, network tools, and much more.',
    icon: Sparkles,
    color: 'text-violet-500',
    bg: 'bg-violet-500/10',
  },
  {
    date: 'Aug 2026',
    title: 'Search & Favorites',
    description: 'Added search, category filters, favorites, and recent tools for faster access.',
    icon: Search,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
  },
  {
    date: 'Aug 2026',
    title: 'Redesigned UI',
    description: 'Added dark mode, mobile menu, and a completely redesigned interface.',
    icon: Moon,
    color: 'text-emerald-500',
    bg: 'bg-emerald-500/10',
  },
  {
    date: 'Aug 2026',
    title: '16 New Tools',
    description: 'Added PDF tools, image tools, text tools, and other utility functions.',
    icon: Puzzle,
    color: 'text-amber-500',
    bg: 'bg-amber-500/10',
  },
  {
    date: 'Aug 2026',
    title: 'Site Launched',
    description: 'AnyTool.site launched with 17 free browser-based tools.',
    icon: Rocket,
    color: 'text-rose-500',
    bg: 'bg-rose-500/10',
  },
]

export default function Changelog() {
  return (
    <div>
      <section className="bg-gray-950 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <span className="text-sm font-semibold text-violet-400 tracking-wider uppercase">Changelog</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4 tracking-tight">What's New</h1>
          <p className="text-gray-400 max-w-lg text-lg">Track every improvement, feature, and tool we've added.</p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 py-16">
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-800" />

          <div className="space-y-10">
            {entries.map((entry, i) => (
              <div key={i} className="relative flex gap-6">
                <div className={`relative z-10 flex-shrink-0 w-12 h-12 rounded-full ${entry.bg} flex items-center justify-center border-4 border-white dark:border-gray-950`}>
                  <entry.icon className={`w-5 h-5 ${entry.color}`} />
                </div>
                <div className="bg-white dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 flex-1">
                  <span className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">{entry.date}</span>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-1">{entry.title}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 leading-relaxed">{entry.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">Want a new tool?</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-6">Let us know what you'd like us to build next.</p>
        <Link to="/request" className="inline-flex items-center gap-2 bg-violet-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-violet-700 transition-colors no-underline">
          Request a Tool
        </Link>
      </section>
    </div>
  )
}
