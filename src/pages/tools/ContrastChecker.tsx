import { useState } from 'react'
import { Eye, Copy, Check } from 'lucide-react'
import ToolLayout from '../../components/ToolLayout'

function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) }
    : null
}

function luminance(r: number, g: number, b: number) {
  const a = [r, g, b].map(v => {
    v /= 255
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
  })
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722
}

function contrastRatio(hex1: string, hex2: string) {
  const rgb1 = hexToRgb(hex1)
  const rgb2 = hexToRgb(hex2)
  if (!rgb1 || !rgb2) return null
  const l1 = luminance(rgb1.r, rgb1.g, rgb1.b)
  const l2 = luminance(rgb2.r, rgb2.g, rgb2.b)
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}

function getWcagResults(ratio: number) {
  return {
    aaNormal: ratio >= 4.5,
    aaLarge: ratio >= 3,
    aaaNormal: ratio >= 7,
    aaaLarge: ratio >= 4.5,
  }
}

export default function ContrastChecker() {
  const [foreground, setForeground] = useState('#ffffff')
  const [background, setBackground] = useState('#7c3aed')
  const [copied, setCopied] = useState(false)

  const ratio = contrastRatio(foreground, background)
  const results = ratio ? getWcagResults(ratio) : null

  const handleCopy = () => {
    const text = `Foreground: ${foreground}\nBackground: ${background}\nRatio: ${ratio?.toFixed(2)}:1`
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <ToolLayout title="Contrast Checker" description="Check color contrast for WCAG accessibility compliance." icon={Eye}>
      <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
        <div className="flex gap-4 mb-6">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Foreground</label>
            <div className="flex items-center gap-3 bg-white dark:bg-gray-800 rounded-xl p-3 border border-gray-200 dark:border-gray-700">
              <input type="color" value={foreground} onChange={(e) => setForeground(e.target.value)} className="w-10 h-10 rounded-lg cursor-pointer border-0" />
              <input
                type="text"
                value={foreground}
                onChange={(e) => setForeground(e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white text-sm font-mono border-0"
              />
            </div>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Background</label>
            <div className="flex items-center gap-3 bg-white dark:bg-gray-800 rounded-xl p-3 border border-gray-200 dark:border-gray-700">
              <input type="color" value={background} onChange={(e) => setBackground(e.target.value)} className="w-10 h-10 rounded-lg cursor-pointer border-0" />
              <input
                type="text"
                value={background}
                onChange={(e) => setBackground(e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white text-sm font-mono border-0"
              />
            </div>
          </div>
        </div>

        <div
          className="rounded-xl p-8 mb-6 text-center border border-gray-200 dark:border-gray-700"
          style={{ backgroundColor: background, color: foreground }}
        >
          <p className="text-2xl font-bold mb-1">The quick brown fox</p>
          <p className="text-base">jumps over the lazy dog — 0123456789</p>
        </div>

        {ratio && results && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 mb-6">
            <div className="text-center mb-6">
              <div className="text-4xl font-bold text-gray-900 dark:text-white mb-1">{ratio.toFixed(2)}:1</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">Contrast Ratio</div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'AA Normal Text', pass: results.aaNormal },
                { label: 'AA Large Text', pass: results.aaLarge },
                { label: 'AAA Normal Text', pass: results.aaaNormal },
                { label: 'AAA Large Text', pass: results.aaaLarge },
              ].map(r => (
                <div key={r.label} className={`flex items-center justify-between p-3 rounded-lg ${r.pass ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
                  <span className="text-sm text-gray-700 dark:text-gray-300">{r.label}</span>
                  <span className={`text-sm font-semibold ${r.pass ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    {r.pass ? 'PASS' : 'FAIL'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        <button onClick={handleCopy} className="w-full flex items-center justify-center gap-2 bg-violet-600 text-white py-3 rounded-xl font-semibold hover:bg-violet-700 transition-colors">
          {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
          {copied ? 'Copied!' : 'Copy Values'}
        </button>
      </div>
    </ToolLayout>
  )
}
