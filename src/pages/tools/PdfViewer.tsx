import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FileText, Upload, X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react'

export default function PdfViewer() {
  const [file, setFile] = useState<File | null>(null)
  const [pdfDoc, setPdfDoc] = useState<any>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [scale, setScale] = useState(1.5)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!file) return
    const loadPdf = async () => {
      const pdfjsLib = await import('pdfjs-dist')
      pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`
      const arrayBuffer = await file.arrayBuffer()
      const doc = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
      setPdfDoc(doc)
      setTotalPages(doc.numPages)
      setCurrentPage(1)
    }
    loadPdf()
  }, [file])

  useEffect(() => {
    if (!pdfDoc || !canvasRef.current) return
    const renderPage = async () => {
      const page = await pdfDoc.getPage(currentPage)
      const viewport = page.getViewport({ scale })
      const canvas = canvasRef.current!
      canvas.height = viewport.height
      canvas.width = viewport.width
      const ctx = canvas.getContext('2d')!
      await page.render({ canvasContext: ctx, viewport }).promise
    }
    renderPage()
  }, [pdfDoc, currentPage, scale])

  const handleFile = (f: File | undefined) => {
    if (!f || f.type !== 'application/pdf') return
    setFile(f)
    setPdfDoc(null)
    setTotalPages(0)
  }

  const clear = () => {
    setFile(null)
    setPdfDoc(null)
    setTotalPages(0)
    setCurrentPage(1)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg flex items-center justify-center">
          <FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">PDF Viewer</h1>
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-8">View PDF files directly in your browser. Nothing is uploaded.</p>

      {!file ? (
        <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-16 text-center cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/50 dark:hover:bg-indigo-900/20 transition-colors">
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-lg font-medium text-gray-700 dark:text-gray-300">Click to upload a PDF</p>
          <input ref={fileInputRef} type="file" accept=".pdf" onChange={(e) => handleFile(e.target.files?.[0])} className="hidden" />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700">
            <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">{file.name}</span>
            <button onClick={clear} className="text-gray-400 hover:text-red-500"><X className="w-5 h-5" /></button>
          </div>

          <div className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-xl p-3 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage <= 1} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-30"><ChevronLeft className="w-5 h-5" /></button>
              <span className="text-sm text-gray-700 dark:text-gray-300">Page {currentPage} of {totalPages}</span>
              <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage >= totalPages} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-30"><ChevronRight className="w-5 h-5" /></button>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setScale(s => Math.max(0.5, s - 0.25))} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"><ZoomOut className="w-5 h-5" /></button>
              <span className="text-sm text-gray-700 dark:text-gray-300">{Math.round(scale * 100)}%</span>
              <button onClick={() => setScale(s => Math.min(3, s + 0.25))} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"><ZoomIn className="w-5 h-5" /></button>
            </div>
          </div>

          <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-4 flex justify-center overflow-auto">
            <canvas ref={canvasRef} className="shadow-lg" />
          </div>
        </div>
      )}

      <div className="mt-8 text-center">
        <Link to="/" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 text-sm">&larr; Back to all tools</Link>
      </div>
    </div>
  )
}
