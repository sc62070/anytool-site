import { useState } from 'react'
import { Code, Copy, Check } from 'lucide-react'
import ToolLayout from '../../components/ToolLayout'

export default function JsFormatter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)

  const format = (minify = false) => {
    try {
      if (minify) {
        setOutput(input.replace(/\s+/g, ' ').replace(/\s*([{}();,:[\]])\s*/g, '$1').trim())
      } else {
        let result = ''
        let indent = 0
        const chars = input.split('')
        for (let i = 0; i < chars.length; i++) {
          const c = chars[i]
          if (c === '{' || c === '[') {
            result += c + '\n' + '  '.repeat(++indent)
          } else if (c === '}' || c === ']') {
            result = result.trimEnd() + '\n' + '  '.repeat(--indent) + c
          } else if (c === ',') {
            result += c + '\n' + '  '.repeat(indent)
          } else if (c === ';') {
            result += c + '\n' + '  '.repeat(indent)
          } else {
            result += c
          }
        }
        setOutput(result.trim())
      }
    } catch { setOutput('Error formatting code') }
  }

  const copy = () => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000) }

  return (
    <ToolLayout title="JS Formatter" description="Format, beautify, or minify JavaScript code." icon={Code}>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Input</label>
          <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Paste JavaScript code..." className="w-full h-72 p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm font-mono resize-y focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none text-gray-900 dark:text-white placeholder:text-gray-400" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Output</label>
          <div className="relative">
            <textarea readOnly value={output} className="w-full h-72 p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm font-mono resize-y text-gray-900 dark:text-white" />
            {output && <button onClick={copy} className="absolute top-3 right-3 p-2 text-gray-400 hover:text-violet-600 dark:hover:text-violet-400">{copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}</button>}
          </div>
        </div>
      </div>
      <div className="flex gap-3 mt-4">
        <button onClick={() => format(false)} className="bg-violet-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-violet-700 transition-colors">Beautify</button>
        <button onClick={() => format(true)} className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-6 py-2.5 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700">Minify</button>
        <button onClick={() => { setInput(''); setOutput('') }} className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-6 py-2.5 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700">Clear</button>
      </div>
    </ToolLayout>
  )
}
