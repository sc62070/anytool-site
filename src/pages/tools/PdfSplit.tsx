import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { FileText, Upload, Download, X } from 'lucide-react'
import { PDFDocument } from 'pdf-lib'

export default function PdfSplit() {
  const [file, setFile] = useState<File | null>(null)
  const [totalPages, setTotalPages] = useState(0)
  const [ranges, setRanges] = useState('')
  const [extractedUrl, setExtractedUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = async (f: File | undefined) => {
    if (!f || f.type !== 'application/pdf') return
    setFile(f)
    const bytes = await f.arrayBuffer()
    const doc = await PDFDocument.load(bytes)
    setTotalPages(doc.getPageCount())
    setExtractedUrl(null)
    setRanges('')
  }

  const parseRanges = (input: string, total: number): number[] => {
    const pages = new Set<number>()
    input.split(',').forEach(part => {
      const trimmed = part.trim()
      if (trimmed.includes('-')) {
        const [start, end] = trimmed.split('-').map(Number)
        for (let i = Math.max(1, start); i <= Math.min(total, end); i++) pages.add(i)
      } else {
        const num = Number(trimmed)
        if (num >= 1 && num <= total) pages.add(num)
      }
    })
    return Array.from(pages).sort((a, b) => a - b)
  }

  const extract = async () => {
    if (!file || !ranges.trim()) return
    setLoading(true)
    try {
      const bytes = await file.arrayBuffer()
      const srcDoc = await PDFDocument.load(bytes)
      const newDoc = await PDFDocument.create()
      const pageIndices = parseRanges(ranges, totalPages).map(p => p - 1)
      const copied = await newDoc.copyPages(srcDoc, pageIndices)
      copied.forEach(p => newDoc.addPage(p))
      const pdfBytes = await newDoc.save()
      setExtractedUrl(URL.createObjectURL(new Blob([pdfBytes], { type: 'application/pdf' })))
    } catch {
      alert('Error splitting PDF. Check your page ranges.')
    }
    setLoading(false)
  }

  const download = () => {
    if (!extractedUrl) return
    const a = document.createElement('a')
    a.href = extractedUrl
    a.download = 'extracted.pdf'
    a.click()
  }

  const clear = () => {
    setFile(null)
    setTotalPages(0)
    setRanges('')
    setExtractedUrl(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
          <FileText className="w-5 h-5 text-indigo-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Split PDF</h1>
      </div>
      <p className="text-gray-600 mb-8">Extract specific pages from a PDF file. All processing happens in your browser.</p>

      {!file ? (
        <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-gray-300 rounded-xl p-16 text-center cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/50 transition-colors">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-lg font-medium text-gray-700">Click to upload a PDF</p>
          <input ref={fileInputRef} type="file" accept=".pdf" onChange={(e) => handleFile(e.target.files?.[0])} className="hidden" />
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex items-center justify-between bg-white rounded-xl p-4 border border-gray-200">
            <div>
              <span className="text-sm text-gray-700 font-medium">{file.name}</span>
              <span className="text-sm text-gray-500 ml-2">({totalPages} pages)</span>
            </div>
            <button onClick={clear} className="text-gray-400 hover:text-red-500"><X className="w-5 h-5" /></button>
          </div>

          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <label className="block text-sm font-medium text-gray-700 mb-2">Page ranges to extract</label>
            <input
              type="text"
              value={ranges}
              onChange={(e) => setRanges(e.target.value)}
              placeholder="e.g. 1-3, 5, 7-10"
              className="w-full p-3 border border-gray-300 rounded-lg mb-2"
            />
            <p className="text-xs text-gray-500">Use commas to separate ranges. Example: 1-3, 5, 7-10 extracts pages 1, 2, 3, 5, 7, 8, 9, 10.</p>
          </div>

          <button onClick={extract} disabled={loading || !ranges.trim()} className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 disabled:opacity-50">
            {loading ? 'Extracting...' : 'Extract Pages'}
          </button>

          {extractedUrl && (
            <div className="bg-white rounded-xl p-6 border border-gray-200 text-center">
              <p className="text-green-600 font-medium mb-4">Pages extracted successfully!</p>
              <button onClick={download} className="flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 mx-auto">
                <Download className="w-5 h-5" /> Download Extracted PDF
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
