import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Code, Copy, Check } from 'lucide-react'

const KEYWORDS = ['SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'JOIN', 'LEFT', 'RIGHT', 'INNER', 'OUTER', 'ON', 'GROUP BY', 'ORDER BY', 'HAVING', 'LIMIT', 'OFFSET', 'INSERT', 'INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE', 'CREATE', 'TABLE', 'ALTER', 'DROP', 'INDEX', 'UNION', 'ALL', 'AS', 'DISTINCT', 'IN', 'NOT', 'NULL', 'IS', 'BETWEEN', 'LIKE', 'EXISTS', 'CASE', 'WHEN', 'THEN', 'ELSE', 'END', 'ASC', 'DESC', 'COUNT', 'SUM', 'AVG', 'MIN', 'MAX']

const formatSql = (input: string): string => {
  if (!input.trim()) return ''
  let sql = input.replace(/\s+/g, ' ').trim()

  KEYWORDS.forEach(kw => {
    const regex = new RegExp(`\\b${kw}\\b`, 'gi')
    sql = sql.replace(regex, `\n${kw}`)
  })

  sql = sql.replace(/\bSELECT\b/g, 'SELECT')
  sql = sql.replace(/,\s*/g, ',\n  ')
  sql = sql.trim()

  return sql.split('\n').map(line => {
    const trimmed = line.trim()
    if (['SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'JOIN', 'LEFT', 'RIGHT', 'INNER', 'OUTER', 'GROUP BY', 'ORDER BY', 'HAVING', 'LIMIT', 'OFFSET'].some(kw => trimmed.toUpperCase().startsWith(kw))) {
      return trimmed
    }
    return '  ' + trimmed
  }).join('\n')
}

export default function SqlFormatter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)

  const format = () => {
    setOutput(formatSql(input))
  }

  const copy = () => {
    navigator.clipboard.writeText(output || input)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
          <Code className="w-5 h-5 text-indigo-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">SQL Formatter</h1>
      </div>
      <p className="text-gray-600 mb-8">Format and beautify SQL queries for better readability.</p>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Input SQL</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="SELECT id, name, email FROM users WHERE age > 18 ORDER BY name ASC"
            className="w-full h-80 p-3 border border-gray-300 rounded-xl font-mono text-sm resize-y"
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-sm font-medium text-gray-700">Formatted SQL</label>
            {output && (
              <button onClick={copy} className="flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-700">
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {copied ? 'Copied!' : 'Copy'}
              </button>
            )}
          </div>
          <textarea readOnly value={output} className="w-full h-80 p-3 border border-gray-300 rounded-xl bg-gray-50 font-mono text-sm resize-y" placeholder="Formatted SQL will appear here..." />
        </div>
      </div>

      <button onClick={format} className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 mt-4">
        Format SQL
      </button>

      <div className="mt-8 text-center">
        <Link to="/" className="text-indigo-600 hover:text-indigo-700 text-sm">&larr; Back to all tools</Link>
      </div>
    </div>
  )
}
