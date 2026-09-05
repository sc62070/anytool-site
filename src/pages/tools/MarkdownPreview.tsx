import { useState } from 'react'
import { FileText } from 'lucide-react'
import { marked } from 'marked'
import ToolLayout from '../../components/ToolLayout'

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
    <ToolLayout title="Markdown Preview" description="Write markdown on the left, see the rendered preview on the right." icon={FileText} info="Our free online markdown preview tool lets you write and preview markdown in real-time with a side-by-side editor. Supports GitHub Flavored Markdown including code blocks, tables, and task lists. Perfect for writing documentation, README files, or blog posts.">

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
    </ToolLayout>
  )
}
