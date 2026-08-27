import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Send, CheckCircle } from 'lucide-react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div>
      {/* Hero */}
      <section className="bg-gray-950 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <span className="text-sm font-semibold text-violet-400 tracking-wider uppercase">Contact</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4 tracking-tight">Let's talk.</h1>
          <p className="text-gray-400 max-w-lg text-lg">Have questions, suggestions, or feedback? We'd love to hear from you.</p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-5 gap-12">
          {/* Info */}
          <div className="md:col-span-2">
            <div className="space-y-8">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Email</h3>
                <a href="mailto:hello@anytool.site" className="text-violet-600 dark:text-violet-400 hover:text-violet-700 no-underline">hello@anytool.site</a>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Response Time</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">We typically respond within 24-48 hours.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Social</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Follow us on GitHub for updates.</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-3">
            {submitted ? (
              <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-800 p-12 text-center">
                <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Message Sent!</h2>
                <p className="text-gray-500 dark:text-gray-400 mb-6">Thank you for reaching out. We'll get back to you soon.</p>
                <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-violet-600 dark:text-violet-400 hover:text-violet-700 dark:hover:text-violet-300 no-underline">
                  Back to Home &rarr;
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 space-y-5">
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Name</label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all text-gray-900 dark:text-white"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Email</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all text-gray-900 dark:text-white"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">Message</label>
                  <textarea
                    required
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl resize-y focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all text-gray-900 dark:text-white"
                    placeholder="What's on your mind?"
                  />
                </div>
                <button type="submit" className="bg-violet-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-violet-700 transition-colors w-full inline-flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" /> Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
