import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { FileText, Upload, Download, X, GripVertical, Plus } from 'lucide-react'
import { PDFDocument } from 'pdf-lib'

export default function PdfMerge() {
  const [files, setFiles] = useState<{ file: File; name: string }[]>([])
  const [mergedUrl, setMergedUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFiles = (input: FileList | null) => {
    if (!input) return
    const newFiles = Array.from(input).filter(f => f.type === 'application/pdf').map(f => ({ file: f, name: f.name }))
    setFiles(prev => [...prev, ...newFiles])
    setMergedUrl(null)
  }

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const merge = async () => {
    if (files.length === 0) return
    setLoading(true)
    try {
      const merged = await PDFDocument.create()
      for (const { file } of files) {
        const bytes = await file.arrayBuffer()
        const doc = await PDFDocument.load(bytes)
        const copiedPages = await merged.copyPages(doc, doc.getPageIndices())
        copiedPages.forEach(page => merged.addPage(page))
      }
      const pdfBytes = await merged.save()
      const blob = new Blob([pdfBytes], { type: 'application/pdf' })
      setMergedUrl(URL.createObjectURL(blob))
    } catch {
      alert('Error merging PDFs. Make sure all files are valid PDFs.')
    }
    setLoading(false)
  }

  const download = () => {
    if (!mergedUrl) return
    const a = document.createElement('a')
    a.href = mergedUrl
    a.download = 'merged.pdf'
    a.click()
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg flex items-center justify-center">
          <FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Merge PDF</h1>
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-8">Combine multiple PDF files into one. All processing happens in your browser.</p>

      <div
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/20 transition-colors mb-6"
      >
        <Plus className="w-8 h-8 text-gray-400 mx-auto mb-2" />
        <p className="text-gray-700 dark:text-gray-300">Click to add PDF files</p>
        <input ref={fileInputRef} type="file" accept=".pdf" multiple onChange={(e) => handleFiles(e.target.files)} className="hidden" />
      </div>

      {files.length > 0 && (
        <div className="space-y-3 mb-6">
          {files.map((f, i) => (
            <div key={i} className="flex items-center gap-3 bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
              <GripVertical className="w-5 h-5 text-gray-300 dark:text-gray-600" />
              <FileText className="w-5 h-5 text-indigo-500 dark:text-indigo-400" />
              <span className="flex-1 text-sm text-gray-700 dark:text-gray-300">{f.name}</span>
              <button onClick={() => removeFile(i)} className="text-gray-400 hover:text-red-500"><X className="w-4 h-4" /></button>
            </div>
          ))}
        </div>
      )}

      {files.length >= 2 && (
        <button onClick={merge} disabled={loading} className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 disabled:opacity-50 mb-6">
          {loading ? 'Merging...' : `Merge ${files.length} PDFs`}
        </button>
      )}

      {mergedUrl && (
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 text-center">
          <p className="text-green-600 font-medium mb-4">PDFs merged successfully!</p>
          <button onClick={download} className="flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 mx-auto">
            <Download className="w-5 h-5" /> Download Merged PDF
          </button>
        </div>
      )}

      <div className="mt-8 text-center">
        <Link to="/" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 text-sm">&larr; Back to all tools</Link>
      </div>
    </div>
  )
}
