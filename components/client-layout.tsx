"use client"

import type React from "react"

import { usePathname } from "next/navigation"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isDashboard = pathname?.startsWith("/dashboard")
  const isLogin = pathname === "/login"

  // No mostrar navbar ni footer en el dashboard o en la página de login
  const showNavbar = !isDashboard && !isLogin
  const showFooter = !isDashboard && !isLogin

  return (
    <>
      {showNavbar && <Navbar />}
      {children}
      {showFooter && <Footer />}
    </>
  )
}
