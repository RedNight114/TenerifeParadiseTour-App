"use client"

import type React from "react"

import { useEffect, useState } from "react"

export default function SobreNosotrosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Script para detectar la sección activa durante el scroll
  const [activeSection, setActiveSection] = useState<string | null>(null)

  useEffect(() => {
    // Asegurarse de que la página comience en la parte superior
    window.scrollTo(0, 0)

    // Pequeño retraso para permitir que la página se renderice completamente
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(entry.target.id)
            }
          })
        },
        { rootMargin: "-20% 0px -80% 0px" },
      )

      const sections = document.querySelectorAll("section[id]")
      sections.forEach((section) => {
        observer.observe(section)
      })

      return () => {
        sections.forEach((section) => {
          observer.unobserve(section)
        })
      }
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return <>{children}</>
}

// Asegúrate de que este archivo no incluya <Navbar /> o <Footer />
// Solo debe contener el contenido específico del layout
