import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Receipt } from 'lucide-react'

export default function TipCalculator() {
  const [bill, setBill] = useState('')
  const [tipPercent, setTipPercent] = useState(15)
  const [people, setPeople] = useState(1)

  const billAmount = parseFloat(bill) || 0
  const tipAmount = billAmount * (tipPercent / 100)
  const total = billAmount + tipAmount
  const perPerson = people > 0 ? total / people : total

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
          <Receipt className="w-5 h-5 text-indigo-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Tip Calculator</h1>
      </div>
      <p className="text-gray-600 mb-8">Calculate tips and split bills easily.</p>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Bill Amount</label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-500">$</span>
              <input
                type="number"
                value={bill}
                onChange={(e) => setBill(e.target.value)}
                placeholder="0.00"
                className="w-full pl-8 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Tip: {tipPercent}%</label>
            <input
              type="range"
              min="0"
              max="50"
              value={tipPercent}
              onChange={(e) => setTipPercent(Number(e.target.value))}
              className="w-full accent-indigo-600"
            />
            <div className="flex gap-2 mt-2">
              {[10, 15, 18, 20, 25].map((t) => (
                <button
                  key={t}
                  onClick={() => setTipPercent(t)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${tipPercent === t ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  {t}%
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Split Between: {people} {people === 1 ? 'person' : 'people'}</label>
            <div className="flex items-center gap-3">
              <button onClick={() => setPeople(Math.max(1, people - 1))} className="w-10 h-10 bg-gray-100 rounded-lg font-bold text-gray-600 hover:bg-gray-200">-</button>
              <span className="text-xl font-bold w-10 text-center">{people}</span>
              <button onClick={() => setPeople(people + 1)} className="w-10 h-10 bg-gray-100 rounded-lg font-bold text-gray-600 hover:bg-gray-200">+</button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="text-sm text-gray-500 mb-1">Tip Amount</div>
            <div className="text-3xl font-bold text-green-600">${tipAmount.toFixed(2)}</div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="text-sm text-gray-500 mb-1">Total</div>
            <div className="text-3xl font-bold text-gray-900">${total.toFixed(2)}</div>
          </div>
          <div className="bg-indigo-50 rounded-xl border border-indigo-200 p-6">
            <div className="text-sm text-indigo-600 mb-1">Per Person</div>
            <div className="text-3xl font-bold text-indigo-600">${perPerson.toFixed(2)}</div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link to="/" className="text-indigo-600 hover:text-indigo-700 text-sm">&larr; Back to all tools</Link>
      </div>
    </div>
  )
}
