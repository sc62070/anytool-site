import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRightLeft } from 'lucide-react'

const categories = {
  Length: {
    units: ['Meter', 'Kilometer', 'Centimeter', 'Millimeter', 'Mile', 'Yard', 'Foot', 'Inch'],
    base: { Meter: 1, Kilometer: 1000, Centimeter: 0.01, Millimeter: 0.001, Mile: 1609.344, Yard: 0.9144, Foot: 0.3048, Inch: 0.0254 }
  },
  Weight: {
    units: ['Kilogram', 'Gram', 'Milligram', 'Pound', 'Ounce', 'Ton'],
    base: { Kilogram: 1, Gram: 0.001, Milligram: 0.000001, Pound: 0.453592, Ounce: 0.0283495, Ton: 1000 }
  },
  Temperature: {
    units: ['Celsius', 'Fahrenheit', 'Kelvin'],
    base: null
  },
  Speed: {
    units: ['m/s', 'km/h', 'mph', 'knots'],
    base: { 'm/s': 1, 'km/h': 0.277778, mph: 0.44704, knots: 0.514444 }
  },
  Data: {
    units: ['Byte', 'KB', 'MB', 'GB', 'TB'],
    base: { Byte: 1, KB: 1024, MB: 1048576, GB: 1073741824, TB: 1099511627776 }
  }
}

export default function UnitConverter() {
  const [category, setCategory] = useState<keyof typeof categories>('Length')
  const [fromUnit, setFromUnit] = useState('Meter')
  const [toUnit, setToUnit] = useState('Foot')
  const [value, setValue] = useState('1')
  const [result, setResult] = useState('')

  useEffect(() => {
    const v = parseFloat(value)
    if (isNaN(v)) { setResult(''); return }

    const cat = categories[category]

    if (category === 'Temperature') {
      let celsius: number
      if (fromUnit === 'Celsius') celsius = v
      else if (fromUnit === 'Fahrenheit') celsius = (v - 32) * 5 / 9
      else celsius = v - 273.15

      let converted: number
      if (toUnit === 'Celsius') converted = celsius
      else if (toUnit === 'Fahrenheit') converted = celsius * 9 / 5 + 32
      else converted = celsius + 273.15

      setResult(converted.toFixed(4))
      return
    }

    const baseVal = v * (cat.base as Record<string, number>)[fromUnit]
    const converted = baseVal / (cat.base as Record<string, number>)[toUnit]
    setResult(converted.toFixed(6))
  }, [category, fromUnit, toUnit, value])

  const swap = () => {
    setFromUnit(toUnit)
    setToUnit(fromUnit)
  }

  const units = categories[category].units

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg flex items-center justify-center">
          <ArrowRightLeft className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Unit Converter</h1>
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-8">Convert between length, weight, temperature, speed, and data units.</p>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
          <div className="flex flex-wrap gap-2">
            {Object.keys(categories).map(cat => (
              <button key={cat} onClick={() => { setCategory(cat as keyof typeof categories); setFromUnit(categories[cat as keyof typeof categories].units[0]); setToUnit(categories[cat as keyof typeof categories].units[1] || categories[cat as keyof typeof categories].units[0]) }}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${category === cat ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-[1fr,auto,1fr] gap-4 items-end">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">From</label>
            <input type="number" value={value} onChange={(e) => setValue(e.target.value)} className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl mb-2" />
            <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)} className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl">
              {units.map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>

          <button onClick={swap} className="p-3 bg-indigo-100 dark:bg-indigo-900/50 rounded-xl hover:bg-indigo-200 dark:hover:bg-indigo-800 mb-0.5">
            <ArrowRightLeft className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          </button>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">To</label>
            <input readOnly value={result} className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 mb-2" />
            <select value={toUnit} onChange={(e) => setToUnit(e.target.value)} className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl">
              {units.map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link to="/" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 text-sm">&larr; Back to all tools</Link>
      </div>
    </div>
  )
}
