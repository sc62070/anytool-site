import { useState } from 'react'
import { Radio } from 'lucide-react'
import ToolLayout from '../../components/ToolLayout'

const MORSE_MAP: Record<string, string> = {
  A: '.-', B: '-...', C: '-.-.', D: '-..', E: '.', F: '..-.',
  G: '--.', H: '....', I: '..', J: '.---', K: '-.-', L: '.-..',
  M: '--', N: '-.', O: '---', P: '.--.', Q: '--.-', R: '.-.',
  S: '...', T: '-', U: '..-', V: '...-', W: '.--', X: '-..-',
  Y: '-.--', Z: '--..',
  '0': '-----', '1': '.----', '2': '..---', '3': '...--', '4': '....-',
  '5': '.....', '6': '-....', '7': '--...', '8': '---..', '9': '----.'
}

const REVERSE_MAP: Record<string, string> = Object.fromEntries(
  Object.entries(MORSE_MAP).map(([k, v]) => [v, k])
)

export default function MorseCode() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')

  const encode = () => {
    const encoded = input.toUpperCase().split('').map(char => {
      if (char === ' ') return ' '
      return MORSE_MAP[char] || char
    }).join(' ')
    setOutput(encoded)
  }

  const decode = () => {
    const decoded = input.split(' ').map(code => {
      if (code === '') return ' '
      return REVERSE_MAP[code] || code
    }).join('')
    setOutput(decoded)
  }

  return (
    <ToolLayout title="Morse Code Translator" description="Convert text to and from Morse code" icon={Radio}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Input</label>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-32 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            placeholder="Enter text or Morse code..."
          />
        </div>
        <div className="flex gap-3">
          <button
            onClick={encode}
            className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-colors"
          >
            Encode
          </button>
          <button
            onClick={decode}
            className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-colors"
          >
            Decode
          </button>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Output</label>
          <textarea
            value={output}
            readOnly
            className="w-full h-32 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white font-mono"
            placeholder="Result will appear here..."
          />
        </div>
      </div>
    </ToolLayout>
  )
}
