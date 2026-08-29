import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { Table, Copy, Check } from 'lucide-react'

export default function MarkdownTableGenerator() {
  const [headers, setHeaders] = useState('Name|Age|City')
  const [rows, setRows] = useState('Alice|30|NYC\nBob|25|LA\nCharlie|35|Chicago')
  const [align, setAlign] = useState<'left' | 'center' | 'right'>('left')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)

  const generate = () => {
    const h = headers.split('|').map(s => s.trim())
    const r = rows.split('\n').filter(Boolean).map(row => row.split('|').map(s => s.trim()))
    const sep = h.map(() => {
      if (align === 'center') return ':---:'
      if (align === 'right') return '---:'
      return '---'
    })
    const lines = [
      `| ${h.join(' | ')} |`,
      `| ${sep.join(' | ')} |`,
      ...r.map(row => `| ${row.join(' | ')} |`)
    ]
    setOutput(lines.join('\n'))
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <ToolLayout title="Markdown Table Generator" description="Generate Markdown tables from structured data." icon={Table}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Headers (separated by |)</label>
          <input type="text" value={headers} onChange={e => setHeaders(e.target.value)} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl font-mono text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Rows (one per line, separated by |)</label>
          <textarea value={rows} onChange={e => setRows(e.target.value)} rows={5} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl font-mono text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500 resize-none" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Column Alignment</label>
          <div className="flex gap-2">
            {(['left', 'center', 'right'] as const).map(a => (
              <button key={a} onClick={() => setAlign(a)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${align === a ? 'bg-violet-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700'}`}>{a}</button>
            ))}
          </div>
        </div>
        <button onClick={generate} className="w-full py-3 bg-violet-600 text-white rounded-xl font-semibold hover:bg-violet-700 transition-colors flex items-center justify-center gap-2"><Table className="w-5 h-5" /> Generate Table</button>
        {output && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Markdown Output</label>
              <button onClick={copyToClipboard} className="flex items-center gap-1.5 text-sm text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300">
                {copied ? <><Check className="w-4 h-4" /> Copied</> : <><Copy className="w-4 h-4" /> Copy</>}
              </button>
            </div>
            <pre className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl font-mono text-sm text-gray-900 dark:text-white overflow-auto max-h-96 whitespace-pre-wrap">{output}</pre>
          </div>
        )}
      </div>
    </ToolLayout>
  )
}
