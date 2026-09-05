import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Percent } from 'lucide-react'
import ToolLayout from '../../components/ToolLayout'

export default function PercentageCalculator() {
  const [mode, setMode] = useState<'of' | 'is' | 'change'>('of')
  const [value1, setValue1] = useState('')
  const [value2, setValue2] = useState('')
  const [result, setResult] = useState<number | null>(null)

  const calculate = () => {
    const a = parseFloat(value1)
    const b = parseFloat(value2)
    if (isNaN(a) || isNaN(b)) return

    if (mode === 'of') {
      setResult((a / 100) * b)
    } else if (mode === 'is') {
      setResult((a / b) * 100)
    } else {
      setResult(((b - a) / a) * 100)
    }
  }

  const labels: Record<string, { l1: string; l2: string; btn: string }> = {
    of: { l1: 'Percentage (%)', l2: 'Of value', btn: 'Calculate' },
    is: { l1: 'Value', l2: 'Is what % of', btn: 'Calculate' },
    change: { l1: 'From value', l2: 'To value', btn: 'Calculate % change' },
  }

  const current = labels[mode]

  return (
    <ToolLayout title="Percentage Calculator" description="Calculate percentages, percentage change, and more." icon={Percent} info="Our free online percentage calculator handles three common calculations: finding X% of Y, determining what percentage X is of Y, and computing percentage change between two values. Perfect for students, business professionals, and anyone who needs quick percentage math.">

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex gap-2 mb-6">
          {(['of', 'is', 'change'] as const).map((m) => (
            <button
              key={m}
              onClick={() => { setMode(m); setResult(null); setValue1(''); setValue2('') }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${mode === m ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'}`}
            >
              {m === 'of' ? 'X% of Y' : m === 'is' ? 'X is what %' : '% Change'}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{current.l1}</label>
            <input
              type="number"
              value={value1}
              onChange={(e) => setValue1(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{current.l2}</label>
            <input
              type="number"
              value={value2}
              onChange={(e) => setValue2(e.target.value)}
              className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
        </div>

        <button onClick={calculate} className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
          {current.btn}
        </button>

        {result !== null && (
          <div className="mt-6 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl">
            <div className="text-sm text-gray-600 dark:text-gray-400">Result</div>
            <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{result.toFixed(2)}{mode === 'is' || mode === 'change' ? '%' : ''}</div>
          </div>
        )}
      </div>
    </ToolLayout>
  )
}
