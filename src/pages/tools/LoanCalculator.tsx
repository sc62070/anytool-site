import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Calculator } from 'lucide-react'

export default function LoanCalculator() {
  const [principal, setPrincipal] = useState('200000')
  const [rate, setRate] = useState('6')
  const [term, setTerm] = useState('30')
  const [result, setResult] = useState<{ monthly: number; total: number; interest: number } | null>(null)

  useEffect(() => {
    const p = parseFloat(principal)
    const r = parseFloat(rate) / 100 / 12
    const n = parseFloat(term) * 12
    if (p > 0 && r > 0 && n > 0) {
      const monthly = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
      setResult({ monthly, total: monthly * n, interest: monthly * n - p })
    } else {
      setResult(null)
    }
  }, [principal, rate, term])

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg flex items-center justify-center">
          <Calculator className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Loan Calculator</h1>
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-8">Calculate your monthly mortgage payments and total interest.</p>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Loan Amount ($)</label>
          <input type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Annual Interest Rate (%)</label>
          <input type="number" step="0.1" value={rate} onChange={(e) => setRate(e.target.value)} className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Loan Term (years)</label>
          <input type="number" value={term} onChange={(e) => setTerm(e.target.value)} className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl" />
        </div>
      </div>

      {result && (
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 text-center">
            <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">${result.monthly.toFixed(2)}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Monthly Payment</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 text-center">
            <div className="text-2xl font-bold text-green-600">${result.total.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Total Payment</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 text-center">
            <div className="text-2xl font-bold text-orange-500">${result.interest.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Total Interest</div>
          </div>
        </div>
      )}

      <div className="mt-8 text-center">
        <Link to="/" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 text-sm">&larr; Back to all tools</Link>
      </div>
    </div>
  )
}
