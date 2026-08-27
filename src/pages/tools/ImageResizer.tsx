import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Image, Upload, Download, X } from 'lucide-react'

export default function ImageResizer() {
  const [original, setOriginal] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [width, setWidth] = useState(800)
  const [height, setHeight] = useState(600)
  const [originalDimensions, setOriginalDimensions] = useState({ w: 0, h: 0 })
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = (file: File | undefined) => {
    if (!file || !file.type.startsWith('image/')) return
    setOriginal(file)
    const img = new window.Image()
    img.onload = () => {
      setOriginalDimensions({ w: img.width, h: img.height })
      setWidth(img.width)
      setHeight(img.height)
    }
    img.src = URL.createObjectURL(file)
    setPreview(null)
  }

  const resize = () => {
    if (!original) return
    setLoading(true)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new window.Image()
    img.onload = () => {
      canvas.width = width
      canvas.height = height
      ctx?.drawImage(img, 0, 0, width, height)
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob)
          setPreview(url)
        }
        setLoading(false)
      }, 'image/png')
    }
    img.src = URL.createObjectURL(original)
  }

  const download = () => {
    if (!preview) return
    const a = document.createElement('a')
    a.href = preview
    a.download = `resized-${original?.name || 'image.png'}`
    a.click()
  }

  const clear = () => {
    setOriginal(null)
    setPreview(null)
    setOriginalDimensions({ w: 0, h: 0 })
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg flex items-center justify-center">
          <Image className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Image Resizer</h1>
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-8">Resize images to exact dimensions. All processing happens in your browser.</p>

      {!original ? (
        <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-16 text-center cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/20 transition-colors">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-lg font-medium text-gray-700 dark:text-gray-300">Click to upload an image</p>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={(e) => handleFile(e.target.files?.[0])} className="hidden" />
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <span className="text-sm text-gray-700 dark:text-gray-300">{original.name} ({originalDimensions.w} x {originalDimensions.h})</span>
            <button onClick={clear} className="text-gray-400 hover:text-red-500"><X className="w-5 h-5" /></button>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Width (px)</label>
                <input type="number" value={width} onChange={(e) => setWidth(Number(e.target.value))} className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Height (px)</label>
                <input type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg" />
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              {[25, 50, 75, 100, 150, 200].map((pct) => (
                <button key={pct} onClick={() => { setWidth(Math.round(originalDimensions.w * pct / 100)); setHeight(Math.round(originalDimensions.h * pct / 100)) }} className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/50">{pct}%</button>
              ))}
            </div>
          </div>

          <button onClick={resize} disabled={loading} className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 disabled:opacity-50">
            {loading ? 'Resizing...' : 'Resize Image'}
          </button>

          {preview && (
            <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
              <img src={preview} alt="Resized" className="max-h-64 mx-auto rounded-lg mb-4" />
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">New size: {width} x {height} px</p>
              <button onClick={download} className="flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 mx-auto">
                <Download className="w-5 h-5" /> Download Resized Image
              </button>
            </div>
          )}
        </div>
      )}

      <div className="mt-8 text-center">
        <Link to="/" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 text-sm">&larr; Back to all tools</Link>
      </div>
    </div>
  )
}
