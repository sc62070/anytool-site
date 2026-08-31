import { useState, useRef } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { Volume2, Play, Pause, RotateCcw } from 'lucide-react'

export default function TextToSpeech() {
  const [text, setText] = useState('Hello! Welcome to AnyTool.site. This is a free text to speech tool that runs entirely in your browser.')
  const [voice, setVoice] = useState('')
  const [rate, setRate] = useState(1)
  const [pitch, setPitch] = useState(1)
  const [speaking, setSpeaking] = useState(false)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  const voices = typeof window !== 'undefined' ? window.speechSynthesis?.getVoices() || [] : []

  const speak = () => {
    if (!text) return
    window.speechSynthesis.cancel()

    const utter = new SpeechSynthesisUtterance(text)
    utter.rate = rate
    utter.pitch = pitch

    const selectedVoice = voices.find(v => v.name === voice)
    if (selectedVoice) utter.voice = selectedVoice

    utter.onstart = () => setSpeaking(true)
    utter.onend = () => setSpeaking(false)
    utter.onerror = () => setSpeaking(false)

    utteranceRef.current = utter
    window.speechSynthesis.speak(utter)
  }

  const pause = () => {
    window.speechSynthesis.pause()
    setSpeaking(false)
  }

  const stop = () => {
    window.speechSynthesis.cancel()
    setSpeaking(false)
  }

  return (
    <ToolLayout title="Text to Speech" description="Convert text to natural-sounding speech using browser voice synthesis." icon={Volume2}>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Text to speak</label>
          <textarea value={text} onChange={e => setText(e.target.value)} rows={6} className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500 resize-none" placeholder="Type or paste text here..." />
          <p className="text-xs text-gray-400 mt-1">{text.length} characters</p>
        </div>

        {/* Voice selection */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Voice</label>
          <select value={voice} onChange={e => setVoice(e.target.value)} className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500">
            <option value="">Default Voice</option>
            {voices.map(v => (
              <option key={v.name} value={v.name}>{v.name} ({v.lang})</option>
            ))}
          </select>
        </div>

        {/* Rate & Pitch */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Speed</label>
              <span className="text-xs text-violet-600 dark:text-violet-400 font-mono">{rate}x</span>
            </div>
            <input type="range" min={0.5} max={2} step={0.1} value={rate} onChange={e => setRate(Number(e.target.value))} className="w-full" />
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Pitch</label>
              <span className="text-xs text-violet-600 dark:text-violet-400 font-mono">{pitch}</span>
            </div>
            <input type="range" min={0} max={2} step={0.1} value={pitch} onChange={e => setPitch(Number(e.target.value))} className="w-full" />
          </div>
        </div>

        {/* Controls */}
        <div className="flex gap-3">
          {!speaking ? (
            <button onClick={speak} className="flex-1 py-3 bg-violet-600 text-white rounded-xl font-semibold hover:bg-violet-700 transition-colors flex items-center justify-center gap-2">
              <Play className="w-5 h-5" /> Play
            </button>
          ) : (
            <button onClick={pause} className="flex-1 py-3 bg-amber-500 text-white rounded-xl font-semibold hover:bg-amber-600 transition-colors flex items-center justify-center gap-2">
              <Pause className="w-5 h-5" /> Pause
            </button>
          )}
          <button onClick={stop} className="px-6 py-3 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors flex items-center gap-2">
            <RotateCcw className="w-5 h-5" /> Stop
          </button>
        </div>

        <div className="p-3 bg-violet-50 dark:bg-violet-500/10 border border-violet-200 dark:border-violet-500/20 rounded-xl">
          <p className="text-sm text-violet-700 dark:text-violet-300"><strong>Note:</strong> Voice availability depends on your browser and OS. Chrome and Edge typically have the most natural-sounding voices. All processing happens locally — no data is sent to any server.</p>
        </div>
      </div>
    </ToolLayout>
  )
}
