import { useState } from 'react'
import { ArrowLeftRight, Copy, Check } from 'lucide-react'
import ToolLayout from '../../components/ToolLayout'

export default function YamlJson() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'yaml2json' | 'json2yaml'>('yaml2json')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const yamlToJson = (yaml: string) => {
    const result: Record<string, unknown> = {}
    let current = result
    const stack: Record<string, unknown>[] = [result]
    const indentStack: number[] = [0]
    for (const rawLine of yaml.split('\n')) {
      const line = rawLine.replace(/\t/g, '  ')
      if (!line.trim() || line.trim().startsWith('#')) continue
      const indent = line.search(/\S/)
      while (indentStack.length > 1 && indent <= indentStack[indentStack.length - 1]) { stack.pop(); indentStack.pop() }
      current = stack[stack.length - 1] as Record<string, unknown>
      const match = line.trim().match(/^([^:]+):\s*(.*)$/)
      if (match) {
        const key = match[1].trim().replace(/^["']|["']$/g, '')
        let val: unknown = match[2].trim()
        if (val === '' || val === '|') { const obj: Record<string, unknown> = {}; current[key] = obj; stack.push(obj); indentStack.push(indent + 2) }
        else if (val === 'true') current[key] = true
        else if (val === 'false') current[key] = false
        else if (val === 'null') current[key] = null
        else if (/^-?\d+$/.test(val)) current[key] = parseInt(val)
        else if (/^-?\d+\.\d+$/.test(val)) current[key] = parseFloat(val)
        else current[key] = val.replace(/^["']|["']$/g, '')
      }
    }
    return result
  }

  const jsonToYaml = (obj: unknown, indent = 0): string => {
    if (obj === null || obj === undefined) return 'null'
    if (typeof obj === 'boolean') return obj.toString()
    if (typeof obj === 'number') return obj.toString()
    if (typeof obj === 'string') return /[:{}\[\],&*?|>!%@`]/.test(obj) ? `"${obj}"` : obj
    if (Array.isArray(obj)) return obj.length === 0 ? '[]' : obj.map(item => `${'  '.repeat(indent)}- ${jsonToYaml(item, indent + 1)}`).join('\n')
    const entries = Object.entries(obj as Record<string, unknown>)
    if (entries.length === 0) return '{}'
    return entries.map(([k, v]) => {
      const val = typeof v === 'object' && v !== null && !Array.isArray(v) ? `\n${jsonToYaml(v, indent + 1)}` : ` ${jsonToYaml(v, indent + 1)}`
      return `${'  '.repeat(indent)}:${k}${val}`
    }).join('\n')
  }

  const convert = () => {
    setError('')
    try {
      if (mode === 'yaml2json') { setOutput(JSON.stringify(yamlToJson(input), null, 2)) }
      else { setOutput(jsonToYaml(JSON.parse(input))) }
    } catch (e) { setError((e as Error).message); setOutput('') }
  }

  const copy = () => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000) }

  return (
    <ToolLayout title="YAML ↔ JSON" description="Convert between YAML and JSON formats." icon={ArrowLeftRight}>
      <div className="flex gap-2 mb-4">
        <button onClick={() => setMode('yaml2json')} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${mode === 'yaml2json' ? 'bg-violet-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700'}`}>YAML → JSON</button>
        <button onClick={() => setMode('json2yaml')} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${mode === 'json2yaml' ? 'bg-violet-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700'}`}>JSON → YAML</button>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{mode === 'yaml2json' ? 'YAML' : 'JSON'}</label>
          <textarea value={input} onChange={e => setInput(e.target.value)} placeholder={mode === 'yaml2json' ? 'Paste YAML...' : 'Paste JSON...'} className="w-full h-72 p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm font-mono resize-y focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none text-gray-900 dark:text-white placeholder:text-gray-400" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{mode === 'yaml2json' ? 'JSON' : 'YAML'}</label>
          <div className="relative">
            <textarea readOnly value={output} className="w-full h-72 p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm font-mono resize-y text-gray-900 dark:text-white" />
            {output && <button onClick={copy} className="absolute top-3 right-3 p-2 text-gray-400 hover:text-violet-600">{copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}</button>}
          </div>
        </div>
      </div>
      {error && <p className="mt-3 text-red-600 text-sm">{error}</p>}
      <button onClick={convert} className="mt-4 bg-violet-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-violet-700 transition-colors">Convert</button>
    </ToolLayout>
  )
}
