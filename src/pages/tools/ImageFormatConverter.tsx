import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Image, Upload, Download, X, ArrowRight } from 'lucide-react'

const formats = [
  { value: 'image/jpeg', label: 'JPG', ext: 'jpg' },
  { value: 'image/png', label: 'PNG', ext: 'png' },
  { value: 'image/webp', label: 'WebP', ext: 'webp' },
  { value: 'image/bmp', label: 'BMP', ext: 'bmp' },
]

export default function ImageFormatConverter() {
  const [original, setOriginal] = useState<File | null>(null)
  const [converted, setConverted] = useState<string | null>(null)
  const [targetFormat, setTargetFormat] = useState('image/png')
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = (file: File | undefined) => {
    if (!file || !file.type.startsWith('image/')) return
    setOriginal(file)
    setConverted(null)
  }

  const convert = () => {
    if (!original) return
    setLoading(true)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new window.Image()
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx?.drawImage(img, 0, 0)
      canvas.toBlob((blob) => {
        if (blob) {
          setConverted(URL.createObjectURL(blob))
        }
        setLoading(false)
      }, targetFormat, 0.92)
    }
    img.src = URL.createObjectURL(original)
  }

  const download = () => {
    if (!converted || !original) return
    const ext = formats.find(f => f.value === targetFormat)?.ext || 'png'
    const name = original.name.replace(/\.[^.]+$/, `.${ext}`)
    const a = document.createElement('a')
    a.href = converted
    a.download = name
    a.click()
  }

  const clear = () => {
    setOriginal(null)
    setConverted(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const srcFormat = original?.type || 'Unknown'

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
          <Image className="w-5 h-5 text-indigo-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Image Format Converter</h1>
      </div>
      <p className="text-gray-600 mb-8">Convert images between JPG, PNG, WebP, and BMP formats instantly.</p>

      {!original ? (
        <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-gray-300 rounded-xl p-16 text-center cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/50 transition-colors">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-lg font-medium text-gray-700">Click to upload an image</p>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={(e) => handleFile(e.target.files?.[0])} className="hidden" />
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-white rounded-xl p-4 border border-gray-200">
            <span className="text-sm text-gray-700">{original.name}</span>
            <button onClick={clear} className="text-gray-400 hover:text-red-500"><X className="w-5 h-5" /></button>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex items-center justify-center gap-4">
              <div className="text-center">
                <div className="text-sm text-gray-500">From</div>
                <div className="font-bold text-gray-900">{srcFormat.split('/')[1]?.toUpperCase() || 'Auto'}</div>
              </div>
              <ArrowRight className="w-6 h-6 text-indigo-400" />
              <div>
                <label className="block text-sm text-gray-500 mb-1">To</label>
                <select value={targetFormat} onChange={(e) => setTargetFormat(e.target.value)} className="p-3 border border-gray-300 rounded-lg">
                  {formats.map(f => <option key={f.value} value={f.value}>{f.label}</option>)}
                </select>
              </div>
            </div>
          </div>

          <button onClick={convert} disabled={loading} className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 disabled:opacity-50">
            {loading ? 'Converting...' : 'Convert Image'}
          </button>

          {converted && (
            <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
              <img src={converted} alt="Converted" className="max-h-64 mx-auto rounded-lg mb-4" />
              <button onClick={download} className="flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 mx-auto">
                <Download className="w-5 h-5" /> Download Converted Image
              </button>
            </div>
          )}
        </div>
      )}

      <div className="mt-8 text-center">
        <Link to="/" className="text-indigo-600 hover:text-indigo-700 text-sm">&larr; Back to all tools</Link>
      </div>
    </div>
  )
}
