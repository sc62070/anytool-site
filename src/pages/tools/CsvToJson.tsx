import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FileSpreadsheet, Copy, Check } from 'lucide-react'

export default function CsvToJson() {
  const [csv, setCsv] = useState('')
  const [json, setJson] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [pretty, setPretty] = useState(true)

  const parseCsv = (input: string) => {
    if (!input.trim()) { setJson(''); setError(''); return }
    try {
      const lines = input.trim().split('\n')
      if (lines.length < 2) { setError('CSV needs at least a header and one data row'); return }
      const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, ''))
      const rows = lines.slice(1).map(line => {
        const values = line.split(',').map(v => v.trim().replace(/^"|"$/g, ''))
        const obj: Record<string, string> = {}
        headers.forEach((h, i) => { obj[h] = values[i] || '' })
        return obj
      })
      setJson(JSON.stringify(rows, null, pretty ? 2 : 0))
      setError('')
    } catch {
      setError('Invalid CSV format')
    }
  }

  const handleCsvChange = (val: string) => {
    setCsv(val)
    parseCsv(val)
  }

  const togglePretty = () => {
    setPretty(!pretty)
    if (json) {
      try {
        const parsed = JSON.parse(json)
        setJson(JSON.stringify(parsed, null, !pretty ? 2 : 0))
      } catch {}
    }
  }

  const copyJson = () => {
    navigator.clipboard.writeText(json)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
          <FileSpreadsheet className="w-5 h-5 text-indigo-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">CSV to JSON</h1>
      </div>
      <p className="text-gray-600 mb-8">Convert CSV data to JSON format instantly in your browser.</p>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium text-gray-700">CSV Input</label>
          </div>
          <textarea
            value={csv}
            onChange={(e) => handleCsvChange(e.target.value)}
            placeholder={`name,age,email\nJohn,30,john@example.com\nJane,25,jane@example.com`}
            className="w-full h-80 p-3 border border-gray-300 rounded-xl font-mono text-sm resize-y"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium text-gray-700">JSON Output</label>
            <div className="flex items-center gap-3">
              <button onClick={togglePretty} className="text-xs text-indigo-600 hover:text-indigo-700">{pretty ? 'Minify' : 'Prettify'}</button>
              {json && (
                <button onClick={copyJson} className="flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-700">
                  {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              )}
            </div>
          </div>
          <textarea readOnly value={json} className="w-full h-80 p-3 border border-gray-300 rounded-xl bg-gray-50 font-mono text-sm resize-y" placeholder="JSON output will appear here..." />
        </div>
      </div>

      {error && <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">{error}</div>}

      <div className="mt-8 text-center">
        <Link to="/" className="text-indigo-600 hover:text-indigo-700 text-sm">&larr; Back to all tools</Link>
      </div>
    </div>
  )
}
