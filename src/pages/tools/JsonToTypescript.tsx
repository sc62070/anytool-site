import { useState } from 'react'
import { Code, Copy, Check, AlertTriangle } from 'lucide-react'
import ToolLayout from '../../components/ToolLayout'

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

function jsonToInterface(obj: any, name = 'Root', indent = 0): string {
  const pad = '  '.repeat(indent)
  const padInner = '  '.repeat(indent + 1)

  if (obj === null) return `${pad}  ${name}: null;`
  if (obj === undefined) return `${pad}  ${name}: undefined;`

  if (Array.isArray(obj)) {
    if (obj.length === 0) return `${pad}  ${name}: any[];`
    const itemType = getTsType(obj[0], `${capitalize(name)}Item`, indent + 1)
    return `${pad}  ${name}: ${itemType}[];`
  }

  if (typeof obj === 'object') {
    const lines = [`${pad}interface ${name} {`]
    for (const [key, value] of Object.entries(obj)) {
      const safeName = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : `"${key}"`
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        const nested = jsonToInterface(value, capitalize(key), indent + 1)
        lines.push(`${padInner}  ${safeName}: ${capitalize(key)};`)
      } else if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'object' && value[0] !== null) {
        lines.push(`${padInner}  ${safeName}: ${capitalize(key)}[];`)
      } else {
        lines.push(`${padInner}  ${safeName}: ${getTsType(value, key, indent + 1)};`)
      }
    }
    lines.push(`${pad}}`)
    return lines.join('\n')
  }

  return `${pad}  ${name}: ${typeof obj};`
}

function getTsType(value: any, _name: string, _indent: number): string {
  if (value === null) return 'null'
  if (value === undefined) return 'undefined'
  if (Array.isArray(value)) {
    if (value.length === 0) return 'any[]'
    return `${getTsType(value[0], _name, _indent)}[]`
  }
  if (typeof value === 'object') {
    const inline = getInlineType(value)
    return inline || 'Record<string, any>'
  }
  return typeof value
}

function getInlineType(obj: any): string {
  const entries = Object.entries(obj)
  if (entries.length === 0) return 'Record<string, any>'
  const parts = entries.map(([k, v]) => {
    const safe = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(k) ? k : `"${k}"`
    return `${safe}: ${getPrimitiveType(v)}`
  })
  return `{ ${parts.join('; ')} }`
}

function getPrimitiveType(value: any): string {
  if (value === null) return 'null'
  if (Array.isArray(value)) return 'any[]'
  if (typeof value === 'object') return 'Record<string, any>'
  return typeof value
}

function generateTypescript(json: string): string {
  const parsed = JSON.parse(json)
  const interfaces: string[] = []

  if (typeof parsed === 'object' && parsed !== null && !Array.isArray(parsed)) {
    interfaces.push(jsonToInterface(parsed, 'Root', 0))
    for (const [key, value] of Object.entries(parsed)) {
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        interfaces.push(jsonToInterface(value, capitalize(key), 0))
      } else if (Array.isArray(value) && value.length > 0 && typeof value[0] === 'object' && value[0] !== null) {
        interfaces.push(jsonToInterface(value[0], capitalize(key), 0))
      }
    }
  } else if (Array.isArray(parsed) && parsed.length > 0 && typeof parsed[0] === 'object') {
    interfaces.push(jsonToInterface(parsed[0], 'RootItem', 0))
  } else {
    const type = parsed === null ? 'null' : Array.isArray(parsed) ? 'any[]' : typeof parsed
    return `type Root = ${type};`
  }

  return interfaces.join('\n\n')
}

export default function JsonToTypescript() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const convert = () => {
    setError('')
    try {
      const result = generateTypescript(input.trim())
      setOutput(result)
    } catch (e) {
      setError((e as Error).message)
      setOutput('')
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <ToolLayout title="JSON to TypeScript" description="Convert JSON data to TypeScript interface definitions." icon={Code}>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">JSON Input</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='{"name": "John", "age": 30, "active": true}'
            className="w-full h-80 p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm font-mono resize-y focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all text-gray-900 dark:text-white placeholder:text-gray-400"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">TypeScript Output</label>
          <div className="relative">
            <textarea
              readOnly
              value={output}
              placeholder="Generated TypeScript interfaces will appear here..."
              className="w-full h-80 p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm font-mono resize-y text-gray-900 dark:text-white placeholder:text-gray-400"
            />
            {output && (
              <button onClick={handleCopy} className="absolute top-3 right-3 p-2 text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            )}
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-4 flex items-center gap-2 text-red-600 bg-red-50 dark:bg-red-900/20 p-3 rounded-xl text-sm border border-red-200 dark:border-red-800/50">
          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          {error}
        </div>
      )}

      <div className="flex gap-3 mt-6">
        <button onClick={convert} disabled={!input.trim()} className="bg-violet-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-violet-700 transition-colors disabled:opacity-50">
          Convert to TypeScript
        </button>
        <button onClick={() => { setInput(''); setOutput(''); setError('') }} className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-6 py-2.5 rounded-xl font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700">
          Clear
        </button>
      </div>
    </ToolLayout>
  )
}
