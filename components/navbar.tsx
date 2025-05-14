"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, ChevronDown, Globe, Home, Map, Phone, ChevronRight, X, Check } from "lucide-react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

// Define available languages
const languages = [
  { code: "es", name: "Español", flag: "/flags/spain.png" },
  { code: "en", name: "English", flag: "/flags/uk.png" },
  { code: "de", name: "Deutsch", flag: "/flags/germany.png" },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState("es")
  const pathname = usePathname()
  const submenuRef = useRef<HTMLDivElement>(null)
  const languageSubmenuRef = useRef<HTMLDivElement>(null)
  const [submenuHeight, setSubmenuHeight] = useState<number | null>(null)
  const [languageSubmenuHeight, setLanguageSubmenuHeight] = useState<number | null>(null)

  // Effect to detect scrolling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleSubmenu = (id: string) => {
    setOpenSubmenu((prev) => (prev === id ? null : id))
  }

  // Effect to measure submenu height when it changes
  useEffect(() => {
    if (submenuRef.current && openSubmenu === "excursiones") {
      setSubmenuHeight(submenuRef.current.scrollHeight)
    } else if (languageSubmenuRef.current && openSubmenu === "language") {
      setLanguageSubmenuHeight(languageSubmenuRef.current.scrollHeight)
    } else {
      setSubmenuHeight(0)
      setLanguageSubmenuHeight(0)
    }
  }, [openSubmenu])

  const isActive = (path: string) => {
    if (path === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(path)
  }

  // Function to close mobile menu
  const closeMenu = () => {
    setIsOpen(false)
  }

  // Function to change language
  const changeLanguage = (code: string) => {
    setCurrentLanguage(code)
    // Here you would implement the actual logic to change the application language
    closeMenu()
  }

  // Get current language
  const getCurrentLanguage = () => {
    return languages.find((lang) => lang.code === currentLanguage) || languages[0]
  }

  return (
    <header
      className={cn(
        "bg-white text-foreground sticky top-0 z-50 navbar border-b border-gray-200",
        isScrolled && "navbar-scrolled shadow-sm",
      )}
      role="banner"
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center" aria-label="Inicio - Tenerife Paradise Tours">
            <Image src="/logo.png" alt="" width={50} height={50} className="mr-2" />
            <span className="font-bold text-xl hidden sm:inline text-foreground">Tenerife Paradise Tours</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6" role="navigation" aria-label="Navegación principal">
            <Link
              href="/"
              className={cn("desktop-nav-link", isActive("/") && "active")}
              aria-current={isActive("/") ? "page" : undefined}
            >
              Home
            </Link>
            <div className="relative desktop-dropdown-container">
              <button
                className={cn("desktop-nav-link flex items-center", isActive("/excursiones") && "active")}
                aria-expanded={isActive("/excursiones")}
                aria-haspopup="true"
              >
                Excursiones <ChevronDown className="ml-1 h-4 w-4 desktop-dropdown-icon" aria-hidden="true" />
              </button>
              <div className="desktop-dropdown" role="menu">
                <Link href="/excursiones" className="desktop-dropdown-item" role="menuitem">
                  Todas las excursiones
                </Link>
                <Link href="/excursiones?categoria=Naturaleza" className="desktop-dropdown-item" role="menuitem">
                  Naturaleza
                </Link>
                <Link href="/excursiones?categoria=Cultural" className="desktop-dropdown-item" role="menuitem">
                  Cultural
                </Link>
                <Link href="/excursiones?categoria=Aventura" className="desktop-dropdown-item" role="menuitem">
                  Aventura
                </Link>
              </div>
            </div>
            <Link
              href="/contacto"
              className={cn("desktop-nav-link", isActive("/contacto") && "active")}
              aria-current={isActive("/contacto") ? "page" : undefined}
            >
              Contacto
            </Link>

            {/* Language dropdown */}
            <div className="relative language-dropdown-container">
              <button
                className="desktop-nav-link flex items-center"
                aria-haspopup="true"
                aria-expanded="false"
                aria-label="Seleccionar idioma"
              >
                <Globe className="h-5 w-5 mr-1" aria-hidden="true" />
                {getCurrentLanguage().name}
                <ChevronDown className="ml-1 h-4 w-4 desktop-dropdown-icon" aria-hidden="true" />
              </button>
              <div className="language-dropdown" role="menu">
                {languages.map((language) => (
                  <button
                    key={language.code}
                    className={cn("language-dropdown-item", currentLanguage === language.code && "language-active")}
                    onClick={() => changeLanguage(language.code)}
                    role="menuitem"
                    aria-current={currentLanguage === language.code ? "true" : undefined}
                  >
                    <Image
                      src={language.flag || "/placeholder.svg"}
                      alt=""
                      width={20}
                      height={20}
                      className="language-flag"
                    />
                    {language.name}
                    {currentLanguage === language.code && <Check className="ml-auto h-4 w-4" aria-hidden="true" />}
                  </button>
                ))}
              </div>
            </div>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-foreground p-2 rounded-md hover:bg-muted"
            onClick={() => setIsOpen(true)}
            aria-label="Abrir menú"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      {isOpen && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-negro/50 z-40 md:hidden animate-fadeInOverlay"
            onClick={closeMenu}
            aria-hidden="true"
          ></div>

          {/* Sidebar */}
          <div
            id="mobile-menu"
            className="fixed inset-y-0 right-0 w-[280px] bg-white border-l border-gray-200 shadow-xl z-50 md:hidden animate-slideInRight"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación"
          >
            {/* Sidebar Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center">
                <Image src="/logo.png" alt="" width={40} height={40} className="mr-2" />
                <span className="font-bold text-lg text-foreground">Tenerife Paradise</span>
              </div>
              <button
                onClick={closeMenu}
                className="text-gray-500 hover:text-foreground p-2 rounded-md hover:bg-muted"
                aria-label="Cerrar menú"
              >
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            {/* Sidebar Content */}
            <div className="overflow-y-auto h-[calc(100%-64px)]">
              <nav className="py-4" role="navigation" aria-label="Menú móvil">
                <Link
                  href="/"
                  className={cn("mobile-sidebar-link", isActive("/") && "mobile-sidebar-link-active")}
                  onClick={closeMenu}
                  aria-current={isActive("/") ? "page" : undefined}
                >
                  <Home className="h-5 w-5 mr-3" aria-hidden="true" />
                  <span>Inicio</span>
                </Link>

                {/* Excursiones with submenu */}
                <div>
                  <div
                    className={cn(
                      "mobile-sidebar-link justify-between",
                      isActive("/excursiones") && "mobile-sidebar-link-active",
                    )}
                    onClick={() => toggleSubmenu("excursiones")}
                    role="button"
                    aria-expanded={openSubmenu === "excursiones"}
                    aria-controls="excursiones-submenu"
                  >
                    <div className="flex items-center">
                      <Map className="h-5 w-5 mr-3" aria-hidden="true" />
                      <span>Excursiones</span>
                    </div>
                    <ChevronRight
                      className={cn("h-4 w-4 submenu-icon", openSubmenu === "excursiones" && "open")}
                      aria-hidden="true"
                    />
                  </div>

                  <div
                    id="excursiones-submenu"
                    className="submenu-container"
                    style={{ height: openSubmenu === "excursiones" ? `${submenuHeight}px` : "0px" }}
                  >
                    <div
                      ref={submenuRef}
                      className={cn("submenu-content", openSubmenu === "excursiones" ? "open" : "closed")}
                    >
                      <Link href="/excursiones" className="mobile-sidebar-submenu-link" onClick={closeMenu}>
                        Todas las excursiones
                      </Link>
                      <Link
                        href="/excursiones?categoria=Naturaleza"
                        className="mobile-sidebar-submenu-link"
                        onClick={closeMenu}
                      >
                        Naturaleza
                      </Link>
                      <Link
                        href="/excursiones?categoria=Cultural"
                        className="mobile-sidebar-submenu-link"
                        onClick={closeMenu}
                      >
                        Cultural
                      </Link>
                      <Link
                        href="/excursiones?categoria=Aventura"
                        className="mobile-sidebar-submenu-link"
                        onClick={closeMenu}
                      >
                        Aventura
                      </Link>
                    </div>
                  </div>
                </div>

                <Link
                  href="/contacto"
                  className={cn("mobile-sidebar-link", isActive("/contacto") && "mobile-sidebar-link-active")}
                  onClick={closeMenu}
                  aria-current={isActive("/contacto") ? "page" : undefined}
                >
                  <Phone className="h-5 w-5 mr-3" aria-hidden="true" />
                  <span>Contacto</span>
                </Link>

                {/* Language with submenu */}
                <div>
                  <div
                    className="mobile-sidebar-link justify-between"
                    onClick={() => toggleSubmenu("language")}
                    role="button"
                    aria-expanded={openSubmenu === "language"}
                    aria-controls="language-submenu"
                  >
                    <div className="flex items-center">
                      <Globe className="h-5 w-5 mr-3" aria-hidden="true" />
                      <span>{getCurrentLanguage().name}</span>
                    </div>
                    <ChevronRight
                      className={cn("h-4 w-4 submenu-icon", openSubmenu === "language" && "open")}
                      aria-hidden="true"
                    />
                  </div>

                  <div
                    id="language-submenu"
                    className="submenu-container"
                    style={{ height: openSubmenu === "language" ? `${languageSubmenuHeight}px` : "0px" }}
                  >
                    <div
                      ref={languageSubmenuRef}
                      className={cn("submenu-content", openSubmenu === "language" ? "open" : "closed")}
                    >
                      {languages.map((language) => (
                        <button
                          key={language.code}
                          className={cn(
                            "mobile-sidebar-submenu-link flex items-center w-full",
                            currentLanguage === language.code && "text-primary font-medium",
                          )}
                          onClick={() => changeLanguage(language.code)}
                          aria-current={currentLanguage === language.code ? "true" : undefined}
                        >
                          <Image
                            src={language.flag || "/placeholder.svg"}
                            alt=""
                            width={20}
                            height={20}
                            className="mr-2 rounded-full border border-gray-300"
                          />
                          {language.name}
                          {currentLanguage === language.code && (
                            <Check className="ml-auto h-4 w-4" aria-hidden="true" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </nav>

              {/* Sidebar Footer */}
              <div className="p-4 border-t border-gray-200 mt-4">
                <div className="mt-4 text-center text-xs text-gray-500">
                  © {new Date().getFullYear()} Tenerife Paradise Tours
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  )
}
