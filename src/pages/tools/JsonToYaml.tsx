import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { ArrowRightLeft, Copy, Check } from 'lucide-react'

function jsonToYaml(obj: any, indent = 0): string {
  const pad = '  '.repeat(indent)
  if (obj === null || obj === undefined) return 'null'
  if (typeof obj === 'boolean') return String(obj)
  if (typeof obj === 'number') return String(obj)
  if (typeof obj === 'string') return obj.includes(':') || obj.includes('#') || obj.includes('\n') ? `"${obj.replace(/"/g, '\\"')}"` : obj
  if (Array.isArray(obj)) {
    if (obj.length === 0) return '[]'
    return obj.map(item => {
      const val = typeof item === 'object' && item !== null ? `\n${jsonToYaml(item, indent + 1)}` : ` ${jsonToYaml(item, indent + 1)}`
      return `${pad}- ${val.trimStart()}`
    }).join('\n')
  }
  const keys = Object.entries(obj)
  if (keys.length === 0) return '{}'
  return keys.map(([key, val]) => {
    if (typeof val === 'object' && val !== null) {
      return `${pad}${key}:\n${jsonToYaml(val, indent + 1)}`
    }
    return `${pad}${key}: ${jsonToYaml(val, indent + 1)}`
  }).join('\n')
}

export default function JsonToYaml() {
  const [input, setInput] = useState('{\n  "name": "AnyTool",\n  "version": "1.0.0",\n  "features": [\n    "json-formatter",\n    "color-picker"\n  ],\n  "config": {\n    "theme": "dark",\n    "lang": "en"\n  }\n}')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const convert = () => {
    try {
      const obj = JSON.parse(input)
      setOutput(jsonToYaml(obj))
      setError('')
    } catch (e) {
      setError('Invalid JSON: ' + (e as Error).message)
      setOutput('')
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <ToolLayout title="JSON to YAML" description="Convert JSON data to YAML format." icon={ArrowRightLeft}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">JSON Input</label>
          <textarea value={input} onChange={e => setInput(e.target.value)} rows={10} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl font-mono text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500 resize-none" />
        </div>
        <button onClick={convert} className="w-full py-3 bg-violet-600 text-white rounded-xl font-semibold hover:bg-violet-700 transition-colors flex items-center justify-center gap-2"><ArrowRightLeft className="w-5 h-5" /> Convert to YAML</button>
        {error && <p className="text-sm text-red-500">{error}</p>}
        {output && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">YAML Output</label>
              <button onClick={copyToClipboard} className="flex items-center gap-1.5 text-sm text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300">
                {copied ? <><Check className="w-4 h-4" /> Copied</> : <><Copy className="w-4 h-4" /> Copy</>}
              </button>
            </div>
            <pre className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl font-mono text-sm text-gray-900 dark:text-white overflow-auto max-h-96 whitespace-pre-wrap">{output}</pre>
          </div>
        )}
      </div>
    </ToolLayout>
  )
}
