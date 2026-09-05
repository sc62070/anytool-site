import { Link } from 'react-router-dom'
import { Home, Search, ArrowRight } from 'lucide-react'

const popular = [
  { name: 'Word Counter', slug: 'word-counter' },
  { name: 'JSON Formatter', slug: 'json-formatter' },
  { name: 'Color Picker', slug: 'color-picker' },
  { name: 'Password Generator', slug: 'password-generator' },
  { name: 'Image Compressor', slug: 'image-compressor' },
  { name: 'Base64 Tool', slug: 'base64' },
]

export default function NotFound() {
  return (
    <div>
      <section className="bg-gray-950 py-24 px-4 flex flex-col items-center justify-center text-center min-h-[70vh]">
        <h1 className="text-[8rem] md:text-[10rem] font-bold text-white leading-none tracking-tighter">404</h1>
        <p className="text-gray-400 text-xl mt-2 mb-2">This page doesn't exist.</p>
        <p className="text-gray-500 text-sm mb-8 max-w-md">The page you're looking for might have been moved, renamed, or never existed. Try one of the links below or head back home.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-violet-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-violet-700 transition-colors no-underline mb-12"
        >
          <Home className="w-4 h-4" /> Back to Home
        </Link>
      </section>

      <section className="max-w-4xl mx-auto px-4 pb-24 -mt-8">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 text-center">Popular Tools</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
          {popular.map((t) => (
            <Link key={t.slug} to={`/tools/${t.slug}`} className="flex items-center justify-between p-4 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-violet-300 dark:hover:border-violet-500/50 transition-all no-underline">
              <span className="text-sm font-medium text-gray-900 dark:text-white">{t.name}</span>
              <ArrowRight className="w-4 h-4 text-gray-400" />
            </Link>
          ))}
        </div>
        <div className="text-center mt-6">
          <Link to="/tools" className="inline-flex items-center gap-2 text-sm font-medium text-violet-600 dark:text-violet-400 hover:text-violet-700 no-underline">
            <Search className="w-4 h-4" /> Browse all 111+ tools
          </Link>
        </div>
      </section>
    </div>
  )
}
