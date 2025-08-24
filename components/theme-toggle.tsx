"use client"

import { useState, useEffect } from "react"
import { Sun, Moon } from "lucide-react"

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    // Проверяем сохраненную тему
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      const dark = savedTheme === "dark"
      setIsDark(dark)
      document.documentElement.classList.toggle("dark", dark)
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = !isDark
    setIsDark(newTheme)
    document.documentElement.classList.toggle("dark", newTheme)
    localStorage.setItem("theme", newTheme ? "dark" : "light")
  }

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-50 p-3 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 hover:bg-primary/30 transition-all duration-300 hover:scale-110"
      aria-label="Переключить тему"
    >
      {isDark ? <Sun className="w-5 h-5 text-primary" /> : <Moon className="w-5 h-5 text-primary" />}
    </button>
  )
}
