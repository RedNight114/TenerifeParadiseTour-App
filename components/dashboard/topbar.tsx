"use client"
import { Bell, Menu, LogOut, Settings, HelpCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/hooks/use-auth"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useConfig } from "@/contexts/config-context"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

interface TopbarProps {
  onMenuToggle: () => void
}

export default function Topbar({ onMenuToggle }: TopbarProps) {
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

  const handleRequestNotificationPermission = async () => {
    if (!("Notification" in window)) {
      toast({
        title: "Error",
        description: "Este navegador no soporta notificaciones de escritorio",
        variant: "destructive",
      })
      return
    }

    const permission = await Notification.requestPermission()

    if (permission === "granted") {
      setConfig({
        ...config,
        notifications: {
          ...config.notifications,
          browser: true,
        },
      })

      // Mostrar notificación de prueba
      new Notification("Notificaciones activadas", {
        body: "Ahora recibirás notificaciones importantes",
        icon: "/logo.png",
      })

      toast({
        title: "Notificaciones activadas",
        description: "Ahora recibirás notificaciones importantes en tu navegador",
      })
    } else {
      setConfig({
        ...config,
        notifications: {
          ...config.notifications,
          browser: false,
        },
      })

      toast({
        title: "Notificaciones denegadas",
        description: "Has denegado el permiso para recibir notificaciones",
        variant: "destructive",
      })
    }
  }

  // Obtener iniciales del usuario
  const userInitials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .substring(0, 2)
    : "AD"

  return (
    <div className="border-b bg-background px-4 py-3 flex items-center justify-between">
      {/* Botón de menú */}
      <div className="flex items-center">
        <Button variant="ghost" size="icon" onClick={onMenuToggle} className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </div>

      {/* Notificaciones y perfil */}
      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0">3</Badge>
              <span className="sr-only">Notificaciones</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notificaciones</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-96 overflow-auto">
              {/* Notificaciones */}
              <div className="p-3 hover:bg-muted cursor-pointer">
                <p className="font-medium">Nueva reserva</p>
                <p className="text-sm text-muted-foreground">Juan Pérez ha reservado Excursión al Teide</p>
                <p className="text-xs text-muted-foreground mt-1">Hace 5 minutos</p>
              </div>
              <DropdownMenuSeparator />
              <div className="p-3 hover:bg-muted cursor-pointer">
                <p className="font-medium">Recordatorio</p>
                <p className="text-sm text-muted-foreground">Excursión a Anaga mañana a las 9:00</p>
                <p className="text-xs text-muted-foreground mt-1">Hace 1 hora</p>
              </div>
              <DropdownMenuSeparator />
              <div className="p-3 hover:bg-muted cursor-pointer">
                <p className="font-medium">Nuevo cliente</p>
                <p className="text-sm text-muted-foreground">María López se ha registrado</p>
                <p className="text-xs text-muted-foreground mt-1">Hace 3 horas</p>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center">Ver todas</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Avatar className="h-8 w-8">
                <AvatarFallback>{userInitials}</AvatarFallback>
                {user?.image && <AvatarImage src={user.image || "/placeholder.svg"} alt={user.name || ""} />}
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>{user?.name || "Administrador"}</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <Dialog>
                <DialogTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    <Settings className="mr-2 h-4 w-4" />
                    Configuración
                  </DropdownMenuItem>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-xl flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      Configuración del Panel
                    </DialogTitle>
                    <DialogDescription>
                      Personaliza tu experiencia en el panel de administración de Tenerife Paradise Tours.
                    </DialogDescription>
                  </DialogHeader>

                  <Tabs defaultValue="notifications" className="mt-2">
                    <TabsList className="grid grid-cols-2 mb-4">
                      <TabsTrigger value="notifications" className="flex items-center gap-1">
                        <Bell className="h-4 w-4" />
                        <span className="sm:inline">Notificaciones</span>
                      </TabsTrigger>
                      <TabsTrigger value="display" className="flex items-center gap-1">
                        <Settings className="h-4 w-4" />
                        <span className="sm:inline">Visualización</span>
                      </TabsTrigger>
                    </TabsList>

                    {/* Pestaña de Notificaciones */}
                    <TabsContent value="notifications" className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Preferencias de notificaciones</CardTitle>
                          <CardDescription>Configura cómo y cuándo quieres recibir alertas</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                              <Label htmlFor="notifications-enabled" className="text-base font-medium">
                                Notificaciones
                              </Label>
                              <p className="text-sm text-muted-foreground">
                                Recibe alertas sobre nuevas reservas y actividad.
                              </p>
                            </div>
                            <Switch
                              id="notifications-enabled"
                              checked={config.notifications.enabled}
                              onCheckedChange={(checked) =>
                                setConfig({
                                  ...config,
                                  notifications: { ...config.notifications, enabled: checked },
                                })
                              }
                            />
                          </div>

                          <div
                            className={
                              config.notifications.enabled ? "space-y-4" : "space-y-4 opacity-50 pointer-events-none"
                            }
                          >
                            <Separator />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="flex items-center space-x-2">
                                <Switch
                                  id="email-notifications"
                                  checked={config.notifications.email}
                                  onCheckedChange={(checked) =>
                                    setConfig({
                                      ...config,
                                      notifications: { ...config.notifications, email: checked },
                                    })
                                  }
                                  disabled={!config.notifications.enabled}
                                />
                                <Label htmlFor="email-notifications">Notificaciones por email</Label>
                              </div>

                              <div className="flex items-center space-x-2">
                                <Switch
                                  id="push-notifications"
                                  checked={config.notifications.push}
                                  onCheckedChange={(checked) => {
                                    if (!config.notifications.push && checked) {
                                      handleRequestNotificationPermission()
                                    } else {
                                      setConfig({
                                        ...config,
                                        notifications: { ...config.notifications, push: checked },
                                      })
                                    }
                                  }}
                                  disabled={!config.notifications.enabled}
                                />
                                <Label htmlFor="push-notifications">Notificaciones push</Label>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    {/* Pestaña de Visualización */}
                    <TabsContent value="display" className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-lg">Preferencias de visualización</CardTitle>
                          <CardDescription>Personaliza cómo se muestran los datos en el panel</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Label htmlFor="rows-per-page" className="text-base font-medium">
                                Filas por página: {config.display.rowsPerPage}
                              </Label>
                            </div>
                            <Slider
                              id="rows-per-page"
                              min={5}
                              max={50}
                              step={5}
                              value={[config.display.rowsPerPage]}
                              onValueChange={(value) =>
                                setConfig({
                                  ...config,
                                  display: { ...config.display, rowsPerPage: value[0] },
                                })
                              }
                              className="w-full"
                            />
                          </div>

                          <Separator />

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center space-x-2">
                              <Switch
                                id="show-filters"
                                checked={config.display.showFilters}
                                onCheckedChange={(checked) =>
                                  setConfig({
                                    ...config,
                                    display: { ...config.display, showFilters: checked },
                                  })
                                }
                              />
                              <Label htmlFor="show-filters">Mostrar filtros por defecto</Label>
                            </div>

                            <div className="flex items-center space-x-2">
                              <Switch
                                id="animations"
                                checked={config.display.animationsEnabled}
                                onCheckedChange={(checked) =>
                                  setConfig({
                                    ...config,
                                    display: { ...config.display, animationsEnabled: checked },
                                  })
                                }
                              />
                              <Label htmlFor="animations">Animaciones</Label>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>

                  <DialogFooter className="flex items-center justify-between mt-4">
                    <div className="flex items-center">
                      {hasChanges && (
                        <Badge
                          variant="outline"
                          className="mr-2 bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
                        >
                          Cambios sin guardar
                        </Badge>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" onClick={resetConfig}>
                        Restablecer
                      </Button>
                      <Button onClick={saveConfig} disabled={!hasChanges}>
                        Guardar cambios
                      </Button>
                    </div>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <DropdownMenuItem asChild>
                <Link href="/ayuda">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Ayuda
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={handleLogout} className="text-red-500 focus:text-red-500">
              <LogOut className="mr-2 h-4 w-4" />
              Cerrar sesión
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
