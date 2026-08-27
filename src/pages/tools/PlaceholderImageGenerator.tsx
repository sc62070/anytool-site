import { useState, useRef, useEffect } from 'react'
import { Image, Download } from 'lucide-react'
import ToolLayout from '../../components/ToolLayout'

export default function PlaceholderImageGenerator() {
  const [width, setWidth] = useState(400)
  const [height, setHeight] = useState(300)
  const [bgColor, setBgColor] = useState('#e5e7eb')
  const [text, setText] = useState('400 × 300')
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = width
    canvas.height = height

    ctx.fillStyle = bgColor
    ctx.fillRect(0, 0, width, height)

    ctx.fillStyle = '#6b7280'
    ctx.font = `${Math.max(14, Math.min(width, height) / 10)}px sans-serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(text, width / 2, height / 2)
  }, [width, height, bgColor, text])

  const download = () => {
    if (!canvasRef.current) return
    const link = document.createElement('a')
    link.download = `placeholder-${width}x${height}.png`
    link.href = canvasRef.current.toDataURL('image/png')
    link.click()
  }

  return (
    <ToolLayout title="Placeholder Image Generator" description="Generate placeholder images with custom dimensions and colors." icon={Image}>
      <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Width</label>
                <input
                  type="number"
                  min={16}
                  max={2000}
                  value={width}
                  onChange={(e) => setWidth(Number(e.target.value))}
                  className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-violet-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Height</label>
                <input
                  type="number"
                  min={16}
                  max={2000}
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                  className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-violet-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Background Color</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-10 h-10 rounded-lg cursor-pointer border-2 border-gray-200 dark:border-gray-700"
                />
                <input
                  type="text"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="flex-1 p-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm font-mono focus:ring-2 focus:ring-violet-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Text</label>
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text to display"
                className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-violet-500 outline-none"
              />
            </div>

            <button onClick={download} className="w-full bg-violet-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-violet-700 transition-colors flex items-center justify-center gap-2">
              <Download className="w-4 h-4" /> Download PNG
            </button>
          </div>

          <div className="flex items-center justify-center">
            <canvas ref={canvasRef} className="border border-gray-200 dark:border-gray-700 rounded-xl max-w-full" style={{ objectFit: 'contain' }} />
          </div>
        </div>
      </div>
    </ToolLayout>
  )
}
