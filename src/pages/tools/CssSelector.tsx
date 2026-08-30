import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { Blend, Copy, Check } from 'lucide-react'

interface SelectorPart {
  tag: string
  classes: string[]
  id: string
  nth: string
  attribute: string
}

function buildSelector(parts: SelectorPart[]): string {
  return parts.map(p => {
    let s = p.tag || '*'
    if (p.id) s += `#${p.id}`
    if (p.classes.length) s += p.classes.map(c => `.${c}`).join('')
    if (p.nth) s += `:nth-child(${p.nth})`
    if (p.attribute) s += `[${p.attribute}]`
    return s
  }).join(' > ')
}

export default function CssSelector() {
  const [parts, setParts] = useState<SelectorPart[]>([
    { tag: 'div', classes: [], id: '', nth: '', attribute: '' },
  ])
  const [copied, setCopied] = useState(false)

  const addPart = () => setParts([...parts, { tag: '', classes: [], id: '', nth: '', attribute: '' }])
  const removePart = (i: number) => setParts(parts.filter((_, j) => j !== i))
  const updatePart = (i: number, field: keyof SelectorPart, value: string | string[]) => {
    const next = [...parts]
    next[i] = { ...next[i], [field]: value }
    setParts(next)
  }

  const selector = buildSelector(parts)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(selector)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const commonSelectors = [
    { label: 'Class', example: '.my-class' },
    { label: 'ID', example: '#my-id' },
    { label: 'Attribute', example: '[data-role="main"]' },
    { label: 'Pseudo', example: ':nth-child(2)' },
    { label: 'Descendant', example: 'div > p' },
    { label: 'Adjacent', example: 'h2 + p' },
  ]

  return (
    <ToolLayout title="CSS Selector Generator" description="Generate CSS selectors for any HTML element." icon={Blend}>
      <div className="space-y-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">Build a CSS selector step by step. Each row represents a level in the DOM hierarchy.</p>

        <div className="space-y-2">
          {parts.map((part, i) => (
            <div key={i} className="flex gap-2 items-start p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl">
              {i > 0 && <span className="text-xs text-gray-400 mt-2">&gt;</span>}
              <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-2">
                <input type="text" value={part.tag} onChange={e => updatePart(i, 'tag', e.target.value)} className="px-2 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg font-mono text-xs text-gray-900 dark:text-white outline-none" placeholder="tag" />
                <input type="text" value={part.id} onChange={e => updatePart(i, 'id', e.target.value)} className="px-2 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg font-mono text-xs text-gray-900 dark:text-white outline-none" placeholder="#id" />
                <input type="text" value={part.classes.join(' ')} onChange={e => updatePart(i, 'classes', e.target.value.split(' ').filter(Boolean))} className="px-2 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg font-mono text-xs text-gray-900 dark:text-white outline-none" placeholder=".class1 .class2" />
                <input type="text" value={part.attribute} onChange={e => updatePart(i, 'attribute', e.target.value)} className="px-2 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg font-mono text-xs text-gray-900 dark:text-white outline-none" placeholder="[attr]" />
              </div>
              {parts.length > 1 && <button onClick={() => removePart(i)} className="text-red-400 hover:text-red-500 text-xs mt-1.5">✕</button>}
            </div>
          ))}
        </div>

        <button onClick={addPart} className="w-full py-2 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl text-sm text-gray-500 hover:border-violet-400 hover:text-violet-500 transition-colors">+ Add Level</button>

        {selector && (
          <div className="p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Generated Selector</span>
              <button onClick={copyToClipboard} className="flex items-center gap-1.5 text-sm text-violet-600 dark:text-violet-400">
                {copied ? <><Check className="w-4 h-4" /> Copied</> : <><Copy className="w-4 h-4" /> Copy</>}
              </button>
            </div>
            <code className="font-mono text-lg text-violet-600 dark:text-violet-400">{selector}</code>
          </div>
        )}

        <div className="p-3 bg-violet-50 dark:bg-violet-500/10 border border-violet-200 dark:border-violet-500/20 rounded-xl">
          <p className="text-sm font-medium text-violet-700 dark:text-violet-300 mb-2">Quick Reference</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
            {commonSelectors.map(s => (
              <code key={s.label} className="text-xs text-violet-600 dark:text-violet-400">{s.example}</code>
            ))}
          </div>
        </div>
      </div>
    </ToolLayout>
  )
}
