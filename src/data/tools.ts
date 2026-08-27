import { Calculator, FileJson, Palette, KeyRound, Binary } from 'lucide-react'

export interface Tool {
  name: string
  slug: string
  description: string
  icon: typeof Calculator
  category: string
}

export const tools: Tool[] = [
  {
    name: 'Word Counter',
    slug: 'word-counter',
    description: 'Count words, characters, sentences, and paragraphs instantly.',
    icon: Calculator,
    category: 'Text',
  },
  {
    name: 'JSON Formatter',
    slug: 'json-formatter',
    description: 'Format, validate, and beautify your JSON data.',
    icon: FileJson,
    category: 'Developer',
  },
  {
    name: 'Color Picker',
    slug: 'color-picker',
    description: 'Pick colors, convert HEX, RGB, and HSL values.',
    icon: Palette,
    category: 'Design',
  },
  {
    name: 'Password Generator',
    slug: 'password-generator',
    description: 'Generate strong, secure passwords instantly.',
    icon: KeyRound,
    category: 'Security',
  },
  {
    name: 'Base64 Tool',
    slug: 'base64',
    description: 'Encode and decode Base64 strings quickly.',
    icon: Binary,
    category: 'Developer',
  },
]
