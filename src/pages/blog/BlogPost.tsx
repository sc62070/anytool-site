import { useParams, Link } from 'react-router-dom'
import { blogPosts } from '../../data/blog'
import { Calendar, Clock, ArrowLeft } from 'lucide-react'
import { marked } from 'marked'

marked.setOptions({ breaks: true, gfm: true })

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Post Not Found</h1>
        <p className="text-gray-600 mb-6">The blog post you're looking for doesn't exist.</p>
        <Link to="/blog" className="text-indigo-600 hover:text-indigo-700">&larr; Back to Blog</Link>
      </div>
    )
  }

  const html = marked.parse(post.content) as string

  return (
    <article className="max-w-3xl mx-auto px-4 py-12">
      <Link to="/blog" className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-700 mb-6">
        <ArrowLeft className="w-4 h-4 mr-1" /> Back to Blog
      </Link>

      <header className="mb-8">
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
          <span className="bg-indigo-100 text-indigo-700 px-2.5 py-0.5 rounded-full text-xs font-medium">{post.category}</span>
          <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{post.date}</span>
          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{post.readTime}</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">{post.title}</h1>
        <p className="text-lg text-gray-600 mt-3">{post.excerpt}</p>
        <p className="text-sm text-gray-500 mt-2">By {post.author}</p>
      </header>

      <div className="prose prose-lg max-w-none prose-indigo" dangerouslySetInnerHTML={{ __html: html }} />

      <div className="mt-12 pt-8 border-t border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-3">Try Our Tools</h3>
        <p className="text-gray-600 mb-4">Put what you learned into practice with our free online tools.</p>
        <Link to="/" className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors inline-block no-underline">
          Explore All Tools
        </Link>
      </div>
    </article>
  )
}
