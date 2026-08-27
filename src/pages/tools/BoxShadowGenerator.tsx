import { useState } from 'react'
import { Square, Copy, Check } from 'lucide-react'
import ToolLayout from '../../components/ToolLayout'

export default function BoxShadowGenerator() {
  const [offsetX, setOffsetX] = useState(0)
  const [offsetY, setOffsetY] = useState(4)
  const [blur, setBlur] = useState(12)
  const [spread, setSpread] = useState(0)
  const [color, setColor] = useState('#000000')
  const [opacity, setOpacity] = useState(25)
  const [inset, setInset] = useState(false)
  const [copied, setCopied] = useState(false)

  const r = parseInt(color.slice(1, 3), 16)
  const g = parseInt(color.slice(3, 5), 16)
  const b = parseInt(color.slice(5, 7), 16)

  const shadowCss = `${inset ? 'inset ' : ''}${offsetX}px ${offsetY}px ${blur}px ${spread}px rgba(${r}, ${g}, ${b}, ${opacity / 100})`
  const fullCss = `box-shadow: ${shadowCss};`

  const handleCopy = () => {
    navigator.clipboard.writeText(fullCss)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <ToolLayout title="Box Shadow Generator" description="Create and customize CSS box shadows visually." icon={Square}>
      <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
        <div className="flex items-center justify-center mb-8">
          <div
            className="w-48 h-48 bg-violet-500/20 rounded-2xl border-2 border-violet-400/50"
            style={{ boxShadow: shadowCss }}
          />
        </div>

        <div className="space-y-5 mb-6">
          {[
            { label: 'Offset X', value: offsetX, set: setOffsetX, min: -100, max: 100 },
            { label: 'Offset Y', value: offsetY, set: setOffsetY, min: -100, max: 100 },
            { label: 'Blur', value: blur, set: setBlur, min: 0, max: 200 },
            { label: 'Spread', value: spread, set: setSpread, min: -100, max: 100 },
            { label: 'Opacity', value: opacity, set: setOpacity, min: 0, max: 100 },
          ].map(s => (
            <div key={s.label}>
              <div className="flex items-center justify-between mb-1">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{s.label}</label>
                <span className="text-sm font-mono text-gray-500 dark:text-gray-400">{s.value}</span>
              </div>
              <input
                type="range"
                min={s.min}
                max={s.max}
                value={s.value}
                onChange={(e) => s.set(Number(e.target.value))}
                className="w-full accent-violet-600"
              />
            </div>
          ))}

          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Color</label>
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-10 h-10 rounded-lg cursor-pointer border-0"
            />
            <span className="text-sm font-mono text-gray-500 dark:text-gray-400">{color.toUpperCase()}</span>
          </div>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={inset}
              onChange={(e) => setInset(e.target.checked)}
              className="w-5 h-5 rounded accent-violet-600"
            />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Inset</span>
          </label>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">CSS Output</span>
            <button onClick={handleCopy} className="flex items-center gap-1 text-xs text-violet-600 dark:text-violet-400 hover:text-violet-700">
              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <code className="text-sm text-gray-800 dark:text-gray-200 break-all">{fullCss}</code>
        </div>
      </div>
    </ToolLayout>
  )
}
