import { useState } from 'react'
import { Calendar } from 'lucide-react'
import ToolLayout from '../../components/ToolLayout'

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
    <ToolLayout title="Age Calculator" description="Calculate your exact age in years, months, and days." icon={Calendar} info="Calculate your precise age down to the day, including total days lived, total weeks, and days until your next birthday. Useful for verifying legal age requirements, planning milestone celebrations, or computing exact time spans between any two dates for project timelines.">

      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Date of Birth</label>
        <input type="date" value={birthdate} onChange={(e) => setBirthdate(e.target.value)} className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl mb-4" />
        <button onClick={calculate} className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700">
          Calculate Age
        </button>
      </div>

      {result && (
        <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 text-center">
            <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{result.years}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Years</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 text-center">
            <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{result.months}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Months</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 text-center">
            <div className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{result.days}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Days</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 text-center">
            <div className="text-3xl font-bold text-green-600">{result.totalDays.toLocaleString()}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Total Days</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 text-center">
            <div className="text-3xl font-bold text-green-600">{result.totalWeeks.toLocaleString()}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Total Weeks</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 text-center">
            <div className="text-3xl font-bold text-orange-500">{result.nextBirthday}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Days to Birthday</div>
          </div>
        </div>
      )}

      <section className="mt-8 mb-4">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mt-8 mb-4">When Exact Age Calculation Matters</h2>
        <div className="text-sm leading-relaxed text-gray-600 dark:text-gray-400 space-y-3">
          <p>
            Knowing your exact age in days is more useful than you might think. Many legal thresholds are measured in precise day counts — driver's license eligibility, age of consent, drinking age, and retirement benefits all have cutoff dates where being off by a single day changes everything. This calculator gives you the definitive answer without manually counting leap years or varying month lengths.
          </p>
          <p>
            The "total days lived" figure is surprisingly handy for milestone tracking. Some cultures celebrate 10,000-day milestones, and fitness challenges often track streaks in days. Parents frequently want to know exactly how many days old their child is for growth records. Project managers also use date-difference logic to calculate sprint durations, contract periods, and time-to-deadline withoutCalendar math headaches.
          </p>
          <p>
            The "days until next birthday" count helps with party planning, but it's also practical for subscription renewals, warranty expirations, and annual reminder systems. If you're building an app that sends birthday discounts or age-restricted content verification, the same underlying calculation — subtracting dates and accounting for variable month lengths — is exactly what you need.
          </p>
        </div>
      </section>
    </ToolLayout>
  )
}
