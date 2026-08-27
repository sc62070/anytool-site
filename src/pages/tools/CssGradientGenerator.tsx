import { useState } from 'react'
import { Paintbrush, Copy, Check, Plus, X } from 'lucide-react'
import ToolLayout from '../../components/ToolLayout'

interface ColorStop {
  color: string
  position: number
}

export default function CssGradientGenerator() {
  const [type, setType] = useState<'linear' | 'radial'>('linear')
  const [angle, setAngle] = useState(90)
  const [stops, setStops] = useState<ColorStop[]>([
    { color: '#8b5cf6', position: 0 },
    { color: '#ec4899', position: 100 },
  ])
  const [copied, setCopied] = useState(false)

  const addStop = () => {
    setStops(prev => [...prev, { color: '#3b82f6', position: 50 }])
  }

  const removeStop = (index: number) => {
    if (stops.length <= 2) return
    setStops(prev => prev.filter((_, i) => i !== index))
  }

  const updateStop = (index: number, field: keyof ColorStop, value: string | number) => {
    setStops(prev => prev.map((s, i) => i === index ? { ...s, [field]: value } : s))
  }

  const sortedStops = [...stops].sort((a, b) => a.position - b.position)
  const gradientCss = type === 'linear'
    ? `linear-gradient(${angle}deg, ${sortedStops.map(s => `${s.color} ${s.position}%`).join(', ')})`
    : `radial-gradient(circle, ${sortedStops.map(s => `${s.color} ${s.position}%`).join(', ')})`

  const fullCss = `background: ${gradientCss};`

  const handleCopy = () => {
    navigator.clipboard.writeText(fullCss)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <ToolLayout title="CSS Gradient Generator" description="Build beautiful linear and radial gradients visually." icon={Paintbrush}>
      <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
        <div
          className="h-48 rounded-xl mb-6 border border-gray-200 dark:border-gray-700"
          style={{ background: gradientCss }}
        />

        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => setType('linear')}
            className={`py-3 rounded-xl font-semibold transition-all ${type === 'linear' ? 'bg-violet-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700'}`}
          >
            Linear
          </button>
          <button
            onClick={() => setType('radial')}
            className={`py-3 rounded-xl font-semibold transition-all ${type === 'radial' ? 'bg-violet-600 text-white' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700'}`}
          >
            Radial
          </button>
        </div>

        {type === 'linear' && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Angle: {angle}°</label>
            <input
              type="range"
              min={0}
              max={360}
              value={angle}
              onChange={(e) => setAngle(Number(e.target.value))}
              className="w-full accent-violet-600"
            />
          </div>
        )}

        <div className="space-y-3 mb-4">
          {stops.map((stop, i) => (
            <div key={i} className="flex items-center gap-3 bg-white dark:bg-gray-800 rounded-xl p-3 border border-gray-200 dark:border-gray-700">
              <input
                type="color"
                value={stop.color}
                onChange={(e) => updateStop(i, 'color', e.target.value)}
                className="w-10 h-10 rounded-lg cursor-pointer border-0"
              />
              <input
                type="number"
                min={0}
                max={100}
                value={stop.position}
                onChange={(e) => updateStop(i, 'position', Number(e.target.value))}
                className="w-20 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white text-sm border-0"
              />
              <span className="text-gray-400 text-sm">%</span>
              <div className="flex-1" />
              <button onClick={() => removeStop(i)} disabled={stops.length <= 2} className="p-1 text-gray-400 hover:text-red-500 disabled:opacity-30">
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <button onClick={addStop} className="flex items-center gap-2 text-sm text-violet-600 dark:text-violet-400 hover:text-violet-700 mb-6 font-medium">
          <Plus className="w-4 h-4" /> Add Color Stop
        </button>

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
