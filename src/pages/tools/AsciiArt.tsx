import { useState } from 'react'
import { Type } from 'lucide-react'
import ToolLayout from '../../components/ToolLayout'

const BLOCK_CHARS: Record<string, string[]> = {
  A: ['██╗', '██║', '██║', '███████╗', '╚════██╗'],
  B: ['█████╗', '██╔══██╗', '███████║', '██╔══██║', '███████║'],
  C: ['██████╗', '██╔══██╗', '██║  ██║', '██║  ██║', '╚█████╔╝'],
  D: ['██████╗ ', '██╔══██╗', '██║  ██║', '██║  ██║', '██████╔╝'],
  E: ['███████╗', '██╔════╝', '█████╗  ', '██╔══╝  ', '███████╗'],
  F: ['███████╗', '██╔════╝', '█████╗  ', '██╔══╝  ', '██║     '],
  G: ['██████╗ ', '██╔══██╗', '██║  ██║', '██║  ██║', '╚█████╔╝'],
  H: ['██╗  ██╗', '██║  ██║', '███████║', '██╔══██║', '██║  ██║'],
  I: ['███████╗', '╚════██║', '    ██╔╝', '   ██╔╝ ', '   ██║  '],
  J: ['  ██████╗', '  ╚════██║', '      ██╔╝', '    ██╔╝ ', '   ████╔╝ '],
  K: ['██╗  ██╗', '██║ ██╔╝', '█████╔╝ ', '██╔══██╗', '██║  ██║'],
  L: ['██╗     ', '██║     ', '██║     ', '██║     ', '███████╗'],
  M: ['██╗  ██╗', '██║  ██║', '███████║', '██╔══██║', '██║  ██║'],
  N: ['██╗  ██╗', '███╗ ██║', '█████╔╝', '██╔═██╗', '██║  ██╗'],
  O: [' ████╗ ', '██╔══██╗', '██║  ██║', '██║  ██║', '╚█████╔╝'],
  P: ['██████╗ ', '██╔══██╗', '███████║', '██╔═══╝ ', '██║     '],
  Q: [' ████╗ ', '██╔══██╗', '██║  ██║', '██║▄▄ ██║', '╚██████╔╝'],
  R: ['██████╗ ', '██╔══██╗', '███████║', '██╔══██║', '██║  ██║'],
  S: ['███████╗', '██╔════╝', '███████╗', '╚════██║', '███████║'],
  T: ['████████╗', '╚═══════╝', '    ██╗  ', '    ██║  ', '    ╚═╝  '],
  U: ['██╗  ██╗', '██║  ██║', '██║  ██║', '██║  ██║', '╚█████╔╝'],
  V: ['██╗   ██╗', '██║   ██║', '██║   ██║', '╚██╗ ██╔╝', ' ╚████╔╝ '],
  W: ['██╗      ██╗', '██║  ██  ██║', '██║  ███████║', '██║  ██╔══██║', '███████║  ██║'],
  X: ['██╗  ██╗', '╚██╗██╔╝', ' ╚███╔╝ ', ' ██╔██╗ ', '██╔╝ ██╗'],
  Y: ['██╗  ██╗', '╚██╗██╔╝', ' ╚███╔╝ ', '  ██╔╝  ', '  ██║   '],
  Z: ['███████╗', '╚════██║', '   ███╔╝ ', '  ██╔╝  ', '  ██████╗'],
  ' ': ['     ', '     ', '     ', '     ', '     '],
}

function toAsciiArt(text: string): string {
  const upper = text.toUpperCase()
  const rows: string[] = ['', '', '', '', '']
  for (const char of upper) {
    const glyph = BLOCK_CHARS[char] || BLOCK_CHARS[' ']
    for (let i = 0; i < 5; i++) {
      rows[i] += glyph[i] + ' '
    }
  }
  return rows.join('\n')
}

export default function AsciiArt() {
  const [input, setInput] = useState('HELLO')
  const [output, setOutput] = useState('')

  const generate = () => {
    setOutput(toAsciiArt(input))
  }

  return (
    <ToolLayout title="ASCII Art Generator" description="Convert text to ASCII block art" icon={Type}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Input Text</label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            placeholder="Enter text (A-Z only)..."
          />
        </div>
        <button
          onClick={generate}
          className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-colors"
        >
          Generate ASCII Art
        </button>
        {output && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Output</label>
            <pre className="p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white font-mono text-sm overflow-x-auto whitespace-pre">
              {output}
            </pre>
          </div>
        )}
      </div>
    </ToolLayout>
  )
}
