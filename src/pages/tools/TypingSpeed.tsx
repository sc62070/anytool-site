import { useState, useRef, useEffect } from 'react'
import { Timer } from 'lucide-react'
import ToolLayout from '../../components/ToolLayout'

const SAMPLE_TEXTS = [
  "The quick brown fox jumps over the lazy dog",
  "Pack my box with five dozen liquor jugs",
  "How vexingly quick daft zebras jump",
  "The five boxing wizards jump quickly",
  "Sphinx of black quartz judge my vow",
]

export default function TypingSpeed() {
  const [text, setText] = useState('')
  const [userInput, setUserInput] = useState('')
  const [startTime, setStartTime] = useState<number | null>(null)
  const [endTime, setEndTime] = useState<number | null>(null)
  const [wpm, setWpm] = useState(0)
  const [accuracy, setAccuracy] = useState(0)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    resetTest()
  }, [])

  const resetTest = () => {
    const randomText = SAMPLE_TEXTS[Math.floor(Math.random() * SAMPLE_TEXTS.length)]
    setText(randomText)
    setUserInput('')
    setStartTime(null)
    setEndTime(null)
    setWpm(0)
    setAccuracy(0)
    inputRef.current?.focus()
  }

  const handleInput = (value: string) => {
    if (!startTime && value.length > 0) {
      setStartTime(Date.now())
    }
    setUserInput(value)

    if (value === text) {
      const end = Date.now()
      setEndTime(end)
      const timeMinutes = (end - (startTime || Date.now())) / 60000
      const wordsTyped = text.split(' ').length
      const calculatedWpm = Math.round(wordsTyped / timeMinutes)
      setWpm(calculatedWpm)

      let correct = 0
      for (let i = 0; i < text.length; i++) {
        if (text[i] === value[i]) correct++
      }
      setAccuracy(Math.round((correct / text.length) * 100))
    }
  }

  const isFinished = userInput === text

  return (
    <ToolLayout title="Typing Speed Test" description="Test your typing speed and accuracy" icon={Timer}>
      <div className="space-y-4">
        <div className="p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700">
          <p className="text-gray-900 dark:text-white font-mono text-lg leading-relaxed">
            {text.split('').map((char, i) => {
              let color = 'text-gray-500'
              if (i < userInput.length) {
                color = char === userInput[i] ? 'text-green-500' : 'text-red-500'
              }
              return (
                <span key={i} className={color}>
                  {char}
                </span>
              )
            })}
          </p>
        </div>

        <textarea
          ref={inputRef}
          value={userInput}
          onChange={(e) => handleInput(e.target.value)}
          disabled={isFinished}
          className="w-full h-24 p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-violet-500 focus:border-transparent resize-none"
          placeholder="Start typing here..."
        />

        <div className="flex gap-3">
          <button
            onClick={resetTest}
            className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-lg transition-colors"
          >
            New Test
          </button>
        </div>

        {isFinished && (
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">WPM</p>
              <p className="text-3xl font-bold text-violet-600">{wpm}</p>
            </div>
            <div className="p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">Accuracy</p>
              <p className="text-3xl font-bold text-violet-600">{accuracy}%</p>
            </div>
          </div>
        )}
      </div>
    </ToolLayout>
  )
}
