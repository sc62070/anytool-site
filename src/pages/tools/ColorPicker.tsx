import { useState, useCallback } from 'react'
import { Palette, Copy, Check } from 'lucide-react'
import ToolLayout from '../../components/ToolLayout'

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
  const [hex, setHex] = useState('#8b5cf6')
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
    <ToolLayout title="Color Picker" description="Pick any color and get HEX, RGB, and HSL values." icon={Palette} info="Our free online color picker lets you select any color and instantly get its HEX, RGB, and HSL values. Perfect for designers and developers who need precise color codes. Generate random colors and copy values with one click.">
      <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="flex flex-col items-center gap-4">
            <input
              type="color"
              value={hex}
              onChange={(e) => setHex(e.target.value)}
              className="w-32 h-32 rounded-xl cursor-pointer border-2 border-gray-200 dark:border-gray-700"
            />
            <button onClick={handleRandom} className="text-sm text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 font-medium transition-colors">
              Random Color
            </button>
          </div>

          <div className="flex-1 w-full space-y-3">
            <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="w-10 h-10 rounded-lg border border-gray-200 dark:border-gray-600" style={{ backgroundColor: hex }} />
              <div className="flex-1">
                <div className="text-xs text-gray-500 dark:text-gray-400">HEX</div>
                <div className="font-mono text-sm font-medium text-gray-900 dark:text-white">{hex.toUpperCase()}</div>
              </div>
              <button onClick={() => handleCopy(hex.toUpperCase(), 'hex')} className="p-1.5 text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                {copied === 'hex' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {rgb && (
              <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="flex-1">
                  <div className="text-xs text-gray-500 dark:text-gray-400">RGB</div>
                  <div className="font-mono text-sm font-medium text-gray-900 dark:text-white">rgb({rgb.r}, {rgb.g}, {rgb.b})</div>
                </div>
                <button onClick={() => handleCopy(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`, 'rgb')} className="p-1.5 text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                  {copied === 'rgb' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            )}

            {hsl && (
              <div className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                <div className="flex-1">
                  <div className="text-xs text-gray-500 dark:text-gray-400">HSL</div>
                  <div className="font-mono text-sm font-medium text-gray-900 dark:text-white">hsl({hsl.h}, {hsl.s}%, {hsl.l}%)</div>
                </div>
                <button onClick={() => handleCopy(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`, 'hsl')} className="p-1.5 text-gray-400 hover:text-violet-600 dark:hover:text-violet-400 transition-colors">
                  {copied === 'hsl' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </ToolLayout>
  )
}
