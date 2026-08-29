import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div>
      <section className="bg-gray-950 py-24 px-4 flex flex-col items-center justify-center text-center min-h-[70vh]">
        <h1 className="text-[8rem] md:text-[10rem] font-bold text-white leading-none tracking-tighter">404</h1>
        <p className="text-gray-400 text-xl mt-2 mb-8">This page doesn't exist.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-violet-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-violet-700 transition-colors no-underline"
        >
          <Home className="w-4 h-4" /> Back to Home
        </Link>
      </section>
    </div>
  )
}
