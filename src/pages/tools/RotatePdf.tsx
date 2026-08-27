import { useState, useRef } from 'react'
import { RotateCw, Download, FileText } from 'lucide-react'
import { PDFDocument } from 'pdf-lib'
import ToolLayout from '../../components/ToolLayout'

const ROTATIONS = [
  { label: '90°', value: 90 },
  { label: '180°', value: 180 },
  { label: '270°', value: 270 },
]

export default function RotatePdf() {
  const [file, setFile] = useState<File | null>(null)
  const [rotation, setRotation] = useState(90)
  const [resultUrl, setResultUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = (input: FileList | null) => {
    if (!input || !input[0]) return
    setFile(input[0])
    setResultUrl(null)
  }

  const rotate = async () => {
    if (!file) return
    setLoading(true)
    try {
      const bytes = await file.arrayBuffer()
      const doc = await PDFDocument.load(bytes)
      const pages = doc.getPages()
      pages.forEach(page => {
        const current = page.getRotation().angle
        page.setRotation((current + rotation) % 360 as any)
      })
      const pdfBytes = await doc.save()
      const blob = new Blob([pdfBytes as Uint8Array<ArrayBuffer>], { type: 'application/pdf' })
      setResultUrl(URL.createObjectURL(blob))
    } catch {
      alert('Error rotating PDF. Make sure it is a valid PDF file.')
    }
    setLoading(false)
  }

  const download = () => {
    if (!resultUrl) return
    const a = document.createElement('a')
    a.href = resultUrl
    a.download = `rotated-${file?.name || 'output.pdf'}`
    a.click()
  }

  return (
    <ToolLayout title="Rotate PDF" description="Rotate PDF pages by 90°, 180°, or 270 degrees." icon={RotateCw}>
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
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Rotation</label>
              <div className="flex gap-3">
                {ROTATIONS.map(r => (
                  <button
                    key={r.value}
                    onClick={() => setRotation(r.value)}
                    className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                      rotation === r.value
                        ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/25'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:border-violet-400'
                    }`}
                  >
                    {r.label}
                  </button>
                ))}
              </div>
            </div>

            <button onClick={rotate} disabled={loading} className="w-full bg-violet-600 text-white py-3 rounded-xl font-semibold hover:bg-violet-700 disabled:opacity-50 mb-6 flex items-center justify-center gap-2">
              <RotateCw className="w-5 h-5" />
              {loading ? 'Processing...' : `Rotate Pages ${rotation}°`}
            </button>
          </>
        )}

        {resultUrl && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 text-center">
            <p className="text-green-600 font-medium mb-4">PDF rotated successfully!</p>
            <button onClick={download} className="flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 mx-auto">
              <Download className="w-5 h-5" /> Download Rotated PDF
            </button>
          </div>
        )}
      </div>
    </ToolLayout>
  )
}
