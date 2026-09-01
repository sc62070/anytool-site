import { Link } from 'react-router-dom'
import { Sparkles } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 mt-auto border-t border-gray-800/50">
      <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-4 gap-12">
        <div className="md:col-span-2">
          <Link to="/" className="flex items-center gap-2 no-underline mb-4">
            <div className="w-8 h-8 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-white tracking-tight">AnyTool<span className="text-violet-400">.</span></span>
          </Link>
          <p className="text-sm leading-relaxed mb-6 max-w-sm">Free online tools for developers, writers, and everyone. Fast, simple, and no sign-up required.</p>
          <Link to="/blog" className="text-sm text-violet-400 hover:text-violet-300 no-underline font-medium">Read our Blog &rarr;</Link>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Tools</h4>
          <ul className="space-y-2.5 text-sm list-none p-0">
            <li><Link to="/tools/word-counter" className="hover:text-violet-400 no-underline text-gray-400 transition-colors">Word Counter</Link></li>
            <li><Link to="/tools/json-formatter" className="hover:text-violet-400 no-underline text-gray-400 transition-colors">JSON Formatter</Link></li>
            <li><Link to="/tools/color-picker" className="hover:text-violet-400 no-underline text-gray-400 transition-colors">Color Picker</Link></li>
            <li><Link to="/tools/password-generator" className="hover:text-violet-400 no-underline text-gray-400 transition-colors">Password Generator</Link></li>
            <li><Link to="/tools/image-compressor" className="hover:text-violet-400 no-underline text-gray-400 transition-colors">Image Compressor</Link></li>
            <li><Link to="/tools/dwg-viewer" className="hover:text-violet-400 no-underline text-gray-400 transition-colors">DWG Viewer</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Company</h4>
          <ul className="space-y-2.5 text-sm list-none p-0">
            <li><Link to="/about" className="hover:text-violet-400 no-underline text-gray-400 transition-colors">About</Link></li>
            <li><Link to="/blog" className="hover:text-violet-400 no-underline text-gray-400 transition-colors">Blog</Link></li>
            <li><Link to="/contact" className="hover:text-violet-400 no-underline text-gray-400 transition-colors">Contact</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-violet-400 no-underline text-gray-400 transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-violet-400 no-underline text-gray-400 transition-colors">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800/50 text-center py-6 text-sm">
        <p>&copy; {new Date().getFullYear()} AnyTool.site. All rights reserved.</p>
      </div>

      {/* Buy Me a Coffee */}
      <div className="fixed bottom-4 left-4 z-50">
        <script type="text/javascript" src="https://cdnjs.buymeacoffee.com/1.0.0/button.prod.min.js" data-name="bmc-button" data-slug="quizzment" data-color="#FFDD00" data-emoji="☕" data-font="Cookie" data-text="Buy me a coffee" data-outline-color="#000000" data-font-color="#000000" data-coffee-color="#ffffff" async />
      </div>
    </footer>
  )
}
