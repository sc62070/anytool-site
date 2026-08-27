import { useState, useMemo } from 'react'
import { ShieldCheck, Check, X } from 'lucide-react'
import ToolLayout from '../../components/ToolLayout'

interface StrengthResult {
  score: number
  label: string
  color: string
  bgColor: string
  barColor: string
}

function checkStrength(password: string): StrengthResult {
  let score = 0
  if (password.length >= 8) score++
  if (password.length >= 12) score++
  if (password.length >= 16) score++
  if (/[a-z]/.test(password)) score++
  if (/[A-Z]/.test(password)) score++
  if (/[0-9]/.test(password)) score++
  if (/[^a-zA-Z0-9]/.test(password)) score++
  if (/(.)\1{2,}/.test(password)) score--
  if (/^[a-zA-Z]+$/.test(password)) score--
  if (/^[0-9]+$/.test(password)) score--
  score = Math.max(0, Math.min(5, score))

  if (score <= 1) return { score, label: 'Very Weak', color: 'text-red-500', bgColor: 'bg-red-500/10', barColor: 'bg-red-500' }
  if (score <= 2) return { score, label: 'Weak', color: 'text-orange-500', bgColor: 'bg-orange-500/10', barColor: 'bg-orange-500' }
  if (score <= 3) return { score, label: 'Fair', color: 'text-yellow-500', bgColor: 'bg-yellow-500/10', barColor: 'bg-yellow-500' }
  if (score <= 4) return { score, label: 'Strong', color: 'text-green-500', bgColor: 'bg-green-500/10', barColor: 'bg-green-500' }
  return { score, label: 'Very Strong', color: 'text-emerald-500', bgColor: 'bg-emerald-500/10', barColor: 'bg-emerald-500' }
}

function getTips(password: string): { tip: string; ok: boolean }[] {
  return [
    { tip: 'At least 8 characters', ok: password.length >= 8 },
    { tip: 'At least 12 characters', ok: password.length >= 12 },
    { tip: 'Contains lowercase letters', ok: /[a-z]/.test(password) },
    { tip: 'Contains uppercase letters', ok: /[A-Z]/.test(password) },
    { tip: 'Contains numbers', ok: /[0-9]/.test(password) },
    { tip: 'Contains special characters', ok: /[^a-zA-Z0-9]/.test(password) },
    { tip: 'No repeated characters (3+)', ok: !/(.)\1{2,}/.test(password) },
  ]
}

export default function PasswordStrengthChecker() {
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const result = useMemo(() => checkStrength(password), [password])
  const tips = useMemo(() => getTips(password), [password])

  return (
    <ToolLayout title="Password Strength Checker" description="Check how strong your password is with detailed analysis." icon={ShieldCheck}>
      <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Enter Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Type your password to check..."
                className="w-full p-4 pr-12 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-lg font-mono focus:ring-2 focus:ring-violet-500 outline-none"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-violet-500 transition-colors"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          {password && (
            <>
              <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${result.bgColor} ${result.color}`}>
                <ShieldCheck className="w-4 h-4" />
                {result.label}
              </div>

              <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${result.barColor}`}
                  style={{ width: `${(result.score / 5) * 100}%` }}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {tips.map((t) => (
                  <div key={t.tip} className="flex items-center gap-2 text-sm">
                    {t.ok ? (
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                    ) : (
                      <X className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    )}
                    <span className={t.ok ? 'text-green-600 dark:text-green-400' : 'text-gray-500 dark:text-gray-400'}>{t.tip}</span>
                  </div>
                ))}
              </div>

              {password.length > 0 && (
                <div className="p-4 bg-violet-50 dark:bg-violet-900/20 rounded-xl border border-violet-200 dark:border-violet-800/40">
                  <div className="text-sm text-violet-700 dark:text-violet-300">
                    <span className="font-semibold">Entropy:</span> {Math.round(password.length * Math.log2(94))} bits &middot;{' '}
                    <span className="font-semibold">Length:</span> {password.length} characters
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </ToolLayout>
  )
}
