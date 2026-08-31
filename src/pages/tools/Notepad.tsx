import { useState, useEffect, useCallback } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { StickyNote, Save, Trash2, Copy, Check, Download } from 'lucide-react'

const STORAGE_KEY = 'anytool-notepad-content'
const HISTORY_KEY = 'anytool-notepad-history'

export default function Notepad() {
  const [content, setContent] = useState('')
  const [saved, setSaved] = useState(false)
  const [copied, setCopied] = useState(false)
  const [history, setHistory] = useState<{ content: string; time: string }[]>([])

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) setContent(saved)
    const hist = localStorage.getItem(HISTORY_KEY)
    if (hist) setHistory(JSON.parse(hist))
  }, [])

  const autoSave = useCallback((text: string) => {
    setContent(text)
    localStorage.setItem(STORAGE_KEY, text)
    setSaved(true)
    setTimeout(() => setSaved(false), 1500)
  }, [])

  const saveToHistory = () => {
    if (!content.trim()) return
    const entry = { content, time: new Date().toLocaleString() }
    const newHistory = [entry, ...history].slice(0, 20)
    setHistory(newHistory)
    localStorage.setItem(HISTORY_KEY, JSON.stringify(newHistory))
  }

  const loadFromHistory = (entry: { content: string }) => {
    setContent(entry.content)
    localStorage.setItem(STORAGE_KEY, entry.content)
  }

  const clearAll = () => {
    setContent('')
    localStorage.removeItem(STORAGE_KEY)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const downloadTxt = () => {
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `notepad-${new Date().toISOString().slice(0, 10)}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  const words = content.trim() ? content.trim().split(/\s+/).length : 0
  const chars = content.length
  const lines = content.split('\n').length
  const readTime = Math.max(1, Math.ceil(words / 200))

  return (
    <ToolLayout title="Online Notepad" description="Free online notepad with auto-save and word count." icon={StickyNote}>
      <div className="space-y-4">
        {/* Stats bar */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
          <span>{words} words</span>
          <span>{chars} characters</span>
          <span>{lines} lines</span>
          <span>~{readTime} min read</span>
          {saved && <span className="text-emerald-500 flex items-center gap-1"><Save className="w-3 h-3" /> Auto-saved</span>}
        </div>

        {/* Editor */}
        <textarea
          value={content}
          onChange={e => autoSave(e.target.value)}
          rows={20}
          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500 resize-none font-mono leading-relaxed"
          placeholder="Start typing... Your notes are automatically saved to your browser."
        />

        {/* Actions */}
        <div className="flex flex-wrap gap-2">
          <button onClick={copyToClipboard} className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center gap-2 border border-gray-200 dark:border-gray-700">
            {copied ? <><Check className="w-4 h-4 text-emerald-500" /> Copied</> : <><Copy className="w-4 h-4" /> Copy</>}
          </button>
          <button onClick={downloadTxt} className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center gap-2 border border-gray-200 dark:border-gray-700">
            <Download className="w-4 h-4" /> Download .txt
          </button>
          <button onClick={saveToHistory} className="px-4 py-2 bg-violet-600 text-white rounded-lg text-sm font-medium hover:bg-violet-700 transition-colors flex items-center gap-2">
            <Save className="w-4 h-4" /> Save Snapshot
          </button>
          <button onClick={clearAll} className="px-4 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
            <Trash2 className="w-4 h-4" /> Clear
          </button>
        </div>

        {/* History */}
        {history.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Saved Snapshots</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {history.map((entry, i) => (
                <div key={i} onClick={() => loadFromHistory(entry)} className="p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-gray-400">{entry.time}</span>
                    <span className="text-xs text-gray-400">{entry.content.split(/\s+/).length} words</span>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{entry.content.slice(0, 100)}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  )
}
