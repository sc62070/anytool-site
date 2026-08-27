import { Link } from 'react-router-dom'
import { blogPosts } from '../../data/blog'
import { Calendar, Clock, ArrowRight } from 'lucide-react'

export default function Blog() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-2">Blog</h1>
      <p className="text-gray-600 dark:text-gray-400 mb-8">Tips, guides, and insights about our tools and web development.</p>

      <div className="space-y-6">
        {blogPosts.map((post) => (
          <Link
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="block bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg hover:border-indigo-300 dark:hover:border-indigo-500 transition-all no-underline"
          >
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                <span className="bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 px-2.5 py-0.5 rounded-full text-xs font-medium">{post.category}</span>
                <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{post.date}</span>
                <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{post.readTime}</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">{post.title}</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-3">{post.excerpt}</p>
              <span className="inline-flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400">
                Read More <ArrowRight className="w-4 h-4 ml-1" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
