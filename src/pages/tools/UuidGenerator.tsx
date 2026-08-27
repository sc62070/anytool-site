import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Zap, Copy, Check, RefreshCw } from 'lucide-react'

function generateUUID(): string {
  return crypto.randomUUID()
}

export default function UuidGenerator() {
  const [uuids, setUuids] = useState<string[]>([])
  const [count, setCount] = useState(1)
  const [copied, setCopied] = useState('')

  const generate = () => {
    const newUuids: string[] = []
    for (let i = 0; i < count; i++) {
      newUuids.push(generateUUID())
    }
    setUuids(newUuids)
  }

  const handleCopy = (value: string, label: string) => {
    navigator.clipboard.writeText(value)
    setCopied(label)
    setTimeout(() => setCopied(''), 2000)
  }

  const handleCopyAll = () => {
    navigator.clipboard.writeText(uuids.join('\n'))
    setCopied('all')
    setTimeout(() => setCopied(''), 2000)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg flex items-center justify-center">
          <Zap className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">UUID Generator</h1>
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-8">Generate random UUIDs (v4) for your applications.</p>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-4 mb-4">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Count:</label>
          <input
            type="number"
            min="1"
            max="100"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            className="w-20 p-2 border border-gray-300 dark:border-gray-600 rounded-lg text-center focus:ring-2 focus:ring-indigo-500 outline-none"
          />
          <button onClick={generate} className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center gap-2">
            <RefreshCw className="w-4 h-4" /> Generate
          </button>
          {uuids.length > 0 && (
            <button onClick={handleCopyAll} className="text-sm text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
              {copied === 'all' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied === 'all' ? 'Copied!' : 'Copy All'}
            </button>
          )}
        </div>

        {uuids.length > 0 && (
          <div className="space-y-2">
            {uuids.map((uuid, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="font-mono text-sm text-gray-800 dark:text-gray-200 flex-1">{uuid}</span>
                <button onClick={() => handleCopy(uuid, String(i))} className="p-1.5 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                  {copied === String(i) ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="mt-8 text-center">
        <Link to="/" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 text-sm">&larr; Back to all tools</Link>
      </div>
    </div>
  )
}
