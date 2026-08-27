import { useState } from 'react'
import { Link } from 'react-router-dom'
import { GitCompare } from 'lucide-react'

interface DiffLine {
  type: 'same' | 'added' | 'removed'
  text: string
}

const computeDiff = (a: string, b: string): DiffLine[] => {
  const linesA = a.split('\n')
  const linesB = b.split('\n')
  const result: DiffLine[] = []
  const maxLen = Math.max(linesA.length, linesB.length)

  for (let i = 0; i < maxLen; i++) {
    const lineA = linesA[i]
    const lineB = linesB[i]

    if (lineA === lineB) {
      result.push({ type: 'same', text: lineA })
    } else {
      if (lineA !== undefined) result.push({ type: 'removed', text: lineA })
      if (lineB !== undefined) result.push({ type: 'added', text: lineB })
    }
  }
  return result
}

export default function TextDiff() {
  const [textA, setTextA] = useState('')
  const [textB, setTextB] = useState('')
  const [showDiff, setShowDiff] = useState(false)

  const diff = showDiff ? computeDiff(textA, textB) : []

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
          <GitCompare className="w-5 h-5 text-indigo-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Text Diff Checker</h1>
      </div>
      <p className="text-gray-600 mb-8">Compare two texts and see the differences highlighted.</p>

      <div className="grid md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Original text</label>
          <textarea value={textA} onChange={(e) => setTextA(e.target.value)} placeholder="Paste original text..." className="w-full h-48 p-3 border border-gray-300 rounded-xl resize-y text-sm" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Modified text</label>
          <textarea value={textB} onChange={(e) => setTextB(e.target.value)} placeholder="Paste modified text..." className="w-full h-48 p-3 border border-gray-300 rounded-xl resize-y text-sm" />
        </div>
      </div>

      <button onClick={() => setShowDiff(true)} className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 mb-6">
        Compare Texts
      </button>

      {showDiff && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 text-sm font-medium text-gray-700">
            Differences ({diff.filter(d => d.type === 'added').length} additions, {diff.filter(d => d.type === 'removed').length} removals)
          </div>
          <div className="p-4 font-mono text-sm max-h-96 overflow-auto">
            {diff.map((line, i) => (
              <div
                key={i}
                className={`px-3 py-1 ${
                  line.type === 'added' ? 'bg-green-100 text-green-800' :
                  line.type === 'removed' ? 'bg-red-100 text-red-800 line-through' :
                  'text-gray-700'
                }`}
              >
                <span className="inline-block w-4 text-gray-400 mr-2">
                  {line.type === 'added' ? '+' : line.type === 'removed' ? '-' : ' '}
                </span>
                {line.text || '\u00A0'}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8 text-center">
        <Link to="/" className="text-indigo-600 hover:text-indigo-700 text-sm">&larr; Back to all tools</Link>
      </div>
    </div>
  )
}
