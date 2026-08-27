import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { CadViewer } from '@cadview/react'
import { dwgConverter } from '@cadview/dwg'
import { Upload, FileImage, X } from 'lucide-react'

export default function DwgViewer() {
  const [file, setFile] = useState<File | null>(null)
  const [fileName, setFileName] = useState('')
  const [error, setError] = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = (selected: File | undefined) => {
    if (!selected) return
    setError('')
    const ext = selected.name.split('.').pop()?.toLowerCase()
    const supported = ['dwg', 'dxf']
    if (!ext || !supported.includes(ext)) {
      setError('Please select a DWG or DXF file')
      return
    }
    setFile(selected)
    setFileName(selected.name)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const dropped = e.dataTransfer.files[0]
    handleFile(dropped)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleClear = () => {
    setFile(null)
    setFileName('')
    setError('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
          <FileImage className="w-5 h-5 text-indigo-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">DWG / CAD Viewer</h1>
      </div>
      <p className="text-gray-600 mb-8">
        View DWG and DXF CAD files directly in your browser. No software installation needed. Files are processed entirely in your browser — nothing is uploaded.
      </p>

      {!file ? (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 rounded-xl p-16 text-center cursor-pointer hover:border-indigo-400 hover:bg-indigo-50/50 transition-colors"
        >
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-lg font-medium text-gray-700 mb-2">
            Drop a DWG or DXF file here, or click to browse
          </p>
          <p className="text-sm text-gray-500">
            Supports AutoCAD DWG and DXF formats
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept=".dwg,.dxf"
            onChange={(e) => handleFile(e.target.files?.[0])}
            className="hidden"
          />
        </div>
      ) : (
        <div className="rounded-xl overflow-hidden border border-gray-200 bg-white">
          <div className="flex items-center justify-between bg-gray-50 px-4 py-3 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <FileImage className="w-4 h-4 text-indigo-600" />
              <span className="text-sm font-medium text-gray-700">{fileName}</span>
            </div>
            <button
              onClick={handleClear}
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-600 transition-colors"
            >
              <X className="w-4 h-4" />
              Close
            </button>
          </div>
          <div style={{ height: '70vh', minHeight: '500px' }}>
            <CadViewer
              file={file}
              theme="light"
              tool="pan"
              formatConverters={[dwgConverter]}
            />
          </div>
        </div>
      )}

      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}

      <div className="mt-8 grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-2">Supported Formats</h3>
          <p className="text-sm text-gray-600">
            View DWG (AutoCAD) and DXF (Drawing Exchange Format) files with full layer support.
          </p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-2">100% Private</h3>
          <p className="text-sm text-gray-600">
            Your files never leave your browser. All processing happens locally on your device.
          </p>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-200">
          <h3 className="font-semibold text-gray-900 mb-2">Interactive Tools</h3>
          <p className="text-sm text-gray-600">
            Pan, zoom, measure distances, toggle layers, and select entities in your CAD drawings.
          </p>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link to="/" className="text-indigo-600 hover:text-indigo-700 text-sm">&larr; Back to all tools</Link>
      </div>
    </div>
  )
}
