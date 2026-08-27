import { useState, useRef } from 'react'
import { Minimize2, Download, FileText } from 'lucide-react'
import { PDFDocument } from 'pdf-lib'
import ToolLayout from '../../components/ToolLayout'

export default function CompressPdf() {
  const [file, setFile] = useState<File | null>(null)
  const [resultUrl, setResultUrl] = useState<string | null>(null)
  const [originalSize, setOriginalSize] = useState(0)
  const [compressedSize, setCompressedSize] = useState(0)
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = (input: FileList | null) => {
    if (!input || !input[0]) return
    setFile(input[0])
    setResultUrl(null)
    setOriginalSize(0)
    setCompressedSize(0)
  }

  const compress = async () => {
    if (!file) return
    setLoading(true)
    try {
      const bytes = await file.arrayBuffer()
      setOriginalSize(bytes.byteLength)
      const doc = await PDFDocument.load(bytes, { ignoreEncryption: true })

      doc.setTitle('')
      doc.setAuthor('')
      doc.setSubject('')
      doc.setKeywords([])
      doc.setProducer('')
      doc.setCreator('')

      const pdfBytes = await doc.save({
        useObjectStreams: true,
        addDefaultPage: false,
        objectsPerTick: 50,
      })
      setCompressedSize(pdfBytes.length)
      const blob = new Blob([pdfBytes as Uint8Array<ArrayBuffer>], { type: 'application/pdf' })
      setResultUrl(URL.createObjectURL(blob))
    } catch {
      alert('Error compressing PDF. Make sure it is a valid PDF file.')
    }
    setLoading(false)
  }

  const download = () => {
    if (!resultUrl) return
    const a = document.createElement('a')
    a.href = resultUrl
    a.download = `compressed-${file?.name || 'output.pdf'}`
    a.click()
  }

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
  }

  return (
    <ToolLayout title="Compress PDF" description="Reduce PDF file size by removing metadata and compressing streams." icon={Minimize2}>
      <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8">
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-8 text-center cursor-pointer hover:border-violet-400 hover:bg-violet-50/50 dark:hover:bg-violet-900/20 transition-colors mb-6"
        >
          <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-gray-700 dark:text-gray-300">{file ? file.name : 'Click to select a PDF file'}</p>
          <input ref={fileInputRef} type="file" accept=".pdf" onChange={(e) => handleFile(e.target.files)} className="hidden" />
        </div>

        {file && (
          <>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 mb-6">
              <p className="text-sm text-gray-600 dark:text-gray-400">Original size: <span className="font-medium text-gray-900 dark:text-white">{formatSize(file.size)}</span></p>
            </div>

            <button onClick={compress} disabled={loading} className="w-full bg-violet-600 text-white py-3 rounded-xl font-semibold hover:bg-violet-700 disabled:opacity-50 mb-6 flex items-center justify-center gap-2">
              <Minimize2 className="w-5 h-5" />
              {loading ? 'Compressing...' : 'Compress PDF'}
            </button>
          </>
        )}

        {resultUrl && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 text-center">
            <p className="text-green-600 font-medium mb-2">PDF compressed successfully!</p>
            <div className="flex items-center justify-center gap-4 mb-4 text-sm">
              <span className="text-gray-500 dark:text-gray-400">{formatSize(originalSize)}</span>
              <span className="text-gray-400">→</span>
              <span className="text-green-600 font-medium">{formatSize(compressedSize)}</span>
              <span className="text-green-600 text-xs bg-green-100 dark:bg-green-900/30 px-2 py-0.5 rounded-full">
                -{Math.round(((originalSize - compressedSize) / originalSize) * 100)}%
              </span>
            </div>
            <button onClick={download} className="flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 mx-auto">
              <Download className="w-5 h-5" /> Download Compressed PDF
            </button>
          </div>
        )}
      </div>
    </ToolLayout>
  )
}
