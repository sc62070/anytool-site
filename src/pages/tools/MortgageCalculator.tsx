import { useState, useEffect } from 'react'
import { Home } from 'lucide-react'
import ToolLayout from '../../components/ToolLayout'

export default function MortgageCalculator() {
  const [loanAmount, setLoanAmount] = useState('300000')
  const [interestRate, setInterestRate] = useState('6.5')
  const [loanTerm, setLoanTerm] = useState('30')
  const [result, setResult] = useState<{ monthly: number; total: number; interest: number } | null>(null)

  useEffect(() => {
    const p = parseFloat(loanAmount)
    const r = parseFloat(interestRate) / 100 / 12
    const n = parseFloat(loanTerm) * 12
    if (p > 0 && r > 0 && n > 0) {
      const monthly = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)
      setResult({ monthly, total: monthly * n, interest: monthly * n - p })
    } else {
      setResult(null)
    }
  }, [loanAmount, interestRate, loanTerm])

  const fmt = (v: number) => '$' + v.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  return (
    <ToolLayout title="Mortgage Calculator" description="Calculate monthly payments, total cost, and interest for your mortgage." icon={Home}>
      <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Loan Amount ($)</label>
          <input type="number" value={loanAmount} onChange={e => setLoanAmount(e.target.value)} className="w-full p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none text-gray-900 dark:text-white" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Annual Interest Rate (%)</label>
          <input type="number" step="0.1" value={interestRate} onChange={e => setInterestRate(e.target.value)} className="w-full p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none text-gray-900 dark:text-white" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Loan Term (years)</label>
          <input type="number" value={loanTerm} onChange={e => setLoanTerm(e.target.value)} className="w-full p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none text-gray-900 dark:text-white" />
        </div>
      </div>

      {result && (
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-5 border border-gray-200 dark:border-gray-800 text-center">
            <div className="text-2xl font-bold text-violet-600 dark:text-violet-400">{fmt(result.monthly)}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Monthly Payment</div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-5 border border-gray-200 dark:border-gray-800 text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{fmt(result.total)}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Total Payment</div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-5 border border-gray-200 dark:border-gray-800 text-center">
            <div className="text-2xl font-bold text-orange-500 dark:text-orange-400">{fmt(result.interest)}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Total Interest</div>
          </div>
        </div>
      )}
    </ToolLayout>
  )
}
