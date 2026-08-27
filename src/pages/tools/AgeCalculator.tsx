import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Calendar } from 'lucide-react'

export default function AgeCalculator() {
  const [birthdate, setBirthdate] = useState('')
  const [result, setResult] = useState<{ years: number; months: number; days: number; totalDays: number; totalWeeks: number; nextBirthday: number } | null>(null)

  const calculate = () => {
    if (!birthdate) return
    const birth = new Date(birthdate)
    const today = new Date()

    let years = today.getFullYear() - birth.getFullYear()
    let months = today.getMonth() - birth.getMonth()
    let days = today.getDate() - birth.getDate()

    if (days < 0) {
      months--
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0)
      days += lastMonth.getDate()
    }
    if (months < 0) {
      years--
      months += 12
    }

    const totalDays = Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24))
    const totalWeeks = Math.floor(totalDays / 7)

    const nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate())
    if (nextBirthday <= today) nextBirthday.setFullYear(nextBirthday.getFullYear() + 1)
    const daysUntilBirthday = Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

    setResult({ years, months, days, totalDays, totalWeeks, nextBirthday: daysUntilBirthday })
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
          <Calendar className="w-5 h-5 text-indigo-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Age Calculator</h1>
      </div>
      <p className="text-gray-600 mb-8">Calculate your exact age in years, months, and days.</p>

      <div className="bg-white rounded-xl p-6 border border-gray-200">
        <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
        <input type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} className="w-full p-3 border border-gray-300 rounded-xl mb-4" />
        <button onClick={calculate} className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700">
          Calculate Age
        </button>
      </div>

      {result && (
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl p-5 border border-gray-200 text-center">
            <div className="text-3xl font-bold text-indigo-600">{result.years}</div>
            <div className="text-sm text-gray-500">Years</div>
          </div>
          <div className="bg-white rounded-xl p-5 border border-gray-200 text-center">
            <div className="text-3xl font-bold text-indigo-600">{result.months}</div>
            <div className="text-sm text-gray-500">Months</div>
          </div>
          <div className="bg-white rounded-xl p-5 border border-gray-200 text-center">
            <div className="text-3xl font-bold text-indigo-600">{result.days}</div>
            <div className="text-sm text-gray-500">Days</div>
          </div>
          <div className="bg-white rounded-xl p-5 border border-gray-200 text-center">
            <div className="text-3xl font-bold text-green-600">{result.totalDays.toLocaleString()}</div>
            <div className="text-sm text-gray-500">Total Days</div>
          </div>
          <div className="bg-white rounded-xl p-5 border border-gray-200 text-center">
            <div className="text-3xl font-bold text-green-600">{result.totalWeeks.toLocaleString()}</div>
            <div className="text-sm text-gray-500">Total Weeks</div>
          </div>
          <div className="bg-white rounded-xl p-5 border border-gray-200 text-center">
            <div className="text-3xl font-bold text-orange-500">{result.nextBirthday}</div>
            <div className="text-sm text-gray-500">Days to Birthday</div>
          </div>
        </div>
      )}

      <div className="mt-8 text-center">
        <Link to="/" className="text-indigo-600 hover:text-indigo-700 text-sm">&larr; Back to all tools</Link>
      </div>
    </div>
  )
}
