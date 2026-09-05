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
    <ToolLayout title="Markdown Preview" description="Write markdown on the left, see the rendered preview on the right." icon={FileText} info="Write markdown with instant live preview using GitHub Flavored Markdown syntax including fenced code blocks, tables, task lists, and strikethrough. Perfect for drafting README files, documentation, changelogs, Jupyter notebooks, and any content that will be rendered by GitHub, GitLab, or static site generators like Jekyll and Hugo.">

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

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Why Markdown Is the Standard for Developer Documentation</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
          Markdown's power lies in its simplicity. A plain text file with minimal syntax—hashes for headings, asterisks for emphasis, backticks for code—renders into clean, professional HTML without requiring a WYSIWYG editor or proprietary format. GitHub, GitLab, Bitbucket, Jupyter notebooks, and every major static site generator adopted Markdown because it is future-proof, version-control friendly, and readable in its raw form. A README.md file is just as useful in a terminal as it is on a rendered web page.
        </p>
        <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
          This preview tool uses GitHub Flavored Markdown (GFM), which extends standard Markdown with features developers rely on: fenced code blocks with syntax highlighting, pipe-based tables, task list checkboxes, and automatic URL linking. If you are writing documentation that will live on GitHub, preview it here first to catch formatting issues before committing. Pay special attention to code blocks—ensure the language identifier after the opening backticks matches the actual language for proper syntax highlighting.
        </p>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          Common mistakes include forgetting blank lines between paragraphs and headings (Markdown requires a blank line to parse a heading correctly) and nesting lists inconsistently. The live preview on the right instantly reveals these issues so you can fix them before pushing to your repository.
        </p>
      </section>
    </ToolLayout>
  )
}
