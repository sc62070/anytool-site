import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Calculator, Copy, Check } from 'lucide-react'

export default function WordCounter() {
  const [text, setText] = useState('')
  const [copied, setCopied] = useState(false)

  const words = text.trim() ? text.trim().split(/\s+/).length : 0
  const characters = text.length
  const charactersNoSpaces = text.replace(/\s/g, '').length
  const sentences = text.trim() ? text.split(/[.!?]+/).filter(s => s.trim()).length : 0
  const paragraphs = text.trim() ? text.split(/\n\n+/).filter(p => p.trim()).length : 0
  const readingTime = Math.max(1, Math.ceil(words / 200))

  const handleCopy = () => {
    navigator.clipboard.writeText(`Words: ${words}\nCharacters: ${characters}\nSentences: ${sentences}\nParagraphs: ${paragraphs}`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
          <Calculator className="w-5 h-5 text-indigo-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Word Counter</h1>
      </div>
      <p className="text-gray-600 mb-8">Count words, characters, sentences, paragraphs, and estimate reading time.</p>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Start typing or paste your text here..."
        className="w-full h-48 p-4 border border-gray-300 rounded-xl text-base resize-y focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
      />

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
        {[
          { label: 'Words', value: words },
          { label: 'Characters', value: characters },
          { label: 'No Spaces', value: charactersNoSpaces },
          { label: 'Sentences', value: sentences },
          { label: 'Paragraphs', value: paragraphs },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl p-4 border border-gray-200 text-center">
            <div className="text-2xl font-bold text-indigo-600">{stat.value}</div>
            <div className="text-sm text-gray-500">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mt-6 bg-white rounded-xl p-4 border border-gray-200">
        <span className="text-sm text-gray-600">Estimated reading time: <strong>{readingTime} min</strong></span>
        <button onClick={handleCopy} className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700">
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied!' : 'Copy Stats'}
        </button>
      </div>

      <div className="mt-8 text-center">
        <Link to="/" className="text-indigo-600 hover:text-indigo-700 text-sm">&larr; Back to all tools</Link>
      </div>
    </div>
  )
}
