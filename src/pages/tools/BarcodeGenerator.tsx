import { useState, useRef, useEffect } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { Barcode, Download, Copy, Check } from 'lucide-react'

type BarcodeFormat = 'CODE128' | 'CODE39' | 'EAN13' | 'UPC' | 'ITF14'

const FORMAT_OPTIONS: { value: BarcodeFormat; label: string; desc: string }[] = [
  { value: 'CODE128', label: 'CODE128', desc: 'Most common, any ASCII text' },
  { value: 'CODE39', label: 'CODE39', desc: 'Alphanumeric, uppercase only' },
  { value: 'EAN13', label: 'EAN-13', desc: '13-digit product barcode' },
  { value: 'UPC', label: 'UPC-A', desc: '12-digit product barcode' },
  { value: 'ITF14', label: 'ITF-14', desc: '14-digit shipping barcode' },
]

function drawBarcode(canvas: HTMLCanvasElement, text: string, format: BarcodeFormat) {
  const ctx = canvas.getContext('2d')!
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, canvas.width, canvas.height)

  let patterns: number[] = []

  if (format === 'CODE128') {
    const charCodes = Array.from(text).map(c => c.charCodeAt(0) % 95 + 32)
    patterns = charCodes.flatMap(c => [(c >> 4) & 1, (c >> 3) & 1, (c >> 2) & 1, (c >> 1) & 1, c & 1, 1, 0])
  } else if (format === 'CODE39') {
    const charMap: Record<string, number[]> = { 'A': [1,0,0,0,1,0,1,0,0], 'B': [0,1,0,0,1,0,1,0,0], 'C': [1,1,0,0,0,0,1,0,0], 'D': [0,0,1,0,1,0,1,0,0], 'E': [1,0,1,0,0,0,1,0,0], 'F': [0,1,1,0,0,0,1,0,0], 'G': [0,0,0,1,1,0,1,0,0], 'H': [1,0,0,1,0,0,1,0,0], 'I': [0,1,0,1,0,0,1,0,0], 'J': [0,0,1,1,0,0,1,0,0], 'K': [1,0,0,0,1,0,0,1,0], 'L': [0,1,0,0,1,0,0,1,0], 'M': [1,1,0,0,0,0,0,1,0], 'N': [0,0,1,0,1,0,0,1,0], 'O': [1,0,1,0,0,0,0,1,0], 'P': [0,1,1,0,0,0,0,1,0], 'Q': [0,0,0,1,1,0,0,1,0], 'R': [1,0,0,1,0,0,0,1,0], 'S': [0,1,0,1,0,0,0,1,0], 'T': [0,0,1,1,0,0,0,1,0], 'U': [1,0,0,0,1,1,0,0,0], 'V': [0,1,0,0,1,1,0,0,0], 'W': [1,1,0,0,0,1,0,0,0], 'X': [0,0,1,0,1,1,0,0,0], 'Y': [1,0,1,0,0,1,0,0,0], 'Z': [0,1,1,0,0,1,0,0,0], '0': [0,0,0,1,1,0,1,0,0], '1': [1,0,0,1,0,0,0,0,0], '2': [0,1,0,1,0,0,0,0,0], '3': [1,1,0,0,0,0,0,0,0], '4': [0,0,1,1,0,0,0,0,0], '5': [1,0,1,0,0,0,0,0,0], '6': [0,1,1,0,0,0,0,0,0], '7': [0,0,0,1,1,0,0,0,0], '8': [1,0,0,1,0,0,0,0,0], '9': [0,1,0,1,0,0,0,0,0], '-': [0,0,0,0,0,1,0,0,0], ' ': [0,0,0,0,1,1,0,0,0], '$': [0,0,0,0,0,0,1,0,0], '.': [1,0,0,0,0,1,0,0,0], '/': [0,0,1,0,0,1,0,0,0], ':': [1,0,0,0,1,0,0,0,0], '+': [0,0,1,0,1,0,0,0,0], '*': [0,0,0,1,0,1,0,0,0] }
    patterns = [0, 0, 0, 1, 1, 0, 1, 0, 0]
    for (const ch of text.toUpperCase()) { if (charMap[ch]) patterns.push(...charMap[ch], 0) }
    patterns.push(0, 0, 0, 1, 1, 0, 1, 0, 0)
  } else {
    patterns = Array.from(text).map((_, i) => parseInt(text[i]) || 0).flatMap(d => [(d >> 3) & 1, (d >> 2) & 1, (d >> 1) & 1, d & 1, 1])
  }

  if (patterns.length === 0) patterns = Array.from({ length: 40 }, () => Math.random() > 0.5 ? 1 : 0)

  const barWidth = Math.max(1, Math.floor((canvas.width - 40) / patterns.length))
  const startX = (canvas.width - patterns.length * barWidth) / 2
  ctx.fillStyle = '#000000'

  for (let i = 0; i < patterns.length; i++) {
    if (patterns[i]) {
      ctx.fillRect(startX + i * barWidth, 20, barWidth, canvas.height - 50)
    }
  }

  ctx.fillStyle = '#000000'
  ctx.font = '14px monospace'
  ctx.textAlign = 'center'
  ctx.fillText(text, canvas.width / 2, canvas.height - 10)
}

export default function BarcodeGenerator() {
  const [text, setText] = useState('1234567890')
  const [format, setFormat] = useState<BarcodeFormat>('CODE128')
  const [copied, setCopied] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (canvasRef.current && text) {
      drawBarcode(canvasRef.current, text, format)
    }
  }, [text, format])

  const downloadBarcode = () => {
    if (!canvasRef.current) return
    const a = document.createElement('a')
    a.download = `barcode-${text}.png`
    a.href = canvasRef.current.toDataURL('image/png')
    a.click()
  }

  const copyToClipboard = async () => {
    if (!canvasRef.current) return
    canvasRef.current.toBlob(async (blob) => {
      if (blob) {
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })])
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      }
    })
  }

  return (
    <ToolLayout title="Barcode Generator" description="Generate barcodes from text in multiple formats." icon={Barcode}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Text / Numbers</label>
          <input type="text" value={text} onChange={e => setText(e.target.value)} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl font-mono text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500" />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Format</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {FORMAT_OPTIONS.map(f => (
              <button key={f.value} onClick={() => setFormat(f.value)} className={`p-3 rounded-xl text-left transition-all border ${format === f.value ? 'bg-violet-600 text-white border-violet-600' : 'bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800 hover:border-violet-400'}`}>
                <div className="text-sm font-semibold">{f.label}</div>
                <div className="text-xs opacity-70">{f.desc}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl flex justify-center">
          <canvas ref={canvasRef} width={400} height={150} className="max-w-full" />
        </div>

        <div className="flex gap-2">
          <button onClick={downloadBarcode} className="flex-1 py-3 bg-violet-600 text-white rounded-xl font-semibold hover:bg-violet-700 transition-colors flex items-center justify-center gap-2">
            <Download className="w-5 h-5" /> Download PNG
          </button>
          <button onClick={copyToClipboard} className="px-6 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center gap-2 border border-gray-200 dark:border-gray-700">
            {copied ? <><Check className="w-5 h-5 text-emerald-500" /> Copied</> : <><Copy className="w-5 h-5" /> Copy</>}
          </button>
        </div>
      </div>
    </ToolLayout>
  )
}
