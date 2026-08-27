import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Image, Copy, Check, Upload } from 'lucide-react'

export default function ImageToBase64() {
  const [base64, setBase64] = useState('')
  const [preview, setPreview] = useState('')
  const [fileName, setFileName] = useState('')
  const [fileSize, setFileSize] = useState('')
  const [copied, setCopied] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setFileName(file.name)
    setFileSize((file.size / 1024).toFixed(2) + ' KB')

    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      setBase64(result)
      setPreview(result)
    }
    reader.readAsDataURL(file)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(base64)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = () => {
        const result = reader.result as string
        setBase64(result)
        setPreview(result)
        setFileName(file.name)
        setFileSize((file.size / 1024).toFixed(2) + ' KB')
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg flex items-center justify-center">
          <Image className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Image to Base64</h1>
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-8">Convert any image to a Base64 data URL for embedding in HTML/CSS.</p>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl p-12 text-center hover:border-indigo-400 transition-colors cursor-pointer"
          onClick={() => inputRef.current?.click()}
        >
          <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
          <p className="text-gray-600 dark:text-gray-400 mb-2">Click or drag an image here</p>
          <p className="text-sm text-gray-400 dark:text-gray-500">Supports PNG, JPG, GIF, SVG, WebP</p>
          <input ref={inputRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
        </div>

        {preview && (
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Preview</div>
              <img src={preview} alt="Preview" className="max-w-full h-48 object-contain border border-gray-200 dark:border-gray-700 rounded-lg" />
              <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">{fileName} ({fileSize})</div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">Base64 Output</span>
                <button onClick={handleCopy} className="text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 flex items-center gap-1">
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <textarea
                readOnly
                value={base64}
                className="w-full h-48 p-3 border border-gray-300 dark:border-gray-600 rounded-xl text-xs font-mono bg-gray-50 dark:bg-gray-700 resize-y"
              />
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 text-center">
        <Link to="/" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 text-sm">&larr; Back to all tools</Link>
      </div>
    </div>
  )
}
