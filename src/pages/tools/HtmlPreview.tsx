import { useState, useRef } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { Code, Copy, Check } from 'lucide-react'

export default function HtmlPreview() {
  const [html, setHtml] = useState(`<div style="font-family: sans-serif; padding: 20px;">
  <h1 style="color: #7c3aed;">Hello World</h1>
  <p>This is a live HTML preview. Edit the code on the left!</p>
  <button style="background: #7c3aed; color: white; padding: 10px 20px; border: none; border-radius: 8px; cursor: pointer;">
    Click Me
  </button>
</div>`)
  const [copied, setCopied] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const updatePreview = () => {
    if (!iframeRef.current) return
    const doc = iframeRef.current.contentDocument
    if (!doc) return
    doc.open()
    doc.write(`
      <!DOCTYPE html>
      <html><head><style>body{margin:0;font-family:system-ui,-apple-system,sans-serif;}</style></head>
      <body>${html}</body></html>
    `)
    doc.close()
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(html)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const srcDoc = `<!DOCTYPE html><html><head><style>body{margin:0;font-family:system-ui,-apple-system,sans-serif;}</style></head><body>${html}</body></html>`

  return (
    <ToolLayout title="HTML Preview" description="Write HTML and see live rendered output." icon={Code}>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">HTML Code</span>
          <button onClick={copyToClipboard} className="flex items-center gap-1.5 text-sm text-violet-600 dark:text-violet-400">
            {copied ? <><Check className="w-4 h-4" /> Copied</> : <><Copy className="w-4 h-4" /> Copy</>}
          </button>
        </div>
        <textarea value={html} onChange={e => { setHtml(e.target.value); updatePreview() }} rows={12} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl font-mono text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500 resize-none" />
        <div>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Preview</span>
          <div className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden bg-white">
            <iframe ref={iframeRef} srcDoc={srcDoc} className="w-full h-80" sandbox="allow-scripts" title="HTML Preview" />
          </div>
        </div>
      </div>
    </ToolLayout>
  )
}
