import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Replace, Copy, Check } from 'lucide-react'

export default function FindReplace() {
  const [text, setText] = useState('')
  const [find, setFind] = useState('')
  const [replace, setReplace] = useState('')
  const [caseSensitive, setCaseSensitive] = useState(false)
  const [useRegex, setUseRegex] = useState(false)
  const [copied, setCopied] = useState(false)

  const getReplacementCount = () => {
    if (!find) return 0
    try {
      const flags = caseSensitive ? 'g' : 'gi'
      const pattern = useRegex ? find : find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      return (text.match(new RegExp(pattern, flags)) || []).length
    } catch {
      return 0
    }
  }

  const result = (() => {
    if (!find) return text
    try {
      const flags = caseSensitive ? 'g' : 'gi'
      const pattern = useRegex ? find : find.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      return text.replace(new RegExp(pattern, flags), replace)
    } catch {
      return text
    }
  })()

  const copy = () => {
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const matchCount = getReplacementCount()

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
          <Replace className="w-5 h-5 text-indigo-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Find & Replace</h1>
      </div>
      <p className="text-gray-600 mb-8">Find and replace text with support for regex patterns.</p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Input text</label>
          <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter your text..." className="w-full h-32 p-3 border border-gray-300 rounded-xl resize-y" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Find</label>
            <input type="text" value={find} onChange={(e) => setFind(e.target.value)} placeholder="Search text..." className="w-full p-3 border border-gray-300 rounded-xl" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Replace with</label>
            <input type="text" value={replace} onChange={(e) => setReplace(e.target.value)} placeholder="Replacement text..." className="w-full p-3 border border-gray-300 rounded-xl" />
          </div>
        </div>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" checked={caseSensitive} onChange={(e) => setCaseSensitive(e.target.checked)} className="rounded" /> Case sensitive
          </label>
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input type="checkbox" checked={useRegex} onChange={(e) => setUseRegex(e.target.checked)} className="rounded" /> Regular expression
          </label>
        </div>
      </div>

      {find && (
        <div className="mt-4 text-sm text-gray-600">
          {matchCount} match{matchCount !== 1 ? 'es' : ''} found
        </div>
      )}

      {text && find && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Result</span>
            <button onClick={copy} className="flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-700">
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <textarea readOnly value={result} className="w-full h-32 p-3 border border-gray-300 rounded-xl bg-gray-50 text-sm resize-y" />
        </div>
      )}

      <div className="mt-8 text-center">
        <Link to="/" className="text-indigo-600 hover:text-indigo-700 text-sm">&larr; Back to all tools</Link>
      </div>
    </div>
  )
}
