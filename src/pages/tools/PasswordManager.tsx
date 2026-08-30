import { useState, useEffect } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { Lock, Eye, Plus, Trash2, Copy, Check } from 'lucide-react'

interface StoredPassword {
  id: string
  name: string
  username: string
  password: string
  url: string
  createdAt: number
}

function getStoredPasswords(): StoredPassword[] {
  try { return JSON.parse(localStorage.getItem('anytool-passwords') || '[]') } catch { return [] }
}

function savePasswords(passwords: StoredPassword[]) {
  localStorage.setItem('anytool-passwords', JSON.stringify(passwords))
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 10)
}

export default function PasswordManager() {
  const [passwords, setPasswords] = useState<StoredPassword[]>([])
  const [showForm, setShowForm] = useState(false)
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [url, setUrl] = useState('')
  const [showPw, setShowPw] = useState<Record<string, boolean>>({})
  const [copied, setCopied] = useState('')
  const [masterKey, setMasterKey] = useState('')
  const [unlocked, setUnlocked] = useState(false)

  useEffect(() => { setPasswords(getStoredPasswords()) }, [])

  const addPassword = () => {
    if (!name || !password) return
    const entry: StoredPassword = { id: generateId(), name, username, password, url, createdAt: Date.now() }
    const next = [...passwords, entry]
    setPasswords(next)
    savePasswords(next)
    setName(''); setUsername(''); setPassword(''); setUrl('')
    setShowForm(false)
  }

  const deletePassword = (id: string) => {
    const next = passwords.filter(p => p.id !== id)
    setPasswords(next)
    savePasswords(next)
  }

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(''), 1500)
  }

  const toggleShow = (id: string) => setShowPw(prev => ({ ...prev, [id]: !prev[id] }))

  return (
    <ToolLayout title="Password Manager" description="Store and manage passwords locally in your browser." icon={Lock}>
      <div className="space-y-6">
        {!unlocked ? (
          <div className="text-center py-8">
            <Lock className="w-12 h-12 text-violet-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Unlock Password Vault</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">All data is stored locally in your browser. Nothing is sent anywhere.</p>
            <div className="max-w-sm mx-auto flex gap-2">
              <input type="password" value={masterKey} onChange={e => setMasterKey(e.target.value)} className="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500" placeholder="Enter any key to unlock" onKeyDown={e => e.key === 'Enter' && setUnlocked(true)} />
              <button onClick={() => setUnlocked(true)} className="px-6 py-3 bg-violet-600 text-white rounded-xl font-semibold hover:bg-violet-700 transition-colors">Unlock</button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{passwords.length} saved password{passwords.length !== 1 ? 's' : ''}</h3>
              <button onClick={() => setShowForm(!showForm)} className="flex items-center gap-1.5 px-4 py-2 bg-violet-600 text-white rounded-lg text-sm font-medium hover:bg-violet-700 transition-colors">
                <Plus className="w-4 h-4" /> Add New
              </button>
            </div>
            {showForm && (
              <div className="p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl space-y-3">
                <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500" placeholder="Service name (e.g. GitHub)" />
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500" placeholder="Username or email" />
                <input type="text" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500" placeholder="Password" />
                <input type="text" value={url} onChange={e => setUrl(e.target.value)} className="w-full px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500" placeholder="URL (optional)" />
                <button onClick={addPassword} className="w-full py-2 bg-violet-600 text-white rounded-lg text-sm font-medium hover:bg-violet-700 transition-colors">Save Password</button>
              </div>
            )}
            <div className="space-y-3">
              {passwords.map(pw => (
                <div key={pw.id} className="p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">{pw.name}</div>
                      {pw.username && <div className="text-sm text-gray-500 dark:text-gray-400">{pw.username}</div>}
                    </div>
                    <div className="flex items-center gap-1">
                      <button onClick={() => toggleShow(pw.id)} className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"><Eye className="w-4 h-4" /></button>
                      <button onClick={() => copyToClipboard(pw.password, pw.id)} className="p-1.5 text-gray-400 hover:text-violet-500">{copied === pw.id ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}</button>
                      <button onClick={() => deletePassword(pw.id)} className="p-1.5 text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                  <div className="mt-2 font-mono text-sm text-gray-700 dark:text-gray-300">
                    {showPw[pw.id] ? pw.password : '•'.repeat(pw.password.length)}
                  </div>
                  {pw.url && <div className="mt-1 text-xs text-violet-500">{pw.url}</div>}
                </div>
              ))}
              {passwords.length === 0 && <p className="text-center text-gray-500 dark:text-gray-400 py-8">No passwords saved yet. Click "Add New" to get started.</p>}
            </div>
          </>
        )}
      </div>
    </ToolLayout>
  )
}
