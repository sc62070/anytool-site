import { Link } from 'react-router-dom'
import { ArrowRight, Zap, Shield, Globe, Heart } from 'lucide-react'

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gray-950 py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <span className="text-sm font-semibold text-violet-400 tracking-wider uppercase">About us</span>
          <h1 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4 tracking-tight">Built by developers, for everyone.</h1>
          <p className="text-gray-400 max-w-xl text-lg">We believe useful tools should be accessible to everyone without barriers.</p>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-6xl mx-auto px-4 py-24">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">Our Mission</h2>
            <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
              <p>
                We started <strong className="text-gray-900 dark:text-white">AnyTool.site</strong> because we were tired of bloated tools that require sign-ups, show ads, or collect your data.
              </p>
              <p>
                Every tool on our site runs directly in your browser. Nothing is sent to our servers. Your data stays yours, and you get instant results without any friction.
              </p>
              <p>
                We're building the most comprehensive collection of free online tools that help developers, writers, designers, and everyday users get things done quickly.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Zap, title: 'Fast', desc: 'Instant results, zero wait time' },
              { icon: Shield, title: 'Private', desc: 'No data leaves your browser' },
              { icon: Globe, title: 'Free', desc: 'No limits, no paywalls' },
              { icon: Heart, title: 'Open', desc: 'Built with open-source tools' },
            ].map((f) => (
              <div key={f.title} className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl p-5 border border-gray-100 dark:border-gray-800">
                <f.icon className="w-6 h-6 text-violet-600 dark:text-violet-400 mb-3" />
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">{f.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="bg-gray-50 dark:bg-gray-900/50 py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 tracking-tight text-center">What We Offer</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Text Tools', desc: 'Word counter, case converter, find & replace, and more.' },
              { title: 'Developer Tools', desc: 'JSON formatter, Base64 encoder, regex tester, and more.' },
              { title: 'Design Tools', desc: 'Color picker, image compressor, image resizer, and more.' },
              { title: 'Security Tools', desc: 'Password generator, hash generator, and more.' },
              { title: 'Document Tools', desc: 'PDF viewer, merge PDF, split PDF, and more.' },
              { title: 'Calculators', desc: 'Unit converter, age calculator, loan calculator, and more.' },
            ].map((item) => (
              <div key={item.title} className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700/50">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-6xl mx-auto px-4 py-24">
        <div className="text-center mb-12">
          <span className="text-sm font-semibold text-violet-600 dark:text-violet-400 tracking-wider uppercase">FAQ</span>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mt-3 tracking-tight">Frequently Asked Questions</h2>
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
          {[
            { q: 'Is AnyTool.site really free?', a: 'Yes. Every tool is 100% free with no usage limits, no premium tier, and no sign-up required.' },
            { q: 'Is my data safe?', a: 'Absolutely. All processing happens in your browser. Nothing is ever sent to our servers. Your data never leaves your device.' },
            { q: 'Can I use these tools on mobile?', a: 'Yes. Every tool is designed to work on phones, tablets, and desktops. Just open the site in any browser.' },
            { q: 'How do you make money?', a: 'We keep the site running through non-intrusive ads and optional support from users. We never sell your data or require paid subscriptions.' },
            { q: 'Can I suggest a new tool?', a: 'Yes! Visit our Tool Request page or contact us. We build tools based on what users ask for.' },
            { q: 'Do I need to create an account?', a: 'No. Every tool works instantly without any account or sign-up.' },
          ].map((faq) => (
            <details key={faq.q} className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-800 overflow-hidden group">
              <summary className="px-6 py-4 cursor-pointer text-gray-900 dark:text-white font-medium list-none flex items-center justify-between">
                {faq.q}
                <span className="text-gray-400 group-open:rotate-180 transition-transform">▾</span>
              </summary>
              <div className="px-6 pb-4 text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{faq.a}</div>
            </details>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 py-24 text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight">Have a suggestion?</h2>
        <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">We'd love to hear from you. Let us know what tools you'd like us to build next.</p>
        <Link to="/contact" className="inline-flex items-center gap-2 bg-violet-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-violet-700 transition-colors no-underline">
          Get in Touch <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </div>
  )
}
