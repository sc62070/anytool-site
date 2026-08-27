import { Calculator, FileJson, Palette, KeyRound, Binary, CaseUpper, Link2, FileText, FileStack, Fingerprint, Zap, QrCode, Percent, Receipt, Clock, Code, Image, FileImage, Repeat, Replace, GitCompare, FileSpreadsheet, ArrowRightLeft, Calendar, Heart, Scissors } from 'lucide-react'

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
  { name: 'Password Generator', slug: 'password-generator', description: 'Generate strong, secure passwords instantly.', icon: KeyRound, category: 'Security' },
  { name: 'QR Code Generator', slug: 'qr-code', description: 'Create QR codes from text or URLs.', icon: QrCode, category: 'Developer' },
  { name: 'Color Picker', slug: 'color-picker', description: 'Pick colors, convert HEX, RGB, and HSL values.', icon: Palette, category: 'Design' },
  { name: 'Image Compressor', slug: 'image-compressor', description: 'Compress images to reduce file size. All processing in your browser.', icon: Image, category: 'Image' },
  { name: 'Merge PDF', slug: 'pdf-merge', description: 'Combine multiple PDF files into one document.', icon: FileText, category: 'Office' },
  { name: 'Split PDF', slug: 'pdf-split', description: 'Extract specific pages from a PDF file.', icon: Scissors, category: 'Office' },
  { name: 'PDF Viewer', slug: 'pdf-viewer', description: 'View PDF files directly in your browser. Nothing uploaded.', icon: FileText, category: 'Office' },
  { name: 'Base64 Tool', slug: 'base64', description: 'Encode and decode Base64 strings quickly.', icon: Binary, category: 'Developer' },
  { name: 'Image Resizer', slug: 'image-resizer', description: 'Resize images to exact dimensions in pixels.', icon: Image, category: 'Image' },
  { name: 'Image Format Converter', slug: 'image-format', description: 'Convert images between JPG, PNG, WebP, and BMP.', icon: Image, category: 'Image' },
  { name: 'Text Case Converter', slug: 'text-case', description: 'Convert text to UPPERCASE, lowercase, Title Case, camelCase, and more.', icon: CaseUpper, category: 'Text' },
  { name: 'Lorem Ipsum Generator', slug: 'lorem-ipsum', description: 'Generate placeholder text for designs and mockups.', icon: FileStack, category: 'Text' },
  { name: 'Hash Generator', slug: 'hash-generator', description: 'Generate SHA-1, SHA-256, SHA-384, SHA-512 hashes.', icon: Fingerprint, category: 'Security' },
  { name: 'UUID Generator', slug: 'uuid-generator', description: 'Generate random UUID v4 identifiers instantly.', icon: Zap, category: 'Developer' },
  { name: 'URL Encoder / Decoder', slug: 'url-encoder', description: 'Encode and decode URL strings and parameters.', icon: Link2, category: 'Developer' },
  { name: 'Markdown Preview', slug: 'markdown-preview', description: 'Write markdown and see live rendered preview.', icon: FileText, category: 'Text' },
  { name: 'Percentage Calculator', slug: 'percentage', description: 'Calculate percentages, percentage change, and more.', icon: Percent, category: 'Calculator' },
  { name: 'Unit Converter', slug: 'unit-converter', description: 'Convert between length, weight, temperature, and more.', icon: ArrowRightLeft, category: 'Calculator' },
  { name: 'Tip Calculator', slug: 'tip-calculator', description: 'Calculate tips and split bills easily.', icon: Receipt, category: 'Calculator' },
  { name: 'Age Calculator', slug: 'age-calculator', description: 'Calculate your exact age in years, months, and days.', icon: Calendar, category: 'Calculator' },
  { name: 'Timestamp Converter', slug: 'timestamp', description: 'Convert between Unix timestamps and dates.', icon: Clock, category: 'Developer' },
  { name: 'Markdown to HTML', slug: 'markdown-to-html', description: 'Convert Markdown to clean HTML code.', icon: Code, category: 'Developer' },
  { name: 'Image to Base64', slug: 'image-to-base64', description: 'Convert images to Base64 data URLs.', icon: Image, category: 'Developer' },
  { name: 'DWG / CAD Viewer', slug: 'dwg-viewer', description: 'View DWG and DXF CAD files directly in your browser.', icon: FileImage, category: 'Office' },
  { name: 'Text Repeater', slug: 'text-repeater', description: 'Repeat any text multiple times with custom separators.', icon: Repeat, category: 'Text' },
  { name: 'Find & Replace', slug: 'find-replace', description: 'Find and replace text with support for regex.', icon: Replace, category: 'Text' },
  { name: 'Text Diff Checker', slug: 'text-diff', description: 'Compare two texts and see the differences highlighted.', icon: GitCompare, category: 'Text' },
  { name: 'Regex Tester', slug: 'regex-tester', description: 'Test regular expressions with live matching.', icon: Code, category: 'Developer' },
  { name: 'CSV to JSON', slug: 'csv-to-json', description: 'Convert CSV data to JSON format instantly.', icon: FileSpreadsheet, category: 'Developer' },
  { name: 'SQL Formatter', slug: 'sql-formatter', description: 'Format and beautify SQL queries.', icon: Code, category: 'Developer' },
  { name: 'BMI Calculator', slug: 'bmi-calculator', description: 'Calculate your Body Mass Index to check healthy weight.', icon: Heart, category: 'Calculator' },
  { name: 'Loan Calculator', slug: 'loan-calculator', description: 'Calculate monthly mortgage payments and total interest.', icon: Calculator, category: 'Calculator' },
]
