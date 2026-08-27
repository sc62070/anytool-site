import { useState } from 'react'
import { FileText } from 'lucide-react'
import ToolLayout from '../../components/ToolLayout'

export default function HtmlStripper() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  const stripHtml = (html: string) => {
    const stripped = html.replace(/<[^>]*>/g, '')
    setOutput(stripped)
  }

  return (
    <ToolLayout title="HTML Stripper" description="Remove HTML tags from text" icon={FileText}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Input (HTML)</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-40 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            placeholder="Enter HTML text..."
          />
        </div>
        <button
          onClick={() => stripHtml(input)}
          className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-colors"
        >
          Strip HTML
        </button>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Output (Clean Text)</label>
          <textarea
            value={output}
            readOnly
            className="w-full h-40 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
            placeholder="Clean text will appear here..."
          />
        </div>
      </div>
    </ToolLayout>
  )
}
