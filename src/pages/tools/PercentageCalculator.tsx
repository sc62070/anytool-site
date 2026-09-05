import { useState } from 'react'
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
    <ToolLayout title="Percentage Calculator" description="Calculate percentages, percentage change, and more." icon={Percent} info="Perform three essential percentage calculations: find X% of a value, determine what percent one number is of another, and compute percentage change between two values. Perfect for calculating tips, discounts, sale prices, tax amounts, grade averages, and return on investment.">

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

      <section className="mt-8 mb-4">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mt-8 mb-4">Everyday Percentage Calculations</h2>
        <div className="text-sm leading-relaxed text-gray-600 dark:text-gray-400 space-y-3">
          <p>
            "What's 20% of $85?" is the question you ask at every restaurant. The "X% of Y" mode handles tip calculations instantly — for a $85 bill, 20% is $17, making your total $102. The same mode works for calculating sale prices: a 30% discount on a $200 item means you're paying $140, saving $60. When shopping internationally, you can quickly figure out what a 15% tax adds to a purchase price without fumbling with mental math at the register.
          </p>
          <p>
            The "% Change" mode is invaluable for tracking performance. If your portfolio went from $10,000 to $12,500, that's a 25% gain. If it dropped to $8,000, that's a 20% loss — and notice the asymmetry, which catches many people off guard. Students use this mode to calculate grade improvements: going from 65% to 82% on exams is a 26.2% improvement, useful context for applications and personal progress tracking.
          </p>
          <p>
            The "X is what % of Y" mode answers questions like "what percentage of my budget did I spend?" If you've used $340 of a $1,200 monthly budget, you've used 28.3%. This is also how you calculate win rates in games, completion percentages on projects, and market share figures in business reports. Each mode is simple on its own, but together they cover nearly every percentage question you'll encounter.
          </p>
        </div>
      </section>
    </ToolLayout>
  )
}
