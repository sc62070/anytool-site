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

export default function App() {
  return (
    <HelmetProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="tools/word-counter" element={<ToolTracker><WordCounter /></ToolTracker>} />
          <Route path="tools/json-formatter" element={<ToolTracker><JsonFormatter /></ToolTracker>} />
          <Route path="tools/color-picker" element={<ToolTracker><ColorPicker /></ToolTracker>} />
          <Route path="tools/password-generator" element={<ToolTracker><PasswordGenerator /></ToolTracker>} />
          <Route path="tools/base64" element={<ToolTracker><Base64Tool /></ToolTracker>} />
          <Route path="tools/text-case" element={<ToolTracker><TextCaseConverter /></ToolTracker>} />
          <Route path="tools/url-encoder" element={<ToolTracker><UrlEncoder /></ToolTracker>} />
          <Route path="tools/markdown-preview" element={<ToolTracker><MarkdownPreview /></ToolTracker>} />
          <Route path="tools/lorem-ipsum" element={<ToolTracker><LoremIpsum /></ToolTracker>} />
          <Route path="tools/hash-generator" element={<ToolTracker><HashGenerator /></ToolTracker>} />
          <Route path="tools/uuid-generator" element={<ToolTracker><UuidGenerator /></ToolTracker>} />
          <Route path="tools/qr-code" element={<ToolTracker><QrCodeGenerator /></ToolTracker>} />
          <Route path="tools/percentage" element={<ToolTracker><PercentageCalculator /></ToolTracker>} />
          <Route path="tools/tip-calculator" element={<ToolTracker><TipCalculator /></ToolTracker>} />
          <Route path="tools/timestamp" element={<ToolTracker><TimestampConverter /></ToolTracker>} />
          <Route path="tools/markdown-to-html" element={<ToolTracker><MarkdownToHtml /></ToolTracker>} />
          <Route path="tools/image-to-base64" element={<ToolTracker><ImageToBase64 /></ToolTracker>} />
          <Route path="tools/dwg-viewer" element={<ToolTracker><DwgViewer /></ToolTracker>} />
          <Route path="tools/image-compressor" element={<ToolTracker><ImageCompressor /></ToolTracker>} />
          <Route path="tools/image-resizer" element={<ToolTracker><ImageResizer /></ToolTracker>} />
          <Route path="tools/image-format" element={<ToolTracker><ImageFormatConverter /></ToolTracker>} />
          <Route path="tools/pdf-viewer" element={<ToolTracker><PdfViewer /></ToolTracker>} />
          <Route path="tools/pdf-merge" element={<ToolTracker><PdfMerge /></ToolTracker>} />
          <Route path="tools/pdf-split" element={<ToolTracker><PdfSplit /></ToolTracker>} />
          <Route path="tools/text-repeater" element={<ToolTracker><TextRepeater /></ToolTracker>} />
          <Route path="tools/find-replace" element={<ToolTracker><FindReplace /></ToolTracker>} />
          <Route path="tools/text-diff" element={<ToolTracker><TextDiff /></ToolTracker>} />
          <Route path="tools/regex-tester" element={<ToolTracker><RegexTester /></ToolTracker>} />
          <Route path="tools/csv-to-json" element={<ToolTracker><CsvToJson /></ToolTracker>} />
          <Route path="tools/sql-formatter" element={<ToolTracker><SqlFormatter /></ToolTracker>} />
          <Route path="tools/unit-converter" element={<ToolTracker><UnitConverter /></ToolTracker>} />
          <Route path="tools/age-calculator" element={<ToolTracker><AgeCalculator /></ToolTracker>} />
          <Route path="tools/bmi-calculator" element={<ToolTracker><BmiCalculator /></ToolTracker>} />
          <Route path="tools/loan-calculator" element={<ToolTracker><LoanCalculator /></ToolTracker>} />
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
