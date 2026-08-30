import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { Table, Copy, Check } from 'lucide-react'

type Style = 'simple' | 'double' | 'rounded' | 'bold' | 'heavy'

const styles: Record<Style, { h: string; v: string; tl: string; tr: string; bl: string; br: string; ml: string; mr: string; ht: string; hb: string }> = {
  simple: { h: '─', v: '│', tl: '┌', tr: '┐', bl: '└', br: '┘', ml: '├', mr: '┤', ht: '┬', hb: '┴' },
  double: { h: '═', v: '║', tl: '╔', tr: '╗', bl: '╚', br: '╝', ml: '╠', mr: '╣', ht: '╦', hb: '╩' },
  rounded: { h: '─', v: '│', tl: '╭', tr: '╮', bl: '╰', br: '╯', ml: '├', mr: '┤', ht: '┬', hb: '┴' },
  bold: { h: '━', v: '┃', tl: '┏', tr: '┓', bl: '┗', br: '┛', ml: '┣', mr: '┫', ht: '┳', hb: '┻' },
  heavy: { h: '▬', v: '▐', tl: '◥', tr: '◤', bl: '◣', br: '◢', ml: '│', mr: '│', ht: '─', hb: '─' },
}

export default function AsciiTable() {
  const [headers, setHeaders] = useState('Name|Age|City')
  const [rows, setRows] = useState('Alice|30|NYC\nBob|25|LA\nCharlie|35|Chicago')
  const [style, setStyle] = useState<Style>('simple')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)

  const generate = () => {
    const s = styles[style]
    const h = headers.split('|').map(x => x.trim())
    const r = rows.split('\n').filter(Boolean).map(row => row.split('|').map(x => x.trim()))
    const widths = h.map((_, i) => Math.max(h[i].length, ...r.map(row => (row[i] || '').length)))

    const line = (l: string, m: string, r2: string, f: string) => l + widths.map(w => f.repeat(w + 2)).join(m) + r2
    const row = (cells: string[]) => s.v + ' ' + cells.map((c, i) => c.padEnd(widths[i])).join(' ' + s.v + ' ') + ' ' + s.v

    const lines = [
      line(s.tl, s.ht, s.tr, s.h),
      row(h),
      line(s.ml, s.ht, s.mr, s.h),
      ...r.map(cells => row(cells)),
      line(s.bl, s.hb, s.br, s.h),
    ]
    setOutput(lines.join('\n'))
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <ToolLayout title="ASCII Table Generator" description="Generate ASCII art tables from data." icon={Table}>
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
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Style</label>
          <div className="flex flex-wrap gap-2">
            {Object.keys(styles).map(s => (
              <button key={s} onClick={() => setStyle(s as Style)} className={`px-3 py-1.5 rounded-lg text-sm font-medium capitalize transition-all ${style === s ? 'bg-violet-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700'}`}>{s}</button>
            ))}
          </div>
        </div>
        <button onClick={generate} className="w-full py-3 bg-violet-600 text-white rounded-xl font-semibold hover:bg-violet-700 transition-colors flex items-center justify-center gap-2"><Table className="w-5 h-5" /> Generate Table</button>
        {output && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">ASCII Table</label>
              <button onClick={copyToClipboard} className="flex items-center gap-1.5 text-sm text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300">
                {copied ? <><Check className="w-4 h-4" /> Copied</> : <><Copy className="w-4 h-4" /> Copy</>}
              </button>
            </div>
            <pre className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl font-mono text-sm text-gray-900 dark:text-white overflow-auto max-h-96 whitespace-pre">{output}</pre>
          </div>
        )}
      </div>
    </ToolLayout>
  )
}
