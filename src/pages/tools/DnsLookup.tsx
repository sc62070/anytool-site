import { useState } from 'react'
import { Globe, Search, Copy, Check, Loader2, AlertTriangle } from 'lucide-react'
import ToolLayout from '../../components/ToolLayout'

const RECORD_TYPES = ['A', 'AAAA', 'MX', 'NS', 'TXT'] as const
type RecordType = typeof RECORD_TYPES[number]

interface DnsAnswer {
  name: string
  type: number
  TTL: number
  data: string
}

export default function DnsLookup() {
  const [domain, setDomain] = useState('')
  const [results, setResults] = useState<Record<RecordType, DnsAnswer[]>>({
    A: [], AAAA: [], MX: [], NS: [], TXT: []
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [queried, setQueried] = useState(false)

  const typeMap: Record<RecordType, number> = { A: 1, AAAA: 28, MX: 15, NS: 2, TXT: 16 }

  const lookup = async () => {
    if (!domain.trim()) return
    setLoading(true)
    setError('')
    setQueried(true)
    const newResults: Record<RecordType, DnsAnswer[]> = { A: [], AAAA: [], MX: [], NS: [], TXT: [] }

    try {
      const promises = RECORD_TYPES.map(async (type) => {
        const res = await fetch(`https://dns.google/resolve?name=${domain.trim()}&type=${typeMap[type]}`)
        const data = await res.json()
        if (data.Answer) {
          newResults[type] = data.Answer.filter((a: DnsAnswer) => a.type === typeMap[type])
        }
      })
      await Promise.all(promises)
      setResults(newResults)
    } catch {
      setError('Failed to fetch DNS records. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const allRecords = RECORD_TYPES.flatMap(type =>
    results[type].map(r => `${r.name}\t${r.TTL}\t${r.data}`)
  ).join('\n')

  const handleCopy = () => {
    navigator.clipboard.writeText(allRecords)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const totalRecords = RECORD_TYPES.reduce((sum, type) => sum + results[type].length, 0)

  return (
    <ToolLayout title="DNS Lookup" description="Query DNS records for any domain using Google's DNS API." icon={Globe}>
      <div className="space-y-6">
        <div className="flex gap-3">
          <input
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && lookup()}
            placeholder="Enter domain (e.g. example.com)"
            className="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all text-gray-900 dark:text-white placeholder:text-gray-400"
          />
          <button
            onClick={lookup}
            disabled={loading || !domain.trim()}
            className="bg-violet-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-violet-700 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            Lookup
          </button>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-red-600 bg-red-50 dark:bg-red-900/20 p-3 rounded-xl text-sm border border-red-200 dark:border-red-800/50">
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            {error}
          </div>
        )}

        {queried && !loading && !error && (
          <>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Found {totalRecords} record{totalRecords !== 1 ? 's' : ''} for <span className="font-medium text-gray-700 dark:text-gray-200">{domain}</span>
              </p>
              {totalRecords > 0 && (
                <button onClick={handleCopy} className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-violet-400 transition-colors">
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied' : 'Copy All'}
                </button>
              )}
            </div>

            <div className="space-y-4">
              {RECORD_TYPES.map((type) => (
                results[type].length > 0 && (
                  <div key={type} className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-4 py-2.5 bg-gray-100 dark:bg-gray-800/50 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between">
                      <span className="text-sm font-semibold text-violet-600 dark:text-violet-400">{type} Records</span>
                      <span className="text-xs text-gray-400">{results[type].length}</span>
                    </div>
                    <div className="divide-y divide-gray-200 dark:divide-gray-800">
                      {results[type].map((record, i) => (
                        <div key={i} className="px-4 py-3 flex items-center justify-between text-sm">
                          <span className="font-mono text-gray-900 dark:text-white">{record.data}</span>
                          <span className="text-xs text-gray-400 ml-4 flex-shrink-0">TTL: {record.TTL}s</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              ))}
            </div>
          </>
        )}
      </div>
    </ToolLayout>
  )
}
