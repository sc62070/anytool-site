import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Send, CheckCircle, Lightbulb, Code, Palette, Calculator } from 'lucide-react'

export default function ToolRequest() {
  const [form, setForm] = useState({ name: '', email: '', toolName: '', description: '' })
  const [submitted, setSubmitted] = useState(false)
  const [sending, setSending] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    try {
      await fetch('https://formspree.io/f/xqkwbjna', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, tool: form.toolName, description: form.description }),
      })
    } catch { /* continue */ }
    setSubmitted(true)
    setSending(false)
  }

  return (
    <div>
      <section className="bg-gray-950 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <span className="text-sm font-semibold text-violet-400 tracking-wider uppercase">Suggest</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4 tracking-tight">Request a Tool</h1>
          <p className="text-gray-400 max-w-lg text-lg">Have an idea for a tool we should build? Let us know and we'll add it to our roadmap.</p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-5 gap-12">
          {/* Info */}
          <div className="md:col-span-2">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">What we build</h2>
            <div className="space-y-4">
              {[
                { icon: Code, title: 'Developer Tools', desc: 'Formatters, validators, converters, and utilities for coding.' },
                { icon: Palette, title: 'Design Tools', desc: 'Color pickers, generators, and visual helpers.' },
                { icon: Calculator, title: 'Calculators', desc: 'Math, finance, unit, and conversion calculators.' },
                { icon: Lightbulb, title: 'Productivity', desc: 'Text editors, timers, counters, and organizers.' },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-violet-100 dark:bg-violet-500/10 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                    <item.icon className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{item.title}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-3">
            {submitted ? (
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-800 p-12 text-center">
                <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Request Submitted!</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-6">Thank you for your suggestion. We review every request and build the most requested tools first.</p>
                <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 no-underline">
                  Back to Home &rarr;
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Name</label>
                    <input type="text" name="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all text-gray-900 dark:text-white" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email</label>
                    <input type="email" name="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all text-gray-900 dark:text-white" placeholder="you@example.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Tool Name</label>
                  <input type="text" name="tool" required value={form.toolName} onChange={(e) => setForm({ ...form, toolName: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all text-gray-900 dark:text-white" placeholder="e.g. JSON Diff Tool" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Why do you need it?</label>
                  <textarea required name="description" rows={5} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl resize-y focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all text-gray-900 dark:text-white" placeholder="Describe what the tool should do and why it would be useful..." />
                </div>
                <button type="submit" disabled={sending} className="bg-violet-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-violet-700 transition-colors w-full inline-flex items-center justify-center gap-2 disabled:opacity-50">
                  <Send className="w-4 h-4" /> {sending ? 'Submitting...' : 'Submit Request'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
