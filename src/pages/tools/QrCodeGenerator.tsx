import { useState, useRef, useEffect } from 'react'
import { QrCode, Download } from 'lucide-react'
import QRCodeLib from 'qrcode'
import ToolLayout from '../../components/ToolLayout'

export default function QrCodeGenerator() {
  const [text, setText] = useState('https://anytool.site')
  const [size, setSize] = useState(256)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [error, setError] = useState('')

  const generate = () => {
    if (!text.trim()) {
      setError('Please enter text or URL')
      return
    }
    setError('')
    if (canvasRef.current) {
      QRCodeLib.toCanvas(canvasRef.current, text, {
        width: size,
        margin: 2,
        color: { dark: '#000000', light: '#ffffff' },
      })
    }
  }

  useEffect(() => {
    generate()
  }, [text, size])

  const download = () => {
    if (canvasRef.current) {
      const link = document.createElement('a')
      link.download = 'qrcode.png'
      link.href = canvasRef.current.toDataURL('image/png')
      link.click()
    }
  }

  return (
    <ToolLayout title="QR Code Generator" description="Generate QR codes from any text or URL instantly." icon={QrCode} info="Create high-quality QR codes from any URL, plain text, or structured data like Wi-Fi credentials and vCard contacts. Choose between 128px and 512px output sizes and download the result as a crisp PNG ready for print or digital use. The code renders instantly in your browser using the qrcode library with no server round-trips.">

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Text or URL</label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter URL or text..."
                className="w-full h-32 p-4 border border-gray-300 dark:border-gray-600 rounded-xl text-sm resize-y focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Size: {size}px</label>
              <input
                type="range"
                min="128"
                max="512"
                step="64"
                value={size}
                onChange={(e) => setSize(Number(e.target.value))}
                className="w-full accent-indigo-600"
              />
            </div>
            {error && <p className="text-red-600 text-sm">{error}</p>}
            <button onClick={download} className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
              <Download className="w-4 h-4" /> Download PNG
            </button>
          </div>
          <div className="flex items-center justify-center">
            <canvas ref={canvasRef} className="border border-gray-200 dark:border-gray-700 rounded-xl" />
          </div>
        </div>
      </div>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Creative Uses for QR Codes</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
          QR codes have surged in popularity because they bridge the gap between physical and digital spaces. Restaurants use them for contactless menus—print one code on each table and diners scan it with their phone camera to view the menu instantly, eliminating the need for disposable paper menus or dedicated tablet hardware. Event organizers embed QR codes in tickets that link to venue maps, schedule details, or real-time updates. Small businesses print them on business cards that, when scanned, automatically add contact information to a phone's address book.
        </p>
        <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
          Wi-Fi sharing is one of the most practical everyday uses. Most phones can scan a Wi-Fi QR code and connect to the network automatically without typing a password. Format the data as WIFI:T:WPA;S:YourNetworkName;P:YourPassword;; and any scanner app will handle the rest. This is especially handy for guests—you print one QR code and stick it on the fridge instead of spelling out a 20-character WPA3 passphrase.
        </p>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          For best results, keep QR codes simple. The more data encoded, the denser the pattern becomes and the harder it is for low-quality phone cameras to read. Short URLs produce cleaner codes. If you need a large QR code for a poster or billboard, test it at the actual print size before committing—small phones with older cameras may struggle with very large or very complex codes.
        </p>
      </section>
    </ToolLayout>
  )
}
