import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { FileSpreadsheet, Copy, Check } from 'lucide-react'

export default function JsonToCsv() {
  const [input, setInput] = useState('[\n  {"name":"Alice","age":30,"city":"NYC"},\n  {"name":"Bob","age":25,"city":"LA"},\n  {"name":"Charlie","age":35,"city":"Chicago"}\n]')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const convert = () => {
    try {
      const data = JSON.parse(input)
      const arr = Array.isArray(data) ? data : [data]
      if (arr.length === 0) { setOutput(''); setError('Empty array'); return }
      const headers = [...new Set(arr.flatMap(obj => Object.keys(obj)))]
      const csvRows = [headers.join(',')]
      for (const obj of arr) {
        const row = headers.map(h => {
          const val = obj[h] ?? ''
          const str = String(val)
          return str.includes(',') || str.includes('"') || str.includes('\n') ? `"${str.replace(/"/g, '""')}"` : str
        })
        csvRows.push(row.join(','))
      }
      setOutput(csvRows.join('\n'))
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
    <ToolLayout title="JSON to CSV" description="Convert JSON data to CSV spreadsheet format.">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">JSON Input</label>
          <textarea value={input} onChange={e => setInput(e.target.value)} rows={10} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl font-mono text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500 resize-none" placeholder="Paste JSON array here..." />
        </div>
        <button onClick={convert} className="w-full py-3 bg-violet-600 text-white rounded-xl font-semibold hover:bg-violet-700 transition-colors flex items-center justify-center gap-2">
          <FileSpreadsheet className="w-5 h-5" /> Convert to CSV
        </button>
        {error && <p className="text-sm text-red-500">{error}</p>}
        {output && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">CSV Output</label>
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
