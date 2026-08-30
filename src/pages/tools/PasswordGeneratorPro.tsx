import { useState, useCallback } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { KeyRound, Copy, Check, RefreshCw, History, Trash2 } from 'lucide-react'

interface GeneratedPw {
  password: string
  strength: string
  time: string
}

function evaluateStrength(pw: string): { label: string; color: string; score: number } {
  let score = 0
  if (pw.length >= 12) score += 2
  else if (pw.length >= 8) score += 1
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++
  if (/\d/.test(pw)) score++
  if (/[^a-zA-Z0-9]/.test(pw)) score++
  if (score <= 1) return { label: 'Weak', color: 'text-red-500', score }
  if (score <= 2) return { label: 'Fair', color: 'text-amber-500', score }
  if (score <= 3) return { label: 'Strong', color: 'text-emerald-500', score }
  return { label: 'Very Strong', color: 'text-emerald-400', score }
}

export default function PasswordGeneratorPro() {
  const [length, setLength] = useState(16)
  const [uppercase, setUppercase] = useState(true)
  const [lowercase, setLowercase] = useState(true)
  const [numbers, setNumbers] = useState(true)
  const [symbols, setSymbols] = useState(true)
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false)
  const [history, setHistory] = useState<GeneratedPw[]>([])
  const [copied, setCopied] = useState('')
  const [generated, setGenerated] = useState('')

  const generate = useCallback(() => {
    let chars = ''
    if (lowercase) chars += 'abcdefghijklmnopqrstuvwxyz'
    if (uppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    if (numbers) chars += '0123456789'
    if (symbols) chars += '!@#$%^&*()_+-=[]{}|;:,.<>?'
    if (excludeAmbiguous) chars = chars.replace(/[oOlI1|]/g, '')
    if (!chars) chars = 'abcdefghijklmnopqrstuvwxyz'

    const arr = new Uint32Array(length)
    crypto.getRandomValues(arr)
    const pw = Array.from(arr, x => chars[x % chars.length]).join('')
    const strength = evaluateStrength(pw)
    const time = new Date().toLocaleTimeString()

    setGenerated(pw)
    setHistory(prev => [{ password: pw, strength: strength.label, time }, ...prev].slice(0, 20))
  }, [length, uppercase, lowercase, numbers, symbols, excludeAmbiguous])

  const copyToClipboard = (pw: string, id: string) => {
    navigator.clipboard.writeText(pw)
    setCopied(id)
    setTimeout(() => setCopied(''), 1500)
  }

  const strength = generated ? evaluateStrength(generated) : null

  return (
    <ToolLayout title="Password Generator Pro" description="Advanced password generator with history and strength analysis." icon={KeyRound}>
      <div className="space-y-6">
        {/* Settings */}
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Length</label>
              <span className="text-sm font-mono text-violet-600 dark:text-violet-400">{length}</span>
            </div>
            <input type="range" min={4} max={64} value={length} onChange={e => setLength(Number(e.target.value))} className="w-full" />
          </div>
          <div className="grid grid-cols-2 gap-2">
            {[
              { label: 'Uppercase (A-Z)', checked: uppercase, set: setUppercase },
              { label: 'Lowercase (a-z)', checked: lowercase, set: setLowercase },
              { label: 'Numbers (0-9)', checked: numbers, set: setNumbers },
              { label: 'Symbols (!@#)', checked: symbols, set: setSymbols },
            ].map(o => (
              <label key={o.label} className="flex items-center gap-2 cursor-pointer p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900">
                <input type="checkbox" checked={o.checked} onChange={e => o.set(e.target.checked)} className="w-4 h-4 rounded border-gray-300 text-violet-600 focus:ring-violet-500" />
                <span className="text-sm text-gray-700 dark:text-gray-300">{o.label}</span>
              </label>
            ))}
          </div>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={excludeAmbiguous} onChange={e => setExcludeAmbiguous(e.target.checked)} className="w-4 h-4 rounded border-gray-300 text-violet-600 focus:ring-violet-500" />
            <span className="text-sm text-gray-700 dark:text-gray-300">Exclude ambiguous (O, l, I, 1)</span>
          </label>
        </div>

        <button onClick={generate} className="w-full py-3 bg-violet-600 text-white rounded-xl font-semibold hover:bg-violet-700 transition-colors flex items-center justify-center gap-2">
          <RefreshCw className="w-5 h-5" /> Generate Password
        </button>

        {/* Generated password */}
        {generated && (
          <div className="p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Generated</span>
              <button onClick={() => copyToClipboard(generated, 'main')} className="flex items-center gap-1.5 text-sm text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300">
                {copied === 'main' ? <><Check className="w-4 h-4" /> Copied</> : <><Copy className="w-4 h-4" /> Copy</>}
              </button>
            </div>
            <div className="font-mono text-lg text-gray-900 dark:text-white break-all leading-relaxed">{generated}</div>
            {strength && (
              <div className="mt-2 flex items-center gap-2">
                <span className={`text-sm font-medium ${strength.color}`}>{strength.label}</span>
                <div className="flex-1 h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${strength.score <= 1 ? 'bg-red-500' : strength.score <= 2 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${(strength.score / 4) * 100}%` }} />
                </div>
              </div>
            )}
          </div>
        )}

        {/* History */}
        {history.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <History className="w-4 h-4 text-gray-400" />
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">History (this session)</span>
              <button onClick={() => setHistory([])} className="ml-auto text-xs text-red-400 hover:text-red-500 flex items-center gap-1"><Trash2 className="w-3 h-3" /> Clear</button>
            </div>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {history.map((h, i) => (
                <div key={i} className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <div className="font-mono text-xs text-gray-900 dark:text-white truncate">{h.password}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{h.strength} · {h.time}</div>
                  </div>
                  <button onClick={() => copyToClipboard(h.password, String(i))} className="p-1.5 text-gray-400 hover:text-violet-500 shrink-0">
                    {copied === String(i) ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  )
}
