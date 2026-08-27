import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CaseUpper, Copy, Check } from 'lucide-react'

export default function TextCaseConverter() {
  const [text, setText] = useState('')
  const [copied, setCopied] = useState('')

  const transformations = [
    { label: 'UPPERCASE', value: text.toUpperCase() },
    { label: 'lowercase', value: text.toLowerCase() },
    { label: 'Title Case', value: text.replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase())) },
    { label: 'Sentence case', value: text.replace(/(^\s*|[.!?]\s+)(\w)/g, (_, sep, c) => sep + c.toUpperCase()).toLowerCase() },
    { label: 'camelCase', value: text.replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase()).replace(/^./, (c) => c.toLowerCase()) },
    { label: 'PascalCase', value: text.replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase()).replace(/^./, (c) => c.toUpperCase()) },
    { label: 'snake_case', value: text.replace(/([A-Z])/g, '_$1').replace(/[^a-zA-Z0-9]+/g, '_').toLowerCase().replace(/^_/, '') },
    { label: 'kebab-case', value: text.replace(/([A-Z])/g, '-$1').replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase().replace(/^-/, '') },
    { label: 'Reversed', value: text.split('').reverse().join('') },
  ]

  const handleCopy = (value: string, label: string) => {
    navigator.clipboard.writeText(value)
    setCopied(label)
    setTimeout(() => setCopied(''), 2000)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
          <CaseUpper className="w-5 h-5 text-indigo-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Text Case Converter</h1>
      </div>
      <p className="text-gray-600 mb-8">Convert text between uppercase, lowercase, title case, camelCase, and more.</p>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type or paste your text here..."
        className="w-full h-32 p-4 border border-gray-300 rounded-xl text-base resize-y focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
      />

      <div className="grid md:grid-cols-2 gap-3 mt-6">
        {transformations.map((t) => (
          <div key={t.label} className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg">
            <div className="flex-1 min-w-0">
              <div className="text-xs text-gray-500 mb-1">{t.label}</div>
              <div className="font-mono text-sm truncate text-gray-800">{t.value || '—'}</div>
            </div>
            <button
              onClick={() => handleCopy(t.value, t.label)}
              disabled={!text}
              className="p-1.5 text-gray-400 hover:text-indigo-600 disabled:opacity-30 flex-shrink-0"
            >
              {copied === t.label ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link to="/" className="text-indigo-600 hover:text-indigo-700 text-sm">&larr; Back to all tools</Link>
      </div>
    </div>
  )
}
