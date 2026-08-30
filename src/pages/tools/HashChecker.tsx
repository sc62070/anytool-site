import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { CheckCircle, Copy, Check } from 'lucide-react'

async function hashText(text: string, algorithm: string): Promise<string> {
  const buf = new TextEncoder().encode(text)
  const hashBuf = await crypto.subtle.digest(algorithm, buf)
  return Array.from(new Uint8Array(hashBuf)).map(b => b.toString(16).padStart(2, '0')).join('')
}

export default function HashChecker() {
  const [text, setText] = useState('Hello, World!')
  const [expectedHash, setExpectedHash] = useState('')
  const [algorithm, setAlgorithm] = useState('SHA-256')
  const [computed, setComputed] = useState('')
  const [match, setMatch] = useState<boolean | null>(null)
  const [copied, setCopied] = useState(false)

  const check = async () => {
    const h = await hashText(text, algorithm)
    setComputed(h)
    setMatch(expectedHash ? h.toLowerCase() === expectedHash.toLowerCase() : null)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(computed)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <ToolLayout title="Hash Checker" description="Verify text against MD5, SHA-1, or SHA-256 hashes." icon={CheckCircle}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Input Text</label>
          <textarea value={text} onChange={e => setText(e.target.value)} rows={4} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl font-mono text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500 resize-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Algorithm</label>
          <div className="flex gap-2">
            {['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'].map(a => (
              <button key={a} onClick={() => setAlgorithm(a)} className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${algorithm === a ? 'bg-violet-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700'}`}>{a}</button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Expected Hash (optional — to verify against)</label>
          <input type="text" value={expectedHash} onChange={e => setExpectedHash(e.target.value)} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl font-mono text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500" placeholder="Paste a hash to verify..." />
        </div>
        <button onClick={check} className="w-full py-3 bg-violet-600 text-white rounded-xl font-semibold hover:bg-violet-700 transition-colors">Compute Hash</button>
        {computed && (
          <div className="p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Computed {algorithm}</span>
              <button onClick={copyToClipboard} className="flex items-center gap-1.5 text-sm text-violet-600 dark:text-violet-400">
                {copied ? <><Check className="w-4 h-4" /> Copied</> : <><Copy className="w-4 h-4" /> Copy</>}
              </button>
            </div>
            <code className="font-mono text-sm text-gray-900 dark:text-white break-all">{computed}</code>
            {match !== null && (
              <div className={`mt-3 p-2 rounded-lg text-sm font-medium text-center ${match ? 'bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300' : 'bg-red-100 dark:bg-red-500/10 text-red-700 dark:text-red-300'}`}>
                {match ? 'Hash matches!' : 'Hash does NOT match'}
              </div>
            )}
          </div>
        )}
      </div>
    </ToolLayout>
  )
}
