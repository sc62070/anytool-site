import { useState } from 'react'
import { Calculator, Copy, Check } from 'lucide-react'
import ToolLayout from '../../components/ToolLayout'

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
    <ToolLayout title="Word Counter" description="Count words, characters, sentences, paragraphs, and estimate reading time." icon={Calculator} info="Our free online word counter helps you quickly count words, characters, sentences, and paragraphs in any text. Perfect for writers, students, and professionals who need to meet word count requirements. Simply paste your text and get instant results without any sign-up.">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Start typing or paste your text here..."
        className="w-full h-48 p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-base resize-y focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all text-gray-900 dark:text-white placeholder:text-gray-400"
      />

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">
        {[
          { label: 'Words', value: words },
          { label: 'Characters', value: characters },
          { label: 'No Spaces', value: charactersNoSpaces },
          { label: 'Sentences', value: sentences },
          { label: 'Paragraphs', value: paragraphs },
        ].map((stat) => (
          <div key={stat.label} className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800 text-center">
            <div className="text-2xl font-bold text-violet-600 dark:text-violet-400">{stat.value}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mt-6 bg-gray-50 dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800">
        <span className="text-sm text-gray-600 dark:text-gray-400">Estimated reading time: <strong className="text-gray-900 dark:text-white">{readingTime} min</strong></span>
        <button onClick={handleCopy} className="flex items-center gap-2 text-sm text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 font-medium transition-colors">
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          {copied ? 'Copied!' : 'Copy Stats'}
        </button>
      </div>
    </ToolLayout>
  )
}
