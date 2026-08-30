import { useState, useMemo } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { Rows3 } from 'lucide-react'

export default function SpreadsheetPreview() {
  const [input, setInput] = useState('Name,Age,City,Score\nAlice,30,NYC,92\nBob,25,LA,87\nCharlie,35,Chicago,95\nDiana,28,Miami,88')
  const [delimiter, setDelimiter] = useState(',')
  const [hasHeader, setHasHeader] = useState(true)

  const data = useMemo(() => {
    const lines = input.trim().split('\n').filter(Boolean)
    if (lines.length === 0) return { headers: [] as string[], rows: [] as string[][] }
    const parse = (line: string) => line.split(delimiter).map(c => c.trim())
    if (hasHeader) return { headers: parse(lines[0]), rows: lines.slice(1).map(parse) }
    return { headers: Array.from({ length: parse(lines[0]).length }, (_, i) => `Column ${i + 1}`), rows: lines.map(parse) }
  }, [input, delimiter, hasHeader])

  const colWidths = useMemo(() => {
    return data.headers.map((h, i) => {
      const max = Math.max(h.length, ...data.rows.map(r => (r[i] || '').length))
      return Math.min(Math.max(max * 8 + 24, 80), 200)
    })
  }, [data])

  return (
    <ToolLayout title="Spreadsheet Preview" description="Preview CSV/TSV data as a styled spreadsheet." icon={Rows3}>
      <div className="space-y-4">
        <textarea value={input} onChange={e => setInput(e.target.value)} rows={6} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl font-mono text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500 resize-none" placeholder="Paste CSV or TSV data..." />
        <div className="flex gap-4 items-center">
          <select value={delimiter} onChange={e => setDelimiter(e.target.value)} className="px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-sm text-gray-900 dark:text-white outline-none">
            <option value=",">Comma (,)</option>
            <option value="\t">Tab</option>
            <option value=";">Semicolon (;)</option>
            <option value="|">Pipe (|)</option>
          </select>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={hasHeader} onChange={e => setHasHeader(e.target.checked)} className="w-4 h-4 rounded border-gray-300 text-violet-600 focus:ring-violet-500" />
            <span className="text-sm text-gray-700 dark:text-gray-300">First row is header</span>
          </label>
          <span className="text-xs text-gray-500 dark:text-gray-400 ml-auto">{data.rows.length} rows × {data.headers.length} cols</span>
        </div>

        <div className="overflow-x-auto border border-gray-200 dark:border-gray-800 rounded-xl">
          <table className="text-sm" style={{ minWidth: '100%' }}>
            <thead>
              <tr>
                <th className="sticky left-0 bg-gray-100 dark:bg-gray-800 px-3 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 border-b border-r border-gray-200 dark:border-gray-700 w-10">#</th>
                {data.headers.map((h, i) => (
                  <th key={i} className="px-3 py-2 text-left font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 border-b border-r border-gray-200 dark:border-gray-700" style={{ minWidth: colWidths[i] }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.rows.map((row, ri) => (
                <tr key={ri} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  <td className="sticky left-0 bg-gray-50 dark:bg-gray-900 px-3 py-2 text-xs text-gray-400 border-r border-b border-gray-200 dark:border-gray-700">{ri + 1}</td>
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-3 py-2 text-gray-900 dark:text-white border-b border-r border-gray-200 dark:border-gray-700 whitespace-nowrap">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ToolLayout>
  )
}
