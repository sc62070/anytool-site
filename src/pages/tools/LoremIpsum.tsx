import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FileStack, Copy, Check } from 'lucide-react'

const templates: Record<string, string> = {
  paragraph: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  sentence: `The quick brown fox jumps over the lazy dog while the curious cat watches from the windowsill.`,
  words: `lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua`,
  title: `The Art of Building Beautiful Web Applications in 2026`,
}

export default function LoremIpsum() {
  const [count, setCount] = useState(3)
  const [type, setType] = useState<keyof typeof templates>('paragraph')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)

  const generate = () => {
    const parts: string[] = []
    for (let i = 0; i < count; i++) {
      parts.push(templates[type])
    }
    setOutput(parts.join('\n\n'))
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
          <FileStack className="w-5 h-5 text-indigo-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Lorem Ipsum Generator</h1>
      </div>
      <p className="text-gray-600 mb-8">Generate placeholder text for your designs and mockups.</p>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <select value={type} onChange={(e) => setType(e.target.value as keyof typeof templates)} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none">
              <option value="paragraph">Paragraph</option>
              <option value="sentence">Sentence</option>
              <option value="words">Words</option>
              <option value="title">Title</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Count: {count}</label>
            <input type="range" min="1" max="20" value={count} onChange={(e) => setCount(Number(e.target.value))} className="w-full accent-indigo-600 mt-2" />
          </div>
        </div>

        <button onClick={generate} className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors mb-4">
          Generate
        </button>

        {output && (
          <div className="relative">
            <textarea readOnly value={output} className="w-full h-48 p-4 border border-gray-300 rounded-xl text-sm bg-gray-50 resize-y" />
            <button onClick={handleCopy} className="absolute top-3 right-3 p-2 text-gray-400 hover:text-indigo-600">
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        )}
      </div>

      <div className="mt-8 text-center">
        <Link to="/" className="text-indigo-600 hover:text-indigo-700 text-sm">&larr; Back to all tools</Link>
      </div>
    </div>
  )
}
