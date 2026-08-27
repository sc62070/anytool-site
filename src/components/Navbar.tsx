import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-indigo-600 no-underline">
          AnyTool<span className="text-gray-900">.site</span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-gray-600 hover:text-indigo-600 no-underline transition-colors">Home</Link>
          <Link to="/blog" className="text-gray-600 hover:text-indigo-600 no-underline transition-colors">Blog</Link>
          <Link to="/about" className="text-gray-600 hover:text-indigo-600 no-underline transition-colors">About</Link>
          <Link to="/contact" className="text-gray-600 hover:text-indigo-600 no-underline transition-colors">Contact</Link>
        </div>
      </div>
    </nav>
  )
}
