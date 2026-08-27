import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { tools } from '../data/tools'
import { getViews } from '../data/views'
import { blogPosts } from '../data/blog'
import { ArrowRight, Calendar, Clock, ArrowUpRight, Zap, Shield, Globe, Search, X } from 'lucide-react'

const categories = ['All', ...Array.from(new Set(tools.map(t => t.category)))]

export default function Home() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('All')

  const views = getViews()

  const filteredTools = useMemo(() => {
    let result = [...tools]

    if (activeCategory !== 'All') {
      result = result.filter(t => t.category === activeCategory)
    }

    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(t =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q)
      )
    }

    // Sort by views only when no search/filter
    if (!search.trim() && activeCategory === 'All') {
      result.sort((a, b) => (views[b.slug] || 0) - (views[a.slug] || 0))
    }

    return result
  }, [search, activeCategory, views])

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gray-950" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(120,119,198,0.3),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_60%,rgba(236,72,153,0.15),transparent)]" />

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />

        <div className="relative max-w-6xl mx-auto px-4 py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 mb-8">
              <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-sm text-gray-300">70+ tools and counting</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
              Tools that
              <span className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                actually work.
              </span>
            </h1>

            <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-xl leading-relaxed">
              Fast, free, and private. No sign-ups, no tracking, no nonsense.
              Every tool runs in your browser.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="#tools"
                className="group inline-flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-all no-underline"
              >
                Explore Tools
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 border border-white/20 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/5 transition-all no-underline"
              >
                Read the Blog
              </Link>
            </div>
          </div>

          {/* Floating badges */}
          <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2">
            <div className="relative w-72 h-72">
              <div className="absolute top-0 right-0 bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl px-4 py-3 animate-bounce" style={{ animationDuration: '3s' }}>
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm text-white font-medium">Instant results</span>
                </div>
              </div>
              <div className="absolute top-20 right-16 bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl px-4 py-3 animate-bounce" style={{ animationDuration: '4s', animationDelay: '0.5s' }}>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm text-white font-medium">100% private</span>
                </div>
              </div>
              <div className="absolute top-44 right-0 bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl px-4 py-3 animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '1s' }}>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-violet-400" />
                  <span className="text-sm text-white font-medium">Works everywhere</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section id="tools" className="max-w-6xl mx-auto px-4 py-24">
        <div className="text-center mb-12">
          <span className="text-sm font-semibold text-violet-600 dark:text-violet-400 tracking-wider uppercase">Everything you need</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mt-3 mb-4 tracking-tight">Our Tools</h2>
          <p className="text-gray-500 dark:text-gray-400 max-w-lg mx-auto text-lg">Pick a tool, get your answer, close the tab. No fluff, no accounts, no data collection.</p>
        </div>

        {/* Search + Filters */}
        <div className="mb-8 space-y-4">
          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tools..."
              className="w-full pl-11 pr-10 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all text-gray-900 dark:text-white placeholder:text-gray-400"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/25'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results */}
        {filteredTools.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 dark:text-gray-400 text-lg">No tools found matching "{search}"</p>
            <button onClick={() => { setSearch(''); setActiveCategory('All') }} className="mt-3 text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 text-sm font-medium">
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredTools.map((tool) => {
              const Icon = tool.icon
              return (
                <Link
                  key={tool.slug}
                  to={`/tools/${tool.slug}`}
                  className="group relative bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 hover:border-violet-300 dark:hover:border-violet-500/50 transition-all duration-300 no-underline overflow-hidden"
                >
                  {/* Hover glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 to-fuchsia-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  <div className="relative">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-11 h-11 bg-gray-100 dark:bg-gray-800 rounded-xl flex items-center justify-center group-hover:bg-violet-100 dark:group-hover:bg-violet-500/10 transition-colors duration-300">
                        <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors duration-300" />
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-gray-300 dark:text-gray-600 group-hover:text-violet-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
                    </div>

                    <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-1.5">{tool.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{tool.description}</p>

                    <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                      <span className="text-xs font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">{tool.category}</span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </section>

      {/* Latest Blog Posts */}
      <section className="bg-gray-50 dark:bg-gray-900/50 py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-sm font-semibold text-violet-600 dark:text-violet-400 tracking-wider uppercase">From the blog</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-3 tracking-tight">Latest Posts</h2>
            </div>
            <Link to="/blog" className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 no-underline">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.slice(0, 3).map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group block bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700/50 overflow-hidden hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-gray-900/50 hover:border-transparent transition-all duration-300 no-underline"
              >
                <div className="relative h-48 overflow-hidden">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full">{post.category}</span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-3">
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{post.date}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">{post.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
          <Link to="/blog" className="md:hidden inline-flex items-center gap-2 text-sm font-semibold text-violet-600 dark:text-violet-400 mt-8">
            View All Posts <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-violet-600 dark:text-violet-400 tracking-wider uppercase">Why us</span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mt-3 tracking-tight">Built different</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Zap, title: 'Instant & Free', desc: 'Open the page, use the tool, get your answer. No waiting, no fees, no catch.' },
            { icon: Shield, title: 'Zero Data Collection', desc: 'Everything runs in your browser. Nothing is sent to our servers. Your data stays yours.' },
            { icon: Globe, title: 'Works Everywhere', desc: 'Desktop, tablet, phone. Any browser, any OS. If it has a screen, it works.' },
          ].map((f) => (
            <div key={f.title} className="relative p-8 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
              <div className="w-12 h-12 bg-violet-100 dark:bg-violet-500/10 rounded-xl flex items-center justify-center mb-5">
                <f.icon className="w-6 h-6 text-violet-600 dark:text-violet-400" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{f.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
