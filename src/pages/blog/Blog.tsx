import { Link } from 'react-router-dom'
import { blogPosts } from '../../data/blog'
import { Calendar, Clock, ArrowRight } from 'lucide-react'

export default function Blog() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gray-950 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <span className="text-sm font-semibold text-violet-400 tracking-wider uppercase">From the blog</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4 tracking-tight">Latest Posts</h1>
          <p className="text-gray-400 max-w-lg text-lg">Tips, guides, and insights about our tools and web development.</p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
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
                <h2 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">{post.title}</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 mb-4">{post.excerpt}</p>
                <span className="inline-flex items-center text-sm font-medium text-violet-600 dark:text-violet-400">
                  Read More <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
