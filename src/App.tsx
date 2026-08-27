import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import WordCounter from './pages/tools/WordCounter'
import JsonFormatter from './pages/tools/JsonFormatter'
import ColorPicker from './pages/tools/ColorPicker'
import PasswordGenerator from './pages/tools/PasswordGenerator'
import Base64Tool from './pages/tools/Base64Tool'
import About from './pages/About'
import Contact from './pages/Contact'
import PrivacyPolicy from './pages/PrivacyPolicy'
import Terms from './pages/Terms'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="tools/word-counter" element={<WordCounter />} />
        <Route path="tools/json-formatter" element={<JsonFormatter />} />
        <Route path="tools/color-picker" element={<ColorPicker />} />
        <Route path="tools/password-generator" element={<PasswordGenerator />} />
        <Route path="tools/base64" element={<Base64Tool />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="terms" element={<Terms />} />
      </Route>
    </Routes>
  )
}
