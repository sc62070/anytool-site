import { Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import Layout from './components/Layout'
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

export default function App() {
  return (
    <HelmetProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="tools/word-counter" element={<WordCounter />} />
          <Route path="tools/json-formatter" element={<JsonFormatter />} />
          <Route path="tools/color-picker" element={<ColorPicker />} />
          <Route path="tools/password-generator" element={<PasswordGenerator />} />
          <Route path="tools/base64" element={<Base64Tool />} />
          <Route path="tools/text-case" element={<TextCaseConverter />} />
          <Route path="tools/url-encoder" element={<UrlEncoder />} />
          <Route path="tools/markdown-preview" element={<MarkdownPreview />} />
          <Route path="tools/lorem-ipsum" element={<LoremIpsum />} />
          <Route path="tools/hash-generator" element={<HashGenerator />} />
          <Route path="tools/uuid-generator" element={<UuidGenerator />} />
          <Route path="tools/qr-code" element={<QrCodeGenerator />} />
          <Route path="tools/percentage" element={<PercentageCalculator />} />
          <Route path="tools/tip-calculator" element={<TipCalculator />} />
          <Route path="tools/timestamp" element={<TimestampConverter />} />
          <Route path="tools/markdown-to-html" element={<MarkdownToHtml />} />
          <Route path="tools/image-to-base64" element={<ImageToBase64 />} />
          <Route path="tools/dwg-viewer" element={<DwgViewer />} />
          <Route path="tools/image-compressor" element={<ImageCompressor />} />
          <Route path="tools/image-resizer" element={<ImageResizer />} />
          <Route path="tools/image-format" element={<ImageFormatConverter />} />
          <Route path="tools/pdf-viewer" element={<PdfViewer />} />
          <Route path="tools/pdf-merge" element={<PdfMerge />} />
          <Route path="tools/pdf-split" element={<PdfSplit />} />
          <Route path="tools/text-repeater" element={<TextRepeater />} />
          <Route path="tools/find-replace" element={<FindReplace />} />
          <Route path="tools/text-diff" element={<TextDiff />} />
          <Route path="tools/regex-tester" element={<RegexTester />} />
          <Route path="tools/csv-to-json" element={<CsvToJson />} />
          <Route path="tools/sql-formatter" element={<SqlFormatter />} />
          <Route path="tools/unit-converter" element={<UnitConverter />} />
          <Route path="tools/age-calculator" element={<AgeCalculator />} />
          <Route path="tools/bmi-calculator" element={<BmiCalculator />} />
          <Route path="tools/loan-calculator" element={<LoanCalculator />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<BlogPost />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="terms" element={<Terms />} />
        </Route>
      </Routes>
    </HelmetProvider>
  )
}
