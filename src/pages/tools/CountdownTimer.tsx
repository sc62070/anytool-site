import { useState, useEffect, useRef, useCallback } from 'react'
import ToolLayout from '../../components/ToolLayout'
import { Hourglass, Play, Pause, RotateCcw } from 'lucide-react'

export default function CountdownTimer() {
  const [minutes, setMinutes] = useState(5)
  const [seconds, setSeconds] = useState(0)
  const [running, setRunning] = useState(false)
  const [remaining, setRemaining] = useState(0)
  const [finished, setFinished] = useState(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const totalInput = minutes * 60 + seconds

  const tick = useCallback(() => {
    setRemaining(prev => {
      if (prev <= 1) {
        setRunning(false)
        setFinished(true)
        try { audioRef.current?.play() } catch {}
        return 0
      }
      return prev - 1
    })
  }, [])

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(tick, 1000)
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current) }
  }, [running, tick])

  const start = () => {
    if (remaining === 0) setRemaining(totalInput)
    setRunning(true)
    setFinished(false)
  }

  const pause = () => setRunning(false)

  const reset = () => {
    setRunning(false)
    setRemaining(0)
    setFinished(false)
  }

  const display = remaining > 0 ? remaining : totalInput
  const mins = Math.floor(display / 60)
  const secs = display % 60
  const progress = totalInput > 0 ? ((totalInput - display) / totalInput) * 100 : 0

  return (
    <ToolLayout title="Countdown Timer" description="Set a countdown timer with alarm sound." icon={Hourglass} info="Set a precise countdown with start, pause, and reset controls plus an audio alert when time expires. Great for the Pomodoro technique (25-minute work sessions with 5-minute breaks), cooking and baking, exercise interval training, presentation pacing, and study sessions with built-in time discipline.">
      <div className="space-y-6">
        <audio ref={audioRef} preload="auto">
          <source src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdH2DgH11bG15hYaDe3ZycHqIiYR8dXRyfImJhXx0c3N8iYmFfHRzc3yJiYV8dHNzfImJhXx0c3N8iYmFfHRzc3w=" type="audio/wav" />
        </audio>

        {/* Timer display */}
        <div className={`text-center p-8 rounded-2xl border transition-all ${finished ? 'bg-red-50 dark:bg-red-500/10 border-red-300 dark:border-red-500/30' : running ? 'bg-violet-50 dark:bg-violet-500/10 border-violet-300 dark:border-violet-500/30' : 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800'}`}>
          <div className="text-6xl md:text-8xl font-mono font-bold text-gray-900 dark:text-white tabular-nums">
            {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
          </div>
          {finished && <p className="text-red-500 font-semibold mt-2 animate-pulse">Time's up!</p>}
          {running && (
            <div className="mt-4 h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full transition-all" style={{ width: `${progress}%` }} />
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-3">
          {!running ? (
            <button onClick={start} className="px-8 py-3 bg-violet-600 text-white rounded-xl font-semibold hover:bg-violet-700 transition-colors flex items-center gap-2">
              <Play className="w-5 h-5" /> {remaining > 0 ? 'Resume' : 'Start'}
            </button>
          ) : (
            <button onClick={pause} className="px-8 py-3 bg-amber-500 text-white rounded-xl font-semibold hover:bg-amber-600 transition-colors flex items-center gap-2">
              <Pause className="w-5 h-5" /> Pause
            </button>
          )}
          <button onClick={reset} className="px-6 py-3 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-xl font-semibold hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors flex items-center gap-2">
            <RotateCcw className="w-5 h-5" /> Reset
          </button>
        </div>

        {/* Time input */}
        {!running && remaining === 0 && (
          <div className="flex items-center justify-center gap-4">
            <div>
              <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1 text-center">Minutes</label>
              <input type="number" value={minutes} onChange={e => setMinutes(Math.max(0, Math.min(99, Number(e.target.value))))} min={0} max={99} className="w-20 px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-center text-lg font-mono text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500" />
            </div>
            <span className="text-2xl font-bold text-gray-400 mt-5">:</span>
            <div>
              <label className="block text-sm text-gray-500 dark:text-gray-400 mb-1 text-center">Seconds</label>
              <input type="number" value={seconds} onChange={e => setSeconds(Math.max(0, Math.min(59, Number(e.target.value))))} min={0} max={59} className="w-20 px-3 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg text-center text-lg font-mono text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500" />
            </div>
          </div>
        )}
      </div>
      </div>

      <section className="mt-8 mb-4">
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mt-8 mb-4">Productive Ways to Use a Countdown Timer</h2>
        <div className="text-sm leading-relaxed text-gray-600 dark:text-gray-400 space-y-3">
          <p>
            The Pomodoro Technique is the most popular productivity method built around timers: work for 25 minutes, break for 5 minutes, then take a longer 15-30 minute break after four cycles. This timer is perfect for that — set 25 minutes, focus deeply on one task, then let the alarm pull you out of flow for a restorative break. The technique works because it creates urgency (you only have 25 minutes) and prevents burnout (you're forced to rest regularly).
          </p>
          <p>
            Cooking and baking demand precise timing. Bread dough needs exactly 10 minutes of kneading, pasta needs 8-12 minutes depending on thickness, and a soft-boiled egg is 6 minutes. Unlike a kitchen timer app, this runs in your browser, so it's handy when you're already at your desk following an online recipe. For exercise, interval training alternates between high-intensity work (30-60 seconds) and rest (15-30 seconds), and keeping accurate intervals is what makes the workout effective.
          </p>
          <p>
            Presentations benefit enormously from timing discipline. A 5-minute lightning talk needs to stay under 300 seconds, and running over looks unprofessional. Set the timer before you start, and the progress bar gives you a visual cue of how much time remains without checking your watch. For meetings, a visible countdown creates shared accountability — everyone can see the time shrinking, which naturally keeps discussions focused and on-schedule.
          </p>
        </div>
      </section>
    </ToolLayout>
  )
}
