import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-gray-400 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <h3 className="text-white text-lg font-semibold mb-3">AnyTool.site</h3>
          <p className="text-sm leading-relaxed mb-4">Free online tools for developers, writers, and everyone. Fast, simple, and no sign-up required.</p>
          <Link to="/blog" className="text-sm text-indigo-400 hover:text-indigo-300 no-underline">Read our Blog &rarr;</Link>
        </div>
        <div>
          <h4 className="text-white font-medium mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm list-none p-0">
            <li><Link to="/tools/word-counter" className="hover:text-indigo-400 no-underline text-gray-400">Word Counter</Link></li>
            <li><Link to="/tools/json-formatter" className="hover:text-indigo-400 no-underline text-gray-400">JSON Formatter</Link></li>
            <li><Link to="/tools/color-picker" className="hover:text-indigo-400 no-underline text-gray-400">Color Picker</Link></li>
            <li><Link to="/tools/password-generator" className="hover:text-indigo-400 no-underline text-gray-400">Password Generator</Link></li>
            <li><Link to="/tools/base64" className="hover:text-indigo-400 no-underline text-gray-400">Base64 Tool</Link></li>
            <li><Link to="/tools/uuid-generator" className="hover:text-indigo-400 no-underline text-gray-400">UUID Generator</Link></li>
            <li><Link to="/tools/qr-code" className="hover:text-indigo-400 no-underline text-gray-400">QR Code Generator</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-medium mb-3">Company</h4>
          <ul className="space-y-2 text-sm list-none p-0">
            <li><Link to="/about" className="hover:text-indigo-400 no-underline text-gray-400">About</Link></li>
            <li><Link to="/blog" className="hover:text-indigo-400 no-underline text-gray-400">Blog</Link></li>
            <li><Link to="/contact" className="hover:text-indigo-400 no-underline text-gray-400">Contact</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-indigo-400 no-underline text-gray-400">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-indigo-400 no-underline text-gray-400">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 text-center py-4 text-sm">
        <p>&copy; {new Date().getFullYear()} AnyTool.site. All rights reserved.</p>
      </div>
    </footer>
  )
}
