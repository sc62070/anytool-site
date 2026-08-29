import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { ArrowRightLeft, Copy, Check } from 'lucide-react'

const units = ['px', 'rem', 'em', '%']
const baseFontSize = 16

function convert(value: number, from: string, to: string): string {
  if (from === to) return value.toFixed(4)
  let px: number
  if (from === 'px') px = value
  else if (from === 'rem' || from === 'em') px = value * baseFontSize
  else px = (value / 100) * baseFontSize

  let result: number
  if (to === 'px') result = px
  else if (to === 'rem' || to === 'em') result = px / baseFontSize
  else result = (px / baseFontSize) * 100

  return result.toFixed(4)
}

export default function CssUnitConverter() {
  const [value, setValue] = useState('16')
  const [from, setFrom] = useState('px')
  const [copied, setCopied] = useState('')

  const num = parseFloat(value) || 0
  const results = units.filter(u => u !== from).map(u => ({ unit: u, value: convert(num, from, u) }))

  const copy = (text: string, unit: string) => {
    navigator.clipboard.writeText(text)
    setCopied(unit)
    setTimeout(() => setCopied(''), 1500)
  }

  return (
    <ToolLayout title="CSS Unit Converter" description="Convert between px, rem, em, and percentages.">
      <div className="space-y-6">
        <div className="flex gap-3">
          <input type="number" value={value} onChange={e => setValue(e.target.value)} className="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-lg font-mono text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500" placeholder="Enter value" />
          <select value={from} onChange={e => setFrom(e.target.value)} className="px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-lg font-mono text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500">
            {units.map(u => <option key={u} value={u}>{u}</option>)}
          </select>
        </div>
        <div className="flex items-center justify-center text-gray-400"><ArrowRightLeft className="w-5 h-5" /></div>
        <div className="space-y-3">
          {results.map(r => (
            <div key={r.unit} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase w-12">{r.unit}</span>
                <span className="text-xl font-mono font-bold text-gray-900 dark:text-white">{r.value}</span>
              </div>
              <button onClick={() => copy(`${r.value}${r.unit}`, r.unit)} className="p-2 text-gray-400 hover:text-violet-500 transition-colors">
                {copied === r.unit ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          ))}
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">Base font size: {baseFontSize}px</p>
      </div>
    </ToolLayout>
  )
}
