import { useState } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { GitBranch, Copy, Check, RefreshCw } from 'lucide-react'

const types = ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore', 'perf', 'ci', 'build']
const scopes = ['auth', 'api', 'ui', 'db', 'config', 'deps', 'core', 'utils']

function generateCommit(type: string, scope: string, description: string, breaking: boolean): string {
  let msg = `${type}`
  if (scope) msg += `(${scope})`
  msg += `: ${description}`
  if (breaking) msg += `\n\nBREAKING CHANGE: ${description}`
  return msg
}

export default function GitCommitGenerator() {
  const [type, setType] = useState('feat')
  const [scope, setScope] = useState('')
  const [description, setDescription] = useState('add user authentication')
  const [breaking, setBreaking] = useState(false)
  const [copied, setCopied] = useState(false)

  const commit = generateCommit(type, scope, description, breaking)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(commit)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  const randomize = () => {
    setType(types[Math.floor(Math.random() * types.length)])
    setScope(scopes[Math.floor(Math.random() * scopes.length)])
  }

  return (
    <ToolLayout title="Git Commit Message Generator" description="Generate conventional commit messages from descriptions." icon={GitBranch}>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Commit Type</label>
          <div className="flex flex-wrap gap-2">
            {types.map(t => (
              <button key={t} onClick={() => setType(t)} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${type === t ? 'bg-violet-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700'}`}>{t}</button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Scope (optional)</label>
          <div className="flex flex-wrap gap-2">
            {scopes.map(s => (
              <button key={s} onClick={() => setScope(scope === s ? '' : s)} className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${scope === s ? 'bg-violet-600 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700'}`}>{s}</button>
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
          <input type="text" value={description} onChange={e => setDescription(e.target.value)} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500" placeholder="What did you do?" />
        </div>
        <div className="flex items-center gap-3">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={breaking} onChange={e => setBreaking(e.target.checked)} className="w-4 h-4 rounded border-gray-300 text-violet-600 focus:ring-violet-500" />
            <span className="text-sm text-gray-700 dark:text-gray-300">Breaking change</span>
          </label>
          <button onClick={randomize} className="flex items-center gap-1 text-sm text-gray-500 hover:text-violet-500"><RefreshCw className="w-3 h-3" /> Random</button>
        </div>
        <div className="p-4 bg-gray-900 dark:bg-black border border-gray-800 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-500">Commit message</span>
            <button onClick={copyToClipboard} className="flex items-center gap-1.5 text-sm text-violet-400 hover:text-violet-300">
              {copied ? <><Check className="w-4 h-4" /> Copied</> : <><Copy className="w-4 h-4" /> Copy</>}
            </button>
          </div>
          <pre className="font-mono text-sm text-emerald-400 whitespace-pre-wrap">{commit}</pre>
        </div>
      </div>
    </ToolLayout>
  )
}
