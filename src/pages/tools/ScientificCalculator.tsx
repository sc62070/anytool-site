import { useState } from 'react'
import { Calculator as CalcIcon } from 'lucide-react'
import ToolLayout from '../../components/ToolLayout'

export default function ScientificCalculator() {
  const [display, setDisplay] = useState('0')
  const [history, setHistory] = useState<string[]>([])
  const [newCalc, setNewCalc] = useState(true)

  const append = (val: string) => {
    if (newCalc && val !== '.') {
      setDisplay(val)
      setNewCalc(false)
    } else {
      setDisplay(d => d === '0' && val !== '.' ? val : d + val)
    }
  }

  const clear = () => { setDisplay('0'); setNewCalc(true) }

  const calculate = () => {
    try {
      const expr = display.replace(/×/g, '*').replace(/÷/g, '/').replace(/π/g, `${Math.PI}`).replace(/e(?!\w)/g, `${Math.E}`)
      const result = Function(`"use strict"; return (${expr})`)() as number
      const entry = `${display} = ${result}`
      setHistory(h => [entry, ...h].slice(0, 20))
      setDisplay(String(result))
      setNewCalc(true)
    } catch {
      setDisplay('Error')
      setNewCalc(true)
    }
  }

  const fn = (f: string) => {
    const val = parseFloat(display)
    if (isNaN(val)) return
    let result = 0
    switch (f) {
      case 'sin': result = Math.sin(val * Math.PI / 180); break
      case 'cos': result = Math.cos(val * Math.PI / 180); break
      case 'tan': result = Math.tan(val * Math.PI / 180); break
      case 'log': result = Math.log10(val); break
      case 'ln': result = Math.log(val); break
      case 'sqrt': result = Math.sqrt(val); break
      case 'x²': result = val * val; break
    }
    const entry = `${f}(${val}) = ${result}`
    setHistory(h => [entry, ...h].slice(0, 20))
    setDisplay(String(result))
    setNewCalc(true)
  }

  const btn = 'px-3 py-2.5 rounded-lg text-sm font-medium transition-colors'

  return (
    <ToolLayout title="Scientific Calculator" description="Perform scientific calculations with sin, cos, tan, log, and more." icon={CalcIcon}>
      <div className="flex gap-4">
        <div className="flex-1">
          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 mb-4">
            <div className="text-right text-3xl font-mono font-bold text-gray-900 dark:text-white truncate">{display}</div>
          </div>

          <div className="grid grid-cols-4 gap-2 mb-4">
            {[['sin', 'cos', 'tan', 'ln'], ['log', 'sqrt', 'x²', 'π'], ['7', '8', '9', '÷'], ['4', '5', '6', '×'], ['1', '2', '3', '-'], ['0', '.', '=', '+']].map((row, i) =>
              row.map(b => (
                <button key={`${i}-${b}`} onClick={() => {
                  if (b === '=') calculate()
                  else if (['sin', 'cos', 'tan', 'log', 'ln', 'sqrt', 'x²'].includes(b)) fn(b)
                  else if (b === 'π') append('π')
                  else if (b === '÷') append('÷')
                  else if (b === '×') append('×')
                  else append(b)
                }} className={`${btn} ${['sin', 'cos', 'tan', 'log', 'ln', 'sqrt', 'x²'].includes(b) ? 'bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 hover:bg-violet-200 dark:hover:bg-violet-900/50' : b === '=' ? 'bg-violet-600 text-white hover:bg-violet-700' : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700'}`}>{b}</button>
              ))
            )}
          </div>
          <button onClick={clear} className={`${btn} w-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50`}>Clear</button>
        </div>

        <div className="w-56">
          <div className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wide">History</div>
          <div className="bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-3 h-80 overflow-y-auto space-y-1">
            {history.length === 0 && <div className="text-xs text-gray-400 dark:text-gray-500">No calculations yet</div>}
            {history.map((h, i) => <div key={i} className="text-xs font-mono text-gray-600 dark:text-gray-300">{h}</div>)}
          </div>
        </div>
      </div>
    </ToolLayout>
  )
}
