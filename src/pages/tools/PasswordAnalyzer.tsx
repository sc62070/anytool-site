import { useState, useMemo } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { ShieldCheck, Check, RefreshCw } from 'lucide-react'

interface AnalysisResult {
  score: number
  label: string
  color: string
  crackTime: string
  suggestions: string[]
}

function analyzePassword(pw: string): AnalysisResult {
  if (!pw) return { score: 0, label: 'Enter a password', color: 'text-gray-400', crackTime: '-', suggestions: [] }

  let score = 0
  const suggestions: string[] = []

  // Length
  if (pw.length >= 8) score += 1
  if (pw.length >= 12) score += 1
  if (pw.length >= 16) score += 1
  if (pw.length < 8) suggestions.push('Use at least 8 characters')
  if (pw.length < 12) suggestions.push('12+ characters is stronger')

  // Character types
  if (/[a-z]/.test(pw)) score += 1; else suggestions.push('Add lowercase letters')
  if (/[A-Z]/.test(pw)) score += 1; else suggestions.push('Add uppercase letters')
  if (/\d/.test(pw)) score += 1; else suggestions.push('Add numbers')
  if (/[^a-zA-Z0-9]/.test(pw)) score += 1; else suggestions.push('Add special characters (!@#$)')

  // Patterns
  if (/(.)\1{2,}/.test(pw)) { score -= 1; suggestions.push('Avoid repeating characters') }
  if (/^[a-zA-Z]+$/.test(pw)) { score -= 1; suggestions.push('Mix letters with numbers') }
  if (/^(password|123456|qwerty)/i.test(pw)) { score -= 3; suggestions.push('Avoid common passwords') }
  if (/^(abc|123|qwe)/i.test(pw)) { suggestions.push('Avoid sequential characters') }

  // Unique chars
  const unique = new Set(pw).size
  if (unique < pw.length * 0.5) { score -= 1; suggestions.push('Use more unique characters') }

  score = Math.max(0, Math.min(7, score))

  const labels = ['Very Weak', 'Weak', 'Fair', 'Good', 'Strong', 'Very Strong', 'Excellent', 'Maximum']
  const colors = ['text-red-500', 'text-red-400', 'text-orange-500', 'text-amber-500', 'text-yellow-500', 'text-emerald-500', 'text-emerald-400', 'text-emerald-300']

  // Crack time estimate
  const charsetSize = (/[a-z]/.test(pw) ? 26 : 0) + (/[A-Z]/.test(pw) ? 26 : 0) + (/\d/.test(pw) ? 10 : 0) + (/[^a-zA-Z0-9]/.test(pw) ? 32 : 0)
  const combinations = Math.pow(charsetSize || 1, pw.length)
  const guessesPerSec = 1e10 // 10 billion
  const seconds = combinations / guessesPerSec / 2
  let crackTime = ''
  if (seconds < 1) crackTime = 'Instantly'
  else if (seconds < 60) crackTime = `${Math.round(seconds)} seconds`
  else if (seconds < 3600) crackTime = `${Math.round(seconds / 60)} minutes`
  else if (seconds < 86400) crackTime = `${Math.round(seconds / 3600)} hours`
  else if (seconds < 31536000) crackTime = `${Math.round(seconds / 86400)} days`
  else if (seconds < 31536000 * 1000) crackTime = `${Math.round(seconds / 31536000)} years`
  else if (seconds < 31536000 * 1e6) crackTime = `${Math.round(seconds / 31536000 / 1000)}K years`
  else if (seconds < 31536000 * 1e9) crackTime = `${Math.round(seconds / 31536000 / 1e6)}M years`
  else crackTime = 'Billions of years'

  return { score, label: labels[score], color: colors[score], crackTime, suggestions: [...new Set(suggestions)].slice(0, 4) }
}

function generateStrong(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*'
  const arr = new Uint32Array(20)
  crypto.getRandomValues(arr)
  return Array.from(arr, x => chars[x % chars.length]).join('')
}

export default function PasswordAnalyzer() {
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [copied, setCopied] = useState(false)

  const result = useMemo(() => analyzePassword(password), [password])

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generateStrong())
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const scorePercent = (result.score / 7) * 100
  const barColors = ['bg-red-500', 'bg-red-400', 'bg-orange-500', 'bg-amber-500', 'bg-yellow-500', 'bg-emerald-500', 'bg-emerald-400', 'bg-emerald-300']

  return (
    <ToolLayout title="Password Strength Analyzer" description="Analyze password strength and get improvement suggestions." icon={ShieldCheck}>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Enter Password</label>
          <div className="relative">
            <input type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-3 pr-12 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl font-mono text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500" placeholder="Type or paste a password..." />
            <button onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">{showPw ? 'Hide' : 'Show'}</button>
          </div>
        </div>

        {password && (
          <>
            {/* Score bar */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-sm font-bold ${result.color}`}>{result.label}</span>
                <span className="text-xs text-gray-400">{result.score}/7</span>
              </div>
              <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                <div className={`h-full ${barColors[result.score]} rounded-full transition-all duration-500`} style={{ width: `${scorePercent}%` }} />
              </div>
            </div>

            {/* Crack time */}
            <div className="p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-center">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Estimated crack time</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{result.crackTime}</div>
            </div>

            {/* Suggestions */}
            {result.suggestions.length > 0 && (
              <div className="p-4 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-xl">
                <h4 className="text-sm font-medium text-amber-700 dark:text-amber-300 mb-2">How to improve:</h4>
                <ul className="space-y-1">
                  {result.suggestions.map((s, i) => (
                    <li key={i} className="text-sm text-amber-600 dark:text-amber-400 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />{s}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Character breakdown */}
            <div className="grid grid-cols-4 gap-2 text-center">
              {[
                { label: 'Lowercase', test: /[a-z]/.test(password) },
                { label: 'Uppercase', test: /[A-Z]/.test(password) },
                { label: 'Numbers', test: /\d/.test(password) },
                { label: 'Symbols', test: /[^a-zA-Z0-9]/.test(password) },
              ].map(item => (
                <div key={item.label} className={`p-2 rounded-lg border text-xs font-medium ${item.test ? 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-200 dark:border-emerald-500/20 text-emerald-600 dark:text-emerald-400' : 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-400'}`}>
                  {item.label}
                </div>
              ))}
            </div>
          </>
        )}

        <button onClick={copyToClipboard} className="w-full py-3 bg-violet-600 text-white rounded-xl font-semibold hover:bg-violet-700 transition-colors flex items-center justify-center gap-2">
          {copied ? <><Check className="w-5 h-5" /> Copied Strong Password</> : <><RefreshCw className="w-5 h-5" /> Generate Strong Password</>}
        </button>
      </div>
    </ToolLayout>
  )
}
