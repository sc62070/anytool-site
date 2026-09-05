import { useState, useCallback } from 'react'
import { KeyRound, Copy, Check, RefreshCw } from 'lucide-react'
import ToolLayout from '../../components/ToolLayout'

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
    <ToolLayout title="Password Generator" description="Generate strong, secure passwords with customizable options." icon={KeyRound} info="Create cryptographically random passwords using the browser's crypto.getRandomValues() API—the same secure random source used by banking applications. Adjust length from 8 to 64 characters and toggle uppercase, lowercase, numbers, and symbols to meet any site's requirements. Every password is generated entirely in your browser and never leaves your device.">
      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3 mb-6">
          <input
            readOnly
            value={password}
            placeholder="Click generate to create a password"
            className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg font-mono text-lg bg-gray-50 dark:bg-gray-700"
          />
          <button onClick={handleCopy} disabled={!password} className="p-3 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 disabled:opacity-30">
            {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
          </button>
          <button onClick={generate} className="p-3 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
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
              <label className="text-gray-700 dark:text-gray-300 font-medium">Length: {length}</label>
              <span className="text-gray-500 dark:text-gray-400">{length} characters</span>
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
              <label key={opt.label} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
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

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">What Makes a Password Secure?</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
          Length is the single most important factor in password security. A 16-character password using only lowercase letters has more entropy than a 10-character password with every character type enabled. The NIST Special Publication 800-63B guidelines now recommend focusing on length over complexity—passphrases like "correct-horse-battery-staple" are both easier to remember and harder to crack than "P@55w0rD!". This tool defaults to 16 characters with all character types enabled, which gives you roughly 95 bits of entropy—enough to resist brute-force attacks for longer than the heat death of the universe.
        </p>
        <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
          Never reuse passwords across sites. When one site gets breached (and they all eventually do), attackers automatically try those same credentials on your email, banking, and social media accounts—a technique called credential stuffing. Use a password manager to store unique passwords for every service, and let this generator create them. The strength indicator in this tool gives you quick feedback: aim for "Strong" on every password you generate.
        </p>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          If a site limits you to 8 or 12 characters, that is a red flag about how they store passwords—it likely means they are using outdated hashing algorithms or storing them in plaintext. Consider using a different service when possible.
        </p>
      </section>
    </ToolLayout>
  )
}
