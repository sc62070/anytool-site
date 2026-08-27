import { Link } from 'react-router-dom'
import { tools } from '../data/tools'
import { blogPosts } from '../data/blog'
import { ArrowRight, Calendar, Clock } from 'lucide-react'

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 text-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Free Online Tools
          </h1>
          <p className="text-lg md:text-xl text-indigo-100 mb-8 max-w-xl mx-auto">
            Simple, fast, and free tools for developers, writers, and everyone. No sign-up required.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="#tools" className="bg-white text-indigo-700 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors no-underline">
              Explore Tools
            </a>
            <Link to="/blog" className="border border-white/30 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors no-underline">
              Read the Blog
            </Link>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section id="tools" className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">Our Tools</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-lg mx-auto">Everything you need, all in one place. Each tool is designed to be fast, reliable, and easy to use.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => {
            const Icon = tool.icon
            return (
              <Link
                key={tool.slug}
                to={`/tools/${tool.slug}`}
                className="group bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:border-indigo-300 dark:hover:border-indigo-500 transition-all no-underline"
              >
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-200 dark:group-hover:bg-indigo-800/50 transition-colors">
                  <Icon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">{tool.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{tool.description}</p>
                <span className="inline-flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400 group-hover:gap-2 transition-all">
                  Use Tool <ArrowRight className="w-4 h-4 ml-1" />
                </span>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className="bg-white dark:bg-gray-800 py-16 px-4 transition-colors">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Latest from the Blog</h2>
              <p className="text-gray-600 dark:text-gray-400">Tips, guides, and insights about our tools.</p>
            </div>
            <Link to="/blog" className="hidden md:inline-flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300">
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.slice(0, 3).map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="block bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-md hover:border-indigo-300 transition-all no-underline"
              >
                <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mb-3">
                  <span className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded-full font-medium">{post.category}</span>
                  <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{post.date}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime}</span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">{post.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">{post.excerpt}</p>
              </Link>
            ))}
          </div>
          <Link to="/blog" className="md:hidden inline-flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400 mt-6">
            View All Posts <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-3">Why AnyTool.site?</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: 'Fast & Free', desc: 'All tools run instantly in your browser. No waiting, no fees.' },
            { title: 'No Sign-Up', desc: 'Just open and use. We respect your time and privacy.' },
            { title: 'Always Available', desc: 'Works on any device, anywhere. 24/7 uptime.' },
          ].map((f) => (
            <div key={f.title} className="text-center p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">{f.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
