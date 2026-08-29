import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { Blend, Copy, Check } from 'lucide-react'

const patterns = [
  { name: 'Email', regex: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}', description: 'Matches email addresses' },
  { name: 'URL', regex: 'https?:\\/\\/[\\w\\-]+(\\.[\\w\\-]+)+[\\w\\-.,@?^=%&:/~+#]*', description: 'Matches HTTP/HTTPS URLs' },
  { name: 'Phone (US)', regex: '\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}', description: 'Matches US phone numbers' },
  { name: 'IP Address', regex: '\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\b', description: 'Matches IPv4 addresses' },
  { name: 'Date (YYYY-MM-DD)', regex: '\\d{4}[-\\/]\\d{2}[-\\/]\\d{2}', description: 'Matches dates in YYYY-MM-DD format' },
  { name: 'Hex Color', regex: '#[0-9a-fA-F]{6}\\b|#[0-9a-fA-F]{3}\\b', description: 'Matches CSS hex color codes' },
  { name: 'HTML Tag', regex: '<\\/?[a-zA-Z][^>]*>', description: 'Matches HTML tags' },
  { name: 'Digits Only', regex: '\\d+', description: 'Matches numeric digits' },
  { name: 'Whitespace', regex: '\\s+', description: 'Matches whitespace characters' },
]

export default function RegexGenerator() {
  const [description, setDescription] = useState('')
  const [selectedPattern, setSelectedPattern] = useState<number | null>(null)
  const [testString, setTestString] = useState('')
  const [copied, setCopied] = useState(false)

  const getRegex = (): string => {
    if (selectedPattern !== null) return patterns[selectedPattern].regex
    const d = description.toLowerCase()
    if (d.includes('email')) return '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}'
    if (d.includes('url') || d.includes('link')) return 'https?:\\/\\/[\\w\\-]+(\\.[\\w\\-]+)+[\\w\\-.,@?^=%&:/~+#]*'
    if (d.includes('phone')) return '\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}'
    if (d.includes('date')) return '\\d{4}[-\\/]\\d{2}[-\\/]\\d{2}'
    if (d.includes('number') || d.includes('digit')) return '\\d+'
    if (d.includes('word')) return '\\b\\w+\\b'
    if (d.includes('ip')) return '\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\b'
    if (d.includes('hex') || d.includes('color')) return '#[0-9a-fA-F]{3,6}\\b'
    return '\\b\\w+\\b'
  }

  const regex = getRegex()
  let matches: string[] = []
  try {
    const re = new RegExp(regex, 'g')
    matches = testString.match(re) || []
  } catch { /* ignore */ }

  const copyRegex = () => {
    navigator.clipboard.writeText(regex)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <ToolLayout title="Regex Generator" description="Describe what you need and get a regular expression.">
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Describe what you want to match</label>
          <input type="text" value={description} onChange={e => { setDescription(e.target.value); setSelectedPattern(null) }} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500" placeholder="e.g. email addresses, phone numbers, dates..." />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Or pick a common pattern</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {patterns.map((p, i) => (
              <button key={i} onClick={() => { setSelectedPattern(i); setDescription(p.name) }} className={`text-left p-3 rounded-xl border text-sm transition-all ${selectedPattern === i ? 'bg-violet-50 dark:bg-violet-500/10 border-violet-300 dark:border-violet-500/50 text-violet-700 dark:text-violet-300' : 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-700 dark:text-gray-300 hover:border-violet-200 dark:hover:border-violet-500/30'}`}>
                <div className="font-medium">{p.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{p.description}</div>
              </button>
            ))}
          </div>
        </div>
        <div className="p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Generated Regex</span>
            <button onClick={copyRegex} className="flex items-center gap-1.5 text-sm text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300">
              {copied ? <><Check className="w-4 h-4" /> Copied</> : <><Copy className="w-4 h-4" /> Copy</>}
            </button>
          </div>
          <code className="block font-mono text-sm text-gray-900 dark:text-white break-all">{regex}</code>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Test your regex</label>
          <textarea value={testString} onChange={e => setTestString(e.target.value)} rows={4} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl font-mono text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500 resize-none" placeholder="Paste text to test against..." />
          {testString && (
            <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {matches.length > 0 ? (
                <span>Found <strong className="text-emerald-600 dark:text-emerald-400">{matches.length}</strong> match{matches.length !== 1 ? 'es' : ''}: {matches.map((m, i) => <code key={i} className="bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 px-1.5 py-0.5 rounded mx-0.5">{m}</code>)}</span>
              ) : (
                <span>No matches found</span>
              )}
            </div>
          )}
        </div>
      </div>
    </ToolLayout>
  )
}
