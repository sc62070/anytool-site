import { useState } from 'react'
import { Activity, Search, Loader2, AlertTriangle, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
import ToolLayout from '../../components/ToolLayout'

interface StatusInfo {
  code: number
  text: string
  ok: boolean
}

function getStatusColor(code: number) {
  if (code >= 200 && code < 300) return 'text-green-600 dark:text-green-400'
  if (code >= 300 && code < 400) return 'text-yellow-600 dark:text-yellow-400'
  if (code >= 400 && code < 500) return 'text-orange-600 dark:text-orange-400'
  if (code >= 500) return 'text-red-600 dark:text-red-400'
  return 'text-gray-600 dark:text-gray-400'
}

function getStatusBg(code: number) {
  if (code >= 200 && code < 300) return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800/50'
  if (code >= 300 && code < 400) return 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800/50'
  if (code >= 400 && code < 500) return 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800/50'
  if (code >= 500) return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800/50'
  return 'bg-gray-50 dark:bg-gray-900/20 border-gray-200 dark:border-gray-800/50'
}

function getStatusIcon(code: number) {
  if (code >= 200 && code < 300) return CheckCircle
  if (code >= 400 || code >= 500) return XCircle
  return AlertCircle
}

export default function HttpStatusChecker() {
  const [url, setUrl] = useState('')
  const [status, setStatus] = useState<StatusInfo | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [responseTime, setResponseTime] = useState<number | null>(null)

  const checkStatus = async () => {
    if (!url.trim()) return
    setLoading(true)
    setError('')
    setStatus(null)
    setResponseTime(null)

    let targetUrl = url.trim()
    if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
      targetUrl = 'https://' + targetUrl
    }

    const start = performance.now()
    try {
      const res = await fetch(targetUrl, { method: 'HEAD', mode: 'no-cors' })
      setResponseTime(Math.round(performance.now() - start))
      setStatus({ code: res.status, text: res.statusText || (res.type === 'opaque' ? 'Opaque Response (CORS)' : 'OK'), ok: res.ok })
    } catch {
      setResponseTime(Math.round(performance.now() - start))
      setError('Failed to connect. The URL may be invalid, down, or blocked by CORS.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <ToolLayout title="HTTP Status Checker" description="Check the HTTP status code of any URL." icon={Activity}>
      <div className="space-y-6">
        <div className="flex gap-3">
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && checkStatus()}
            placeholder="Enter URL (e.g. https://example.com)"
            className="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all text-gray-900 dark:text-white placeholder:text-gray-400"
          />
          <button
            onClick={checkStatus}
            disabled={loading || !url.trim()}
            className="bg-violet-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-violet-700 transition-colors flex items-center gap-2 disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            Check
          </button>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-red-600 bg-red-50 dark:bg-red-900/20 p-3 rounded-xl text-sm border border-red-200 dark:border-red-800/50">
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            {error}
          </div>
        )}

        {status && (
          <div className={`border rounded-xl p-6 ${getStatusBg(status.code)}`}>
            <div className="flex items-center gap-4">
              {(() => {
                const StatusIcon = getStatusIcon(status.code)
                return <StatusIcon className={`w-10 h-10 ${getStatusColor(status.code)}`} />
              })()}
              <div>
                <div className={`text-4xl font-bold font-mono ${getStatusColor(status.code)}`}>
                  {status.code}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">{status.text}</div>
              </div>
              <div className="ml-auto text-right">
                <div className="text-sm text-gray-500 dark:text-gray-400">Response Time</div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white">{responseTime}ms</div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200/50 dark:border-gray-700/50">
              <div className="text-xs text-gray-500 dark:text-gray-400 font-mono break-all">{url}</div>
            </div>
          </div>
        )}

        <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status Code Reference</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-gray-600 dark:text-gray-400">2xx Success</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-yellow-500" />
              <span className="text-gray-600 dark:text-gray-400">3xx Redirect</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-orange-500" />
              <span className="text-gray-600 dark:text-gray-400">4xx Client Error</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <span className="text-gray-600 dark:text-gray-400">5xx Server Error</span>
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  )
}
