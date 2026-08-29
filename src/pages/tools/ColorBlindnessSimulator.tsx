import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { Eye, EyeOff } from 'lucide-react'

const colorBlindnessTypes = [
  { name: 'Normal Vision', filter: 'none' },
  { name: 'Protanopia (Red-blind)', filter: 'protanopia' },
  { name: 'Deuteranopia (Green-blind)', filter: 'deuteranopia' },
  { name: 'Tritanopia (Blue-blind)', filter: 'tritanopia' },
  { name: 'Achromatopsia (Total)', filter: 'achromatopsia' },
]

const presets = [
  { name: 'Vibrant', colors: ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6'] },
  { name: 'Pastel', colors: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7'] },
  { name: 'Dark', colors: ['#2d3436', '#636e72', '#b2bec3', '#dfe6e9', '#00b894'] },
  { name: 'Warm', colors: ['#e17055', '#fdcb6e', '#e84393', '#d63031', '#fab1a0'] },
]

export default function ColorBlindnessSimulator() {
  const [colors, setColors] = useState<string[]>(['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6'])
  const [activeFilter, setActiveFilter] = useState('none')

  const addColor = () => { if (colors.length < 10) setColors([...colors, '#6366f1']) }
  const removeColor = (i: number) => setColors(colors.filter((_, idx) => idx !== i))
  const updateColor = (i: number, c: string) => { const n = [...colors]; n[i] = c; setColors(n) }

  const svgFilters = `
    <svg xmlns="http://www.w3.org/2000/svg" style="display:none">
      <filter id="protanopia"><feColorMatrix type="matrix" values="0.567,0.433,0,0,0 0.558,0.442,0,0,0 0,0.242,0.758,0,0 0,0,0,1,0"/></filter>
      <filter id="deuteranopia"><feColorMatrix type="matrix" values="0.625,0.375,0,0,0 0.7,0.3,0,0,0 0,0.3,0.7,0,0 0,0,0,1,0"/></filter>
      <filter id="tritanopia"><feColorMatrix type="matrix" values="0.95,0.05,0,0,0 0,0.433,0.567,0,0 0,0.475,0.525,0,0 0,0,0,1,0"/></filter>
      <filter id="achromatopsia"><feColorMatrix type="matrix" values="0.299,0.587,0.114,0,0 0.299,0.587,0.114,0,0 0.299,0.587,0.114,0,0 0,0,0,1,0"/></filter>
    </svg>
  `

  return (
    <ToolLayout title="Color Blindness Simulator" description="See how your colors look to color blind users." icon={EyeOff}>
      <div className="space-y-6" dangerouslySetInnerHTML={{ __html: svgFilters }}>
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Your Colors</label>
            <button onClick={addColor} className="text-sm text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300">+ Add Color</button>
          </div>
          <div className="flex flex-wrap gap-3">
            {colors.map((c, i) => (
              <div key={i} className="relative group">
                <input type="color" value={c} onChange={e => updateColor(i, e.target.value)} className="w-16 h-16 rounded-xl border-2 border-gray-200 dark:border-gray-700 cursor-pointer" />
                <button onClick={() => removeColor(i)} className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">×</button>
                <span className="block text-center text-xs text-gray-500 dark:text-gray-400 mt-1 font-mono">{c}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {presets.map(p => (
            <button key={p.name} onClick={() => setColors(p.colors)} className="text-sm px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 transition-all">
              {p.name}
            </button>
          ))}
        </div>
        <div className="grid gap-4">
          {colorBlindnessTypes.map(type => (
            <div key={type.filter} className={`p-4 rounded-xl border transition-all ${activeFilter === type.filter ? 'border-violet-300 dark:border-violet-500/50 bg-violet-50 dark:bg-violet-500/5' : 'border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900'}`}>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{type.name}</span>
                <button onClick={() => setActiveFilter(type.filter)} className="text-xs text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 flex items-center gap-1"><Eye className="w-3 h-3" /> Preview</button>
              </div>
              <div className="flex gap-2" style={{ filter: type.filter === 'none' ? undefined : `url(#${type.filter})` }}>
                {colors.map((c, i) => (
                  <div key={i} className="flex-1 h-12 rounded-lg" style={{ backgroundColor: c }} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </ToolLayout>
  )
}
