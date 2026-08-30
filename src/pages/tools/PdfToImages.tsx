import { useState, useRef } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { FileImage, Upload, Download, Trash2 } from 'lucide-react'

export default function PdfToImages() {
  const [pages, setPages] = useState<{ data: string; name: string }[]>([])
  const [format, setFormat] = useState<'png' | 'jpeg'>('png')
  const [loading, setLoading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setLoading(true)
    try {
      const arrayBuffer = await file.arrayBuffer()
      const { getDocument } = await import('pdfjs-dist')
      const pdf = await getDocument({ data: arrayBuffer }).promise
      const results: { data: string; name: string }[] = []

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i)
        const viewport = page.getViewport({ scale: 2 })
        const canvas = document.createElement('canvas')
        canvas.width = viewport.width
        canvas.height = viewport.height
        const ctx = canvas.getContext('2d')!
        // @ts-expect-error - pdfjs-dist render API type mismatch
        await page.render({ canvasContext: ctx, viewport }).promise
        const mimeType = format === 'png' ? 'image/png' : 'image/jpeg'
        results.push({ data: canvas.toDataURL(mimeType, 0.95), name: `page-${i}.${format}` })
      }
      setPages(results)
    } catch {
      alert('Failed to parse PDF. Make sure it is a valid PDF file.')
    }
    setLoading(false)
  }

  const download = (data: string, name: string) => {
    const a = document.createElement('a')
    a.href = data
    a.download = name
    a.click()
  }

  const downloadAll = () => {
    pages.forEach(p => download(p.data, p.name))
  }

  return (
    <ToolLayout title="PDF to Images" description="Extract PDF pages as PNG or JPG images." icon={FileImage}>
      <div className="space-y-4">
        <input ref={fileRef} type="file" accept=".pdf" onChange={handleFile} className="hidden" />
        <div className="flex gap-3">
          <button onClick={() => fileRef.current?.click()} disabled={loading} className="flex-1 py-3 bg-violet-600 text-white rounded-xl font-semibold hover:bg-violet-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
            {loading ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Upload className="w-5 h-5" />}
            {loading ? 'Processing...' : 'Upload PDF'}
          </button>
          <select value={format} onChange={e => setFormat(e.target.value as 'png' | 'jpeg')} className="px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm text-gray-900 dark:text-white outline-none">
            <option value="png">PNG</option>
            <option value="jpeg">JPEG</option>
          </select>
        </div>

        {pages.length > 0 && (
          <>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500 dark:text-gray-400">{pages.length} pages extracted</span>
              <button onClick={downloadAll} className="flex items-center gap-1.5 text-sm text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300"><Download className="w-4 h-4" /> Download All</button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {pages.map((p, i) => (
                <div key={i} className="relative group border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden">
                  <img src={p.data} alt={`Page ${i + 1}`} className="w-full" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button onClick={() => download(p.data, p.name)} className="p-2 bg-white rounded-lg text-gray-900 hover:bg-gray-100"><Download className="w-4 h-4" /></button>
                    <button onClick={() => setPages(pages.filter((_, j) => j !== i))} className="p-2 bg-white rounded-lg text-red-500 hover:bg-gray-100"><Trash2 className="w-4 h-4" /></button>
                  </div>
                  <div className="p-2 text-xs text-gray-500 dark:text-gray-400 text-center">Page {i + 1}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </ToolLayout>
  )
}
