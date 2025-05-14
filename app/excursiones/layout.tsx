import type React from "react"
import { ScrollReset } from "@/components/scroll-reset"

export default function ExcursionesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <ScrollReset />
      {children}
    </>
  )
}
