import { useState } from 'react'
import { Hash } from 'lucide-react'
import ToolLayout from '../../components/ToolLayout'

const romanMap: [number, string][] = [
  [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
  [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
  [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
]

const toRoman = (num: number): string => {
  if (num < 1 || num > 3999) return ''
  let result = ''
  for (const [value, symbol] of romanMap) {
    while (num >= value) { result += symbol; num -= value }
  }
  return result
}

const romanValues: Record<string, number> = { M: 1000, D: 500, C: 100, L: 50, X: 10, V: 5, I: 1 }

const fromRoman = (str: string): number => {
  const s = str.toUpperCase().replace(/[^IVXLCDM]/g, '')
  if (!s) return 0
  let result = 0
  for (let i = 0; i < s.length; i++) {
    const curr = romanValues[s[i]] || 0
    const next = romanValues[s[i + 1]] || 0
    result += curr < next ? -curr : curr
  }
  return result
}

export default function RomanNumerals() {
  const [numberInput, setNumberInput] = useState('')
  const [romanInput, setRomanInput] = useState('')
  const [numResult, setNumResult] = useState('')
  const [romanResult, setRomanResult] = useState('')

  const convertToRoman = () => {
    const n = parseInt(numberInput)
    if (n >= 1 && n <= 3999) {
      setRomanResult(toRoman(n))
      setNumResult('')
    } else {
      setRomanResult('')
      setNumResult('Enter a number between 1 and 3999')
    }
  }

  const convertToNumber = () => {
    const n = fromRoman(romanInput)
    if (n >= 1 && n <= 3999) {
      setNumResult(String(n))
      setRomanResult('')
    } else {
      setNumResult('')
      setRomanResult('Enter a valid Roman numeral (1-3999)')
    }
  }

  const inputCls = 'w-full p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-mono focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none text-gray-900 dark:text-white'

  return (
    <ToolLayout title="Roman Numeral Converter" description="Convert between Roman numerals and numbers (1-3999)." icon={Hash}>
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Number → Roman</h3>
          <input type="number" min={1} max={3999} value={numberInput} onChange={e => setNumberInput(e.target.value)} placeholder="Enter number (1-3999)" className={inputCls} />
          <button onClick={convertToRoman} className="w-full mt-3 py-2.5 bg-violet-600 text-white rounded-xl text-sm font-semibold hover:bg-violet-700 transition-colors">Convert</button>
          {romanResult && (
            <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 text-center">
              <div className="text-2xl font-bold text-violet-600 dark:text-violet-400">{romanResult}</div>
            </div>
          )}
        </div>

        <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">Roman → Number</h3>
          <input value={romanInput} onChange={e => setRomanInput(e.target.value)} placeholder="Enter Roman numeral" className={inputCls} />
          <button onClick={convertToNumber} className="w-full mt-3 py-2.5 bg-violet-600 text-white rounded-xl text-sm font-semibold hover:bg-violet-700 transition-colors">Convert</button>
          {numResult && (
            <div className="mt-4 p-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 text-center">
              <div className="text-2xl font-bold text-violet-600 dark:text-violet-400">{numResult}</div>
            </div>
          )}
        </div>
      </div>
    </ToolLayout>
  )
}
