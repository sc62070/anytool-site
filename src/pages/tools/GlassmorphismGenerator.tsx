import { useState } from 'react'
import { Droplets, Copy, Check } from 'lucide-react'
import ToolLayout from '../../components/ToolLayout'

export default function GlassmorphismGenerator() {
  const [bgOpacity, setBgOpacity] = useState(20)
  const [blur, setBlur] = useState(16)
  const [borderOpacity, setBorderOpacity] = useState(30)
  const [borderRadius, setBorderRadius] = useState(16)
  const [copied, setCopied] = useState(false)

  const cssCode = `background: rgba(255, 255, 255, ${bgOpacity / 100});\nbackdrop-filter: blur(${blur}px);\n-webkit-backdrop-filter: blur(${blur}px);\nborder-radius: ${borderRadius}px;\nborder: 1px solid rgba(255, 255, 255, ${borderOpacity / 100});`

  const handleCopy = () => {
    navigator.clipboard.writeText(cssCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <ToolLayout title="Glassmorphism Generator" description="Create frosted glass effects with CSS." icon={Droplets}>
      <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
        <div className="relative h-56 rounded-xl mb-6 overflow-hidden border border-gray-200 dark:border-gray-700">
          <div
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-48 h-32 flex items-center justify-center text-white font-semibold text-lg"
              style={{
                background: `rgba(255, 255, 255, ${bgOpacity / 100})`,
                backdropFilter: `blur(${blur}px)`,
                WebkitBackdropFilter: `blur(${blur}px)`,
                borderRadius: `${borderRadius}px`,
                border: `1px solid rgba(255, 255, 255, ${borderOpacity / 100})`,
              }}
            >
              Glass Card
            </div>
          </div>
        </div>

        <div className="space-y-5 mb-6">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Background Opacity</label>
              <span className="text-sm font-mono text-gray-500 dark:text-gray-400">{bgOpacity}%</span>
            </div>
            <input type="range" min={0} max={100} value={bgOpacity} onChange={(e) => setBgOpacity(Number(e.target.value))} className="w-full accent-violet-600" />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Blur</label>
              <span className="text-sm font-mono text-gray-500 dark:text-gray-400">{blur}px</span>
            </div>
            <input type="range" min={0} max={40} value={blur} onChange={(e) => setBlur(Number(e.target.value))} className="w-full accent-violet-600" />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Border Opacity</label>
              <span className="text-sm font-mono text-gray-500 dark:text-gray-400">{borderOpacity}%</span>
            </div>
            <input type="range" min={0} max={100} value={borderOpacity} onChange={(e) => setBorderOpacity(Number(e.target.value))} className="w-full accent-violet-600" />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Border Radius</label>
              <span className="text-sm font-mono text-gray-500 dark:text-gray-400">{borderRadius}px</span>
            </div>
            <input type="range" min={0} max={48} value={borderRadius} onChange={(e) => setBorderRadius(Number(e.target.value))} className="w-full accent-violet-600" />
          </div>
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
