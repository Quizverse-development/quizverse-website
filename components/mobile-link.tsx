"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Smartphone } from "lucide-react"
import Link from "next/link"

export function MobileLink() {
  const [isMobile, setIsMobile] = useState(false)
  
  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera
      const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i
      setIsMobile(mobileRegex.test(userAgent))
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  
  if (!isMobile) return null
  
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Button asChild className="bg-blue-600 hover:bg-blue-700 shadow-lg rounded-full h-14 w-14 p-0">
        <Link href="/mobile">
          <Smartphone className="h-6 w-6" />
          <span className="sr-only">Mobile Version</span>
        </Link>
      </Button>
    </div>
  )
}