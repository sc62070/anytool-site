import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Code, Copy, Check } from 'lucide-react'
import { marked } from 'marked'

marked.setOptions({ breaks: true, gfm: true })

export default function MarkdownToHtml() {
  const [markdown, setMarkdown] = useState('# Hello World\n\nThis is **bold** and *italic* text.\n\n- Item 1\n- Item 2\n- Item 3')
  const [html, setHtml] = useState('')
  const [copied, setCopied] = useState(false)

  const convert = () => {
    setHtml(marked.parse(markdown) as string)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(html)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg flex items-center justify-center">
          <Code className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Markdown to HTML</h1>
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-8">Convert Markdown text to clean HTML code.</p>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Markdown</label>
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            className="w-full h-80 p-4 border border-gray-300 dark:border-gray-600 rounded-xl text-sm font-mono resize-y focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">HTML Output</label>
            {html && (
              <button onClick={handleCopy} className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 flex items-center gap-1">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            )}
          </div>
          <div className="relative">
            <textarea
              readOnly
              value={html}
              placeholder="HTML output will appear here..."
              className="w-full h-80 p-4 border border-gray-300 dark:border-gray-600 rounded-xl text-sm font-mono bg-gray-50 dark:bg-gray-700 resize-y"
            />
          </div>
        </div>
      </div>

      <button onClick={convert} className="mt-4 bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
        Convert to HTML
      </button>

      {html && (
        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Preview</label>
          <div className="p-4 border border-gray-300 dark:border-gray-600 rounded-xl prose max-w-none" dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      )}

      <div className="mt-8 text-center">
        <Link to="/" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 text-sm">&larr; Back to all tools</Link>
      </div>
    </div>
  )
}
