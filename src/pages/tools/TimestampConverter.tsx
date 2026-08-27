import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Clock, Copy, Check } from 'lucide-react'

function formatDate(d: Date): string {
  return d.toISOString().replace('T', ' ').substring(0, 19)
}

export default function TimestampConverter() {
  const [mode, setMode] = useState<'toDate' | 'toTimestamp'>('toDate')
  const [input, setInput] = useState('')
  const [result, setResult] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [now] = useState(Math.floor(Date.now() / 1000))

  const convert = () => {
    setError('')
    if (mode === 'toDate') {
      const ts = parseInt(input)
      if (isNaN(ts)) { setError('Invalid timestamp'); return }
      const ms = ts > 1e12 ? ts : ts * 1000
      setResult(formatDate(new Date(ms)))
    } else {
      const date = new Date(input)
      if (isNaN(date.getTime())) { setError('Invalid date string'); return }
      setResult(String(Math.floor(date.getTime() / 1000)))
    }
  }

  const copyNow = () => {
    navigator.clipboard.writeText(String(now))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
          <Clock className="w-5 h-5 text-indigo-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Timestamp Converter</h1>
      </div>
      <p className="text-gray-600 mb-8">Convert between Unix timestamps and human-readable dates.</p>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500">Current Unix Timestamp</div>
              <div className="font-mono text-xl font-bold text-gray-900">{now}</div>
              <div className="font-mono text-sm text-gray-600">{formatDate(new Date())}</div>
            </div>
            <button onClick={copyNow} className="p-2 text-gray-400 hover:text-indigo-600">
              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className="flex gap-2 mb-4">
          <button onClick={() => { setMode('toDate'); setResult('') }} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${mode === 'toDate' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            Timestamp to Date
          </button>
          <button onClick={() => { setMode('toTimestamp'); setResult('') }} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${mode === 'toTimestamp' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
            Date to Timestamp
          </button>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {mode === 'toDate' ? 'Unix Timestamp' : 'Date String (e.g. 2026-08-27 12:00:00)'}
          </label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={mode === 'toDate' ? '1724764800' : '2026-08-27 12:00:00'}
            className="w-full p-3 border border-gray-300 rounded-lg font-mono focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        <button onClick={convert} className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
          Convert
        </button>

        {error && <p className="mt-3 text-red-600 text-sm">{error}</p>}

        {result && (
          <div className="mt-4 p-4 bg-green-50 rounded-lg">
            <div className="text-sm text-gray-500">Result</div>
            <div className="font-mono text-lg font-bold text-green-700">{result}</div>
          </div>
        )}
      </div>

      <div className="mt-8 text-center">
        <Link to="/" className="text-indigo-600 hover:text-indigo-700 text-sm">&larr; Back to all tools</Link>
      </div>
    </div>
  )
}
