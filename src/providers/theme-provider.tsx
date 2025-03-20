"use client"

import * as React from "react"

const ThemeContext = React.createContext({
  theme: "system",
  setTheme: (theme: string) => {},
})

const ThemeProvider = ({
  attribute,
  children,
  defaultTheme = "system",
  enableSystem = true,
  disableTransitionOnChange = false,
}: {
  attribute: string
  children: React.ReactNode
  defaultTheme?: "system" | "dark" | "light"
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
}) => {
  const [theme, setTheme] = React.useState<"system" | "dark" | "light">(defaultTheme)
  const storageKey = "theme"

  React.useEffect(() => {
    const root = window.document.documentElement

    const handleThemeChange = (theme: "system" | "dark" | "light") => {
      if (!root) {
        return
      }

      const isDark = theme === "dark"
      const isLight = theme === "light"

      root.classList.remove("dark", "light")

      if (isDark || isLight) {
        root.classList.add(theme)
      }

      if (attribute === "class") {
        localStorage.setItem(storageKey, theme)
      }
    }

    handleThemeChange(theme)
  }, [theme, attribute, storageKey])

  React.useEffect(() => {
    if (attribute === "class") {
      const storedTheme = localStorage.getItem(storageKey) as "system" | "dark" | "light" | null
      if (storedTheme) {
        setTheme(storedTheme)
      } else if (enableSystem) {
        const systemTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
        setTheme(systemTheme)
      }
    }
  }, [attribute, enableSystem, setTheme, storageKey])

  return <ThemeContext.Provider value={{ theme, setTheme }}>{children}</ThemeContext.Provider>
}

const useTheme = () => React.useContext(ThemeContext)

export { ThemeProvider, useTheme }

