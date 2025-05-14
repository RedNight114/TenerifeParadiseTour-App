import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ClientLayout } from "@/components/client-layout"
import { AuthProvider } from "@/hooks/use-auth"
import { AppProvider } from "@/contexts/app-context"
import { ConfigProvider } from "@/contexts/config-context"
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Tenerife Paradise Tours - Excursiones y Aventuras en Tenerife",
  description:
    "Descubre las mejores excursiones y aventuras en Tenerife con guías locales expertos. Reserva ahora y vive experiencias inolvidables en el paraíso canario.",
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <AuthProvider>
            <ConfigProvider>
              <AppProvider>
                <ClientLayout>{children}</ClientLayout>
                <Toaster />
              </AppProvider>
            </ConfigProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
