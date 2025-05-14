"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  BarChart3,
  CalendarRange,
  ExternalLink,
  Globe,
  Home,
  LayoutDashboard,
  Menu,
  Users,
  PlusCircle,
  Eye,
  Lock,
  Star,
  Camera,
} from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/components/ui/use-toast"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { useConfig } from "@/contexts/config-context"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  variant?: "default" | "ghost"
  external?: boolean
  locked?: boolean
  premium?: boolean
}

interface ActionItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  variant?: "default" | "outline" | "secondary"
  section: string
  locked?: boolean
}

const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    variant: "default",
  },
  {
    title: "Reservas",
    href: "/dashboard/reservas",
    icon: CalendarRange,
    variant: "ghost",
  },
  {
    title: "Excursiones",
    href: "/dashboard/excursiones",
    icon: Globe,
    variant: "ghost",
  },
  {
    title: "Galería",
    href: "/dashboard/galeria",
    icon: Camera,
    variant: "ghost",
  },
  {
    title: "Clientes",
    href: "#",
    icon: Users,
    variant: "ghost",
    locked: true,
    premium: true,
  },
  {
    title: "Estadísticas",
    href: "/dashboard/estadisticas",
    icon: BarChart3,
    variant: "ghost",
  },
]

const actionItems: ActionItem[] = [
  {
    title: "Nueva Excursión",
    href: "/dashboard/excursiones/nueva",
    icon: PlusCircle,
    variant: "default",
    section: "excursiones",
  },
  {
    title: "Ver Excursiones",
    href: "/dashboard/excursiones",
    icon: Eye,
    variant: "outline",
    section: "excursiones",
  },
  {
    title: "Nueva Reserva",
    href: "/dashboard/reservas/nueva",
    icon: PlusCircle,
    variant: "default",
    section: "reservas",
  },
  {
    title: "Ver Reservas",
    href: "/dashboard/reservas",
    icon: Eye,
    variant: "outline",
    section: "reservas",
  },
  {
    title: "Subir Imagen",
    href: "/dashboard/galeria",
    icon: PlusCircle,
    variant: "default",
    section: "galeria",
  },
  {
    title: "Ver Galería",
    href: "/dashboard/galeria",
    icon: Eye,
    variant: "outline",
    section: "galeria",
  },
  {
    title: "Nuevo Cliente",
    href: "#",
    icon: PlusCircle,
    variant: "default",
    section: "clientes",
    locked: true,
  },
  {
    title: "Ver Clientes",
    href: "#",
    icon: Eye,
    variant: "outline",
    section: "clientes",
    locked: true,
  },
]

const externalLinks: NavItem[] = [
  {
    title: "Página Principal",
    href: "/",
    icon: Home,
    variant: "ghost",
    external: true,
  },
]

interface DashboardSidebarProps {
  isSidebarOpen: boolean
  setIsSidebarOpen: (open: boolean) => void
  isMobile: boolean
}

export function DashboardSidebar({ isSidebarOpen, setIsSidebarOpen, isMobile }: DashboardSidebarProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null)
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const { config, setConfig, saveConfig, resetConfig, hasChanges } = useConfig()

  const handleLogout = () => {
    logout()
    toast({
      title: "Sesión cerrada",
      description: "Has cerrado sesión correctamente",
    })
    router.push("/login")
  }

  const toggleSection = (section: string) => {
    if (expandedSection === section) {
      setExpandedSection(null)
    } else {
      setExpandedSection(section)
    }
  }

  const userInitials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .substring(0, 2)
    : "AD"

  const handleLockedFeature = (feature: string) => {
    toast({
      title: "Función premium",
      description: `La gestión de ${feature} estará disponible próximamente en la versión premium.`,
      variant: "default",
    })
  }

  // Función para renderizar los botones de acción para una sección
  const renderActionButtons = (section: string) => {
    const sectionActions = actionItems.filter((item) => item.section === section)
    if (sectionActions.length === 0) return null

    return (
      <div
        className={cn(
          "pl-10 space-y-1 overflow-hidden transition-all",
          expandedSection === section ? "max-h-40 opacity-100 mt-1" : "max-h-0 opacity-0",
        )}
      >
        {sectionActions.map((action) =>
          action.locked ? (
            <TooltipProvider key={action.title}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start text-sm opacity-70 cursor-not-allowed"
                    onClick={() => handleLockedFeature(section)}
                  >
                    <div className="flex items-center w-full">
                      <action.icon className="mr-2 h-4 w-4" />
                      <span>{action.title}</span>
                      <Lock className="ml-auto h-3 w-3" />
                    </div>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Disponible en la versión premium</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <Button
              key={action.title}
              asChild
              variant={action.variant}
              size="sm"
              className="w-full justify-start text-sm"
            >
              <Link href={action.href}>
                <action.icon className="mr-2 h-4 w-4" />
                {action.title}
              </Link>
            </Button>
          ),
        )}
      </div>
    )
  }

  const renderNavItem = (item: NavItem) => {
    if (item.locked) {
      return (
        <TooltipProvider key={item.title}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-start group opacity-70 cursor-not-allowed"
                onClick={() => handleLockedFeature(item.title.toLowerCase())}
              >
                <div className="flex items-center w-full">
                  <item.icon className="mr-3 h-5 w-5" />
                  <span>{item.title}</span>
                  <div className="ml-auto flex items-center">
                    {item.premium && <Star className="h-3.5 w-3.5 text-amber-400 mr-1" />}
                    <Lock className="h-3.5 w-3.5" />
                  </div>
                </div>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Disponible en la versión premium</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )
    }

    return (
      <Button
        key={item.title}
        asChild
        variant={pathname === item.href ? "secondary" : "ghost"}
        className="w-full justify-start group"
        onClick={() => {
          if (isMobile) setIsSidebarOpen(false)
          if (["excursiones", "reservas", "clientes", "galeria"].includes(item.title.toLowerCase())) {
            toggleSection(item.title.toLowerCase())
          }
        }}
      >
        <Link href={item.href}>
          <div className="flex items-center w-full">
            <item.icon className="mr-3 h-5 w-5" />
            <span>{item.title}</span>
            {item.external && <ExternalLink className="ml-auto h-4 w-4" />}
          </div>
        </Link>
      </Button>
    )
  }

  return (
    <>
      {/* Mobile Sidebar */}
      <Sheet open={isMobile && isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="md:hidden fixed left-4 top-4 z-10">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle Menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="pr-0 sm:max-w-xs">
          <div className="px-7">
            <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl py-4">
              <Image src="/logo.png" alt="Tenerife Paradise Tours" width={40} height={40} className="rounded-full" />
              <span className="text-primary">Tenerife Paradise</span>
            </Link>
          </div>
          <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10">
            <div className="px-4 py-2">
              <div className="flex items-center gap-2 px-4 py-2 mb-6 bg-muted/50 rounded-lg">
                <Avatar>
                  <AvatarFallback>{userInitials}</AvatarFallback>
                  {user?.image && <AvatarImage src={user.image || "/placeholder.svg"} alt={user.name || ""} />}
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
              </div>
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Administración</h2>
              <div className="space-y-1">
                {navItems.map((item) => (
                  <div key={item.title}>
                    {renderNavItem(item)}
                    {!item.locked && renderActionButtons(item.title.toLowerCase())}
                  </div>
                ))}
              </div>

              <Separator className="my-6" />

              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">Enlaces</h2>
              <div className="space-y-3">
                {externalLinks.map((item) => (
                  <Button
                    key={item.title}
                    asChild
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    <Link href={item.href}>
                      <div className="flex items-center w-full">
                        <item.icon className="mr-3 h-5 w-5" />
                        <span>{item.title}</span>
                        {item.external && <ExternalLink className="ml-auto h-4 w-4" />}
                      </div>
                    </Link>
                  </Button>
                ))}
              </div>
            </div>
          </ScrollArea>
        </SheetContent>
      </Sheet>

      {/* Desktop Sidebar */}
      <div
        className={cn(
          "hidden border-r bg-background md:block shadow-sm transition-all duration-300",
          isSidebarOpen ? "w-64" : "w-16",
        )}
      >
        <div className="px-7">
          <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl py-6">
            <Image src="/logo.png" alt="Tenerife Paradise Tours" width={40} height={40} className="rounded-full" />
            <span className="text-primary">Tenerife Paradise</span>
          </Link>
        </div>
        <ScrollArea className="h-[calc(100vh-8rem)]">
          <div className="space-y-4 py-4">
            <div className="px-4 py-2">
              <div className="flex items-center gap-3 px-4 py-3 mb-6 bg-muted/50 rounded-lg">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>{userInitials}</AvatarFallback>
                  {user?.image && <AvatarImage src={user.image || "/placeholder.svg"} alt={user.name || ""} />}
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">{user?.email}</p>
                </div>
              </div>
              <h2 className="mb-3 px-4 text-lg font-semibold tracking-tight">Administración</h2>
              <div className="space-y-1.5">
                {navItems.map((item) => (
                  <div key={item.title}>
                    {renderNavItem(item)}
                    {!item.locked && renderActionButtons(item.title.toLowerCase())}
                  </div>
                ))}
              </div>

              <Separator className="my-6" />

              <h2 className="mb-3 px-4 text-lg font-semibold tracking-tight">Enlaces</h2>
              <div className="space-y-3">
                {externalLinks.map((item) => (
                  <Button key={item.title} asChild variant="ghost" className="w-full justify-start text-base">
                    <Link href={item.href}>
                      <div className="flex items-center w-full">
                        <item.icon className="mr-3 h-5 w-5" />
                        <span>{item.title}</span>
                        {item.external && <ExternalLink className="ml-auto h-4 w-4" />}
                      </div>
                    </Link>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
    </>
  )
}
