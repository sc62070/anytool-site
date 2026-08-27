import { useState } from 'react'
import { Clock, Copy, Check } from 'lucide-react'
import ToolLayout from '../../components/ToolLayout'

export default function CronBuilder() {
  const [fields, setFields] = useState({ minute: '*', hour: '*', day: '*', month: '*', weekday: '' })
  const [copied, setCopied] = useState(false)

  const presets = [
    { label: 'Every minute', value: '* * * * *' },
    { label: 'Every hour', value: '0 * * * *' },
    { label: 'Every day at midnight', value: '0 0 * * *' },
    { label: 'Every Monday', value: '0 0 * * 1' },
    { label: 'Every 1st of month', value: '0 0 1 * *' },
    { label: 'Every 5 minutes', value: '*/5 * * * *' },
    { label: 'Every 6 hours', value: '0 */6 * * *' },
    { label: 'Weekdays at 9am', value: '0 9 * * 1-5' },
  ]

  const cron = `${fields.minute} ${fields.hour} ${fields.day} ${fields.month} ${fields.weekday}`
  const copy = () => { navigator.clipboard.writeText(cron); setCopied(true); setTimeout(() => setCopied(false), 2000) }

  return (
    <ToolLayout title="Cron Expression Builder" description="Build and preview cron schedule expressions." icon={Clock}>
      <div className="grid grid-cols-5 gap-3 mb-6">
        {(['minute', 'hour', 'day', 'month', 'weekday'] as const).map(f => (
          <div key={f}>
            <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 uppercase">{f}</label>
            <input value={fields[f]} onChange={e => setFields({ ...fields, [f]: e.target.value })} className="w-full p-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm font-mono text-center focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none text-gray-900 dark:text-white" />
          </div>
        ))}
      </div>
      <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-4 border border-gray-200 dark:border-gray-800 flex items-center justify-between mb-6">
        <span className="font-mono text-lg text-gray-900 dark:text-white">{cron}</span>
        <button onClick={copy} className="flex items-center gap-2 text-sm text-violet-600 dark:text-violet-400 font-medium">{copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}{copied ? 'Copied!' : 'Copy'}</button>
      </div>
      <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Presets</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {presets.map(p => (
          <button key={p.value} onClick={() => { const [m, h, d, mo, w] = p.value.split(' '); setFields({ minute: m, hour: h, day: d, month: mo, weekday: w }) }} className="p-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-left hover:border-violet-300 dark:hover:border-violet-500/50 transition-all">
            <div className="text-xs font-mono text-violet-600 dark:text-violet-400 mb-1">{p.value}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">{p.label}</div>
          </button>
        ))}
      </div>
    </ToolLayout>
  )
}
