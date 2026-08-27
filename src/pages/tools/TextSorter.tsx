import { useState } from 'react'
import { ArrowUpDown, Copy, Check } from 'lucide-react'
import ToolLayout from '../../components/ToolLayout'

export default function TextSorter() {
  const [input, setInput] = useState('')
  const [order, setOrder] = useState<'asc' | 'desc'>('asc')
  const [copied, setCopied] = useState(false)
  const [removeEmpty, setRemoveEmpty] = useState(true)

  const lines = input.split('\n')
  const filtered = removeEmpty ? lines.filter(l => l.trim()) : lines
  const sorted = [...filtered].sort((a, b) => order === 'asc' ? a.localeCompare(b) : b.localeCompare(a))
  const output = sorted.join('\n')
  const copy = () => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000) }

  return (
    <ToolLayout title="Text Sorter" description="Sort lines of text alphabetically or in reverse." icon={ArrowUpDown}>
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Enter text (one item per line)..." className="w-full h-48 p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm font-mono resize-y focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none text-gray-900 dark:text-white placeholder:text-gray-400" />
      <div className="flex gap-3 mt-3">
        <button onClick={() => setOrder('asc')} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${order === 'asc' ? 'bg-violet-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700'}`}>A → Z</button>
        <button onClick={() => setOrder('desc')} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${order === 'desc' ? 'bg-violet-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700'}`}>Z → A</button>
        <label className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"><input type="checkbox" checked={removeEmpty} onChange={e => setRemoveEmpty(e.target.checked)} className="rounded" /> Remove empty lines</label>
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
