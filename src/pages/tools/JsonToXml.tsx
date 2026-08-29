import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { ArrowRightLeft, Copy, Check } from 'lucide-react'

function jsonToXml(obj: any, indent = 0): string {
  const pad = '  '.repeat(indent)
  if (obj === null || obj === undefined) return `${pad}<null/>`
  if (typeof obj !== 'object') return `${pad}${escapeXml(String(obj))}`
  if (Array.isArray(obj)) return obj.map(item => jsonToXml(item, indent)).join('\n')
  let xml = ''
  for (const [key, val] of Object.entries(obj)) {
    if (typeof val === 'object' && val !== null && !Array.isArray(val)) {
      xml += `${pad}<${key}>\n${jsonToXml(val, indent + 1)}\n${pad}</${key}>\n`
    } else if (Array.isArray(val)) {
      xml += val.map(item => `${pad}<${key}>\n${jsonToXml(item, indent + 1)}\n${pad}</${key}>`).join('\n') + '\n'
    } else {
      xml += `${pad}<${key}>${escapeXml(String(val ?? ''))}</${key}>\n`
    }
  }
  return xml
}

function escapeXml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;')
}

export default function JsonToXml() {
  const [input, setInput] = useState('{\n  "name": "Alice",\n  "age": 30,\n  "hobbies": ["reading", "coding"]\n}')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const convert = () => {
    try {
      const obj = JSON.parse(input)
      const xml = `<?xml version="1.0" encoding="UTF-8"?>\n${jsonToXml(obj)}`
      setOutput(xml)
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
    <ToolLayout title="JSON to XML" description="Convert JSON data to XML format." icon={ArrowRightLeft}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">JSON Input</label>
          <textarea value={input} onChange={e => setInput(e.target.value)} rows={8} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl font-mono text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500 resize-none" />
        </div>
        <button onClick={convert} className="w-full py-3 bg-violet-600 text-white rounded-xl font-semibold hover:bg-violet-700 transition-colors flex items-center justify-center gap-2"><ArrowRightLeft className="w-5 h-5" /> Convert to XML</button>
        {error && <p className="text-sm text-red-500">{error}</p>}
        {output && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">XML Output</label>
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
