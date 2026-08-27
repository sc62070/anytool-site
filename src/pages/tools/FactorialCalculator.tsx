import { useState } from 'react'
import { Infinity as InfinityIcon } from 'lucide-react'
import ToolLayout from '../../components/ToolLayout'

function factorial(n: number): { result: string; steps: string[]; error?: string } {
  if (n < 0) return { result: '', steps: [], error: 'Factorial is not defined for negative numbers.' }
  if (n > 170) return { result: '', steps: [], error: 'Number too large (max 170).' }
  if (n === 0 || n === 1) return { result: '1', steps: [`${n}! = 1`] }
  let result = 1
  const steps: string[] = []
  for (let i = n; i >= 1; i--) { result *= i; steps.push(`${i}${i === n ? '!' : ''} = ${result}`) }
  return { result: result.toLocaleString(), steps }
}

export default function FactorialCalculator() {
  const [input, setInput] = useState('')
  const [result, setResult] = useState<{ result: string; steps: string[]; error?: string } | null>(null)

  const calculate = () => {
    const n = parseInt(input)
    if (isNaN(n)) { setResult({ result: '', steps: [], error: 'Please enter a valid number.' }); return }
    setResult(factorial(n))
  }

  return (
    <ToolLayout title="Factorial Calculator" description="Calculate factorial of a number with step-by-step breakdown." icon={InfinityIcon}>
      <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 mb-6">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Enter a number (0-170)</label>
        <div className="flex gap-3">
          <input type="number" min={0} max={170} value={input} onChange={e => setInput(e.target.value)} placeholder="e.g. 10" className="flex-1 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none text-gray-900 dark:text-white" />
          <button onClick={calculate} className="px-6 py-3 bg-violet-600 text-white rounded-xl text-sm font-semibold hover:bg-violet-700 transition-colors">Calculate</button>
        </div>
      </div>

      {result && (
        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
          {result.error ? (
            <div className="text-red-500 dark:text-red-400 text-sm">{result.error}</div>
          ) : (
            <>
              <div className="text-center mb-6">
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{input}! =</div>
                <div className="text-3xl font-bold text-violet-600 dark:text-violet-400">{result.result}</div>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <h4 className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wide">Step by Step</h4>
                <div className="space-y-1.5">
                  {result.steps.map((step, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm font-mono">
                      <span className="w-5 h-5 bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 rounded-full flex items-center justify-center text-xs font-bold">{i + 1}</span>
                      <span className="text-gray-700 dark:text-gray-300">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </ToolLayout>
  )
}
