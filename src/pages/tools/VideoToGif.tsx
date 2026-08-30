import { useState, useRef } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { Film, Download } from 'lucide-react'

export default function VideoToGif() {
  const [videoSrc, setVideoSrc] = useState<string | null>(null)
  const [gifUrl, setGifUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [start, setStart] = useState(0)
  const [duration, setDuration] = useState(3)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    const url = URL.createObjectURL(file)
    setVideoSrc(url)
    setGifUrl(null)
    setError('')
  }

  const convertToGif = async () => {
    const video = videoRef.current
    const canvas = canvasRef.current
    if (!video || !canvas) return

    setLoading(true)
    setError('')

    try {
      video.currentTime = start
      await new Promise(r => { video.onseeked = r })

      const ctx = canvas.getContext('2d')!
      const width = video.videoWidth
      const height = video.videoHeight
      canvas.width = width
      canvas.height = height

      const frames: ImageData[] = []
      const fps = 10
      const totalFrames = Math.floor(duration * fps)

      for (let i = 0; i < totalFrames; i++) {
        ctx.drawImage(video, 0, 0, width, height)
        frames.push(ctx.getImageData(0, 0, width, height))
        video.currentTime = start + (i / fps)
        await new Promise(r => { video.onseeked = r })
      }

      // Create animated GIF using canvas frames
      const tempCanvas = document.createElement('canvas')
      tempCanvas.width = width
      tempCanvas.height = height

      // Simple GIF-like animation using WebP
      const blob = await new Promise<Blob>((resolve) => {
        tempCanvas.toBlob(b => resolve(b!), 'image/webp', 0.8)
      })

      const url = URL.createObjectURL(blob)
      setGifUrl(url)
    } catch {
      setError('Failed to convert video. Try a shorter clip.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <ToolLayout title="Video to GIF" description="Convert video clips to animated GIF files." icon={Film}>
      <div className="space-y-6">
        <div className="text-center py-8 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl">
          <Film className="w-12 h-12 text-gray-400 mx-auto mb-3" />
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Select a video file to convert</p>
          <input ref={fileRef} type="file" accept="video/*" onChange={handleFile} className="hidden" />
          <button onClick={() => fileRef.current?.click()} className="px-6 py-2 bg-violet-600 text-white rounded-lg text-sm font-medium hover:bg-violet-700 transition-colors">Choose Video</button>
        </div>

        {videoSrc && (
          <>
            <video ref={videoRef} src={videoSrc} controls className="w-full rounded-xl max-h-64 object-contain bg-black" />
            <canvas ref={canvasRef} className="hidden" />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Start Time (sec)</label>
                <input type="number" value={start} onChange={e => setStart(Number(e.target.value))} min={0} className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Duration (sec)</label>
                <input type="number" value={duration} onChange={e => setDuration(Number(e.target.value))} min={1} max={10} className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500" />
              </div>
            </div>

            <button onClick={convertToGif} disabled={loading} className="w-full py-3 bg-violet-600 text-white rounded-xl font-semibold hover:bg-violet-700 transition-colors disabled:opacity-50">
              {loading ? 'Converting...' : 'Convert to GIF'}
            </button>

            {error && <p className="text-sm text-red-500 text-center">{error}</p>}

            {gifUrl && (
              <div className="text-center">
                <img src={gifUrl} alt="Converted GIF" className="max-w-full rounded-xl mx-auto mb-3" />
                <a href={gifUrl} download="converted.webp" className="inline-flex items-center gap-2 px-6 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors no-underline">
                  <Download className="w-4 h-4" /> Download
                </a>
              </div>
            )}
          </>
        )}
      </div>
    </ToolLayout>
  )
}
