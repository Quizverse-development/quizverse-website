"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Palette } from "lucide-react"
import { THEMES, getThemePreference, saveThemePreference } from "@/lib/theme-store"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export function ThemeSelector() {
  const [currentTheme, setCurrentTheme] = useState('default')
  const [open, setOpen] = useState(false)
  
  useEffect(() => {
    // Load theme preference on mount
    try {
      const savedTheme = getThemePreference()
      setCurrentTheme(savedTheme)
    } catch (error) {
      console.error('Error loading theme preference:', error)
      // Keep default theme if there's an error
    }
  }, [])
  
  const handleThemeChange = (themeId: string) => {
    setCurrentTheme(themeId)
    saveThemePreference(themeId)
    setOpen(false)
    
    // Force page reload to apply theme
    window.location.reload()
  }
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Palette className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Change theme</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Choose Theme</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 py-4">
          {THEMES.map((theme) => (
            <Card 
              key={theme.id}
              className={`cursor-pointer transition-all hover:scale-105 ${
                currentTheme === theme.id ? 'ring-2 ring-blue-500' : ''
              }`}
              onClick={() => handleThemeChange(theme.id)}
            >
              <div className={`h-20 w-full bg-gradient-to-r ${theme.bgGradient} rounded-t-lg`} />
              <CardContent className="p-3">
                <h3 className="font-medium text-sm">{theme.name}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}