import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FileText } from 'lucide-react'
import { marked } from 'marked'

const sampleMarkdown = `# Hello World

This is a **markdown** preview tool.

## Features
- Write in markdown
- See live preview
- Supports all standard markdown

### Code blocks
\`\`\`javascript
const greeting = "Hello, World!";
console.log(greeting);
\`\`\`

### Lists
1. First item
2. Second item
3. Third item

### Blockquotes
> This is a blockquote. It can span multiple lines.

### Links
[Visit GitHub](https://github.com)

### Images
![Alt text](https://via.placeholder.com/150)
`

marked.setOptions({ breaks: true, gfm: true })

export default function MarkdownPreview() {
  const [markdown, setMarkdown] = useState(sampleMarkdown)
  const html = marked.parse(markdown) as string

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg flex items-center justify-center">
          <FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Markdown Preview</h1>
      </div>
      <p className="text-gray-600 dark:text-gray-400 mb-8">Write markdown on the left, see the rendered preview on the right.</p>

      <div className="grid md:grid-cols-2 gap-4 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Markdown</label>
          <textarea
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            className="w-full h-[500px] p-4 border border-gray-300 dark:border-gray-600 rounded-xl text-sm font-mono resize-none focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Preview</label>
          <div
            className="h-[500px] overflow-y-auto p-4 border border-gray-300 dark:border-gray-600 rounded-xl prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>

      <div className="mt-8 text-center">
        <Link to="/" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 text-sm">&larr; Back to all tools</Link>
      </div>
    </div>
  )
}
