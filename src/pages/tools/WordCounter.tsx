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
    <ToolLayout title="Word Counter" description="Count words, characters, sentences, paragraphs, and estimate reading time." icon={Calculator} info="Track your word count, character count, sentence count, and reading time in real time as you type or paste text. Ideal for staying within essay limits, hitting SEO meta description sweet spots (under 155 characters), or checking if a tweet fits the 280-character cap.">
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

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Why Word Counting Matters</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
          Most writing tasks have hard constraints. College essays have strict limits—exceed 650 words on the Common App and your essay gets truncated. SEO meta descriptions lose their punch past 155 characters because search engines truncate the snippet. Tweets that run over 280 characters simply cannot be posted. This tool gives you a live, accurate count so you never waste time rewriting at the last minute. The reading time estimate assumes an average of 200 words per minute, which is a solid baseline for web content where readers tend to skim.
        </p>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          If you are crafting product descriptions or ad copy, tight character counts matter even more. Google Ads headlines cap at 30 characters and descriptions at 90. Social media bios on platforms like Instagram and LinkedIn hover around 150 characters. Paste your draft into this counter and iterate until you hit the sweet spot. The sentence and paragraph counts are also useful for checking readability—shorter sentences and well-spaced paragraphs keep readers engaged and improve accessibility.
        </p>
      </section>
    </ToolLayout>
  )
}
