import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { Code, Copy, Check, ArrowLeftRight } from 'lucide-react'

const entities: Record<string, string> = {
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  '/': '&#x2F;', '`': '&#x60;', '=': '&#x3D;',
}

const reverseEntities: Record<string, string> = Object.fromEntries(Object.entries(entities).map(([k, v]) => [v, k]))

export default function HtmlEntity() {
  const [input, setInput] = useState('Hello & <World> "quotes" and \'apostrophes\'')
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')
  const [copied, setCopied] = useState(false)

  const output = mode === 'encode'
    ? input.replace(/[&<>"'`/]/g, c => entities[c] || c)
    : input.replace(/&amp;|&lt;|&gt;|&quot;|&#39;|&#x60;|&#x2F;|&#x3D;/g, c => reverseEntities[c] || c)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <ToolLayout title="HTML Entity Encoder" description="Encode and decode HTML entities like &amp; and &lt;." icon={Code}>
      <div className="space-y-4">
        <div className="flex gap-2">
          <button onClick={() => setMode('encode')} className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${mode === 'encode' ? 'bg-violet-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700'}`}>Encode</button>
          <button onClick={() => setMode('decode')} className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${mode === 'decode' ? 'bg-violet-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700'}`}>Decode</button>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Input</label>
          <textarea value={input} onChange={e => setInput(e.target.value)} rows={5} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl font-mono text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500 resize-none" />
        </div>
        <div className="flex items-center justify-center text-gray-400"><ArrowLeftRight className="w-5 h-5" /></div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Output</label>
            <button onClick={copyToClipboard} className="flex items-center gap-1.5 text-sm text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300">
              {copied ? <><Check className="w-4 h-4" /> Copied</> : <><Copy className="w-4 h-4" /> Copy</>}
            </button>
          </div>
          <pre className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl font-mono text-sm text-gray-900 dark:text-white overflow-auto max-h-48 whitespace-pre-wrap">{output}</pre>
        </div>
        <div className="p-3 bg-violet-50 dark:bg-violet-500/10 border border-violet-200 dark:border-violet-500/20 rounded-xl">
          <p className="text-sm text-violet-700 dark:text-violet-300"><strong>Common entities:</strong> &amp;amp; &amp;lt; &amp;gt; &amp;quot; &amp;#39; &amp;#x2F; &amp;#x60; &amp;#x3D;</p>
        </div>
      </div>
    </ToolLayout>
  )
}
