import { useState } from 'react'
import { TrendingUp } from 'lucide-react'
import ToolLayout from '../../components/ToolLayout'

export default function FibonacciGenerator() {
  const [count, setCount] = useState('20')
  const [sequence, setSequence] = useState<number[]>([])

  const generate = () => {
    const n = parseInt(count)
    if (n < 1 || n > 500) return
    const seq: number[] = [0, 1]
    for (let i = 2; i < n; i++) seq.push(seq[i - 1] + seq[i - 2])
    setSequence(seq.slice(0, n))
  }

  return (
    <ToolLayout title="Fibonacci Generator" description="Generate the Fibonacci sequence up to N terms." icon={TrendingUp}>
      <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Number of Terms (max 500)</label>
        <div className="flex gap-3">
          <input type="number" min={1} max={500} value={count} onChange={e => setCount(e.target.value)} className="flex-1 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none text-gray-900 dark:text-white" />
          <button onClick={generate} className="px-6 py-3 bg-violet-600 text-white rounded-xl text-sm font-semibold hover:bg-violet-700 transition-colors">Generate</button>
        </div>
      </div>

      {sequence.length > 0 && (
        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Fibonacci Sequence ({sequence.length} terms)</h3>
            <span className="text-xs text-gray-500 dark:text-gray-400">Max: {sequence[sequence.length - 1]?.toLocaleString()}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {sequence.map((num, i) => (
              <span key={i} className="inline-flex items-center px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm font-mono text-gray-700 dark:text-gray-300">
                <span className="text-xs text-gray-400 dark:text-gray-500 mr-1.5">{i + 1}.</span>
                {num.toLocaleString()}
              </span>
            ))}
          </div>
        </div>
      )}
    </ToolLayout>
  )
}
