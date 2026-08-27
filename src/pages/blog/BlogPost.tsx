import { useParams, Link } from 'react-router-dom'
import { blogPosts } from '../../data/blog'
import { Calendar, Clock, ArrowLeft, ExternalLink, ArrowRight } from 'lucide-react'
import { marked } from 'marked'

marked.setOptions({ breaks: true, gfm: true })

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Post Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">The blog post you're looking for doesn't exist.</p>
        <Link to="/blog" className="text-violet-600 dark:text-violet-400 hover:text-violet-700">&larr; Back to Blog</Link>
      </div>
    )
  }

  const html = marked.parse(post.content) as string

  return (
    <article>
      {/* Hero */}
      <section className="bg-gray-950 relative overflow-hidden">
        <img src={post.image} alt={post.title} className="absolute inset-0 w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950/80 via-gray-950/90 to-gray-950" />
        <div className="relative max-w-3xl mx-auto px-4 py-20">
          <Link to="/blog" className="inline-flex items-center text-sm text-gray-400 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1" /> Back to Blog
          </Link>
          <div className="flex items-center gap-3 text-sm text-gray-400 mb-4">
            <span className="bg-violet-500/20 text-violet-300 px-2.5 py-0.5 rounded-full text-xs font-medium">{post.category}</span>
            <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{post.date}</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{post.readTime}</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">{post.title}</h1>
          <p className="text-lg text-gray-400 mt-3">{post.excerpt}</p>
          <p className="text-sm text-gray-500 mt-2">By {post.author}</p>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="prose prose-lg max-w-none prose-violet dark:prose-invert" dangerouslySetInnerHTML={{ __html: html }} />

        {post.links.length > 0 && (
          <div className="mt-8 bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Related Links</h3>
            <ul className="space-y-2.5 list-none p-0 m-0">
              {post.links.map((link, i) => (
                <li key={i}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 no-underline transition-colors"
                  >
                    <ExternalLink className="w-4 h-4 flex-shrink-0" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Try Our Tools</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">Put what you learned into practice with our free online tools.</p>
          <Link to="/" className="inline-flex items-center gap-2 bg-violet-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-violet-700 transition-colors no-underline">
            Explore All Tools <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </article>
  )
}
