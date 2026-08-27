import { useState } from 'react'
import { LayoutGrid, Copy, Check } from 'lucide-react'
import ToolLayout from '../../components/ToolLayout'

const CHILD_COUNT = 6

export default function FlexboxPlayground() {
  const [justifyContent, setJustifyContent] = useState('flex-start')
  const [alignItems, setAlignItems] = useState('stretch')
  const [flexDirection, setFlexDirection] = useState('row')
  const [flexWrap, setFlexWrap] = useState('nowrap')
  const [gap, setGap] = useState(8)
  const [copied, setCopied] = useState(false)

  const cssCode = `display: flex;\njustify-content: ${justifyContent};\nalign-items: ${alignItems};\nflex-direction: ${flexDirection};\nflex-wrap: ${flexWrap};\ngap: ${gap}px;`

  const handleCopy = () => {
    navigator.clipboard.writeText(cssCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <ToolLayout title="Flexbox Playground" description="Experiment with flexbox properties and see results in real time." icon={LayoutGrid}>
      <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
        <div
          className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 mb-6 min-h-[200px]"
          style={{
            display: 'flex',
            justifyContent,
            alignItems,
            flexDirection: flexDirection as any,
            flexWrap: flexWrap as any,
            gap,
          }}
        >
          {Array.from({ length: CHILD_COUNT }).map((_, i) => (
            <div
              key={i}
              className="bg-violet-500 text-white rounded-lg flex items-center justify-center font-bold text-sm"
              style={{
                width: 60 + (i % 3) * 15,
                height: 40 + (i % 2) * 20,
                flexShrink: 0,
              }}
            >
              {i + 1}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">justify-content</label>
            <select value={justifyContent} onChange={(e) => setJustifyContent(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 text-sm">
              {['flex-start', 'flex-end', 'center', 'space-between', 'space-around', 'space-evenly'].map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">align-items</label>
            <select value={alignItems} onChange={(e) => setAlignItems(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 text-sm">
              {['flex-start', 'flex-end', 'center', 'stretch', 'baseline'].map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">flex-direction</label>
            <select value={flexDirection} onChange={(e) => setFlexDirection(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 text-sm">
              {['row', 'row-reverse', 'column', 'column-reverse'].map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">flex-wrap</label>
            <select value={flexWrap} onChange={(e) => setFlexWrap(e.target.value)} className="w-full px-3 py-2 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 text-sm">
              {['nowrap', 'wrap', 'wrap-reverse'].map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">gap</label>
            <span className="text-sm font-mono text-gray-500 dark:text-gray-400">{gap}px</span>
          </div>
          <input type="range" min={0} max={32} value={gap} onChange={(e) => setGap(Number(e.target.value))} className="w-full accent-violet-600" />
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">CSS Output</span>
            <button onClick={handleCopy} className="flex items-center gap-1 text-xs text-violet-600 dark:text-violet-400 hover:text-violet-700">
              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <pre className="text-sm text-gray-800 dark:text-gray-200 whitespace-pre-wrap">{cssCode}</pre>
        </div>
      </div>
    </ToolLayout>
  )
}
