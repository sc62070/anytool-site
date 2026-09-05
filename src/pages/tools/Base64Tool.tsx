import { useState } from 'react'
import { Binary, Copy, Check } from 'lucide-react'
import ToolLayout from '../../components/ToolLayout'

export default function Base64Tool() {
  const [input, setInput] = useState('')
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const process = () => {
    setError('')
    try {
      if (mode === 'encode') {
        setOutput(btoa(unescape(encodeURIComponent(input))))
      } else {
        setOutput(decodeURIComponent(escape(atob(input))))
      }
    } catch (e) {
      setError('Invalid input for ' + mode + ' mode')
      setOutput('')
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <ToolLayout title="Base64 Tool" description="Encode text to Base64 or decode Base64 to text." icon={Binary} info="Convert plain text to Base64 or decode Base64 back to its original form using the browser's native btoa() and atob() functions with proper Unicode handling. Essential for embedding images directly in CSS or HTML, encoding credentials for HTTP Basic Auth, constructing JWT tokens, and safely transmitting binary data through text-only channels like JSON APIs and email.">

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setMode('encode')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${mode === 'encode' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            Encode
          </button>
          <button
            onClick={() => setMode('decode')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${mode === 'decode' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            Decode
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {mode === 'encode' ? 'Plain Text' : 'Base64 String'}
            </label>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 to decode...'}
              className="w-full h-48 p-4 border border-gray-300 dark:border-gray-600 rounded-xl text-sm font-mono resize-y focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {mode === 'encode' ? 'Base64 Output' : 'Decoded Text'}
            </label>
            <div className="relative">
              <textarea
                readOnly
                value={output}
                placeholder="Result will appear here..."
                className="w-full h-48 p-4 border border-gray-300 dark:border-gray-600 rounded-xl text-sm font-mono bg-gray-50 dark:bg-gray-700 resize-y"
              />
              {output && (
                <button onClick={handleCopy} className="absolute top-3 right-3 p-2 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              )}
            </div>
          </div>
        </div>

        {error && <p className="mt-3 text-red-600 text-sm">{error}</p>}

        <div className="flex gap-3 mt-4">
          <button onClick={process} className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors">
            {mode === 'encode' ? 'Encode' : 'Decode'}
          </button>
          <button onClick={() => { setInput(''); setOutput(''); setError('') }} className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-6 py-2.5 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
            Clear
          </button>
        </div>
      </div>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">When and Why You Would Use Base64</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
          Base64 encodes binary data into a safe set of 64 ASCII characters so it can be transmitted over channels that only handle text. A classic use case is embedding small images directly in CSS using a data URI: instead of referencing an external file, you inline the Base64 string in url(data:image/png;base64,...). This eliminates an extra HTTP request and is useful for icons or decorative elements where the overhead of a separate network call is not worth it.
        </p>
        <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
          JSON Web Tokens (JWTs) use Base64URL encoding for their header and payload segments. When debugging an unfamiliar token, paste each segment into this tool's decode mode to read the claims—expiry, issuer, and user ID become instantly visible. HTTP Basic Authentication also relies on Base64: the "Authorization: Basic dXNlcjpwYXNz" header is simply base64("user:pass"). While Base64 is not encryption (anyone can decode it), it is a standard way to package credentials for transport within the HTTP specification.
        </p>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          A common mistake is treating Base64 as a security measure. It is purely an encoding scheme—obfuscation, not encryption. Never use Base64 alone to protect sensitive data; combine it with TLS encryption or proper cryptographic hashing instead.
        </p>
      </section>
    </ToolLayout>
  )
}
