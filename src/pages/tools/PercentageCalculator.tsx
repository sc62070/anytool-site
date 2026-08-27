import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Percent } from 'lucide-react'

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
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
          <Percent className="w-5 h-5 text-indigo-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Percentage Calculator</h1>
      </div>
      <p className="text-gray-600 mb-8">Calculate percentages, percentage change, and more.</p>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex gap-2 mb-6">
          {(['of', 'is', 'change'] as const).map((m) => (
            <button
              key={m}
              onClick={() => { setMode(m); setResult(null); setValue1(''); setValue2('') }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${mode === m ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {m === 'of' ? 'X% of Y' : m === 'is' ? 'X is what %' : '% Change'}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{current.l1}</label>
            <input
              type="number"
              value={value1}
              onChange={(e) => setValue1(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{current.l2}</label>
            <input
              type="number"
              value={value2}
              onChange={(e) => setValue2(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
        </div>

        <button onClick={calculate} className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
          {current.btn}
        </button>

        {result !== null && (
          <div className="mt-6 p-4 bg-indigo-50 rounded-xl">
            <div className="text-sm text-gray-600">Result</div>
            <div className="text-3xl font-bold text-indigo-600">{result.toFixed(2)}{mode === 'is' || mode === 'change' ? '%' : ''}</div>
          </div>
        )}
      </div>

      <div className="mt-8 text-center">
        <Link to="/" className="text-indigo-600 hover:text-indigo-700 text-sm">&larr; Back to all tools</Link>
      </div>
    </div>
  )
}
