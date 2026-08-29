import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Layout from './components/Layout'
import ToolTracker from './components/ToolTracker'
import Home from './pages/Home'

const WordCounter = lazy(() => import('./pages/tools/WordCounter'))
const JsonFormatter = lazy(() => import('./pages/tools/JsonFormatter'))
const ColorPicker = lazy(() => import('./pages/tools/ColorPicker'))
const PasswordGenerator = lazy(() => import('./pages/tools/PasswordGenerator'))
const Base64Tool = lazy(() => import('./pages/tools/Base64Tool'))
const TextCaseConverter = lazy(() => import('./pages/tools/TextCaseConverter'))
const UrlEncoder = lazy(() => import('./pages/tools/UrlEncoder'))
const MarkdownPreview = lazy(() => import('./pages/tools/MarkdownPreview'))
const LoremIpsum = lazy(() => import('./pages/tools/LoremIpsum'))
const HashGenerator = lazy(() => import('./pages/tools/HashGenerator'))
const UuidGenerator = lazy(() => import('./pages/tools/UuidGenerator'))
const QrCodeGenerator = lazy(() => import('./pages/tools/QrCodeGenerator'))
const PercentageCalculator = lazy(() => import('./pages/tools/PercentageCalculator'))
const TipCalculator = lazy(() => import('./pages/tools/TipCalculator'))
const TimestampConverter = lazy(() => import('./pages/tools/TimestampConverter'))
const MarkdownToHtml = lazy(() => import('./pages/tools/MarkdownToHtml'))
const ImageToBase64 = lazy(() => import('./pages/tools/ImageToBase64'))
const DwgViewer = lazy(() => import('./pages/tools/DwgViewer'))
const ImageCompressor = lazy(() => import('./pages/tools/ImageCompressor'))
const ImageResizer = lazy(() => import('./pages/tools/ImageResizer'))
const ImageFormatConverter = lazy(() => import('./pages/tools/ImageFormatConverter'))
const PdfViewer = lazy(() => import('./pages/tools/PdfViewer'))
const PdfMerge = lazy(() => import('./pages/tools/PdfMerge'))
const PdfSplit = lazy(() => import('./pages/tools/PdfSplit'))
const TextRepeater = lazy(() => import('./pages/tools/TextRepeater'))
const FindReplace = lazy(() => import('./pages/tools/FindReplace'))
const TextDiff = lazy(() => import('./pages/tools/TextDiff'))
const RegexTester = lazy(() => import('./pages/tools/RegexTester'))
const CsvToJson = lazy(() => import('./pages/tools/CsvToJson'))
const SqlFormatter = lazy(() => import('./pages/tools/SqlFormatter'))
const UnitConverter = lazy(() => import('./pages/tools/UnitConverter'))
const AgeCalculator = lazy(() => import('./pages/tools/AgeCalculator'))
const BmiCalculator = lazy(() => import('./pages/tools/BmiCalculator'))
const LoanCalculator = lazy(() => import('./pages/tools/LoanCalculator'))
const JsFormatter = lazy(() => import('./pages/tools/JsFormatter'))
const CssFormatter = lazy(() => import('./pages/tools/CssFormatter'))
const HtmlFormatter = lazy(() => import('./pages/tools/HtmlFormatter'))
const JwtDecoder = lazy(() => import('./pages/tools/JwtDecoder'))
const YamlJson = lazy(() => import('./pages/tools/YamlJson'))
const XmlFormatter = lazy(() => import('./pages/tools/XmlFormatter'))
const CronBuilder = lazy(() => import('./pages/tools/CronBuilder'))
const NumberBaseConverter = lazy(() => import('./pages/tools/NumberBaseConverter'))
const MockDataGenerator = lazy(() => import('./pages/tools/MockDataGenerator'))
const JsonToTypescript = lazy(() => import('./pages/tools/JsonToTypescript'))
const SlugGenerator = lazy(() => import('./pages/tools/SlugGenerator'))
const TextSorter = lazy(() => import('./pages/tools/TextSorter'))
const RemoveDuplicates = lazy(() => import('./pages/tools/RemoveDuplicates'))
const HtmlStripper = lazy(() => import('./pages/tools/HtmlStripper'))
const MorseCode = lazy(() => import('./pages/tools/MorseCode'))
const AsciiArt = lazy(() => import('./pages/tools/AsciiArt'))
const TypingSpeed = lazy(() => import('./pages/tools/TypingSpeed'))
const PlaceholderImageGenerator = lazy(() => import('./pages/tools/PlaceholderImageGenerator'))
const FaviconGenerator = lazy(() => import('./pages/tools/FaviconGenerator'))
const ColorPaletteGenerator = lazy(() => import('./pages/tools/ColorPaletteGenerator'))
const PasswordStrengthChecker = lazy(() => import('./pages/tools/PasswordStrengthChecker'))
const RotatePdf = lazy(() => import('./pages/tools/RotatePdf'))
const CompressPdf = lazy(() => import('./pages/tools/CompressPdf'))
const ImageToPdf = lazy(() => import('./pages/tools/ImageToPdf'))
const CssGradientGenerator = lazy(() => import('./pages/tools/CssGradientGenerator'))
const BoxShadowGenerator = lazy(() => import('./pages/tools/BoxShadowGenerator'))
const FlexboxPlayground = lazy(() => import('./pages/tools/FlexboxPlayground'))
const GlassmorphismGenerator = lazy(() => import('./pages/tools/GlassmorphismGenerator'))
const ContrastChecker = lazy(() => import('./pages/tools/ContrastChecker'))
const GpaCalculator = lazy(() => import('./pages/tools/GpaCalculator'))
const MortgageCalculator = lazy(() => import('./pages/tools/MortgageCalculator'))
const ScientificCalculator = lazy(() => import('./pages/tools/ScientificCalculator'))
const FractionCalculator = lazy(() => import('./pages/tools/FractionCalculator'))
const RomanNumerals = lazy(() => import('./pages/tools/RomanNumerals'))
const FibonacciGenerator = lazy(() => import('./pages/tools/FibonacciGenerator'))
const FactorialCalculator = lazy(() => import('./pages/tools/FactorialCalculator'))
const DnsLookup = lazy(() => import('./pages/tools/DnsLookup'))
const HttpStatusChecker = lazy(() => import('./pages/tools/HttpStatusChecker'))
const UserAgentParser = lazy(() => import('./pages/tools/UserAgentParser'))
const SubnetCalculator = lazy(() => import('./pages/tools/SubnetCalculator'))
const Blog = lazy(() => import('./pages/blog/Blog'))
const BlogPost = lazy(() => import('./pages/blog/BlogPost'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const Terms = lazy(() => import('./pages/Terms'))
const Changelog = lazy(() => import('./pages/Changelog'))
const NotFound = lazy(() => import('./pages/NotFound'))
const ToolRequest = lazy(() => import('./pages/ToolRequest'))

const t = (c: React.ReactNode) => <ToolTracker>{c}</ToolTracker>

function Loader() {
  return (
    <div className="flex items-center justify-center py-32">
      <div className="w-8 h-8 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )
}

export default function App() {
  return (
    <HelmetProvider>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="tools/word-counter" element={t(<WordCounter />)} />
            <Route path="tools/json-formatter" element={t(<JsonFormatter />)} />
            <Route path="tools/color-picker" element={t(<ColorPicker />)} />
            <Route path="tools/password-generator" element={t(<PasswordGenerator />)} />
            <Route path="tools/base64" element={t(<Base64Tool />)} />
            <Route path="tools/text-case" element={t(<TextCaseConverter />)} />
            <Route path="tools/url-encoder" element={t(<UrlEncoder />)} />
            <Route path="tools/markdown-preview" element={t(<MarkdownPreview />)} />
            <Route path="tools/lorem-ipsum" element={t(<LoremIpsum />)} />
            <Route path="tools/hash-generator" element={t(<HashGenerator />)} />
            <Route path="tools/uuid-generator" element={t(<UuidGenerator />)} />
            <Route path="tools/qr-code" element={t(<QrCodeGenerator />)} />
            <Route path="tools/percentage" element={t(<PercentageCalculator />)} />
            <Route path="tools/tip-calculator" element={t(<TipCalculator />)} />
            <Route path="tools/timestamp" element={t(<TimestampConverter />)} />
            <Route path="tools/markdown-to-html" element={t(<MarkdownToHtml />)} />
            <Route path="tools/image-to-base64" element={t(<ImageToBase64 />)} />
            <Route path="tools/dwg-viewer" element={t(<DwgViewer />)} />
            <Route path="tools/image-compressor" element={t(<ImageCompressor />)} />
            <Route path="tools/image-resizer" element={t(<ImageResizer />)} />
            <Route path="tools/image-format" element={t(<ImageFormatConverter />)} />
            <Route path="tools/pdf-viewer" element={t(<PdfViewer />)} />
            <Route path="tools/pdf-merge" element={t(<PdfMerge />)} />
            <Route path="tools/pdf-split" element={t(<PdfSplit />)} />
            <Route path="tools/text-repeater" element={t(<TextRepeater />)} />
            <Route path="tools/find-replace" element={t(<FindReplace />)} />
            <Route path="tools/text-diff" element={t(<TextDiff />)} />
            <Route path="tools/regex-tester" element={t(<RegexTester />)} />
            <Route path="tools/csv-to-json" element={t(<CsvToJson />)} />
            <Route path="tools/sql-formatter" element={t(<SqlFormatter />)} />
            <Route path="tools/unit-converter" element={t(<UnitConverter />)} />
            <Route path="tools/age-calculator" element={t(<AgeCalculator />)} />
            <Route path="tools/bmi-calculator" element={t(<BmiCalculator />)} />
            <Route path="tools/loan-calculator" element={t(<LoanCalculator />)} />
            <Route path="tools/js-formatter" element={t(<JsFormatter />)} />
            <Route path="tools/css-formatter" element={t(<CssFormatter />)} />
            <Route path="tools/html-formatter" element={t(<HtmlFormatter />)} />
            <Route path="tools/jwt-decoder" element={t(<JwtDecoder />)} />
            <Route path="tools/yaml-json" element={t(<YamlJson />)} />
            <Route path="tools/xml-formatter" element={t(<XmlFormatter />)} />
            <Route path="tools/cron-builder" element={t(<CronBuilder />)} />
            <Route path="tools/number-base" element={t(<NumberBaseConverter />)} />
            <Route path="tools/mock-data" element={t(<MockDataGenerator />)} />
            <Route path="tools/json-to-typescript" element={t(<JsonToTypescript />)} />
            <Route path="tools/slug-generator" element={t(<SlugGenerator />)} />
            <Route path="tools/text-sorter" element={t(<TextSorter />)} />
            <Route path="tools/remove-duplicates" element={t(<RemoveDuplicates />)} />
            <Route path="tools/html-stripper" element={t(<HtmlStripper />)} />
            <Route path="tools/morse-code" element={t(<MorseCode />)} />
            <Route path="tools/ascii-art" element={t(<AsciiArt />)} />
            <Route path="tools/typing-speed" element={t(<TypingSpeed />)} />
            <Route path="tools/placeholder-image" element={t(<PlaceholderImageGenerator />)} />
            <Route path="tools/favicon-generator" element={t(<FaviconGenerator />)} />
            <Route path="tools/color-palette" element={t(<ColorPaletteGenerator />)} />
            <Route path="tools/password-strength" element={t(<PasswordStrengthChecker />)} />
            <Route path="tools/rotate-pdf" element={t(<RotatePdf />)} />
            <Route path="tools/compress-pdf" element={t(<CompressPdf />)} />
            <Route path="tools/image-to-pdf" element={t(<ImageToPdf />)} />
            <Route path="tools/css-gradient" element={t(<CssGradientGenerator />)} />
            <Route path="tools/box-shadow" element={t(<BoxShadowGenerator />)} />
            <Route path="tools/flexbox-playground" element={t(<FlexboxPlayground />)} />
            <Route path="tools/glassmorphism" element={t(<GlassmorphismGenerator />)} />
            <Route path="tools/contrast-checker" element={t(<ContrastChecker />)} />
            <Route path="tools/gpa-calculator" element={t(<GpaCalculator />)} />
            <Route path="tools/mortgage-calculator" element={t(<MortgageCalculator />)} />
            <Route path="tools/scientific-calculator" element={t(<ScientificCalculator />)} />
            <Route path="tools/fraction-calculator" element={t(<FractionCalculator />)} />
            <Route path="tools/roman-numerals" element={t(<RomanNumerals />)} />
            <Route path="tools/fibonacci" element={t(<FibonacciGenerator />)} />
            <Route path="tools/factorial" element={t(<FactorialCalculator />)} />
            <Route path="tools/dns-lookup" element={t(<DnsLookup />)} />
            <Route path="tools/http-status" element={t(<HttpStatusChecker />)} />
            <Route path="tools/user-agent" element={t(<UserAgentParser />)} />
            <Route path="tools/subnet-calculator" element={t(<SubnetCalculator />)} />
            <Route path="blog" element={<Blog />} />
            <Route path="blog/:slug" element={<BlogPost />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="privacy-policy" element={<PrivacyPolicy />} />
            <Route path="terms" element={<Terms />} />
            <Route path="changelog" element={<Changelog />} />
            <Route path="request" element={<ToolRequest />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Suspense>
    </HelmetProvider>
  )
}
