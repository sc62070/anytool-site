import { useState } from 'react'
import { Divide } from 'lucide-react'
import ToolLayout from '../../components/ToolLayout'

function gcd(a: number, b: number): number { return b === 0 ? Math.abs(a) : gcd(b, a % b) }

function simplify(n: number, d: number): [number, number] {
  if (d === 0) return [n, d]
  const g = gcd(Math.abs(n), Math.abs(d))
  let sn = n / g, sd = d / g
  if (sd < 0) { sn = -sn; sd = -sd }
  return [sn, sd]
}

export default function FractionCalculator() {
  const [n1, setN1] = useState('1')
  const [d1, setD1] = useState('2')
  const [n2, setN2] = useState('1')
  const [d2, setD2] = useState('3')
  const [op, setOp] = useState<'+' | '-' | '*' | '/'>('+')
  const [result, setResult] = useState<{ num: number; den: number; dec: number } | null>(null)

  const calculate = () => {
    const a = parseInt(n1) || 0, b = parseInt(d1) || 1
    const c = parseInt(n2) || 0, d = parseInt(d2) || 1
    let rn: number, rd: number
    switch (op) {
      case '+': rn = a * d + c * b; rd = b * d; break
      case '-': rn = a * d - c * b; rd = b * d; break
      case '*': rn = a * c; rd = b * d; break
      case '/': rn = a * d; rd = b * c; break
    }
    const [sn, sd] = simplify(rn, rd)
    setResult({ num: sn, den: sd, dec: sd !== 0 ? sn / sd : 0 })
  }

  const inputCls = 'w-full p-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-center font-mono focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none text-gray-900 dark:text-white'

  return (
    <ToolLayout title="Fraction Calculator" description="Add, subtract, multiply, and divide two fractions." icon={Divide}>
      <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Numerator</label>
            <input type="number" value={n1} onChange={e => setN1(e.target.value)} className={inputCls} />
          </div>
          <div className="text-2xl text-gray-400">/</div>
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Denominator</label>
            <input type="number" value={d1} onChange={e => setD1(e.target.value)} className={inputCls} />
          </div>

          <div className="flex gap-1.5 mx-2">
            {(['+', '-', '*', '/'] as const).map(o => (
              <button key={o} onClick={() => setOp(o)} className={`w-10 h-10 rounded-lg text-sm font-bold transition-colors ${op === o ? 'bg-violet-600 text-white' : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}>{o}</button>
            ))}
          </div>

          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Numerator</label>
            <input type="number" value={n2} onChange={e => setN2(e.target.value)} className={inputCls} />
          </div>
          <div className="text-2xl text-gray-400">/</div>
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Denominator</label>
            <input type="number" value={d2} onChange={e => setD2(e.target.value)} className={inputCls} />
          </div>
        </div>

        <button onClick={calculate} className="w-full py-2.5 bg-violet-600 text-white rounded-xl text-sm font-semibold hover:bg-violet-700 transition-colors">Calculate</button>
      </div>

      {result && (
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-5 border border-gray-200 dark:border-gray-800 text-center">
            <div className="text-3xl font-bold text-violet-600 dark:text-violet-400">{result.num} / {result.den}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Fraction</div>
          </div>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-5 border border-gray-200 dark:border-gray-800 text-center">
            <div className="text-3xl font-bold text-violet-600 dark:text-violet-400">{result.dec.toFixed(4)}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">Decimal</div>
          </div>
        </div>
      )}
    </ToolLayout>
  )
}
