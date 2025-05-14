"use client"

import { useState } from "react"

export function useMobileSubmenu() {
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)

  const toggleSubmenu = (id: string) => {
    setOpenSubmenu((prev) => (prev === id ? null : id))
  }

  const isSubmenuOpen = (id: string) => openSubmenu === id

  return {
    toggleSubmenu,
    isSubmenuOpen,
  }
}
