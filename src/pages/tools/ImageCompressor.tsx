import { useState, useRef } from 'react'
import { Image, Upload, Download, X } from 'lucide-react'
import ToolLayout from '../../components/ToolLayout'

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
    <ToolLayout title="Image Compressor" description="Compress images directly in your browser. No upload needed." icon={Image} info="Shrink JPG, PNG, and WebP images without uploading them to any server—every compression happens locally in your browser using the Canvas API. Drag and drop a file, dial in your preferred quality level, and download the optimized version in seconds. Perfect for reducing page load times, meeting upload size limits, and saving bandwidth.">

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

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Why Image Compression Matters for Web Performance</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
          Unoptimized images are the number one cause of slow websites. A single uncompressed hero image can easily exceed 2 MB, forcing visitors on mobile connections to wait seconds before your content appears. Google's Core Web Vitals measure Largest Contentful Paint (LCP), and heavy images directly hurt that metric—worse LCP means lower search rankings. Aim to keep individual images under 200 KB for above-the-fold content. This tool lets you dial in the exact quality level where the file size drops dramatically but the visual difference is imperceptible to the human eye.
        </p>
        <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
          JPEG is best for photographs because its lossy compression exploits how human vision perceives color detail. PNG excels for graphics with sharp edges, text, or transparency, but its files are larger. WebP offers the best of both worlds—typically 25-35% smaller than JPEG at equivalent quality with full transparency support. If your target platform supports WebP, use it. For universal compatibility, JPEG at 80% quality is a reliable default for photos.
        </p>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          All compression happens entirely in your browser using the Canvas API—no image data ever leaves your device. This means you can safely compress images containing sensitive information like screenshots, medical records, or proprietary designs without any privacy concerns.
        </p>
      </section>
    </ToolLayout>
  )
}
