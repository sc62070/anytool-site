import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { FileCode, Copy, Check } from 'lucide-react'

function htmlToJsx(html: string): string {
  let jsx = html
  jsx = jsx.replace(/class="/g, 'className="')
  jsx = jsx.replace(/for="/g, 'htmlFor="')
  jsx = jsx.replace(/tabindex=/g, 'tabIndex=')
  jsx = jsx.replace(/readonly/g, 'readOnly')
  jsx = jsx.replace(/maxlength=/g, 'maxLength=')
  jsx = jsx.replace(/minlength=/g, 'minLength=')
  jsx = jsx.replace(/cellpadding=/g, 'cellPadding=')
  jsx = jsx.replace(/cellspacing=/g, 'cellSpacing=')
  jsx = jsx.replace(/colspan=/g, 'colSpan=')
  jsx = jsx.replace(/rowspan=/g, 'rowSpan=')
  jsx = jsx.replace(/crossorigin=/g, 'crossOrigin=')
  jsx = jsx.replace(/srcdoc=/g, 'srcDoc=')
  jsx = jsx.replace(/ frameborder="0"/g, ' frameBorder="0"')
  jsx = jsx.replace(/<(img|br|hr|input|meta|link)([^>]*?)\/?>/g, '<$1$2 />')
  jsx = jsx.replace(/<!--[\s\S]*?-->/g, '{/* $& */}')
  jsx = jsx.replace(/style="([^"]*)"/g, (_m, styles) => {
    const obj = styles.split(';').filter(Boolean).map((s: string) => {
      const [key, val] = s.split(':').map((p: string) => p.trim())
      const camel = key.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
      return `${camel}: "${val}"`
    }).join(', ')
    return `style={{${obj}}}`
  })
  return jsx
}

export default function HtmlToJsx() {
  const [input, setInput] = useState('<div class="container">\n  <h1>Hello World</h1>\n  <p style="color: red; font-size: 16px;">This is a paragraph.</p>\n  <img src="/logo.png" alt="Logo" />\n  <input type="text" maxlength="50" />\n</div>')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)

  const convert = () => { setOutput(htmlToJsx(input)) }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <ToolLayout title="HTML to JSX" description="Convert HTML to JSX for React components." icon={FileCode}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">HTML Input</label>
          <textarea value={input} onChange={e => setInput(e.target.value)} rows={10} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl font-mono text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500 resize-none" />
        </div>
        <button onClick={convert} className="w-full py-3 bg-violet-600 text-white rounded-xl font-semibold hover:bg-violet-700 transition-colors flex items-center justify-center gap-2"><FileCode className="w-5 h-5" /> Convert to JSX</button>
        {output && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">JSX Output</label>
              <button onClick={copyToClipboard} className="flex items-center gap-1.5 text-sm text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300">
                {copied ? <><Check className="w-4 h-4" /> Copied</> : <><Copy className="w-4 h-4" /> Copy</>}
              </button>
            </div>
            <pre className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl font-mono text-sm text-gray-900 dark:text-white overflow-auto max-h-96 whitespace-pre-wrap">{output}</pre>
          </div>
        )}
      </div>
    </ToolLayout>
  )
}
