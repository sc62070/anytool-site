import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Repeat, Copy, Check } from 'lucide-react'

export default function TextRepeater() {
  const [text, setText] = useState('')
  const [count, setCount] = useState(10)
  const [separator, setSeparator] = useState('\n')
  const [copied, setCopied] = useState(false)

  const result = text ? Array(count).fill(text).join(separator) : ''

  const copy = () => {
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg flex items-center justify-center">
          <Repeat className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Text Repeater</h1>
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-8">Repeat any text multiple times with custom separators.</p>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Text to repeat</label>
          <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter text..." className="w-full h-24 p-3 border border-gray-300 dark:border-gray-600 rounded-xl resize-y" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Repeat count</label>
            <input type="number" min={1} max={10000} value={count} onChange={(e) => setCount(Number(e.target.value))} className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Separator</label>
            <select value={separator} onChange={(e) => setSeparator(e.target.value)} className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl">
              <option value="\n">New line</option>
              <option value=" ">Space</option>
              <option value=", ">Comma + Space</option>
              <option value=" | ">Pipe</option>
              <option value="">None</option>
            </select>
          </div>
        </div>
      </div>

      {result && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">{result.length.toLocaleString()} characters</span>
            <button onClick={copy} className="flex items-center gap-1 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700">
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <textarea readOnly value={result} className="w-full h-48 p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-sm resize-y" />
        </div>
      )}

      <div className="mt-8 text-center">
        <Link to="/" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 text-sm">&larr; Back to all tools</Link>
      </div>
    </div>
  )
}
