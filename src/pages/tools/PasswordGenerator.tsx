import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { KeyRound, Copy, Check, RefreshCw } from 'lucide-react'

export default function PasswordGenerator() {
  const [length, setLength] = useState(16)
  const [includeUppercase, setIncludeUppercase] = useState(true)
  const [includeLowercase, setIncludeLowercase] = useState(true)
  const [includeNumbers, setIncludeNumbers] = useState(true)
  const [includeSymbols, setIncludeSymbols] = useState(true)
  const [password, setPassword] = useState('')
  const [copied, setCopied] = useState(false)

  const generate = useCallback(() => {
    let chars = ''
    if (includeLowercase) chars += 'abcdefghijklmnopqrstuvwxyz'
    if (includeUppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (includeNumbers) chars += '0123456789'
    if (includeSymbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?'
    if (!chars) chars = 'abcdefghijklmnopqrstuvwxyz'

    let result = ''
    const arr = new Uint32Array(length)
    crypto.getRandomValues(arr)
    for (let i = 0; i < length; i++) {
      result += chars[arr[i] % chars.length]
    }
    setPassword(result)
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols])

  const handleCopy = () => {
    navigator.clipboard.writeText(password)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const getStrength = () => {
    let score = 0
    if (length >= 12) score++
    if (length >= 16) score++
    if (includeUppercase) score++
    if (includeLowercase) score++
    if (includeNumbers) score++
    if (includeSymbols) score++
    if (score <= 2) return { label: 'Weak', color: 'text-red-500', bg: 'bg-red-100' }
    if (score <= 4) return { label: 'Medium', color: 'text-yellow-500', bg: 'bg-yellow-100' }
    return { label: 'Strong', color: 'text-green-500', bg: 'bg-green-100' }
  }

  const strength = getStrength()

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
          <KeyRound className="w-5 h-5 text-indigo-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Password Generator</h1>
      </div>
      <p className="text-gray-600 mb-8">Generate strong, secure passwords with customizable options.</p>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center gap-3 mb-6">
          <input
            readOnly
            value={password}
            placeholder="Click generate to create a password"
            className="flex-1 p-3 border border-gray-300 rounded-lg font-mono text-lg bg-gray-50"
          />
          <button onClick={handleCopy} disabled={!password} className="p-3 text-gray-400 hover:text-indigo-600 disabled:opacity-30">
            {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
          </button>
          <button onClick={generate} className="p-3 text-gray-400 hover:text-indigo-600">
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>

        {password && (
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${strength.bg} ${strength.color} mb-6`}>
            {strength.label}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <label className="text-gray-700 font-medium">Length: {length}</label>
              <span className="text-gray-500">{length} characters</span>
            </div>
            <input
              type="range"
              min="8"
              max="64"
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full accent-indigo-600"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { label: 'Uppercase (A-Z)', checked: includeUppercase, onChange: setIncludeUppercase },
              { label: 'Lowercase (a-z)', checked: includeLowercase, onChange: setIncludeLowercase },
              { label: 'Numbers (0-9)', checked: includeNumbers, onChange: setIncludeNumbers },
              { label: 'Symbols (!@#...)', checked: includeSymbols, onChange: setIncludeSymbols },
            ].map((opt) => (
              <label key={opt.label} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <input
                  type="checkbox"
                  checked={opt.checked}
                  onChange={(e) => opt.onChange(e.target.checked)}
                  className="w-4 h-4 accent-indigo-600 rounded"
                />
                {opt.label}
              </label>
            ))}
          </div>
        </div>

        <button onClick={generate} className="mt-6 w-full bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
          Generate Password
        </button>
      </div>

      <div className="mt-8 text-center">
        <Link to="/" className="text-indigo-600 hover:text-indigo-700 text-sm">&larr; Back to all tools</Link>
      </div>
    </div>
  )
}
