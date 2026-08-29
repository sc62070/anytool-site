import { useParams, Link } from 'react-router-dom'
import { blogPosts } from '../../data/blog'
import { Calendar, Clock, ArrowLeft, ExternalLink, ArrowRight, Share2, Twitter, Linkedin, Link2 } from 'lucide-react'
import { marked } from 'marked'
import { Helmet } from 'react-helmet-async'

marked.setOptions({ breaks: true, gfm: true })

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>()
  const post = blogPosts.find((p) => p.slug === slug)

  if (!post) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-black text-white mb-4">404</h1>
          <p className="text-gray-400 mb-6">Post not found.</p>
          <Link to="/blog" className="text-[#3cffd0] hover:underline">Back to Blog</Link>
        </div>
      </div>
    )
  }

  const html = marked.parse(post.content) as string
  const related = blogPosts.filter(p => p.slug !== post.slug).slice(0, 3)

  return (
    <article className="bg-[#0a0a0a] min-h-screen">
      <Helmet>
        <title>{post.title} - AnyTool.site Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      {/* Hero */}
      <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <img src={post.image} alt={post.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a]/40 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0">
          <div className="max-w-4xl mx-auto px-4 pb-12">
            <Link to="/blog" className="inline-flex items-center gap-2 text-[#3cffd0] text-sm font-medium mb-6 hover:underline no-underline">
              <ArrowLeft className="w-4 h-4" /> All Posts
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <span className="bg-[#3cffd0] text-black text-xs font-bold px-3 py-1 rounded-sm uppercase tracking-wider">{post.category}</span>
              <span className="text-gray-400 text-sm flex items-center gap-1"><Calendar className="w-3.5 h-3.5" />{post.date}</span>
              <span className="text-gray-400 text-sm flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{post.readTime}</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-white leading-[0.95] tracking-tight mb-4">{post.title}</h1>
            <p className="text-xl text-gray-400 max-w-2xl">{post.excerpt}</p>
          </div>
        </div>
      </div>

      {/* Author bar */}
      <div className="border-b border-white/10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#3cffd0] rounded-full flex items-center justify-center text-black font-bold text-sm">{post.author.charAt(0)}</div>
            <div>
              <span className="text-[#3cffd0] text-sm font-medium">{post.author}</span>
              <span className="text-gray-500 text-sm ml-3">{post.date}</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-[#1DA1F2] transition-colors rounded-lg hover:bg-white/5" title="Share on Twitter"><Twitter className="w-4 h-4" /></a>
            <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" className="p-2 text-gray-400 hover:text-[#0A66C2] transition-colors rounded-lg hover:bg-white/5" title="Share on LinkedIn"><Linkedin className="w-4 h-4" /></a>
            <button onClick={() => { navigator.clipboard.writeText(window.location.href) }} className="p-2 text-gray-400 hover:text-[#3cffd0] transition-colors rounded-lg hover:bg-white/5" title="Copy link"><Link2 className="w-4 h-4" /></button>
          </div>
        </div>
      </div>

      {/* Article body */}
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="prose-verge" dangerouslySetInnerHTML={{ __html: html }} />

        {/* Related links */}
        {post.links.length > 0 && (
          <div className="mt-12 bg-white/5 border border-white/10 rounded-lg p-6">
            <h3 className="text-white font-bold text-lg mb-4">Related Links</h3>
            <div className="space-y-3">
              {post.links.map((link, i) => (
                <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#3cffd0] hover:underline no-underline text-sm">
                  <ExternalLink className="w-4 h-4 flex-shrink-0" />
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <Link to="/" className="inline-flex items-center gap-2 bg-[#3cffd0] text-black px-6 py-3 rounded-sm font-bold hover:bg-[#2de0b8] transition-colors no-underline text-sm uppercase tracking-wider">
            Try Our Tools <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Related articles */}
      <div className="border-t border-white/10 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-black text-white mb-8 uppercase tracking-tight">More from the blog</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {related.map((r) => (
              <Link key={r.slug} to={`/blog/${r.slug}`} className="group block no-underline">
                <div className="relative h-48 overflow-hidden rounded-lg mb-4">
                  <img src={r.image} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <span className="text-[#3cffd0] text-xs font-bold uppercase tracking-wider">{r.category}</span>
                <h3 className="text-white font-bold text-lg mt-1 group-hover:text-[#3cffd0] transition-colors leading-tight">{r.title}</h3>
                <span className="text-gray-500 text-sm mt-2 block">{r.date}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Inline styles for prose */}
      <style>{`
        .prose-verge { color: #d1d1d1; font-size: 1.125rem; line-height: 1.8; }
        .prose-verge h2 { color: #fff; font-size: 1.75rem; font-weight: 900; margin: 2.5rem 0 1rem; letter-spacing: -0.02em; }
        .prose-verge h3 { color: #fff; font-size: 1.35rem; font-weight: 700; margin: 2rem 0 0.75rem; }
        .prose-verge p { margin: 1.25rem 0; }
        .prose-verge a { color: #3cffd0; text-decoration: underline; text-underline-offset: 2px; }
        .prose-verge a:hover { color: #2de0b8; }
        .prose-verge ul, .prose-verge ol { margin: 1.25rem 0; padding-left: 1.5rem; }
        .prose-verge li { margin: 0.5rem 0; }
        .prose-verge ul { list-style: disc; }
        .prose-verge ol { list-style: decimal; }
        .prose-verge code { background: rgba(255,255,255,0.08); padding: 0.15rem 0.4rem; border-radius: 3px; font-size: 0.9em; color: #3cffd0; }
        .prose-verge pre { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 6px; padding: 1.25rem; overflow-x: auto; margin: 1.5rem 0; }
        .prose-verge pre code { background: none; padding: 0; color: #d1d1d1; }
        .prose-verge blockquote { border-left: 3px solid #3cffd0; padding-left: 1.25rem; margin: 1.5rem 0; color: #949494; font-style: italic; }
        .prose-verge table { width: 100%; border-collapse: collapse; margin: 1.5rem 0; }
        .prose-verge th, .prose-verge td { border: 1px solid rgba(255,255,255,0.1); padding: 0.75rem 1rem; text-align: left; }
        .prose-verge th { background: rgba(255,255,255,0.05); color: #fff; font-weight: 700; }
        .prose-verge strong { color: #fff; }
        .prose-verge hr { border: none; border-top: 1px solid rgba(255,255,255,0.1); margin: 2rem 0; }
      `}</style>
    </article>
  )
}
