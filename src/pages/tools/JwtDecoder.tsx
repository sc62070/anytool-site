import { useState } from 'react'
import { Key, AlertTriangle } from 'lucide-react'
import ToolLayout from '../../components/ToolLayout'

export default function JwtDecoder() {
  const [token, setToken] = useState('')
  const [header, setHeader] = useState('')
  const [payload, setPayload] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState('')

  const decode = () => {
    setError('')
    try {
      const parts = token.trim().split('.')
      if (parts.length < 2) throw new Error('Invalid JWT format')
      setHeader(JSON.stringify(JSON.parse(atob(parts[0].replace(/-/g, '+').replace(/_/g, '/'))), null, 2))
      setPayload(JSON.stringify(JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/'))), null, 2))
    } catch (e) { setError((e as Error).message); setHeader(''); setPayload('') }
  }

  const copy = (text: string, label: string) => { navigator.clipboard.writeText(text); setCopied(label); setTimeout(() => setCopied(''), 2000) }

  return (
    <ToolLayout title="JWT Decoder" description="Decode and inspect JSON Web Tokens (JWT)." icon={Key}>
      <textarea value={token} onChange={e => setToken(e.target.value)} placeholder="Paste your JWT token here..." className="w-full h-32 p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm font-mono resize-y focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none text-gray-900 dark:text-white placeholder:text-gray-400" />
      <button onClick={decode} className="mt-3 bg-violet-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-violet-700 transition-colors">Decode</button>
      {error && <div className="mt-3 flex items-center gap-2 text-red-600 bg-red-50 dark:bg-red-900/20 p-3 rounded-xl text-sm border border-red-200 dark:border-red-800/50"><AlertTriangle className="w-4 h-4" />{error}</div>}
      {(header || payload) && (
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div>
            <div className="flex items-center justify-between mb-2"><label className="text-sm font-medium text-gray-700 dark:text-gray-300">Header</label><button onClick={() => copy(header, 'h')} className="text-xs text-violet-600 dark:text-violet-400">{copied === 'h' ? 'Copied!' : 'Copy'}</button></div>
            <pre className="p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm font-mono overflow-auto text-gray-900 dark:text-white max-h-64">{header}</pre>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2"><label className="text-sm font-medium text-gray-700 dark:text-gray-300">Payload</label><button onClick={() => copy(payload, 'p')} className="text-xs text-violet-600 dark:text-violet-400">{copied === 'p' ? 'Copied!' : 'Copy'}</button></div>
            <pre className="p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm font-mono overflow-auto text-gray-900 dark:text-white max-h-64">{payload}</pre>
          </div>
        </div>
      )}
    </ToolLayout>
  )
}
