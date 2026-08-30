import { useState, useMemo } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { Table, ArrowUpDown } from 'lucide-react'

export default function CsvViewer() {
  const [input, setInput] = useState('Name,Age,City,Score\nAlice,30,NYC,92\nBob,25,LA,87\nCharlie,35,Chicago,95\nDiana,28,Miami,88')
  const [sortCol, setSortCol] = useState<number | null>(null)
  const [sortAsc, setSortAsc] = useState(true)
  const [filter, setFilter] = useState('')

  const parsed = useMemo(() => {
    const lines = input.trim().split('\n').filter(Boolean)
    if (lines.length === 0) return { headers: [], rows: [] }
    const headers = lines[0].split(',').map(h => h.trim())
    const rows = lines.slice(1).map(line => line.split(',').map(c => c.trim()))
    return { headers, rows }
  }, [input])

  const filtered = useMemo(() => {
    let rows = [...parsed.rows]
    if (filter) {
      const q = filter.toLowerCase()
      rows = rows.filter(row => row.some(cell => cell.toLowerCase().includes(q)))
    }
    if (sortCol !== null) {
      rows.sort((a, b) => {
        const va = a[sortCol] || ''
        const vb = b[sortCol] || ''
        const na = parseFloat(va), nb = parseFloat(vb)
        if (!isNaN(na) && !isNaN(nb)) return sortAsc ? na - nb : nb - na
        return sortAsc ? va.localeCompare(vb) : vb.localeCompare(va)
      })
    }
    return rows
  }, [parsed, sortCol, sortAsc, filter])

  const toggleSort = (i: number) => {
    if (sortCol === i) setSortAsc(!sortAsc)
    else { setSortCol(i); setSortAsc(true) }
  }

  return (
    <ToolLayout title="CSV Viewer" description="View CSV data as a sortable, filterable table." icon={Table}>
      <div className="space-y-4">
        <textarea value={input} onChange={e => setInput(e.target.value)} rows={6} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl font-mono text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500 resize-none" placeholder="Paste CSV data..." />
        <input type="text" value={filter} onChange={e => setFilter(e.target.value)} className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500" placeholder="Filter rows..." />
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr>
                {parsed.headers.map((h, i) => (
                  <th key={i} onClick={() => toggleSort(i)} className="text-left px-4 py-2 bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 font-medium text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors">
                    <span className="flex items-center gap-1">{h} <ArrowUpDown className="w-3 h-3 opacity-50" /></span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((row, ri) => (
                <tr key={ri} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-4 py-2 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">{filtered.length} rows × {parsed.headers.length} columns</p>
      </div>
    </ToolLayout>
  )
}
