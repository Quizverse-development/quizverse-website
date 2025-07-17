"use client"

import { createContext, useContext, useEffect, useState } from "react"
import { getTheme, getThemePreference } from "@/lib/theme-store"

type ThemeProviderProps = {
  children: React.ReactNode
}

type ThemeContextType = {
  theme: string
  bgGradient: string
  cardGradient: string
  buttonGradient: string
  textPrimary: string
  textSecondary: string
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'default',
  bgGradient: 'from-blue-50 to-indigo-50',
  cardGradient: 'from-blue-50 to-indigo-50',
  buttonGradient: 'from-blue-500 to-purple-500',
  textPrimary: 'text-blue-700',
  textSecondary: 'text-purple-700'
})

export function ThemeProviderCustom({ children }: ThemeProviderProps) {
  const [mounted, setMounted] = useState(false)
  const [themeState, setThemeState] = useState<ThemeContextType>({
    theme: 'default',
    bgGradient: 'from-blue-50 to-indigo-50',
    cardGradient: 'from-blue-50 to-indigo-50',
    buttonGradient: 'from-blue-500 to-purple-500',
    textPrimary: 'text-blue-700',
    textSecondary: 'text-purple-700'
  })
  
  useEffect(() => {
    setMounted(true)
    const savedTheme = getThemePreference()
    const themeData = getTheme(savedTheme)
    
    setThemeState({
      theme: themeData.id,
      bgGradient: themeData.bgGradient,
      cardGradient: themeData.cardGradient,
      buttonGradient: themeData.buttonGradient,
      textPrimary: themeData.textPrimary,
      textSecondary: themeData.textSecondary
    })
  }, [])
  
  if (!mounted) {
    return <>{children}</>
  }
  
  return (
    <ThemeContext.Provider value={themeState}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)