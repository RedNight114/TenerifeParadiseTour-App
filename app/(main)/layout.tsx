import type React from "react"
import { ClientLayout } from "@/components/client-layout"

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return <ClientLayout>{children}</ClientLayout>
}
