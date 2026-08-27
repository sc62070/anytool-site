import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">About AnyTool.site</h1>
      <div className="prose prose-gray max-w-none space-y-4 text-gray-600 leading-relaxed">
        <p>
          Welcome to <strong>AnyTool.site</strong> — your go-to destination for free, fast, and reliable online tools.
        </p>
        <p>
          We believe that useful tools should be accessible to everyone without barriers. That's why all our tools are completely free, require no sign-up, and run directly in your browser for maximum privacy and speed.
        </p>
        <h2 className="text-xl font-semibold text-gray-900 mt-8">Our Mission</h2>
        <p>
          To build the most comprehensive collection of free online tools that help developers, writers, designers, and everyday users get things done quickly and efficiently.
        </p>
        <h2 className="text-xl font-semibold text-gray-900 mt-8">What We Offer</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>Text tools (word counter, case converter, and more)</li>
          <li>Developer tools (JSON formatter, Base64 encoder, etc.)</li>
          <li>Design tools (color picker, gradient generator)</li>
          <li>Security tools (password generator, hash generator)</li>
          <li>And many more coming soon!</li>
        </ul>
        <h2 className="text-xl font-semibold text-gray-900 mt-8">Contact Us</h2>
        <p>
          Have a suggestion or need help? Visit our <Link to="/contact" className="text-indigo-600 hover:underline">Contact page</Link> to get in touch.
        </p>
      </div>
    </div>
  )
}
