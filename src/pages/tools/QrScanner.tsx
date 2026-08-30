import { useState, useRef, useEffect } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { ScanLine, Camera, Upload, Copy, Check } from 'lucide-react'

export default function QrScanner() {
  const [result, setResult] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  const [cameraActive, setCameraActive] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const animRef = useRef<number>(0)

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach(t => t.stop())
    streamRef.current = null
    cancelAnimationFrame(animRef.current)
    setCameraActive(false)
  }

  const scanFromCanvas = async (canvas: HTMLCanvasElement) => {
    try {
      const { default: jsQR } = await import('jsqr')
      const ctx = canvas.getContext('2d')!
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const code = jsQR(imageData.data, canvas.width, canvas.height)
      if (code) {
        setResult(code.data)
        setError('')
        stopCamera()
        return true
      }
      return false
    } catch {
      return false
    }
  }

  const startCamera = async () => {
    setError('')
    setResult('')
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play()
        setCameraActive(true)

        const scan = async () => {
          if (!videoRef.current || !canvasRef.current) return
          const canvas = canvasRef.current
          canvas.width = videoRef.current.videoWidth
          canvas.height = videoRef.current.videoHeight
          const ctx = canvas.getContext('2d')!
          ctx.drawImage(videoRef.current, 0, 0)
          const found = await scanFromCanvas(canvas)
          if (!found) animRef.current = requestAnimationFrame(scan)
        }
        animRef.current = requestAnimationFrame(scan)
      }
    } catch {
      setError('Camera access denied. Try uploading an image instead.')
    }
  }

  useEffect(() => () => stopCamera(), [])

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const img = new window.Image()
    img.onload = async () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(img, 0, 0)
      const found = await scanFromCanvas(canvas)
      if (!found) setError('No QR code found in this image.')
    }
    img.src = URL.createObjectURL(file)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <ToolLayout title="QR Code Scanner" description="Scan QR codes from your camera or uploaded images." icon={ScanLine}>
      <div className="space-y-4">
        <canvas ref={canvasRef} className="hidden" />

        {!cameraActive ? (
          <div className="grid grid-cols-2 gap-3">
            <button onClick={startCamera} className="py-3 bg-violet-600 text-white rounded-xl font-semibold hover:bg-violet-700 transition-colors flex items-center justify-center gap-2">
              <Camera className="w-5 h-5" /> Open Camera
            </button>
            <button onClick={() => fileRef.current?.click()} className="py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2 border border-gray-200 dark:border-gray-700">
              <Upload className="w-5 h-5" /> Upload Image
            </button>
          </div>
        ) : (
          <button onClick={stopCamera} className="w-full py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-colors">Stop Camera</button>
        )}

        <input ref={fileRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />

        {cameraActive && (
          <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800">
            <video ref={videoRef} className="w-full" playsInline muted />
          </div>
        )}

        {error && <p className="text-sm text-red-500 text-center">{error}</p>}

        {result && (
          <div className="p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Scanned Result</span>
              <button onClick={copyToClipboard} className="flex items-center gap-1.5 text-sm text-violet-600 dark:text-violet-400">
                {copied ? <><Check className="w-4 h-4" /> Copied</> : <><Copy className="w-4 h-4" /> Copy</>}
              </button>
            </div>
            <a href={result.startsWith('http') ? result : undefined} target="_blank" rel="noopener noreferrer" className={`block font-mono text-sm break-all ${result.startsWith('http') ? 'text-violet-600 dark:text-violet-400 hover:underline' : 'text-gray-900 dark:text-white'}`}>
              {result}
            </a>
          </div>
        )}
      </div>
    </ToolLayout>
  )
}
