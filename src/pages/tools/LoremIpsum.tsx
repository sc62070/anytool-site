import { useState } from 'react'
import { FileStack, Copy, Check } from 'lucide-react'
import ToolLayout from '../../components/ToolLayout'

const templates: Record<string, string> = {
  paragraph: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  sentence: `The quick brown fox jumps over the lazy dog while the curious cat watches from the windowsill.`,
  words: `lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua`,
  title: `The Art of Building Beautiful Web Applications in 2026`,
}

export default function LoremIpsum() {
  const [count, setCount] = useState(3)
  const [type, setType] = useState<keyof typeof templates>('paragraph')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)

  const generate = () => {
    const parts: string[] = []
    for (let i = 0; i < count; i++) {
      parts.push(templates[type])
    }
    setOutput(parts.join('\n\n'))
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <ToolLayout title="Lorem Ipsum Generator" description="Generate placeholder text for your designs and mockups." icon={FileStack} info="Instantly generate paragraphs, sentences, words, or titles of placeholder text for wireframes, prototypes, and mockups. Based on Cicero's classical Latin text, Lorem Ipsum has been the design industry's standard dummy text since the 1500s because its letter distribution closely resembles natural English, making layouts look realistic without distracting stakeholders with meaningful copy.">

      <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Type</label>
            <select value={type} onChange={(e) => setType(e.target.value as keyof typeof templates)} className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none">
              <option value="paragraph">Paragraph</option>
              <option value="sentence">Sentence</option>
              <option value="words">Words</option>
              <option value="title">Title</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Count: {count}</label>
            <input type="range" min="1" max="20" value={count} onChange={(e) => setCount(Number(e.target.value))} className="w-full accent-indigo-600 mt-2" />
          </div>
        </div>

        <button onClick={generate} className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-indigo-700 transition-colors mb-4">
          Generate
        </button>

        {output && (
          <div className="relative">
            <textarea readOnly value={output} className="w-full h-48 p-4 border border-gray-300 dark:border-gray-600 rounded-xl text-sm bg-gray-50 dark:bg-gray-700 resize-y" />
            <button onClick={handleCopy} className="absolute top-3 right-3 p-2 text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400">
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        )}
      </div>

      <section className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Why Lorem Ipsum Still Works</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
          Lorem Ipsum originates from a passage in Cicero's "De Finibus Bonorum et Malorum" (On the Ends of Good and Evil), written in 45 BC. The design industry adopted it in the 1960s because an unknown printer scrambled the text to create a type specimen book—and the random Latin turned out to be perfect placeholder content. The key advantage over using "Your text here" is that Lorem Ipsum preserves the natural letter frequency and word spacing of English. This means designers and clients can evaluate typography, line length, and visual hierarchy without being distracted by readable content that pulls attention away from layout decisions.
        </p>
        <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
          Know when to stop using it, though. Lorem Ipsum is a layout tool, not a content strategy. As soon as real copy is available—headlines, product descriptions, legal disclaimers—replace the placeholder text immediately. Real content has variable word lengths, unexpected line breaks, and emotional tone that placeholder text cannot simulate. A three-word headline and a twenty-word headline will fundamentally change a layout. Early collaboration with copywriters prevents costly redesigns later.
        </p>
        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
          This generator supports paragraphs, sentences, individual words, and titles so you can match the placeholder to the component you are designing. Use title-length output for card components, sentence-length for meta descriptions, and full paragraphs for article layouts.
        </p>
      </section>
    </ToolLayout>
  )
}
