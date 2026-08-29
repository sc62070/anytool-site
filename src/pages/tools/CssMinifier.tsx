import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { Minimize2, Copy, Check } from 'lucide-react'

function minifyCss(css: string): string {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s*([{}:;,])\s*/g, '$1')
    .replace(/;}/g, '}')
    .replace(/^\s+|\s+$/g, '')
}

export default function CssMinifier() {
  const [input, setInput] = useState('.container {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 20px;\n}\n\n.button {\n  background-color: #7c3aed;\n  color: white;\n  border: none;\n  border-radius: 8px;\n  padding: 12px 24px;\n  cursor: pointer;\n}\n\n.button:hover {\n  background-color: #6d28d9;\n}')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)
  const [saved, setSaved] = useState('')

  const minify = () => {
    const min = minifyCss(input)
    setOutput(min)
    const savings = ((1 - min.length / input.length) * 100).toFixed(1)
    setSaved(`${savings}% smaller (${input.length} → ${min.length} bytes)`)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <ToolLayout title="CSS Minifier" description="Minify CSS code to reduce file size." icon={Minimize2}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">CSS Input</label>
          <textarea value={input} onChange={e => setInput(e.target.value)} rows={12} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl font-mono text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500 resize-none" />
        </div>
        <button onClick={minify} className="w-full py-3 bg-violet-600 text-white rounded-xl font-semibold hover:bg-violet-700 transition-colors flex items-center justify-center gap-2"><Minimize2 className="w-5 h-5" /> Minify CSS</button>
        {output && (
          <div>
            <div className="flex items-center justify-between mb-2">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Minified Output</label>
                {saved && <span className="ml-2 text-xs text-emerald-600 dark:text-emerald-400">{saved}</span>}
              </div>
              <button onClick={copyToClipboard} className="flex items-center gap-1.5 text-sm text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300">
                {copied ? <><Check className="w-4 h-4" /> Copied</> : <><Copy className="w-4 h-4" /> Copy</>}
              </button>
            </div>
            <pre className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl font-mono text-sm text-gray-900 dark:text-white overflow-auto max-h-96 whitespace-pre-wrap break-all">{output}</pre>
          </div>
        )}
      </div>
    </ToolLayout>
  )
}
