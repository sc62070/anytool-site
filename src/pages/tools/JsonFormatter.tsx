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
    <ToolLayout title="JSON Formatter" description="Format, validate, minify, and beautify your JSON data." icon={FileJson} info="Paste malformed, minified, or raw JSON and instantly get properly indented and validated output—or compress it back down for production. The tool catches syntax errors like trailing commas, missing quotes, and mismatched brackets the moment you click Format, making it indispensable for debugging API responses.">
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

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How to Use the JSON Formatter</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
          One of the most common frustrations developers face is a malformed JSON response from an API. A single trailing comma or a missing closing bracket can break an entire request. Paste the raw response into the input pane and hit Format—the tool will either beautify the JSON with consistent two-space indentation or surface the exact error so you can fix it quickly. This is especially handy when you are copying JSON from browser DevTools, Slack messages, or terminal output, where formatting often gets mangled.
        </p>
        <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
          The Minify button strips all whitespace and newlines, shrinking the payload for production use. Smaller JSON files transfer faster over the network and reduce storage costs in databases. If you are comparing two JSON structures, format both and place them side by side—the clean indentation makes nested objects and arrays easy to scan visually. The tool validates on every keystroke, so you will know immediately if your edits introduced a syntax problem.
        </p>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          Everything runs entirely in your browser. No data is ever sent to a server, which means you can safely format JSON containing API keys, passwords, or other sensitive information without worrying about privacy.
        </p>
      </section>
    </ToolLayout>
  )
}
