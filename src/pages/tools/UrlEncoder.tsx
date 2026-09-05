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
        <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg flex items-center justify-center">
          <Link2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">URL Encoder / Decoder</h1>
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-8">Encode special characters in URLs or decode encoded URLs.</p>

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex gap-2 mb-4">
          <button onClick={() => setMode('encode')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${mode === 'encode' ? 'bg-indigo-600 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600'}`}>Encode</button>
          <button onClick={() => setMode('decode')} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${mode === 'decode' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>Decode</button>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{mode === 'encode' ? 'URL' : 'Encoded URL'}</label>
            <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder={mode === 'encode' ? 'https://example.com/path?q=hello world' : 'https%3A%2F%2Fexample.com%2Fpath%3Fq%3Dhello%20world'} className="w-full h-40 p-4 border border-gray-300 dark:border-gray-600 rounded-xl text-sm font-mono resize-y focus:ring-2 focus:ring-indigo-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">{mode === 'encode' ? 'Encoded Output' : 'Decoded URL'}</label>
            <div className="relative">
              <textarea readOnly value={output} placeholder="Result..." className="w-full h-40 p-4 border border-gray-300 dark:border-gray-600 rounded-xl text-sm font-mono bg-gray-50 dark:bg-gray-700 resize-y" />
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
          <button onClick={process} className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors">{mode === 'encode' ? 'Encode' : 'Decode'}</button>
          <button onClick={() => { setInput(''); setOutput(''); setError('') }} className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-6 py-2.5 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">Clear</button>
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link to="/" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 text-sm">&larr; Back to all tools</Link>
      </div>

      <section className="mt-10">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mt-8 mb-4">How URL Encoding Works</h2>
        <div className="text-sm leading-relaxed text-gray-600 dark:text-gray-400 space-y-3">
          <p>
            URLs can only contain a limited set of characters — letters, digits, and a few special characters like hyphens and underscores. Spaces, accents, Chinese characters, and symbols like <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">&amp;</code> or <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">=</code> have special meaning in URL syntax, so they break the URL if left unencoded. Percent-encoding replaces these characters with a <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">%</code> followed by two hex digits — a space becomes <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">%20</code>, and <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">@</code> becomes <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">%40</code>.
          </p>
          <p>
            This matters most when building API request URLs. Query parameters like <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">?name=John Doe</code> will fail because the space breaks the URL structure. Encoded as <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">?name=John%20Doe</code>, it works perfectly. Most programming languages have built-in functions for this (<code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">encodeURIComponent</code> in JavaScript, <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">urllib.parse.quote</code> in Python), but when you're debugging a broken URL in a browser or inspecting logs, this tool lets you quickly encode or decode without writing code.
          </p>
          <p>
            Developers frequently encounter encoding issues when working with internationalized domain names (IDN), OAuth callback URLs, or redirect URIs that contain special characters. Copy a problematic URL from your browser's address bar, paste it here, and decode it to see the original characters. Conversely, when constructing a URL programmatically, encode each parameter value to ensure it arrives at the server intact — especially when the values contain ampersands, equals signs, or non-ASCII characters.
          </p>
        </div>
      </section>
    </div>
  )
}
