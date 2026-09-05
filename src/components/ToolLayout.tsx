import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Helmet } from 'react-helmet-async'

interface FaqItem { q: string; a: string }

interface ToolLayoutProps {
  title: string
  description: string
  icon: LucideIcon
  info?: string
  faqs?: FaqItem[]
  children: React.ReactNode
}

const defaultFaqs: FaqItem[] = [
  { q: 'Is this tool free to use?', a: 'Yes. It is 100% free with no usage limits, no sign-up required, and no hidden fees.' },
  { q: 'Is my data safe?', a: 'Absolutely. All processing happens directly in your browser. Nothing is ever sent to our servers, so your data stays completely private.' },
  { q: 'Does it work on mobile?', a: 'Yes. This tool is fully responsive and works on phones, tablets, and desktops. Just open it in any modern browser.' },
  { q: 'Do I need to create an account?', a: 'No. This tool works instantly without any account, sign-up, or login.' },
]

export default function ToolLayout({ title, description, icon: Icon, info, faqs: customFaqs, children }: ToolLayoutProps) {
  const canonical = `https://anytool.site/tools/${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+$/, '')}`
  const faqs = customFaqs || defaultFaqs

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: title,
    description,
    url: canonical,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    ...(customFaqs && {
      faqPage: {
        '@type': 'FAQPage',
        mainEntity: customFaqs.map(f => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      },
    }),
  }

  return (
    <div>
      <Helmet>
        <title>{title} - AnyTool.site</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={`${title} - AnyTool.site`} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={`${title} - AnyTool.site`} />
        <meta name="twitter:description" content={description} />
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      {/* Tool header */}
      <section className="bg-gray-950 py-12 px-4 border-b border-gray-800/50">
        <div className="max-w-4xl mx-auto">
          <Link to="/" className="inline-flex items-center text-sm text-gray-400 hover:text-white mb-6 transition-colors no-underline">
            <ArrowLeft className="w-4 h-4 mr-1" /> All Tools
          </Link>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-violet-500/10 rounded-xl flex items-center justify-center border border-violet-500/20">
              <Icon className="w-6 h-6 text-violet-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">{title}</h1>
              <p className="text-gray-400 text-sm mt-0.5">{description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tool content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {children}
      </div>

      {/* SEO info section */}
      {info && (
        <div className="max-w-4xl mx-auto px-4 pb-8">
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 md:p-8">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">About {title}</h2>
            <div className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed space-y-4">
              {info.split('\n').filter(Boolean).map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>
        </div>
      )}

      {/* FAQ section */}
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Frequently Asked Questions</h2>
        <div className="space-y-3">
          {faqs.map((faq) => (
            <details key={faq.q} className="bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden group">
              <summary className="px-5 py-3.5 cursor-pointer text-gray-900 dark:text-white font-medium text-sm list-none flex items-center justify-between">
                {faq.q}
                <span className="text-gray-400 group-open:rotate-180 transition-transform text-xs">▾</span>
              </summary>
              <div className="px-5 pb-4 text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{faq.a}</div>
            </details>
          ))}
        </div>
      </div>
    </div>
  )
}
