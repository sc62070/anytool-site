import { useState, useCallback } from 'react'
import { Palette, Copy, Check } from 'lucide-react'
import ToolLayout from '../../components/ToolLayout'

function hexToHsl(hex: string): { h: number; s: number; l: number } {
  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255
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

function hslToHex(h: number, s: number, l: number): string {
  s /= 100; l /= 100
  const c = (1 - Math.abs(2 * l - 1)) * s
  const x = c * (1 - Math.abs((h / 60) % 2 - 1))
  const m = l - c / 2
  let r = 0, g = 0, b = 0
  if (h < 60) { r = c; g = x }
  else if (h < 120) { r = x; g = c }
  else if (h < 180) { g = c; b = x }
  else if (h < 240) { g = x; b = c }
  else if (h < 300) { r = x; b = c }
  else { r = c; b = x }
  const toHex = (v: number) => Math.round((v + m) * 255).toString(16).padStart(2, '0')
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`
}

function generatePalette(baseHex: string) {
  const { h, s, l } = hexToHsl(baseHex)
  const clamp = (v: number) => ((v % 360) + 360) % 360
  return {
    base: baseHex,
    complementary: hslToHex(clamp(h + 180), s, l),
    analogous: [hslToHex(clamp(h - 30), s, l), hslToHex(clamp(h + 30), s, l)],
    triadic: [hslToHex(clamp(h + 120), s, l), hslToHex(clamp(h + 240), s, l)],
    splitComplementary: [hslToHex(clamp(h + 150), s, l), hslToHex(clamp(h + 210), s, l)],
    shades: Array.from({ length: 5 }, (_, i) => hslToHex(h, s, Math.max(10, Math.min(90, l - 20 + i * 10)))),
  }
}

export default function ColorPaletteGenerator() {
  const [baseColor, setBaseColor] = useState('#8b5cf6')
  const [copied, setCopied] = useState('')

  const palette = generatePalette(baseColor)

  const handleCopy = useCallback((color: string, label: string) => {
    navigator.clipboard.writeText(color.toUpperCase())
    setCopied(label)
    setTimeout(() => setCopied(''), 2000)
  }, [])

  const ColorSwatch = ({ color, label }: { color: string; label: string }) => (
    <button
      onClick={() => handleCopy(color, label)}
      className="group relative overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 hover:scale-105 transition-transform cursor-pointer"
    >
      <div className="h-20 w-full" style={{ backgroundColor: color }} />
      <div className="p-2 bg-white dark:bg-gray-800 flex items-center justify-between">
        <span className="font-mono text-xs text-gray-700 dark:text-gray-300">{color.toUpperCase()}</span>
        <span className="text-gray-400 group-hover:text-violet-500 transition-colors">
          {copied === label ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
        </span>
      </div>
    </button>
  )

  return (
    <ToolLayout title="Color Palette Generator" description="Generate harmonious color palettes from a base color." icon={Palette}>
      <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
        <div className="flex items-center gap-4 mb-8">
          <input
            type="color"
            value={baseColor}
            onChange={(e) => setBaseColor(e.target.value)}
            className="w-14 h-14 rounded-xl cursor-pointer border-2 border-gray-200 dark:border-gray-700"
          />
          <div>
            <div className="text-sm text-gray-500 dark:text-gray-400">Base Color</div>
            <div className="font-mono text-lg font-bold text-gray-900 dark:text-white">{baseColor.toUpperCase()}</div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Complementary</h3>
            <div className="grid grid-cols-2 gap-3">
              <ColorSwatch color={palette.base} label="base" />
              <ColorSwatch color={palette.complementary} label="comp" />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Analogous</h3>
            <div className="grid grid-cols-3 gap-3">
              <ColorSwatch color={palette.analogous[0]} label="ana1" />
              <ColorSwatch color={palette.base} label="base2" />
              <ColorSwatch color={palette.analogous[1]} label="ana2" />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Triadic</h3>
            <div className="grid grid-cols-3 gap-3">
              <ColorSwatch color={palette.base} label="base3" />
              <ColorSwatch color={palette.triadic[0]} label="tri1" />
              <ColorSwatch color={palette.triadic[1]} label="tri2" />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Split Complementary</h3>
            <div className="grid grid-cols-3 gap-3">
              <ColorSwatch color={palette.base} label="base4" />
              <ColorSwatch color={palette.splitComplementary[0]} label="sc1" />
              <ColorSwatch color={palette.splitComplementary[1]} label="sc2" />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">Shades</h3>
            <div className="grid grid-cols-5 gap-3">
              {palette.shades.map((color, i) => (
                <ColorSwatch key={i} color={color} label={`shade${i}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  )
}
