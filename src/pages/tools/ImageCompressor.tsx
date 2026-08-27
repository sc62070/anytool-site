import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Image, Upload, Download, X } from 'lucide-react'

export default function ImageCompressor() {
  const [original, setOriginal] = useState<File | null>(null)
  const [compressed, setCompressed] = useState<string | null>(null)
  const [originalSize, setOriginalSize] = useState(0)
  const [compressedSize, setCompressedSize] = useState(0)
  const [quality, setQuality] = useState(80)
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = (file: File | undefined) => {
    if (!file || !file.type.startsWith('image/')) return
    setOriginal(file)
    setOriginalSize(file.size)
    setCompressed(null)
    setCompressedSize(0)
  }

  const compress = () => {
    if (!original) return
    setLoading(true)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new window.Image()
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx?.drawImage(img, 0, 0)
      canvas.toBlob(
        (blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob)
            setCompressed(url)
            setCompressedSize(blob.size)
          }
          setLoading(false)
        },
        'image/jpeg',
        quality / 100
      )
    }
    img.src = URL.createObjectURL(original)
  }

  const download = () => {
    if (!compressed) return
    const a = document.createElement('a')
    a.href = compressed
    a.download = `compressed-${original?.name || 'image.jpg'}`
    a.click()
  }

  const clear = () => {
    setOriginal(null)
    setCompressed(null)
    setOriginalSize(0)
    setCompressedSize(0)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const reduction = originalSize > 0 ? Math.round((1 - compressedSize / originalSize) * 100) : 0

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg flex items-center justify-center">
          <Image className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Image Compressor</h1>
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-8">Compress images directly in your browser. No upload needed.</p>

      {!original ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-16 text-center cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/20 transition-colors"
        >
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2">Click to upload an image</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">JPG, PNG, WebP supported</p>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={(e) => handleFile(e.target.files?.[0])} className="hidden" />
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">{original.name}</span>
            <button onClick={clear} className="text-gray-400 hover:text-red-500"><X className="w-5 h-5" /></button>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Quality: {quality}%</label>
            <input type="range" min="10" max="100" value={quality} onChange={(e) => setQuality(Number(e.target.value))} className="w-full" />
          </div>

          <button onClick={compress} disabled={loading} className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 disabled:opacity-50">
            {loading ? 'Compressing...' : 'Compress Image'}
          </button>

          {compressed && (
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="grid grid-cols-3 gap-4 mb-4 text-center">
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Original</div>
                  <div className="font-bold text-gray-900 dark:text-gray-100">{(originalSize / 1024).toFixed(1)} KB</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Compressed</div>
                  <div className="font-bold text-indigo-600 dark:text-indigo-400">{(compressedSize / 1024).toFixed(1)} KB</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Reduction</div>
                  <div className="font-bold text-green-600">{reduction}%</div>
                </div>
              </div>
              <div className="flex gap-4">
                <img src={compressed} alt="Compressed" className="max-h-64 mx-auto rounded-lg" />
              </div>
              <button onClick={download} className="mt-4 w-full flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700">
                <Download className="w-5 h-5" /> Download Compressed Image
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
