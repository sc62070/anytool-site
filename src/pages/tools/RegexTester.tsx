import { useState } from 'react'
import { Code, Copy, Check } from 'lucide-react'
import ToolLayout from '../../components/ToolLayout'

export default function RegexTester() {
  const [pattern, setPattern] = useState('')
  const [flags, setFlags] = useState('g')
  const [testString, setTestString] = useState('')
  const [copied, setCopied] = useState(false)

  let matches: { match: string; index: number; groups: string[] }[] = []
  let error = ''

  if (pattern) {
    try {
      const regex = new RegExp(pattern, flags)
      let m
      const seen = new Set<string>()
      while ((m = regex.exec(testString)) !== null) {
        const key = `${m.index}:${m[0]}`
        if (seen.has(key)) break
        seen.add(key)
        matches.push({ match: m[0], index: m.index, groups: m.slice(1) })
        if (!flags.includes('g')) break
      }
    } catch (e: any) {
      error = e.message
    }
  }

  const copyPattern = () => {
    navigator.clipboard.writeText(pattern)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const highlighted = (() => {
    if (!pattern || error || matches.length === 0) return null
    try {
      const regex = new RegExp(pattern, flags.includes('g') ? flags : flags + 'g')
      const parts: { text: string; highlight: boolean }[] = []
      let lastIndex = 0
      let m
      const seen = new Set<number>()
      while ((m = regex.exec(testString)) !== null) {
        if (seen.has(m.index)) break
        seen.add(m.index)
        if (m.index > lastIndex) parts.push({ text: testString.slice(lastIndex, m.index), highlight: false })
        parts.push({ text: m[0], highlight: true })
        lastIndex = m.index + m[0].length
      }
      if (lastIndex < testString.length) parts.push({ text: testString.slice(lastIndex), highlight: false })
      return parts
    } catch {
      return null
    }
  })()

  return (
    <ToolLayout title="Regex Tester" description="Test regular expressions with live matching and highlighting." icon={Code} info="Our free online regex tester helps you test and debug regular expressions with live matching and syntax highlighting. Enter your pattern and test string to see matches instantly. Perfect for developers and data analysts who work with regex patterns.">

      <div className="space-y-4">
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Pattern</label>
            <input type="text" value={pattern} onChange={(e) => setPattern(e.target.value)} placeholder="Enter regex pattern..." className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl font-mono" />
          </div>
          <div className="w-24">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Flags</label>
            <input type="text" value={flags} onChange={(e) => setFlags(e.target.value)} className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl font-mono" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Test string</label>
          <textarea value={testString} onChange={(e) => setTestString(e.target.value)} placeholder="Enter text to test against..." className="w-full h-32 p-3 border border-gray-300 dark:border-gray-600 rounded-xl font-mono text-sm" />
        </div>
      </div>

      {error && <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm">{error}</div>}

      {pattern && !error && (
        <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          {matches.length} match{matches.length !== 1 ? 'es' : ''} found
        </div>
      )}

      {highlighted && (
        <div className="mt-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Highlighted</div>
          <div className="font-mono text-sm whitespace-pre-wrap">
            {highlighted.map((part, i) => (
              <span key={i} className={part.highlight ? 'bg-yellow-200 px-0.5 rounded' : ''}>{part.text}</span>
            ))}
          </div>
        </div>
      )}

      {matches.length > 0 && (
        <div className="mt-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Matches</span>
            <button onClick={copyPattern} className="flex items-center gap-1 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700">
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied!' : 'Copy Pattern'}
            </button>
          </div>
          <div className="space-y-2 max-h-64 overflow-auto">
            {matches.map((m, i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                <span className="text-gray-400 w-8">#{i + 1}</span>
                <code className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded font-mono">{m.match}</code>
                <span className="text-gray-400">index: {m.index}</span>
                {m.groups.length > 0 && (
                  <span className="text-gray-500">groups: {m.groups.map((g, j) => <code key={j} className="bg-gray-100 dark:bg-gray-700 px-1 rounded mx-1">{g}</code>)}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </ToolLayout>
  )
}
