import { Link } from 'react-router-dom'

const tools = [
  { name: 'Word Counter', path: '/tools/word-counter' },
  { name: 'JSON Formatter', path: '/tools/json-formatter' },
  { name: 'Color Picker', path: '/tools/color-picker' },
  { name: 'Password Generator', path: '/tools/password-generator' },
  { name: 'Base64 Tool', path: '/tools/base64' },
]

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-white text-lg font-semibold mb-3">AnyTool.site</h3>
          <p className="text-sm leading-relaxed">Free online tools for developers, writers, and everyone. Fast, simple, and no sign-up required.</p>
        </div>
        <div>
          <h4 className="text-white font-medium mb-3">Tools</h4>
          <ul className="space-y-2 text-sm list-none p-0">
            {tools.map(tool => (
              <li key={tool.path}>
                <Link to={tool.path} className="hover:text-indigo-400 no-underline text-gray-400 transition-colors">{tool.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-white font-medium mb-3">Legal</h4>
          <ul className="space-y-2 text-sm list-none p-0">
            <li><Link to="/about" className="hover:text-indigo-400 no-underline text-gray-400 transition-colors">About</Link></li>
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
