import { useState } from 'react'
import { FileJson, Copy, Check, AlertTriangle } from 'lucide-react'
import ToolLayout from '../../components/ToolLayout'

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
    <ToolLayout title="JSON Formatter" description="Format, validate, minify, and beautify your JSON data." icon={FileJson}>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Input</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"key": "value"}'
            className="w-full h-72 p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm font-mono resize-y focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all text-gray-900 dark:text-white placeholder:text-gray-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Output</label>
          <div className="relative">
            <textarea
              readOnly
              value={output}
              placeholder="Formatted output will appear here..."
              className="w-full h-72 p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm font-mono resize-y text-gray-900 dark:text-white placeholder:text-gray-400"
            />
            {output && (
              <button onClick={handleCopy} className="absolute top-3 right-3 p-2 text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            )}
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-4 flex items-center gap-2 text-red-600 bg-red-50 dark:bg-red-900/20 p-3 rounded-xl text-sm border border-red-200 dark:border-red-800/50">
          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          {error}
        </div>
      )}

      <div className="flex gap-3 mt-6">
        <button onClick={() => formatJson(false)} className="bg-violet-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-violet-700 transition-colors">
          Format
        </button>
        <button onClick={minify} className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-6 py-2.5 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700">
          Minify
        </button>
        <button onClick={() => { setInput(''); setOutput(''); setError('') }} className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-6 py-2.5 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700">
          Clear
        </button>
      </div>
    </ToolLayout>
  )
}
