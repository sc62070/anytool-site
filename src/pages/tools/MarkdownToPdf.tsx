import { useState, useCallback } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { FileOutput } from 'lucide-react'

export default function MarkdownToPdf() {
  const [input, setInput] = useState('# Hello World\n\nThis is a **bold** paragraph with `inline code`.\n\n## Section\n\n- Item 1\n- Item 2\n- Item 3\n\n> A blockquote for emphasis.\n\n```js\nconsole.log("Hello from Markdown!")\n```')

  const htmlToPdf = useCallback(() => {
    const html = input
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/^# (.*$)/gm, '<h1>$1</h1>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code style="background:#f3f4f6;padding:2px 6px;border-radius:4px;font-size:0.9em">$1</code>')
      .replace(/^> (.*$)/gm, '<blockquote style="border-left:3px solid #8b5cf6;padding-left:12px;color:#6b7280;margin:12px 0">$1</blockquote>')
      .replace(/^- (.*$)/gm, '<li>$1</li>')
      .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
      .replace(/^```[\s\S]*?```/gm, (m) => `<pre style="background:#1e1e2e;color:#cdd6f4;padding:16px;border-radius:8px;overflow-x:auto;font-size:0.875em"><code>${m.replace(/```\w*\n?/g, '').replace(/```$/g, '')}</code></pre>`)
      .replace(/\n\n/g, '<br/><br/>')

    const fullHtml = `<!DOCTYPE html><html><head><meta charset="utf-8"/><title>Markdown Document</title><style>body{font-family:system-ui,-apple-system,sans-serif;max-width:800px;margin:40px auto;padding:0 20px;line-height:1.7;color:#1f2937}h1{font-size:2em;border-bottom:2px solid #e5e7eb;padding-bottom:8px}h2{font-size:1.5em;margin-top:2em}h3{font-size:1.25em}code{font-family:monospace}pre{margin:16px 0}blockquote{margin:16px 0}ul{margin:8px 0;padding-left:24px}li{margin:4px 0}</style></head><body>${html}</body></html>`
    const blob = new Blob([fullHtml], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    const win = window.open(url, '_blank')
    if (win) {
      win.onload = () => { win.print(); URL.revokeObjectURL(url) }
    }
  }, [input])

  return (
    <ToolLayout title="Markdown to PDF" description="Convert Markdown to a downloadable PDF file." icon={FileOutput}>
      <div className="space-y-4">
        <textarea value={input} onChange={e => setInput(e.target.value)} rows={15} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl font-mono text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500 resize-none" placeholder="Write your Markdown here..." />
        <button onClick={htmlToPdf} className="w-full py-3 bg-violet-600 text-white rounded-xl font-semibold hover:bg-violet-700 transition-colors">Open Print Dialog (Save as PDF)</button>
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">Opens a print-ready view. Use your browser's "Save as PDF" option.</p>
      </div>
    </ToolLayout>
  )
}
