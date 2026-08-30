import { useState, useEffect, useRef, useCallback } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { Disc, Play, Pause, RotateCcw, SkipForward } from 'lucide-react'

const PHASES = [
  { name: 'Focus', duration: 25 * 60, color: 'violet' },
  { name: 'Short Break', duration: 5 * 60, color: 'emerald' },
  { name: 'Focus', duration: 25 * 60, color: 'violet' },
  { name: 'Short Break', duration: 5 * 60, color: 'emerald' },
  { name: 'Focus', duration: 25 * 60, color: 'violet' },
  { name: 'Short Break', duration: 5 * 60, color: 'emerald' },
  { name: 'Focus', duration: 25 * 60, color: 'violet' },
  { name: 'Long Break', duration: 15 * 60, color: 'blue' },
]

export default function PomodoroTimer() {
  const [phaseIndex, setPhaseIndex] = useState(0)
  const [remaining, setRemaining] = useState(PHASES[0].duration)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const phase = PHASES[phaseIndex]
  const progress = ((phase.duration - remaining) / phase.duration) * 100

  const tick = useCallback(() => {
    setRemaining(prev => {
      if (prev <= 1) {
        setRunning(false)
        try { audioRef.current?.play() } catch {}
        return 0
      }
      return prev - 1
    })
  }, [])

  useEffect(() => {
    if (running) intervalRef.current = setInterval(tick, 1000)
    else if (intervalRef.current) clearInterval(intervalRef.current)
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [running, tick])

  const start = () => setRunning(true)
  const pause = () => setRunning(false)
  const reset = () => { setRunning(false); setRemaining(phase.duration) }
  const skip = () => {
    setRunning(false)
    const next = (phaseIndex + 1) % PHASES.length
    setPhaseIndex(next)
    setRemaining(PHASES[next].duration)
  }

  const mins = Math.floor(remaining / 60)
  const secs = remaining % 60

  const colorClasses: Record<string, string> = {
    violet: 'from-violet-500 to-fuchsia-500',
    emerald: 'from-emerald-500 to-teal-500',
    blue: 'from-blue-500 to-cyan-500',
  }

  return (
    <ToolLayout title="Pomodoro Timer" description="25-minute focus timer with breaks." icon={Disc}>
      <div className="space-y-6">
        <audio ref={audioRef} preload="auto">
          <source src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdH2DgH11bG15hYeDe3RycXqIiYR8dHNzfImJhXx0c3N8iYmFfHRzc3yJiYV8dHNzfImJhXx0c3N8iYV8dHNzfA==" type="audio/wav" />
        </audio>

        {/* Phase indicator */}
        <div className="flex justify-center gap-2">
          {PHASES.map((_p, i) => (
            <div key={i} className={`w-3 h-3 rounded-full transition-all ${i === phaseIndex ? 'bg-violet-500 scale-125' : i < phaseIndex ? 'bg-violet-300 dark:bg-violet-700' : 'bg-gray-200 dark:bg-gray-700'}`} />
          ))}
        </div>

        {/* Timer display */}
        <div className="text-center p-8 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
          <div className={`text-sm font-semibold mb-2 ${phase.color === 'violet' ? 'text-violet-600 dark:text-violet-400' : phase.color === 'emerald' ? 'text-emerald-600 dark:text-emerald-400' : 'text-blue-600 dark:text-blue-400'}`}>
            {phase.name}
          </div>
          <div className="text-6xl md:text-8xl font-mono font-bold text-gray-900 dark:text-white tabular-nums">
            {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
          </div>
          <div className="mt-4 h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
            <div className={`h-full bg-gradient-to-r ${colorClasses[phase.color]} rounded-full transition-all`} style={{ width: `${progress}%` }} />
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-3">
          {!running ? (
            <button onClick={start} className="px-8 py-3 bg-violet-600 text-white rounded-xl font-semibold hover:bg-violet-700 transition-colors flex items-center gap-2">
              <Play className="w-5 h-5" /> Start
            </button>
          ) : (
            <button onClick={pause} className="px-8 py-3 bg-amber-500 text-white rounded-xl font-semibold hover:bg-amber-600 transition-colors flex items-center gap-2">
              <Pause className="w-5 h-5" /> Pause
            </button>
          )}
          <button onClick={reset} className="px-4 py-3 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors">
            <RotateCcw className="w-5 h-5" />
          </button>
          <button onClick={skip} className="px-4 py-3 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors">
            <SkipForward className="w-5 h-5" />
          </button>
        </div>

        {/* Tips */}
        <div className="p-4 bg-violet-50 dark:bg-violet-500/10 border border-violet-200 dark:border-violet-500/20 rounded-xl">
          <p className="text-sm text-violet-700 dark:text-violet-300"><strong>How it works:</strong> 25 min focus → 5 min break → repeat 4× → 15 min long break. Stay focused during work sessions. No social media!</p>
        </div>
      </div>
    </ToolLayout>
  )
}
