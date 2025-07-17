import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import AuthProvider from "@/components/auth-provider"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeProviderCustom } from "@/components/theme-provider-custom"
import { Toaster } from "@/components/ui/toaster"
import { SpeedInsights } from '@vercel/speed-insights/next'
import { getServerSession } from "@/lib/auth"
import { MobileLink } from "@/components/mobile-link"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Quizverse",
  description: "Your universe of quizzes!",
  generator: 'v0.dev'
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerSession()
  
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ThemeProviderCustom>
            <AuthProvider>
              {children}
              <Toaster />
              <SpeedInsights />
              <MobileLink />
            </AuthProvider>
          </ThemeProviderCustom>
        </ThemeProvider>
      </body>
    </html>
  )
}
