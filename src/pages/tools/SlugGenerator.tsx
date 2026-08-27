import { useState } from 'react'
import { Link2, Copy, Check } from 'lucide-react'
import ToolLayout from '../../components/ToolLayout'

export default function SlugGenerator() {
  const [input, setInput] = useState('')
  const [copied, setCopied] = useState(false)
  const slug = input.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
  const copy = () => { navigator.clipboard.writeText(slug); setCopied(true); setTimeout(() => setCopied(false), 2000) }

  return (
    <ToolLayout title="Slug Generator" description="Convert text to URL-friendly slugs." icon={Link2}>
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Enter text to convert to slug..." className="w-full h-32 p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm resize-y focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none text-gray-900 dark:text-white placeholder:text-gray-400" />
      {slug && (
        <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 flex items-center justify-between">
          <span className="font-mono text-sm text-gray-900 dark:text-white">{slug}</span>
          <button onClick={copy} className="flex items-center gap-2 text-sm text-violet-600 dark:text-violet-400 font-medium">{copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}{copied ? 'Copied!' : 'Copy'}</button>
        </div>
      )}
    </ToolLayout>
  )
}
