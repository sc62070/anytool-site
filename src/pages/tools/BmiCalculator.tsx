import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'

const getBmiCategory = (bmi: number) => {
  if (bmi < 18.5) return { label: 'Underweight', color: 'text-blue-600', bg: 'bg-blue-100' }
  if (bmi < 25) return { label: 'Normal', color: 'text-green-600', bg: 'bg-green-100' }
  if (bmi < 30) return { label: 'Overweight', color: 'text-orange-500', bg: 'bg-orange-100' }
  return { label: 'Obese', color: 'text-red-600', bg: 'bg-red-100' }
}

export default function BmiCalculator() {
  const [unit, setUnit] = useState<'metric' | 'imperial'>('metric')
  const [height, setHeight] = useState('')
  const [weight, setWeight] = useState('')
  const [heightFt, setHeightFt] = useState('')
  const [heightIn, setHeightIn] = useState('')
  const [weightLbs, setWeightLbs] = useState('')
  const [bmi, setBmi] = useState<number | null>(null)

  const calculate = () => {
    let h: number, w: number
    if (unit === 'metric') {
      h = parseFloat(height) / 100
      w = parseFloat(weight)
    } else {
      const totalInches = (parseFloat(heightFt) || 0) * 12 + (parseFloat(heightIn) || 0)
      h = totalInches * 0.0254
      w = parseFloat(weightLbs) * 0.453592
    }
    if (h > 0 && w > 0) {
      setBmi(w / (h * h))
    }
  }

  const category = bmi ? getBmiCategory(bmi) : null

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg flex items-center justify-center">
          <Heart className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">BMI Calculator</h1>
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-8">Calculate your Body Mass Index (BMI) to check if your weight is in a healthy range.</p>

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex gap-2 mb-6">
          <button onClick={() => setUnit('metric')} className={`px-4 py-2 rounded-lg text-sm font-medium ${unit === 'metric' ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}>Metric</button>
          <button onClick={() => setUnit('imperial')} className={`px-4 py-2 rounded-lg text-sm font-medium ${unit === 'imperial' ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'}`}>Imperial</button>
        </div>

        <div className="space-y-4">
          {unit === 'metric' ? (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Height (cm)</label>
                <input type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="170" className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Weight (kg)</label>
                <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="70" className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl" />
              </div>
            </>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Height</label>
                <div className="flex gap-2">
                  <input type="number" value={heightFt} onChange={(e) => setHeightFt(e.target.value)} placeholder="5" className="w-1/2 p-3 border border-gray-300 dark:border-gray-600 rounded-xl" />
                  <input type="number" value={heightIn} onChange={(e) => setHeightIn(e.target.value)} placeholder="9" className="w-1/2 p-3 border border-gray-300 dark:border-gray-600 rounded-xl" />
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Feet / Inches</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Weight (lbs)</label>
                <input type="number" value={weightLbs} onChange={(e) => setWeightLbs(e.target.value)} placeholder="154" className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl" />
              </div>
            </>
          )}
          <button onClick={calculate} className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700">Calculate BMI</button>
        </div>
      </div>

      {bmi && category && (
        <div className="mt-6 bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 text-center">
          <div className="text-5xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">{bmi.toFixed(1)}</div>
          <div className={`inline-block px-4 py-2 rounded-full font-semibold ${category.color} ${category.bg}`}>{category.label}</div>
          <div className="mt-4 grid grid-cols-4 gap-2 text-xs text-gray-500 dark:text-gray-400">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-2"><br/>Underweight<br/>&lt;18.5</div>
            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-2"><br/>Normal<br/>18.5-24.9</div>
            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-2"><br/>Overweight<br/>25-29.9</div>
            <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-2"><br/>Obese<br/>30+</div>
          </div>
        </div>
      )}

      <div className="mt-8 text-center">
        <Link to="/" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 text-sm">&larr; Back to all tools</Link>
      </div>
    </div>
  )
}
