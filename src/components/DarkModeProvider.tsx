import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type Theme = 'light' | 'dark'

interface DarkModeContextType {
  theme: Theme
  toggle: () => void
}

const DarkModeContext = createContext<DarkModeContextType>({ theme: 'light', toggle: () => {} })

export function useDarkMode() {
  return useContext(DarkModeContext)
}

export function DarkModeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme') as Theme | null
      if (saved) return saved
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return 'light'
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggle = () => setTheme(t => (t === 'light' ? 'dark' : 'light'))

  return (
    <DarkModeContext.Provider value={{ theme, toggle }}>
      {children}
    </DarkModeContext.Provider>
  )
}
