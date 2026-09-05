import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CaseUpper, Copy, Check } from 'lucide-react'
import ToolLayout from '../../components/ToolLayout'

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
    <ToolLayout title="Text Case Converter" description="Convert text between uppercase, lowercase, title case, camelCase, and more." icon={CaseUpper} info="Our free online text case converter transforms your text into uppercase, lowercase, title case, camelCase, PascalCase, snake_case, and kebab-case instantly. Perfect for developers, writers, and content creators who need consistent text formatting.">

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type or paste your text here..."
        className="w-full h-32 p-4 border border-gray-300 dark:border-gray-600 rounded-xl text-base resize-y focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
      />

      <div className="grid md:grid-cols-2 gap-3 mt-6">
        {transformations.map((t) => (
          <div key={t.label} className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="flex-1 min-w-0">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t.label}</div>
              <div className="font-mono text-sm truncate text-gray-800">{t.value || '—'}</div>
            </div>
            <button
              onClick={() => handleCopy(t.value, t.label)}
              disabled={!text}
              className="p-1.5 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 disabled:opacity-30 flex-shrink-0"
            >
              {copied === t.label ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        ))}
      </div>
    </ToolLayout>
  )
}
