import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { Copy, Check, ArrowDownToLine, FileCode } from 'lucide-react'

export default function HtmlToMarkdown() {
  const [input, setInput] = useState('<h1>Hello World</h1>\n<p>This is a <strong>paragraph</strong> with a <a href="https://example.com">link</a>.</p>\n<ul>\n  <li>Item 1</li>\n  <li>Item 2</li>\n</ul>')
  const [copied, setCopied] = useState(false)

  const convert = (html: string): string => {
    let md = html
    md = md.replace(/<h1[^>]*>(.*?)<\/h1>/gi, '# $1\n\n')
    md = md.replace(/<h2[^>]*>(.*?)<\/h2>/gi, '## $1\n\n')
    md = md.replace(/<h3[^>]*>(.*?)<\/h3>/gi, '### $1\n\n')
    md = md.replace(/<h4[^>]*>(.*?)<\/h4>/gi, '#### $1\n\n')
    md = md.replace(/<h5[^>]*>(.*?)<\/h5>/gi, '##### $1\n\n')
    md = md.replace(/<h6[^>]*>(.*?)<\/h6>/gi, '###### $1\n\n')
    md = md.replace(/<strong[^>]*>(.*?)<\/strong>/gi, '**$1**')
    md = md.replace(/<b[^>]*>(.*?)<\/b>/gi, '**$1**')
    md = md.replace(/<em[^>]*>(.*?)<\/em>/gi, '*$1*')
    md = md.replace(/<i[^>]*>(.*?)<\/i>/gi, '*$1*')
    md = md.replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/gi, '[$2]($1)')
    md = md.replace(/<code[^>]*>(.*?)<\/code>/gi, '`$1`')
    md = md.replace(/<pre[^>]*><code[^>]*>(.*?)<\/code><\/pre>/gi, '```\n$1\n```\n')
    md = md.replace(/<pre[^>]*>(.*?)<\/pre>/gi, '```\n$1\n```\n')
    md = md.replace(/<br\s*\/?>/gi, '\n')
    md = md.replace(/<hr\s*\/?>/gi, '---\n\n')
    md = md.replace(/<blockquote[^>]*>(.*?)<\/blockquote>/gi, '> $1\n\n')
    md = md.replace(/<li[^>]*>(.*?)<\/li>/gi, '- $1\n')
    md = md.replace(/<\/?(ul|ol|div|span|p|table|thead|tbody|tr|th|td|img|section|article|header|footer|nav|main)[^>]*>/gi, '\n')
    md = md.replace(/<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[^>]*\/?>/gi, '![$2]($1)')
    md = md.replace(/<img[^>]*src="([^"]*)"[^>]*\/?>/gi, '![]($1)')
    md = md.replace(/<[^>]+>/g, '')
    md = md.replace(/&amp;/g, '&')
    md = md.replace(/&lt;/g, '<')
    md = md.replace(/&gt;/g, '>')
    md = md.replace(/&quot;/g, '"')
    md = md.replace(/&#39;/g, "'")
    md = md.replace(/\n{3,}/g, '\n\n')
    return md.trim()
  }

  const output = convert(input)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <ToolLayout title="HTML to Markdown" description="Convert HTML code to clean Markdown." icon={FileCode}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">HTML Input</label>
          <textarea value={input} onChange={e => setInput(e.target.value)} rows={10} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl font-mono text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500 resize-none" placeholder="Paste HTML here..." />
        </div>
        <div className="flex items-center justify-center">
          <ArrowDownToLine className="w-5 h-5 text-violet-500" />
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Markdown Output</label>
            <button onClick={copyToClipboard} className="flex items-center gap-1.5 text-sm text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300">
              {copied ? <><Check className="w-4 h-4" /> Copied</> : <><Copy className="w-4 h-4" /> Copy</>}
            </button>
          </div>
          <pre className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl font-mono text-sm text-gray-900 dark:text-white overflow-auto max-h-96 whitespace-pre-wrap">{output}</pre>
        </div>
      </div>
    </ToolLayout>
  )
}
