import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { QrCode, Download } from 'lucide-react'
import QRCodeLib from 'qrcode'

export default function QrCodeGenerator() {
  const [text, setText] = useState('https://anytool.site')
  const [size, setSize] = useState(256)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [error, setError] = useState('')

  const generate = () => {
    if (!text.trim()) {
      setError('Please enter text or URL')
      return
    }
    setError('')
    if (canvasRef.current) {
      QRCodeLib.toCanvas(canvasRef.current, text, {
        width: size,
        margin: 2,
        color: { dark: '#000000', light: '#ffffff' },
      })
    }
  }

  useEffect(() => {
    generate()
  }, [text, size])

  const download = () => {
    if (canvasRef.current) {
      const link = document.createElement('a')
      link.download = 'qrcode.png'
      link.href = canvasRef.current.toDataURL('image/png')
      link.click()
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
          <QrCode className="w-5 h-5 text-indigo-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">QR Code Generator</h1>
      </div>
      <p className="text-gray-600 mb-8">Generate QR codes from any text or URL instantly.</p>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Text or URL</label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter URL or text..."
                className="w-full h-32 p-4 border border-gray-300 rounded-xl text-sm resize-y focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Size: {size}px</label>
              <input
                type="range"
                min="128"
                max="512"
                step="64"
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                className="w-full accent-indigo-600"
              />
            </div>
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button onClick={download} className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
              <Download className="w-4 h-4" /> Download PNG
            </button>
          </div>
          <div className="flex items-center justify-center">
            <canvas ref={canvasRef} className="border border-gray-200 rounded-xl" />
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link to="/" className="text-indigo-600 hover:text-indigo-700 text-sm">&larr; Back to all tools</Link>
      </div>
    </div>
  )
}
