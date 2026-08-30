import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { Zap, Copy, Check, RefreshCw } from 'lucide-react'

const NAMESPACE_UUID = '6ba7b810-9dad-11d1-80b4-00c04fd430c8'

function sha1(data: Uint8Array): Promise<ArrayBuffer> {
  return crypto.subtle.digest('SHA-1', data.buffer as ArrayBuffer)
}

function bufToHex(buf: ArrayBuffer) {
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')
}

async function uuidV5(name: string, namespace: string): Promise<string> {
  const nsBytes = new Uint8Array(16)
  const nsHex = namespace.replace(/-/g, '')
  for (let i = 0; i < 16; i++) nsBytes[i] = parseInt(nsHex.substr(i * 2, 2), 16)

  const nameBytes = new TextEncoder().encode(name)
  const combined = new Uint8Array(16 + nameBytes.length)
  combined.set(nsBytes)
  combined.set(nameBytes, 16)

  const hash = await sha1(combined)
  const h = new Uint8Array(hash)
  h[6] = (h[6] & 0x0f) | 0x50
  h[8] = (h[8] & 0x3f) | 0x80

  const hex = bufToHex(h.buffer)
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`
}

export default function UuidV5() {
  const [namespace, setNamespace] = useState(NAMESPACE_UUID)
  const [name, setName] = useState('anytool.site')
  const [result, setResult] = useState('')
  const [copied, setCopied] = useState(false)

  const generate = async () => {
    const uuid = await uuidV5(name, namespace)
    setResult(uuid)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <ToolLayout title="UUID v5 Generator" description="Generate deterministic UUID v5 from namespace and name." icon={Zap}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Namespace UUID</label>
          <input type="text" value={namespace} onChange={e => setNamespace(e.target.value)} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl font-mono text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
          <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500" />
        </div>
        <button onClick={generate} className="w-full py-3 bg-violet-600 text-white rounded-xl font-semibold hover:bg-violet-700 transition-colors flex items-center justify-center gap-2">
          <RefreshCw className="w-5 h-5" /> Generate UUID v5
        </button>
        {result && (
          <div className="p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Result</span>
              <button onClick={copyToClipboard} className="flex items-center gap-1.5 text-sm text-violet-600 dark:text-violet-400">
                {copied ? <><Check className="w-4 h-4" /> Copied</> : <><Copy className="w-4 h-4" /> Copy</>}
              </button>
            </div>
            <code className="font-mono text-lg text-gray-900 dark:text-white">{result}</code>
          </div>
        )}
        <div className="p-3 bg-violet-50 dark:bg-violet-500/10 border border-violet-200 dark:border-violet-500/20 rounded-xl">
          <p className="text-sm text-violet-700 dark:text-violet-300"><strong>UUID v5</strong> is deterministic — same namespace + name always produces the same UUID. Use DNS, URL, or OID namespaces, or create your own.</p>
        </div>
      </div>
    </ToolLayout>
  )
}
