import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Palette, Copy, Check } from 'lucide-react'

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
    : null
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255; g /= 255; b /= 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  let h = 0, s = 0
  const l = (max + min) / 2
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
      case g: h = ((b - r) / d + 2) / 6; break
      case b: h = ((r - g) / d + 4) / 6; break
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) }
}

export default function ColorPicker() {
  const [hex, setHex] = useState('#6366f1')
  const [copied, setCopied] = useState('')

  const rgb = hexToRgb(hex)
  const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null

  const handleCopy = (value: string, label: string) => {
    navigator.clipboard.writeText(value)
    setCopied(label)
    setTimeout(() => setCopied(''), 2000)
  }

  const handleRandom = useCallback(() => {
    setHex('#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'))
  }, [])

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
          <Palette className="w-5 h-5 text-indigo-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Color Picker</h1>
      </div>
      <p className="text-gray-600 mb-8">Pick any color and get HEX, RGB, and HSL values.</p>

      <div className="bg-white rounded-xl border border-gray-200 p-8">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="flex flex-col items-center gap-4">
            <input
              type="color"
              value={hex}
              onChange={(e) => setHex(e.target.value)}
              className="w-32 h-32 rounded-xl cursor-pointer border-2 border-gray-200"
            />
            <button onClick={handleRandom} className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
              Random Color
            </button>
          </div>

          <div className="flex-1 w-full space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 rounded-lg border border-gray-200" style={{ backgroundColor: hex }} />
              <div className="flex-1">
                <div className="text-xs text-gray-500">HEX</div>
                <div className="font-mono text-sm font-medium">{hex.toUpperCase()}</div>
              </div>
              <button onClick={() => handleCopy(hex.toUpperCase(), 'hex')} className="p-1.5 text-gray-400 hover:text-indigo-600">
                {copied === 'hex' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {rgb && (
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="text-xs text-gray-500">RGB</div>
                  <div className="font-mono text-sm font-medium">rgb({rgb.r}, {rgb.g}, {rgb.b})</div>
                </div>
                <button onClick={() => handleCopy(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, 'rgb')} className="p-1.5 text-gray-400 hover:text-indigo-600">
                  {copied === 'rgb' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            )}

            {hsl && (
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <div className="text-xs text-gray-500">HSL</div>
                  <div className="font-mono text-sm font-medium">hsl({hsl.h}, {hsl.s}%, {hsl.l}%)</div>
                </div>
                <button onClick={() => handleCopy(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`, 'hsl')} className="p-1.5 text-gray-400 hover:text-indigo-600">
                  {copied === 'hsl' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link to="/" className="text-indigo-600 hover:text-indigo-700 text-sm">&larr; Back to all tools</Link>
      </div>
    </div>
  )
}
