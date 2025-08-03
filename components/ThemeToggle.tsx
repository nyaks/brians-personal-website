"use client"

import * as React from "react"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <button onClick={toggleTheme} className="focus:outline-none">
      <img 
        src="/ghcat1.png" 
        alt="Theme toggle" 
        className="h-8 w-8 rounded-full transition-all duration-300 hover:invert"
      />
    </button>
  )
}
