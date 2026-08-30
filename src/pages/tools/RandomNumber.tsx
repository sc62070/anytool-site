import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { Shuffle, Copy, Check, RefreshCw } from 'lucide-react'

export default function RandomNumber() {
  const [min, setMin] = useState(1)
  const [max, setMax] = useState(100)
  const [count, setCount] = useState(1)
  const [unique, setUnique] = useState(false)
  const [results, setResults] = useState<number[]>([])
  const [copied, setCopied] = useState(false)

  const generate = () => {
    const nums: number[] = []
    const attempts = unique ? (max - min + 1) : count * 10
    for (let i = 0; i < attempts && nums.length < count; i++) {
      const n = Math.floor(Math.random() * (max - min + 1)) + min
      if (!unique || !nums.includes(n)) nums.push(n)
    }
    setResults(nums)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(results.join(', '))
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <ToolLayout title="Random Number Generator" description="Generate random numbers within a range." icon={Shuffle}>
      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Min</label>
            <input type="number" value={min} onChange={e => setMin(Number(e.target.value))} className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500 font-mono" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Max</label>
            <input type="number" value={max} onChange={e => setMax(Number(e.target.value))} className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500 font-mono" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Count</label>
            <input type="number" value={count} onChange={e => setCount(Math.max(1, Math.min(50, Number(e.target.value))))} min={1} max={50} className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500 font-mono" />
          </div>
        </div>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={unique} onChange={e => setUnique(e.target.checked)} className="w-4 h-4 rounded border-gray-300 text-violet-600 focus:ring-violet-500" />
          <span className="text-sm text-gray-700 dark:text-gray-300">Unique numbers only</span>
        </label>
        <button onClick={generate} className="w-full py-3 bg-violet-600 text-white rounded-xl font-semibold hover:bg-violet-700 transition-colors flex items-center justify-center gap-2">
          <RefreshCw className="w-5 h-5" /> Generate
        </button>
        {results.length > 0 && (
          <div className="p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Results</span>
              <button onClick={copyToClipboard} className="flex items-center gap-1.5 text-sm text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300">
                {copied ? <><Check className="w-4 h-4" /> Copied</> : <><Copy className="w-4 h-4" /> Copy</>}
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {results.map((n, i) => (
                <span key={i} className="px-3 py-1.5 bg-violet-100 dark:bg-violet-500/10 text-violet-700 dark:text-violet-300 rounded-lg font-mono text-sm font-bold">{n}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  )
}
