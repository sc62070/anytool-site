import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { Wifi, Search, CheckCircle, XCircle, Loader } from 'lucide-react'

const COMMON_PORTS = [
  { port: 21, name: 'FTP' },
  { port: 22, name: 'SSH' },
  { port: 23, name: 'Telnet' },
  { port: 25, name: 'SMTP' },
  { port: 53, name: 'DNS' },
  { port: 80, name: 'HTTP' },
  { port: 110, name: 'POP3' },
  { port: 143, name: 'IMAP' },
  { port: 443, name: 'HTTPS' },
  { port: 445, name: 'SMB' },
  { port: 3306, name: 'MySQL' },
  { port: 3389, name: 'RDP' },
  { port: 5432, name: 'PostgreSQL' },
  { port: 8080, name: 'HTTP Alt' },
  { port: 8443, name: 'HTTPS Alt' },
]

interface PortResult {
  port: number
  name: string
  status: 'open' | 'closed' | 'checking'
}

export default function PortScanner() {
  const [host, setHost] = useState('example.com')
  const [results, setResults] = useState<PortResult[]>([])
  const [scanning, setScanning] = useState(false)

  const scan = async () => {
    setScanning(true)
    const res: PortResult[] = COMMON_PORTS.map(p => ({ ...p, status: 'checking' }))
    setResults(res)

    for (let i = 0; i < COMMON_PORTS.length; i++) {
      const port = COMMON_PORTS[i]
      try {
        const ctrl = new AbortController()
        const timeout = setTimeout(() => ctrl.abort(), 2000)
        const protocol = port.port === 443 || port.port === 8443 ? 'https' : 'http'
        await fetch(`${protocol}://${host}:${port.port}`, { mode: 'no-cors', signal: ctrl.signal })
        clearTimeout(timeout)
        res[i] = { ...res[i], status: 'open' }
      } catch {
        res[i] = { ...res[i], status: 'closed' }
      }
      setResults([...res])
    }
    setScanning(false)
  }

  const openCount = results.filter(r => r.status === 'open').length
  const closedCount = results.filter(r => r.status === 'closed').length

  return (
    <ToolLayout title="Port Scanner" description="Check common ports on any domain." icon={Wifi}>
      <div className="space-y-6">
        <div className="flex gap-2">
          <input type="text" value={host} onChange={e => setHost(e.target.value)} className="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500 font-mono" placeholder="e.g. example.com" onKeyDown={e => e.key === 'Enter' && scan()} />
          <button onClick={scan} disabled={scanning} className="px-6 py-3 bg-violet-600 text-white rounded-xl font-semibold hover:bg-violet-700 transition-colors flex items-center gap-2 disabled:opacity-50">
            {scanning ? <Loader className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
            {scanning ? 'Scanning...' : 'Scan'}
          </button>
        </div>

        {results.length > 0 && (
          <>
            <div className="flex gap-4 text-sm">
              <span className="text-emerald-600 dark:text-emerald-400 font-medium">{openCount} open</span>
              <span className="text-red-500 font-medium">{closedCount} closed</span>
              <span className="text-gray-400">{results.length - openCount - closedCount} pending</span>
            </div>

            <div className="space-y-2">
              {results.map((r, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm font-bold text-gray-900 dark:text-white w-14">{r.port}</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">{r.name}</span>
                  </div>
                  {r.status === 'checking' && <Loader className="w-4 h-4 text-gray-400 animate-spin" />}
                  {r.status === 'open' && <CheckCircle className="w-4 h-4 text-emerald-500" />}
                  {r.status === 'closed' && <XCircle className="w-4 h-4 text-red-400" />}
                </div>
              ))}
            </div>
          </>
        )}

        <div className="p-3 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-xl">
          <p className="text-sm text-amber-700 dark:text-amber-300"><strong>Note:</strong> This scans common ports using browser fetch. Results may vary due to CORS restrictions. For accurate results, use a server-side scanner like nmap.</p>
        </div>
      </div>
    </ToolLayout>
  )
}
