import { useState } from 'react'
import { Hash, Copy, Check } from 'lucide-react'
import ToolLayout from '../../components/ToolLayout'

export default function NumberBaseConverter() {
  const [input, setInput] = useState('')
  const [fromBase, setFromBase] = useState(10)
  const [copied, setCopied] = useState('')

  const bases = [2, 8, 10, 16]
  const baseNames: Record<number, string> = { 2: 'Binary', 8: 'Octal', 10: 'Decimal', 16: 'Hex' }

  let decimal = 0
  let valid = true
  try { decimal = parseInt(input, fromBase) } catch { valid = false }

  const results = bases.map(b => ({ base: b, name: baseNames[b], value: valid && input ? decimal.toString(b).toUpperCase() : '' }))

  const copy = (val: string, label: string) => { navigator.clipboard.writeText(val); setCopied(label); setTimeout(() => setCopied(''), 2000) }

  return (
    <ToolLayout title="Number Base Converter" description="Convert between binary, octal, decimal, and hex." icon={Hash}>
      <div className="flex gap-3 mb-6">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Value</label>
          <input value={input} onChange={e => setInput(e.target.value)} placeholder="Enter a number" className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm font-mono focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none text-gray-900 dark:text-white" />
        </div>
        <div className="w-32">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">From</label>
          <select value={fromBase} onChange={e => setFromBase(Number(e.target.value))} className="w-full p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none text-gray-900 dark:text-white">
            {bases.map(b => <option key={b} value={b}>{baseNames[b]} ({b})</option>)}
          </select>
        </div>
      </div>
      <div className="space-y-3">
        {results.filter(r => r.base !== fromBase).map(r => (
          <div key={r.base} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
            <span className="w-20 text-xs font-medium text-gray-500 dark:text-gray-400">{r.name}</span>
            <span className="flex-1 font-mono text-sm text-gray-900 dark:text-white">{r.value || '—'}</span>
            {r.value && <button onClick={() => copy(r.value, r.name)} className="p-1.5 text-gray-400 hover:text-violet-600 dark:hover:text-violet-400">{copied === r.name ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}</button>}
          </div>
        ))}
      </div>
    </ToolLayout>
  )
}
