import { Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Layout from './components/Layout'
import ToolTracker from './components/ToolTracker'
import Home from './pages/Home'
import WordCounter from './pages/tools/WordCounter'
import JsonFormatter from './pages/tools/JsonFormatter'
import ColorPicker from './pages/tools/ColorPicker'
import PasswordGenerator from './pages/tools/PasswordGenerator'
import Base64Tool from './pages/tools/Base64Tool'
import TextCaseConverter from './pages/tools/TextCaseConverter'
import UrlEncoder from './pages/tools/UrlEncoder'
import MarkdownPreview from './pages/tools/MarkdownPreview'
import LoremIpsum from './pages/tools/LoremIpsum'
import HashGenerator from './pages/tools/HashGenerator'
import UuidGenerator from './pages/tools/UuidGenerator'
import QrCodeGenerator from './pages/tools/QrCodeGenerator'
import PercentageCalculator from './pages/tools/PercentageCalculator'
import TipCalculator from './pages/tools/TipCalculator'
import TimestampConverter from './pages/tools/TimestampConverter'
import MarkdownToHtml from './pages/tools/MarkdownToHtml'
import ImageToBase64 from './pages/tools/ImageToBase64'
import DwgViewer from './pages/tools/DwgViewer'
import ImageCompressor from './pages/tools/ImageCompressor'
import ImageResizer from './pages/tools/ImageResizer'
import ImageFormatConverter from './pages/tools/ImageFormatConverter'
import PdfViewer from './pages/tools/PdfViewer'
import PdfMerge from './pages/tools/PdfMerge'
import PdfSplit from './pages/tools/PdfSplit'
import TextRepeater from './pages/tools/TextRepeater'
import FindReplace from './pages/tools/FindReplace'
import TextDiff from './pages/tools/TextDiff'
import RegexTester from './pages/tools/RegexTester'
import CsvToJson from './pages/tools/CsvToJson'
import SqlFormatter from './pages/tools/SqlFormatter'
import UnitConverter from './pages/tools/UnitConverter'
import AgeCalculator from './pages/tools/AgeCalculator'
import BmiCalculator from './pages/tools/BmiCalculator'
import LoanCalculator from './pages/tools/LoanCalculator'
import Blog from './pages/blog/Blog'
import BlogPost from './pages/blog/BlogPost'
import About from './pages/About'
import Contact from './pages/Contact'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Terms from './pages/Terms'
import JsFormatter from './pages/tools/JsFormatter'
import CssFormatter from './pages/tools/CssFormatter'
import HtmlFormatter from './pages/tools/HtmlFormatter'
import JwtDecoder from './pages/tools/JwtDecoder'
import YamlJson from './pages/tools/YamlJson'
import XmlFormatter from './pages/tools/XmlFormatter'
import CronBuilder from './pages/tools/CronBuilder'
import NumberBaseConverter from './pages/tools/NumberBaseConverter'
import MockDataGenerator from './pages/tools/MockDataGenerator'
import JsonToTypescript from './pages/tools/JsonToTypescript'
import SlugGenerator from './pages/tools/SlugGenerator'
import TextSorter from './pages/tools/TextSorter'
import RemoveDuplicates from './pages/tools/RemoveDuplicates'
import HtmlStripper from './pages/tools/HtmlStripper'
import MorseCode from './pages/tools/MorseCode'
import AsciiArt from './pages/tools/AsciiArt'
import TypingSpeed from './pages/tools/TypingSpeed'
import PlaceholderImageGenerator from './pages/tools/PlaceholderImageGenerator'
import FaviconGenerator from './pages/tools/FaviconGenerator'
import ColorPaletteGenerator from './pages/tools/ColorPaletteGenerator'
import PasswordStrengthChecker from './pages/tools/PasswordStrengthChecker'
import RotatePdf from './pages/tools/RotatePdf'
import CompressPdf from './pages/tools/CompressPdf'
import ImageToPdf from './pages/tools/ImageToPdf'
import CssGradientGenerator from './pages/tools/CssGradientGenerator'
import BoxShadowGenerator from './pages/tools/BoxShadowGenerator'
import FlexboxPlayground from './pages/tools/FlexboxPlayground'
import GlassmorphismGenerator from './pages/tools/GlassmorphismGenerator'
import ContrastChecker from './pages/tools/ContrastChecker'
import GpaCalculator from './pages/tools/GpaCalculator'
import MortgageCalculator from './pages/tools/MortgageCalculator'
import ScientificCalculator from './pages/tools/ScientificCalculator'
import FractionCalculator from './pages/tools/FractionCalculator'
import RomanNumerals from './pages/tools/RomanNumerals'
import FibonacciGenerator from './pages/tools/FibonacciGenerator'
import FactorialCalculator from './pages/tools/FactorialCalculator'
import DnsLookup from './pages/tools/DnsLookup'
import HttpStatusChecker from './pages/tools/HttpStatusChecker'
import UserAgentParser from './pages/tools/UserAgentParser'
import SubnetCalculator from './pages/tools/SubnetCalculator'
import Changelog from './pages/Changelog'
import NotFound from './pages/NotFound'
import ToolRequest from './pages/ToolRequest'

const t = (c: React.ReactNode) => <ToolTracker>{c}</ToolTracker>

export default function App() {
  return (
    <HelmetProvider>
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
    </HelmetProvider>
  )
}
