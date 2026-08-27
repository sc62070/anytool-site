import { useState, useRef, useEffect } from 'react'
import { Globe, Download } from 'lucide-react'
import ToolLayout from '../../components/ToolLayout'

export default function FaviconGenerator() {
  const [initials, setInitials] = useState('AB')
  const [bgColor, setBgColor] = useState('#8b5cf6')
  const [textColor, setTextColor] = useState('#ffffff')
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const size = 64
    canvas.width = size
    canvas.height = size

    ctx.fillStyle = bgColor
    ctx.beginPath()
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2)
    ctx.fill()

    ctx.fillStyle = textColor
    ctx.font = `bold ${size * 0.45}px sans-serif`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(initials.slice(0, 2).toUpperCase(), size / 2, size / 2 + 1)
  }, [initials, bgColor, textColor])

  const downloadPng = () => {
    if (!canvasRef.current) return
    const link = document.createElement('a')
    link.download = 'favicon.png'
    link.href = canvasRef.current.toDataURL('image/png')
    link.click()
  }

  const downloadIco = () => {
    if (!canvasRef.current) return
    const link = document.createElement('a')
    link.download = 'favicon.ico'
    link.href = canvasRef.current.toDataURL('image/x-icon')
    link.click()
  }

  return (
    <ToolLayout title="Favicon Generator" description="Generate a favicon from your text initials." icon={Globe}>
      <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Initials (1-2 characters)</label>
              <input
                type="text"
                maxLength={2}
                value={initials}
                onChange={(e) => setInitials(e.target.value)}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-2xl font-bold text-center uppercase tracking-wider focus:ring-2 focus:ring-violet-500 outline-none"
              />
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
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Text Color</label>
              <div className="flex items-center gap-3">
                <input
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="w-10 h-10 rounded-lg cursor-pointer border-2 border-gray-200 dark:border-gray-700"
                />
                <input
                  type="text"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="flex-1 p-2.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm font-mono focus:ring-2 focus:ring-violet-500 outline-none"
                />
              </div>
            </div>

            <div className="flex gap-3">
              <button onClick={downloadPng} className="flex-1 bg-violet-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-violet-700 transition-colors flex items-center justify-center gap-2">
                <Download className="w-4 h-4" /> Download PNG
              </button>
              <button onClick={downloadIco} className="flex-1 bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 px-6 py-3 rounded-xl font-medium hover:bg-violet-200 dark:hover:bg-violet-800/40 transition-colors flex items-center justify-center gap-2">
                <Download className="w-4 h-4" /> Download ICO
              </button>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-4">
            <canvas ref={canvasRef} width={64} height={64} className="w-32 h-32 rounded-xl border border-gray-200 dark:border-gray-700" />
            <div className="flex gap-3">
              {[16, 32, 48].map((s) => (
                <canvas
                  key={s}
                  ref={(el) => {
                    if (!el) return
                    const ctx = el.getContext('2d')
                    if (!ctx) return
                    el.width = s
                    el.height = s
                    ctx.fillStyle = bgColor
                    ctx.beginPath()
                    ctx.arc(s / 2, s / 2, s / 2, 0, Math.PI * 2)
                    ctx.fill()
                    ctx.fillStyle = textColor
                    ctx.font = `bold ${s * 0.45}px sans-serif`
                    ctx.textAlign = 'center'
                    ctx.textBaseline = 'middle'
                    ctx.fillText(initials.slice(0, 2).toUpperCase(), s / 2, s / 2 + 1)
                  }}
                  width={s}
                  height={s}
                  className="border border-gray-200 dark:border-gray-700 rounded"
                  style={{ width: s * 2, height: s * 2 }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </ToolLayout>
  )
}
