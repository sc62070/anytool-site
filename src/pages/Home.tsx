import { Link } from 'react-router-dom'
import { tools } from '../data/tools'
import { ArrowRight } from 'lucide-react'

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 text-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Free Online Tools
          </h1>
          <p className="text-lg md:text-xl text-indigo-100 mb-8 max-w-xl mx-auto">
            Simple, fast, and free tools for developers, writers, and everyone. No sign-up required.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="#tools" className="bg-white text-indigo-700 px-6 py-3 rounded-lg font-semibold hover:bg-indigo-50 transition-colors no-underline">
              Explore Tools
            </a>
            <Link to="/about" className="border border-white/30 text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors no-underline">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section id="tools" className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Our Tools</h2>
          <p className="text-gray-600 max-w-lg mx-auto">Everything you need, all in one place. Each tool is designed to be fast, reliable, and easy to use.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => {
            const Icon = tool.icon
            return (
              <Link
                key={tool.slug}
                to={`/tools/${tool.slug}`}
                className="group bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-lg hover:border-indigo-300 transition-all no-underline"
              >
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-indigo-200 transition-colors">
                  <Icon className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{tool.name}</h3>
                <p className="text-sm text-gray-600 mb-4">{tool.description}</p>
                <span className="inline-flex items-center text-sm font-medium text-indigo-600 group-hover:gap-2 transition-all">
                  Use Tool <ArrowRight className="w-4 h-4 ml-1" />
                </span>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Why AnyTool.site?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Fast & Free', desc: 'All tools run instantly in your browser. No waiting, no fees.' },
              { title: 'No Sign-Up', desc: 'Just open and use. We respect your time and privacy.' },
              { title: 'Always Available', desc: 'Works on any device, anywhere. 24/7 uptime.' },
            ].map((f) => (
              <div key={f.title} className="text-center p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
