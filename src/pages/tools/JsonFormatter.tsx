import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FileJson, Copy, Check, AlertTriangle } from 'lucide-react'

export default function JsonFormatter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const formatJson = (compact = false) => {
    setError('')
    try {
      const parsed = JSON.parse(input)
      setOutput(JSON.stringify(parsed, null, compact ? 0 : 2))
    } catch (e) {
      setError((e as Error).message)
      setOutput('')
    }
  }

  const minify = () => formatJson(true)

  const handleCopy = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg flex items-center justify-center">
          <FileJson className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">JSON Formatter</h1>
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-8">Format, validate, minify, and beautify your JSON data.</p>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Input</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"key": "value"}'
            className="w-full h-72 p-4 border border-gray-300 dark:border-gray-600 rounded-xl text-sm font-mono resize-y focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Output</label>
          <div className="relative">
            <textarea
              readOnly
              value={output}
              placeholder="Formatted output will appear here..."
              className="w-full h-72 p-4 border border-gray-300 dark:border-gray-600 rounded-xl text-sm font-mono bg-gray-50 dark:bg-gray-700 resize-y"
            />
            {output && (
              <button onClick={handleCopy} className="absolute top-3 right-3 p-2 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            )}
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-4 flex items-center gap-2 text-red-600 bg-red-50 dark:bg-red-900/20 p-3 rounded-lg text-sm">
          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          {error}
        </div>
      )}

      <div className="flex gap-3 mt-6">
        <button onClick={() => formatJson(false)} className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
          Format
        </button>
        <button onClick={minify} className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-6 py-2.5 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
          Minify
        </button>
        <button onClick={() => { setInput(''); setOutput(''); setError('') }} className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-6 py-2.5 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
          Clear
        </button>
      </div>

      <div className="mt-8 text-center">
        <Link to="/" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 text-sm">&larr; Back to all tools</Link>
      </div>
    </div>
  )
}
