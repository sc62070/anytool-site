import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Link2, Copy, Check } from 'lucide-react'

export default function UrlEncoder() {
  const [input, setInput] = useState('')
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const process = () => {
    setError('')
    try {
      if (mode === 'encode') {
        setOutput(encodeURIComponent(input))
      } else {
        setOutput(decodeURIComponent(input))
      }
    } catch {
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
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
          <Link2 className="w-5 h-5 text-indigo-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">URL Encoder / Decoder</h1>
      </div>
      <p className="text-gray-600 mb-8">Encode special characters in URLs or decode encoded URLs.</p>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex gap-2 mb-4">
          <button onClick={() => setMode('encode')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${mode === 'encode' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>Encode</button>
          <button onClick={() => setMode('decode')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${mode === 'decode' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>Decode</button>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{mode === 'encode' ? 'URL' : 'Encoded URL'}</label>
            <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder={mode === 'encode' ? 'https://example.com/path?q=hello world' : 'https%3A%2F%2Fexample.com%2Fpath%3Fq%3Dhello%20world'} className="w-full h-40 p-4 border border-gray-300 rounded-xl text-sm font-mono resize-y focus:ring-2 focus:ring-indigo-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{mode === 'encode' ? 'Encoded Output' : 'Decoded URL'}</label>
            <div className="relative">
              <textarea readOnly value={output} placeholder="Result..." className="w-full h-40 p-4 border border-gray-300 rounded-xl text-sm font-mono bg-gray-50 resize-y" />
              {output && (
                <button onClick={handleCopy} className="absolute top-3 right-3 p-2 text-gray-400 hover:text-indigo-600">
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </button>
              )}
            </div>
          </div>
        </div>

        {error && <p className="mt-3 text-red-600 text-sm">{error}</p>}

        <div className="flex gap-3 mt-4">
          <button onClick={process} className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors">{mode === 'encode' ? 'Encode' : 'Decode'}</button>
          <button onClick={() => { setInput(''); setOutput(''); setError('') }} className="bg-gray-100 text-gray-600 px-6 py-2.5 rounded-lg font-medium hover:bg-gray-200 transition-colors">Clear</button>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link to="/" className="text-indigo-600 hover:text-indigo-700 text-sm">&larr; Back to all tools</Link>
      </div>
    </div>
  )
}
