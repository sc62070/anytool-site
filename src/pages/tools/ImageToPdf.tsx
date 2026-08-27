import { useState, useRef } from 'react'
import { FileImage, Download, X, GripVertical, Plus, ArrowUp, ArrowDown } from 'lucide-react'
import { PDFDocument } from 'pdf-lib'
import ToolLayout from '../../components/ToolLayout'

interface ImageItem {
  file: File
  name: string
  url: string
}

export default function ImageToPdf() {
  const [images, setImages] = useState<ImageItem[]>([])
  const [resultUrl, setResultUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFiles = (input: FileList | null) => {
    if (!input) return
    const valid = Array.from(input).filter(f => f.type.startsWith('image/'))
    const newItems = valid.map(f => ({ file: f, name: f.name, url: URL.createObjectURL(f) }))
    setImages(prev => [...prev, ...newItems])
    setResultUrl(null)
  }

  const removeImage = (index: number) => {
    setImages(prev => {
      URL.revokeObjectURL(prev[index].url)
      return prev.filter((_, i) => i !== index)
    })
  }

  const moveImage = (index: number, direction: -1 | 1) => {
    setImages(prev => {
      const newItems = [...prev]
      const target = index + direction
      if (target < 0 || target >= newItems.length) return prev
      ;[newItems[index], newItems[target]] = [newItems[target], newItems[index]]
      return newItems
    })
  }

  const convert = async () => {
    if (images.length === 0) return
    setLoading(true)
    try {
      const doc = await PDFDocument.create()
      for (const item of images) {
        const bytes = await item.file.arrayBuffer()
        let img
        if (item.file.type === 'image/png') {
          img = await doc.embedPng(bytes)
        } else {
          img = await doc.embedJpg(bytes)
        }
        const page = doc.addPage([img.width, img.height])
        page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height })
      }
      const pdfBytes = await doc.save()
      const blob = new Blob([pdfBytes as Uint8Array<ArrayBuffer>], { type: 'application/pdf' })
      setResultUrl(URL.createObjectURL(blob))
    } catch {
      alert('Error converting images. Make sure all files are valid images (PNG or JPG).')
    }
    setLoading(false)
  }

  const download = () => {
    if (!resultUrl) return
    const a = document.createElement('a')
    a.href = resultUrl
    a.download = 'images.pdf'
    a.click()
  }

  return (
    <ToolLayout title="Image to PDF" description="Convert multiple images into a single PDF document." icon={FileImage}>
      <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center cursor-pointer hover:border-violet-400 hover:bg-violet-50/50 dark:hover:bg-violet-900/20 transition-colors mb-6"
        >
          <Plus className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-700 dark:text-gray-300">Click to add image files (PNG, JPG)</p>
          <input ref={fileInputRef} type="file" accept="image/png,image/jpeg" multiple onChange={(e) => handleFiles(e.target.files)} className="hidden" />
        </div>

        {images.length > 0 && (
          <div className="space-y-3 mb-6">
            {images.map((item, i) => (
              <div key={i} className="flex items-center gap-3 bg-white dark:bg-gray-800 rounded-xl p-3 border border-gray-200 dark:border-gray-700">
                <GripVertical className="w-5 h-5 text-gray-300 dark:text-gray-600 flex-shrink-0" />
                <img src={item.url} alt={item.name} className="w-10 h-10 rounded-lg object-cover" />
                <span className="flex-1 text-sm text-gray-700 dark:text-gray-300 truncate">{item.name}</span>
                <div className="flex items-center gap-1">
                  <button onClick={() => moveImage(i, -1)} disabled={i === 0} className="p-1 text-gray-400 hover:text-violet-600 disabled:opacity-30"><ArrowUp className="w-4 h-4" /></button>
                  <button onClick={() => moveImage(i, 1)} disabled={i === images.length - 1} className="p-1 text-gray-400 hover:text-violet-600 disabled:opacity-30"><ArrowDown className="w-4 h-4" /></button>
                  <button onClick={() => removeImage(i)} className="p-1 text-gray-400 hover:text-red-500"><X className="w-4 h-4" /></button>
                </div>
              </div>
            ))}
          </div>
        )}

        {images.length > 0 && (
          <button onClick={convert} disabled={loading} className="w-full bg-violet-600 text-white py-3 rounded-xl font-semibold hover:bg-violet-700 disabled:opacity-50 mb-6">
            {loading ? 'Converting...' : `Convert ${images.length} Image${images.length > 1 ? 's' : ''} to PDF`}
          </button>
        )}

        {resultUrl && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 text-center">
            <p className="text-green-600 font-medium mb-4">PDF created successfully!</p>
            <button onClick={download} className="flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 mx-auto">
              <Download className="w-5 h-5" /> Download PDF
            </button>
          </div>
        )}
      </div>
    </ToolLayout>
  )
}
