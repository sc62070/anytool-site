import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { Database } from 'lucide-react'

function getJsonPath(obj: any, path: string): any {
  const parts = path.replace(/^\$\.?/, '').split(/\.|\[(\d+)\]/).filter(Boolean)
  let current = obj
  for (const part of parts) {
    if (current == null) return undefined
    current = current[part]
  }
  return current
}

export default function JsonPathTester() {
  const [json, setJson] = useState('{\n  "users": [\n    {"name": "Alice", "age": 30, "city": "NYC"},\n    {"name": "Bob", "age": 25, "city": "LA"}\n  ],\n  "count": 2\n}')
  const [path, setPath] = useState('users[0].name')
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState('')

  const evaluate = () => {
    try {
      const obj = JSON.parse(json)
      const val = getJsonPath(obj, path)
      setResult(val)
      setError('')
    } catch (e) {
      setError('Invalid JSON: ' + (e as Error).message)
      setResult(null)
    }
  }

  return (
    <ToolLayout title="JSON Path Tester" description="Test JSONPath expressions against JSON data." icon={Database}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">JSON Data</label>
          <textarea value={json} onChange={e => setJson(e.target.value)} rows={8} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl font-mono text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500 resize-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">JSONPath Expression</label>
          <div className="flex gap-2">
            <input type="text" value={path} onChange={e => setPath(e.target.value)} className="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl font-mono text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500" placeholder="e.g. users[0].name" onKeyDown={e => e.key === 'Enter' && evaluate()} />
            <button onClick={evaluate} className="px-6 py-3 bg-violet-600 text-white rounded-xl font-semibold hover:bg-violet-700 transition-colors">Test</button>
          </div>
        </div>
        {error && <p className="text-sm text-red-500">{error}</p>}
        {result !== null && (
          <div className="p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl">
            <span className="text-xs font-medium text-gray-500 dark:text-gray-400">Result:</span>
            <pre className="mt-1 font-mono text-sm text-gray-900 dark:text-white whitespace-pre-wrap break-all">{typeof result === 'object' ? JSON.stringify(result, null, 2) : String(result)}</pre>
          </div>
        )}
        <div className="p-3 bg-violet-50 dark:bg-violet-500/10 border border-violet-200 dark:border-violet-500/20 rounded-xl">
          <p className="text-sm text-violet-700 dark:text-violet-300"><strong>Common paths:</strong> <code>users[0].name</code> · <code>users.*.age</code> · <code>count</code></p>
        </div>
      </div>
    </ToolLayout>
  )
}
