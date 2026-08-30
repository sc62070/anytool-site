import { useState, useMemo } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { ListFilter, Copy, Check } from 'lucide-react'

export default function WordFrequency() {
  const [input, setInput] = useState('The quick brown fox jumps over the lazy dog. The dog barked at the fox, but the fox ran away.')
  const [minLength, setMinLength] = useState(3)
  const [copied, setCopied] = useState(false)

  const frequencies = useMemo(() => {
    const words = input.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(w => w.length >= minLength)
    const map = new Map<string, number>()
    for (const w of words) map.set(w, (map.get(w) || 0) + 1)
    return Array.from(map.entries()).sort((a, b) => b[1] - a[1])
  }, [input, minLength])

  const maxCount = frequencies[0]?.[1] || 1

  const copyToClipboard = () => {
    const text = frequencies.map(([word, count]) => `${word}: ${count}`).join('\n')
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <ToolLayout title="Word Frequency Counter" description="Count how often each word appears in your text." icon={ListFilter}>
      <div className="space-y-4">
        <textarea value={input} onChange={e => setInput(e.target.value)} rows={6} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500 resize-none" placeholder="Paste your text here..." />
        <div className="flex items-center gap-4">
          <label className="text-sm text-gray-600 dark:text-gray-400">Min word length: {minLength}</label>
          <input type="range" min={1} max={10} value={minLength} onChange={e => setMinLength(Number(e.target.value))} className="flex-1" />
        </div>
        <div className="p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{frequencies.length} unique words</span>
            <button onClick={copyToClipboard} className="flex items-center gap-1.5 text-sm text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300">
              {copied ? <><Check className="w-4 h-4" /> Copied</> : <><Copy className="w-4 h-4" /> Copy</>}
            </button>
          </div>
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {frequencies.map(([word, count]) => (
              <div key={word} className="flex items-center gap-3">
                <span className="w-24 text-sm font-mono text-gray-900 dark:text-white truncate">{word}</span>
                <div className="flex-1 h-5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full transition-all" style={{ width: `${(count / maxCount) * 100}%` }} />
                </div>
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-8 text-right">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ToolLayout>
  )
}
