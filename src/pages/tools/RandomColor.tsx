import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { Palette, Copy, Check, RefreshCw, Lock } from 'lucide-react'

function randomHex() {
  return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')
}

function hexToRgb(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return { r, g, b }
}

function hexToHsl(hex: string) {
  const { r, g, b } = hexToRgb(hex)
  const rn = r / 255, gn = g / 255, bn = b / 255
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn)
  let h = 0, s = 0
  const l = (max + min) / 2
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    if (max === rn) h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6
    else if (max === gn) h = ((bn - rn) / d + 2) / 6
    else h = ((rn - gn) / d + 4) / 6
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
}

export default function RandomColor() {
  const [count, setCount] = useState(6)
  const [locked, setLocked] = useState<Set<number>>(new Set())
  const [colors, setColors] = useState<string[]>(() => Array.from({ length: 6 }, randomHex))
  const [copied, setCopied] = useState('')

  const generate = () => {
    setColors(prev => {
      const next = [...prev]
      for (let i = 0; i < count; i++) {
        if (!locked.has(i)) next[i] = randomHex()
      }
      while (next.length < count) next.push(randomHex())
      return next.slice(0, count)
    })
  }

  const toggleLock = (i: number) => {
    setLocked(prev => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }

  const copyColor = (hex: string, id: string) => {
    navigator.clipboard.writeText(hex)
    setCopied(id)
    setTimeout(() => setCopied(''), 1500)
  }

  const rgb = (hex: string) => { const c = hexToRgb(hex); return `rgb(${c.r}, ${c.g}, ${c.b})` }
  const hsl = (hex: string) => { const c = hexToHsl(hex); return `hsl(${c.h}, ${c.s}%, ${c.l}%)` }

  return (
    <ToolLayout title="Random Color Palette" description="Generate beautiful random color palettes." icon={Palette}>
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <label className="text-sm text-gray-600 dark:text-gray-400">Colors: {count}</label>
          <input type="range" min={2} max={12} value={count} onChange={e => { setCount(Number(e.target.value)); setLocked(new Set()) }} className="flex-1" />
        </div>
        <button onClick={generate} className="w-full py-3 bg-violet-600 text-white rounded-xl font-semibold hover:bg-violet-700 transition-colors flex items-center justify-center gap-2">
          <RefreshCw className="w-5 h-5" /> Generate
        </button>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {colors.slice(0, count).map((hex, i) => (
            <div key={i} className="rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
              <div className="h-24 relative" style={{ backgroundColor: hex }}>
                <button onClick={() => toggleLock(i)} className="absolute top-2 right-2 p-1.5 bg-black/20 rounded-lg text-white hover:bg-black/40 transition-colors">
                  <Lock className={`w-3.5 h-3.5 ${locked.has(i) ? 'fill-current' : ''}`} />
                </button>
              </div>
              <div className="p-2 space-y-1">
                {[hex, rgb(hex), hsl(hex)].map((val, j) => (
                  <button key={j} onClick={() => copyColor(val, `${i}-${j}`)} className="w-full text-left px-2 py-1 rounded text-xs font-mono text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center justify-between">
                    <span>{val}</span>
                    {copied === `${i}-${j}` ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100" />}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </ToolLayout>
  )
}
