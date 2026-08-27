import { Calculator, FileJson, Palette, KeyRound, Binary, CaseUpper, Link2, FileText, FileStack, Fingerprint, Zap, QrCode, Percent, Receipt, Clock, Code, Image } from 'lucide-react'

export interface Tool {
  name: string
  slug: string
  description: string
  icon: typeof Calculator
  category: string
}

export const tools: Tool[] = [
  { name: 'Word Counter', slug: 'word-counter', description: 'Count words, characters, sentences, and paragraphs instantly.', icon: Calculator, category: 'Text' },
  { name: 'JSON Formatter', slug: 'json-formatter', description: 'Format, validate, and beautify your JSON data.', icon: FileJson, category: 'Developer' },
  { name: 'Color Picker', slug: 'color-picker', description: 'Pick colors, convert HEX, RGB, and HSL values.', icon: Palette, category: 'Design' },
  { name: 'Password Generator', slug: 'password-generator', description: 'Generate strong, secure passwords instantly.', icon: KeyRound, category: 'Security' },
  { name: 'Base64 Tool', slug: 'base64', description: 'Encode and decode Base64 strings quickly.', icon: Binary, category: 'Developer' },
  { name: 'Text Case Converter', slug: 'text-case', description: 'Convert text to UPPERCASE, lowercase, Title Case, camelCase, and more.', icon: CaseUpper, category: 'Text' },
  { name: 'URL Encoder / Decoder', slug: 'url-encoder', description: 'Encode and decode URL strings and parameters.', icon: Link2, category: 'Developer' },
  { name: 'Markdown Preview', slug: 'markdown-preview', description: 'Write markdown and see live rendered preview.', icon: FileText, category: 'Text' },
  { name: 'Lorem Ipsum Generator', slug: 'lorem-ipsum', description: 'Generate placeholder text for designs and mockups.', icon: FileStack, category: 'Text' },
  { name: 'Hash Generator', slug: 'hash-generator', description: 'Generate SHA-1, SHA-256, SHA-384, SHA-512 hashes.', icon: Fingerprint, category: 'Security' },
  { name: 'UUID Generator', slug: 'uuid-generator', description: 'Generate random UUID v4 identifiers instantly.', icon: Zap, category: 'Developer' },
  { name: 'QR Code Generator', slug: 'qr-code', description: 'Create QR codes from text or URLs.', icon: QrCode, category: 'Developer' },
  { name: 'Percentage Calculator', slug: 'percentage', description: 'Calculate percentages, percentage change, and more.', icon: Percent, category: 'Calculator' },
  { name: 'Tip Calculator', slug: 'tip-calculator', description: 'Calculate tips and split bills easily.', icon: Receipt, category: 'Calculator' },
  { name: 'Timestamp Converter', slug: 'timestamp', description: 'Convert between Unix timestamps and dates.', icon: Clock, category: 'Developer' },
  { name: 'Markdown to HTML', slug: 'markdown-to-html', description: 'Convert Markdown to clean HTML code.', icon: Code, category: 'Developer' },
  { name: 'Image to Base64', slug: 'image-to-base64', description: 'Convert images to Base64 data URLs.', icon: Image, category: 'Developer' },
]
