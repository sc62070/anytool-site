import { useState } from 'react'
import { Copy, Check, Trash2 } from 'lucide-react'
import ToolLayout from '../../components/ToolLayout'

export default function RemoveDuplicates() {
  const [input, setInput] = useState('')
  const [copied, setCopied] = useState(false)
  const [caseSensitive, setCaseSensitive] = useState(false)
  const lines = input.split('\n')
  const seen = new Set<string>()
  const unique = lines.filter(l => { const key = caseSensitive ? l : l.toLowerCase(); if (seen.has(key)) return false; seen.add(key); return true })
  const output = unique.join('\n')
  const copy = () => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000) }
  const removed = lines.length - unique.length

  return (
    <ToolLayout title="Remove Duplicate Lines" description="Remove duplicate lines from text." icon={Trash2}>
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Paste text with duplicates..." className="w-full h-48 p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm font-mono resize-y focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none text-gray-900 dark:text-white placeholder:text-gray-400" />
      <div className="flex items-center gap-3 mt-3">
        <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"><input type="checkbox" checked={caseSensitive} onChange={e => setCaseSensitive(e.target.checked)} className="rounded" /> Case sensitive</label>
        {input && <span className="text-sm text-gray-500 dark:text-gray-400">{removed} duplicate{removed !== 1 ? 's' : ''} removed</span>}
      </div>
      {output && (
        <div className="mt-4 relative">
          <pre className="p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm font-mono overflow-auto max-h-64 text-gray-900 dark:text-white whitespace-pre-wrap">{output}</pre>
          <button onClick={copy} className="absolute top-3 right-3 p-2 text-gray-400 hover:text-violet-600">{copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}</button>
        </div>
      )}
    </ToolLayout>
  )
}
