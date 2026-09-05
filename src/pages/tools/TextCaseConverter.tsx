import { useState } from 'react'
import { CaseUpper, Copy, Check } from 'lucide-react'
import ToolLayout from '../../components/ToolLayout'

export default function TextCaseConverter() {
  const [text, setText] = useState('')
  const [copied, setCopied] = useState('')

  const transformations = [
    { label: 'UPPERCASE', value: text.toUpperCase() },
    { label: 'lowercase', value: text.toLowerCase() },
    { label: 'Title Case', value: text.replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase())) },
    { label: 'Sentence case', value: text.replace(/(^\s*|[.!?]\s+)(\w)/g, (_, sep, c) => sep + c.toUpperCase()).toLowerCase() },
    { label: 'camelCase', value: text.replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase()).replace(/^./, (c) => c.toLowerCase()) },
    { label: 'PascalCase', value: text.replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase()).replace(/^./, (c) => c.toUpperCase()) },
    { label: 'snake_case', value: text.replace(/([A-Z])/g, '_$1').replace(/[^a-zA-Z0-9]+/g, '_').toLowerCase().replace(/^_/, '') },
    { label: 'kebab-case', value: text.replace(/([A-Z])/g, '-$1').replace(/[^a-zA-Z0-9]+/g, '-').toLowerCase().replace(/^-/, '') },
    { label: 'Reversed', value: text.split('').reverse().join('') },
  ]

  const handleCopy = (value: string, label: string) => {
    navigator.clipboard.writeText(value)
    setCopied(label)
    setTimeout(() => setCopied(''), 2000)
  }

  return (
    <ToolLayout title="Text Case Converter" description="Convert text between uppercase, lowercase, title case, camelCase, and more." icon={CaseUpper} info="Instantly convert text between uppercase, lowercase, Title Case, camelCase, PascalCase, snake_case, and kebab-case. Essential for developers normalizing variable names across languages, writers formatting titles, and anyone building SEO-friendly URLs or slugs.">

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type or paste your text here..."
        className="w-full h-32 p-4 border border-gray-300 dark:border-gray-600 rounded-xl text-base resize-y focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
      />

      <div className="grid md:grid-cols-2 gap-3 mt-6">
        {transformations.map((t) => (
          <div key={t.label} className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="flex-1 min-w-0">
              <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">{t.label}</div>
              <div className="font-mono text-sm truncate text-gray-800">{t.value || '—'}</div>
            </div>
            <button
              onClick={() => handleCopy(t.value, t.label)}
              disabled={!text}
              className="p-1.5 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 disabled:opacity-30 flex-shrink-0"
            >
              {copied === t.label ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        ))}
      </div>

      <section className="mt-8 mb-4">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mt-8 mb-4">Why Text Case Matters</h2>
        <div className="text-sm leading-relaxed text-gray-600 dark:text-gray-400 space-y-3">
          <p>
            Different programming languages enforce different naming conventions, and mixing them up makes code harder to read. Python and Ruby favor <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">snake_case</code> for variables and functions, while JavaScript and TypeScript use <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">camelCase</code>. Java and C# prefer <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">PascalCase</code> for class names. When you copy variable names from documentation in one language and paste them into another, this converter saves you from manually retyping everything.
          </p>
          <p>
            For web developers, case conversion directly affects SEO. Search engines treat URL slugs as case-insensitive, but consistency matters for readability and sharing. Converting a page title like "How to Build a REST API" into <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">how-to-build-a-rest-api</code> using kebab-case creates clean, professional URLs. Similarly, when importing CSV data with column headers like "First Name" into a database, converting to snake_case (<code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">first_name</code>) aligns with most database naming conventions.
          </p>
          <p>
            Writers and content creators also benefit from title case conversion. Different style guides (APA, MLA, Chicago) have their own rules for capitalizing titles, and this tool gives you a quick starting point. Paste in a headline, grab the title case version, then manually adjust minor words like "a," "the," or "and" that style guides typically leave lowercase.
          </p>
        </div>
      </section>
    </ToolLayout>
  )
}
