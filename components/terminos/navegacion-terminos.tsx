"use client"

import { useEffect, useState } from "react"
import { BookOpen, Target, Shield, CreditCard, AlertTriangle, Copyright, Lock, RefreshCw, Scale } from "lucide-react"

export function NavegacionTerminos() {
  const [activeSection, setActiveSection] = useState("introduccion")

  useEffect(() => {
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
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      // Añadir clase para scroll suave solo durante la navegación interna
      document.documentElement.classList.add("smooth-scroll")

      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: "smooth",
      })

      // Quitar la clase después de la animación
      setTimeout(() => {
        document.documentElement.classList.remove("smooth-scroll")
      }, 1000)
    }
  }

  const navItems = [
    { id: "introduccion", label: "Introducción", icon: BookOpen },
    { id: "condiciones-uso", label: "Condiciones de Uso", icon: Target },
    { id: "proceso-reserva", label: "Proceso de Reserva", icon: CreditCard },
    { id: "cancelaciones", label: "Cancelaciones", icon: RefreshCw },
    { id: "responsabilidades", label: "Responsabilidades", icon: AlertTriangle },
    { id: "propiedad-intelectual", label: "Propiedad Intelectual", icon: Copyright },
    { id: "privacidad", label: "Privacidad", icon: Lock },
    { id: "modificaciones", label: "Modificaciones", icon: Shield },
    { id: "ley-aplicable", label: "Ley Aplicable", icon: Scale },
  ]

  return (
    <div className="sticky top-16 z-30 bg-gradient-to-r from-gray-50 to-blue-50 backdrop-blur supports-[backdrop-filter]:bg-white/60 border border-gray-200 rounded-lg shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex gap-x-2 md:gap-x-4 overflow-x-auto py-3 px-2 scrollbar-hide">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                  activeSection === item.id
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-white text-gray-700 hover:bg-gray-100 hover:shadow-sm border border-gray-200"
                }`}
                aria-current={activeSection === item.id ? "page" : undefined}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                <span>{item.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
