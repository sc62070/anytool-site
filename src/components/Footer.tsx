import { Link } from 'react-router-dom'

const toolLinks = [
  { name: 'Word Counter', path: '/tools/word-counter' },
  { name: 'JSON Formatter', path: '/tools/json-formatter' },
  { name: 'Color Picker', path: '/tools/color-picker' },
  { name: 'Password Generator', path: '/tools/password-generator' },
  { name: 'Base64 Tool', path: '/tools/base64' },
  { name: 'Text Case Converter', path: '/tools/text-case' },
  { name: 'URL Encoder', path: '/tools/url-encoder' },
  { name: 'Markdown Preview', path: '/tools/markdown-preview' },
  { name: 'Lorem Ipsum', path: '/tools/lorem-ipsum' },
  { name: 'Hash Generator', path: '/tools/hash-generator' },
]

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <h3 className="text-white text-lg font-semibold mb-3">AnyTool.site</h3>
          <p className="text-sm leading-relaxed mb-4">Free online tools for developers, writers, and everyone. Fast, simple, and no sign-up required.</p>
          <Link to="/blog" className="text-sm text-indigo-400 hover:text-indigo-300 no-underline">Read our Blog &rarr;</Link>
        </div>
        <div>
          <h4 className="text-white font-medium mb-3">Tools</h4>
          <ul className="space-y-2 text-sm list-none p-0">
            {toolLinks.slice(0, 6).map(tool => (
              <li key={tool.path}>
                <Link to={tool.path} className="hover:text-indigo-400 no-underline text-gray-400 transition-colors">{tool.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-white font-medium mb-3">Company</h4>
          <ul className="space-y-2 text-sm list-none p-0">
            <li><Link to="/about" className="hover:text-indigo-400 no-underline text-gray-400 transition-colors">About</Link></li>
            <li><Link to="/blog" className="hover:text-indigo-400 no-underline text-gray-400 transition-colors">Blog</Link></li>
            <li><Link to="/contact" className="hover:text-indigo-400 no-underline text-gray-400 transition-colors">Contact</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-indigo-400 no-underline text-gray-400 transition-colors">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-indigo-400 no-underline text-gray-400 transition-colors">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 text-center py-4 text-sm">
        <p>&copy; {new Date().getFullYear()} AnyTool.site. All rights reserved.</p>
      </div>
    </footer>
  )
}
