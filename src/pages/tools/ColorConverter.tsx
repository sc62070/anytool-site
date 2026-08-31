import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { Contrast, Copy, Check, RefreshCw } from 'lucide-react'

function hexToRgb(hex: string) {
  const h = hex.replace('#', '')
  return { r: parseInt(h.substring(0, 2), 16), g: parseInt(h.substring(2, 4), 16), b: parseInt(h.substring(4, 6), 16) }
}

function rgbToHex(r: number, g: number, b: number) {
  return '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('')
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255; g /= 255; b /= 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  let h = 0, s = 0
  const l = (max + min) / 2
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6
    else if (max === g) h = ((b - r) / d + 2) / 6
    else h = ((r - g) / d + 4) / 6
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
}

function rgbToCmyk(r: number, g: number, b: number) {
  if (r === 0 && g === 0 && b === 0) return { c: 0, m: 0, y: 0, k: 100 }
  const c = 1 - r / 255, m = 1 - g / 255, y = 1 - b / 255
  const k = Math.min(c, m, y)
  return { c: Math.round(((c - k) / (1 - k)) * 100), m: Math.round(((m - k) / (1 - k)) * 100), y: Math.round(((y - k) / (1 - k)) * 100), k: Math.round(k * 100) }
}

export default function ColorConverter() {
  const [hex, setHex] = useState('#7c3aed')
  const [copied, setCopied] = useState('')

  const { r, g, b } = hexToRgb(hex)
  const hsl = rgbToHsl(r, g, b)
  const cmyk = rgbToCmyk(r, g, b)

  const formats = [
    { label: 'HEX', value: hex.length === 7 ? hex : rgbToHex(r, g, b) },
    { label: 'RGB', value: `rgb(${r}, ${g}, ${b})` },
    { label: 'HSL', value: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)` },
    { label: 'CMYK', value: `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)` },
  ]

  const copyColor = (val: string, id: string) => {
    navigator.clipboard.writeText(val)
    setCopied(id)
    setTimeout(() => setCopied(''), 1500)
  }

  const randomColor = () => {
    setHex('#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'))
  }

  return (
    <ToolLayout title="Color Converter" description="Convert between HEX, RGB, HSL, and CMYK color formats." icon={Contrast}>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <input type="color" value={hex.length === 7 ? hex : '#7c3aed'} onChange={e => setHex(e.target.value)} className="w-20 h-20 rounded-xl cursor-pointer border-0" />
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">HEX</label>
            <input type="text" value={hex} onChange={e => setHex(e.target.value)} className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl font-mono text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500" />
          </div>
          <button onClick={randomColor} className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors border border-gray-200 dark:border-gray-700">
            <RefreshCw className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Color preview */}
        <div className="h-32 rounded-xl border border-gray-200 dark:border-gray-800" style={{ backgroundColor: hex.length === 7 ? hex : '#7c3aed' }} />

        {/* All formats */}
        <div className="space-y-2">
          {formats.map(f => (
            <div key={f.label} className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl">
              <span className="text-xs font-bold text-gray-400 w-12">{f.label}</span>
              <span className="flex-1 font-mono text-sm text-gray-900 dark:text-white">{f.value}</span>
              <button onClick={() => copyColor(f.value, f.label)} className="p-1.5 text-gray-400 hover:text-violet-500 transition-colors">
                {copied === f.label ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          ))}
        </div>

        {/* CSS Variable */}
        <div className="p-3 bg-violet-50 dark:bg-violet-500/10 border border-violet-200 dark:border-violet-500/20 rounded-xl">
          <p className="text-xs text-violet-700 dark:text-violet-300 font-mono">--primary-color: {hex.length === 7 ? hex : '#7c3aed'};</p>
        </div>
      </div>
    </ToolLayout>
  )
}
